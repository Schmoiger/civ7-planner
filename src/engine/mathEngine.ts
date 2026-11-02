import { defineHex, Grid, rectangle, Orientation, Direction } from 'honeycomb-grid';
import { IMapConfig } from '../types/grid';
import { CIV7_ADJACENCY_RULES, createBlankYields } from './config';

// 1. Initialize Honeycomb's base pointy-top hexagon structure
// 'dimensions' represents the outer pixel radius of each tile on your canvas
export class CivHex extends defineHex({ dimensions: 30, orientation: Orientation.POINTY }) {}

/**
 * Utility helper to quickly sync a Honeycomb Grid mapping sequence 
 * with your global raw map configurations.
 */
export function getHoneycombGrid(mapConfig: IMapConfig): Grid<CivHex> {
  return new Grid(
    CivHex, 
    rectangle({ 
      width: mapConfig.dimensions.width, 
      height: mapConfig.dimensions.height 
    })
  );
}
/**
 * Evaluates the entire grid layout map, updates adjacency bonus matrices,
 * and collapses total calculations down cleanly.
 */
export function recalculateMapAdjacencies(mapConfig: IMapConfig): void {
  // 1. Instantly spin up a geometric map reference for neighbor traversal
  const geoGrid = getHoneycombGrid(mapConfig);

  // 2. Clear out historic data fields before starting calculations
  Object.keys(mapConfig.tiles).forEach(key => {
    mapConfig.tiles[key].yields.bonus = createBlankYields();
  });

  // 3. Process every tile in your active map configuration layout
  Object.keys(mapConfig.tiles).forEach(key => {
    const tile = mapConfig.tiles[key];
    
    // Skip empty tiles without infrastructure modifiers
    if (tile.infrastructure === 'None') return;

    // Resolve the matching geometric hex token from Honeycomb
    const matchingHex = geoGrid.getHex({ q: tile.q, r: tile.r });
    if (!matchingHex) return;

    // Fetch all immediate adjacent neighbor tokens from Honeycomb's ring math
    // honeycomb-grid v4 uses neighborOf() with Direction enum instead of neighbors()
    const neighbors: CivHex[] = [
      geoGrid.neighborOf(matchingHex, Direction.E),
      geoGrid.neighborOf(matchingHex, Direction.NE),
      geoGrid.neighborOf(matchingHex, Direction.NW),
      geoGrid.neighborOf(matchingHex, Direction.W),
      geoGrid.neighborOf(matchingHex, Direction.SW),
      geoGrid.neighborOf(matchingHex, Direction.SE),
    ].filter((h): h is CivHex => h !== null && h !== undefined);

    // Filter relevant adjacency rules bound specifically to this tile's infrastructure type
    const activeRules = CIV7_ADJACENCY_RULES.filter(rule => rule.sourceType === tile.infrastructure);

    neighbors.forEach((neighborHex: CivHex) => {
      // Safety step: Ignore empty spaces moving off the flat rectangular edge boundaries
      if (!neighborHex) return;

      const neighborKey = `${neighborHex.q},${neighborHex.r}`;
      const neighborTile = mapConfig.tiles[neighborKey];
      if (!neighborTile) return;

      // Evaluate every applicable adjacency rule constraint against the neighboring cell
      activeRules.forEach(rule => {
        let isMatch = false;

        if (rule.triggerType === 'terrain' && neighborTile.terrain === rule.triggerTarget) {
          isMatch = true;
        } else if (rule.triggerType === 'feature' && neighborTile.feature === rule.triggerTarget) {
          isMatch = true;
        } else if (rule.triggerType === 'infrastructure' && neighborTile.infrastructure === rule.triggerTarget) {
          isMatch = true;
        }

        // Apply bonus yields to the source tile if a criteria condition is met
        if (isMatch && rule.bonusYield) {
          Object.keys(rule.bonusYield).forEach(yieldKey => {
            const k = yieldKey as keyof typeof rule.bonusYield;
            const value = rule.bonusYield[k] || 0;
            tile.yields.bonus[k] = (tile.yields.bonus[k] || 0) + value;
          });
        }
      });
    });
  });

  // 4. Final Reduction Pass: Collapse base resources and calculated dynamic bonuses into totals
  Object.keys(mapConfig.tiles).forEach(key => {
    const tile = mapConfig.tiles[key];
    tile.yields.total = {
      food: tile.yields.base.food + tile.yields.bonus.food,
      production: tile.yields.base.production + tile.yields.bonus.production,
      science: tile.yields.base.science + tile.yields.bonus.science,
      culture: tile.yields.base.culture + tile.yields.bonus.culture,
      gold: tile.yields.base.gold + tile.yields.bonus.gold,
      happiness: tile.yields.base.happiness + tile.yields.bonus.happiness,
      baseProduction: (tile.yields.base.baseProduction || 0) + (tile.yields.bonus.baseProduction || 0),
      bonusProduction: (tile.yields.base.bonusProduction || 0) + (tile.yields.bonus.bonusProduction || 0),
      foodStorage: (tile.yields.base.foodStorage || 0) + (tile.yields.bonus.foodStorage || 0)
    };
  });
}
