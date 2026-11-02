// --- Data Models ---

/** Tile State interface representing a single hex tile on the map */
export interface ITileState {
  q: number;
  r: number;
  terrain: TerrainType;
  feature: string;
  infrastructure: string;
  isStartingTile: boolean;
  yields: {
    base: YieldFields;
    bonus: YieldFields;
    total: YieldFields;
  };
}

/** Base yields for each terrain type */
export interface YieldFields {
  food: number;
  production: number;
  gold: number;
  culture: number;
  happiness: number;
  /** Science yield from terrain/buildings */
  science: number;
  /** Current production of the tile */
  baseProduction?: number;
  /** Additional production from tile improvements */
  bonusProduction?: number;
  /** Current food storage */
  foodStorage?: number;
}

/** Terrain types supported in Civ 7 map */
export type TerrainType = 
  | 'Arid'
  | 'Boreal'
  | 'Coastal'
  | 'Continental'
  | 'Desert'
  | 'Grassland'
  | 'GreatLakes'
  | 'Island'
  | 'Jungle'
  | 'Mountain'
  | 'Ocean'
  | 'Plains'
  | 'Rainforest'
  | 'River'
  | 'Savanna'
  | 'Shrubland'
  | 'Tundra'
  | 'Wetland';

/** Map configuration containing all tiles */
export interface IMapConfig {
  id: string;
  name: string;
  dimensions: {
    width: number;
    height: number;
  };
  tiles: Record<string, ITileState>;
}

/** Infrastructure types available in the game */
export type InfrastructureType = 
  | 'Campus'
  | 'Commercial_Hub'
  | 'Farm'
  | 'Industrial_Zone'
  | 'Mine'
  | 'None'
  | 'Plantation'
  | 'Theater_Square'
  | 'University'
  | 'Water_Reservoir';

/** Features available on the map */
export type FeatureType = 
  | 'Bridge'
  | 'Canal'
  | 'Cave'
  | 'Forest'
  | 'Coast'       // Added for coastal trigger targets
  | 'Floodplains' // Added for floodplain trigger targets
  | 'None'
  | 'Volcano'
  | 'Waterfall';

/** Map coordinates in axial (q, r) system */
export interface HexCoordinate {
  q: number;
  r: number;
  s: number; // s = -q - r (for completeness)
}

/** Adjacency rule for tile bonuses */
export interface IAdjacencyRule {
  sourceType: InfrastructureType | TerrainType | FeatureType;
  triggerType: 'terrain' | 'infrastructure' | 'feature';
  triggerTarget: TerrainType | InfrastructureType | FeatureType;
  bonusYield: YieldFields;
}

/** Individual yield for each resource type */
export interface SingleYield {
  food?: number;
  production?: number;
  gold?: number;
  culture?: number;
  happiness?: number;
  baseProduction?: number;
  bonusProduction?: number;
  foodStorage?: number;
}

/** Function to create blank yields */
export function createBlankYields(): YieldFields {
  return {
    food: 0,
    production: 0,
    gold: 0,
    culture: 0,
    happiness: 0,
    science: 0,
    baseProduction: 0,
    bonusProduction: 0,
    foodStorage: 0
  };
}