import { TerrainType, YieldFields, InfrastructureType, IAdjacencyRule, createBlankYields } from '../types/grid';

// Civ 7 Terrain Base Yields Map Setup
const BASE_TERRAIN_YIELDS: Record<TerrainType, YieldFields> = {
  Arid: { food: -1, production: 0, gold: 1, culture: 0, happiness: 0, baseProduction: 0, bonusProduction: 0, foodStorage: 0 },
  Boreal: { food: 0, production: 1, gold: 0, culture: 0, happiness: 0, baseProduction: 0, bonusProduction: 0, foodStorage: 0 },
  Coastal: { food: 1, production: 1, gold: 1, culture: 0, happiness: 0, baseProduction: 0, bonusProduction: 0, foodStorage: 0 },
  Continental: { food: 1, production: 1, gold: 1, culture: 1, happiness: 0, baseProduction: 0, bonusProduction: 0, foodStorage: 0 },
  Desert: { food: -2, production: 0, gold: 2, culture: 0, happiness: -1, baseProduction: 0, bonusProduction: 0, foodStorage: 0 },
  Grassland: { food: 2, production: 1, gold: 0, culture: 0, happiness: 1, baseProduction: 0, bonusProduction: 0, foodStorage: 0 },
  GreatLakes: { food: 1, production: 1, gold: 0, culture: 0, happiness: 0, baseProduction: 0, bonusProduction: 0, foodStorage: 0 },
  Island: { food: 1, production: 0, gold: 1, culture: 0, happiness: 0, baseProduction: 0, bonusProduction: 0, foodStorage: 0 },
  Jungle: { food: 1, production: 0, gold: 0, culture: 0, happiness: -1, baseProduction: 0, bonusProduction: 0, foodStorage: 0 },
  Mountain: { food: 0, production: 1, gold: 0, culture: 1, happiness: -1, baseProduction: 0, bonusProduction: 0, foodStorage: 0 },
  Ocean: { food: 0, production: 0, gold: 0, culture: 0, happiness: 0, baseProduction: 0, bonusProduction: 0, foodStorage: 0 },
  Plains: { food: 1, production: 1, gold: 0, culture: 1, happiness: 1, baseProduction: 0, bonusProduction: 0, foodStorage: 0 },
  Rainforest: { food: 1, production: 0, gold: 0, culture: 2, happiness: 1, baseProduction: 0, bonusProduction: 0, foodStorage: 0 },
  River: { food: 1, production: 0, gold: 0, culture: 0, happiness: 0, baseProduction: 0, bonusProduction: 0, foodStorage: 0 },
  Savanna: { food: 1, production: 1, gold: 0, culture: 0, happiness: 1, baseProduction: 0, bonusProduction: 0, foodStorage: 0 },
  Shrubland: { food: 0, production: 1, gold: 0, culture: 0, happiness: 0, baseProduction: 0, bonusProduction: 0, foodStorage: 0 },
  Tundra: { food: 0, production: 0, gold: 0, culture: 0, happiness: 0, baseProduction: 0, bonusProduction: 0, foodStorage: 0 },
  Wetland: { food: 1, production: 0, gold: 0, culture: 0, happiness: 0, baseProduction: 0, bonusProduction: 0, foodStorage: 0 }
};

// Civ 7 Macro Adjacency Clusters Map Setup
const GOLD_FOOD_BUILDINGS: InfrastructureType[] = ['Commercial_Hub'];
const SCIENCE_PROD_BUILDINGS: InfrastructureType[] = ['Campus', 'Industrial_Zone'];
const CULTURE_HAPPY_BUILDINGS: InfrastructureType[] = ['Theater_Square'];

// Helper: build a full YieldFields from a partial bonus
const bonus = (partial: Partial<YieldFields>): YieldFields => {
  const base = createBlankYields();
  return { ...base, ...partial };
};

export const CIV7_ADJACENCY_RULES: IAdjacencyRule[] = [
  // --- Category 1: Gold & Food (Rivers and Coasts) ---
  ...GOLD_FOOD_BUILDINGS.flatMap(b => [
    { sourceType: b, triggerType: 'terrain' as const, triggerTarget: 'Coast' as const, bonusYield: bonus({ gold: 1 }) },
    { sourceType: b, triggerType: 'feature' as const, triggerTarget: 'Floodplains' as const, bonusYield: bonus({ food: 1 }) }
  ]),

  // --- Category 2: Science & Production (Mines & Industrial Zones) ---
  ...SCIENCE_PROD_BUILDINGS.flatMap(b => [
    { sourceType: b, triggerType: 'infrastructure' as const, triggerTarget: 'Mine' as const, bonusYield: bonus({ production: 1 }) }
  ]),

  // --- Category 3: Culture & Happiness (Mountains) ---
  ...CULTURE_HAPPY_BUILDINGS.flatMap(b => [
    { sourceType: b, triggerType: 'terrain' as const, triggerTarget: 'Mountain' as const, bonusYield: bonus({ culture: 1 }) }
  ]),

  // --- Shared Mechanics: Farm Clusters ---
  {
    sourceType: 'Farm',
    triggerType: 'infrastructure' as const,
    triggerTarget: 'Farm' as const,
    bonusYield: bonus({ food: 1 })
  }
];

export { BASE_TERRAIN_YIELDS };