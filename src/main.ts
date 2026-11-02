import { createMapFactory } from './engine/factory';
import { recalculateMapAdjacencies } from './engine/mathEngine';

console.log("Initializing Civilization 7 Map Planner runtime pipeline...");

// 1. Generate a small 4x4 verification grid initialized as clean Grassland
const testMap = createMapFactory(4, 4, 'Grassland');

// 2. Inject an Industrial Zone onto an arbitrary position
const targetKey = '1,1';
testMap.tiles[targetKey].infrastructure = 'Industrial_Zone';

// 3. Place a Mine directly adjacent to it at coordinate position '1,0'
const mineKey = '1,0';
testMap.tiles[mineKey].infrastructure = 'Mine';

console.log("Pre-Calculation Status for Industrial Zone:", JSON.stringify(testMap.tiles[targetKey].yields));

// 4. Trigger the geometric processing calculator engine
recalculateMapAdjacencies(testMap);

console.log("Post-Calculation Status for Industrial Zone:", JSON.stringify(testMap.tiles[targetKey].yields));

// 5. Assert your calculation rules directly
if (testMap.tiles[targetKey].yields.bonus.production === 1) {
    console.log("🎉 SUCCESS: Adjacency Loop calculated the +1 Production mine bonus correctly!");
} else {
    console.error("❌ ERROR: Calculation Engine returned unexpected output values.");
}
