// Step 3: Write the Map Generation Factory

import { IMapConfig, ITileState, TerrainType, createBlankYields } from '../types/grid';
import { BASE_TERRAIN_YIELDS } from './config';

/**
 * Creates a clean rectangular-offset map configuration initialized with a chosen terrain type
 */
export function createMapFactory(width: number, height: number, defaultTerrain: TerrainType = 'Grassland'): IMapConfig {
  const tiles: Record<string, ITileState> = {};

  // Simple offset loop to populate a rectangular grid space
  for (let r = 0; r < height; r++) {
    // Offset calculation matching standard pointy-top row shifts
    const rOffset = Math.floor(r / 2);
    for (let q = -rOffset; q < width - rOffset; q++) {
      const key = `${q},${r}`;

      // Fetch baseline fields from your immutable config layer
      const baseYield = { ...BASE_TERRAIN_YIELDS[defaultTerrain] };

      tiles[key] = {
        q,
        r,
        terrain: defaultTerrain,
        feature: 'None',
        infrastructure: 'None',
        isStartingTile: false,
        yields: {
          base: baseYield,
          bonus: createBlankYields(),
          total: { ...baseYield } // Initially total matches base
        }
      };
    }
  }

  return {
    id: crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2),
    name: `New Scenario Map (${width}x${height})`,
    dimensions: { width, height },
    tiles
  };
}