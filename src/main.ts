import { createMapFactory } from './engine/factory';
import { recalculateMapAdjacencies } from './engine/mathEngine';
import { drawMapCanvas } from './view/canvasRender';
import { setupInteractionEngine } from './ui/interaction';

console.log("Starting Civilization 7 Map Planner...");

// 1. Generate a baseline map configuration (14 columns by 10 rows)
const mapScenario = createMapFactory(14, 10, 'Grassland');

// 2. Run initial base logic pass to ensure base structures line up
recalculateMapAdjacencies(mapScenario);

// 3. Resolve essential DOM nodes
const canvas = document.getElementById('mapCanvas') as HTMLCanvasElement;

if (canvas) {
    // 4. Initial paint cycle execution pass
    drawMapCanvas(canvas, mapScenario);

    // 5. Bootstrap the live mouse interaction click routing cycles
    setupInteractionEngine(canvas, mapScenario);

    console.log("🚀 Application environment fully initialized and ready!");
} else {
    console.error("❌ CRITICAL BOOT ERROR: Target map canvas canvas node missing from viewport DOM.");
}
