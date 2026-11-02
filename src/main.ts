import { createMapFactory } from './engine/factory';
import { recalculateMapAdjacencies } from './engine/mathEngine';
import { drawMapCanvas } from './view/canvasRender';

console.log("Executing Core Module 4 Render Validation Pipeline...");

// 1. Initialize a Standard scale 14x10 grid scenario mapped as a clean Plains biome layout
const activeScenarioMap = createMapFactory(14, 10, 'Plains');

// 2. Artificially place static elements on our configuration state to test rule structures
// Place a Campus tile
activeScenarioMap.tiles['2,2'].infrastructure = 'Campus';

// Flank the Campus with two individual Mountain structures
activeScenarioMap.tiles['1,2'].terrain = 'Mountain';
activeScenarioMap.tiles['2,1'].terrain = 'Mountain';

// Place an Industrial Zone cluster tracking a custom Mine configuration nearby
activeScenarioMap.tiles['5,4'].infrastructure = 'Industrial_Zone';
activeScenarioMap.tiles['5,3'].infrastructure = 'Mine';

// 3. Execute math processing loops
recalculateMapAdjacencies(activeScenarioMap);

// 4. Resolve the DOM viewport node and push rendering pipelines out to the window canvas
const canvasElement = document.getElementById('mapCanvas') as HTMLCanvasElement;

if (canvasElement) {
    drawMapCanvas(canvasElement, activeScenarioMap);
    console.log("🎉 SUCCESS: Vector paths and data metrics rendered onto viewport cleanly!");
} else {
    console.error("❌ CRITICAL ERROR: Target view canvas DOM element container not found.");
}
