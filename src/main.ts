import { createMapFactory } from './engine/factory';
import { recalculateMapAdjacencies } from './engine/mathEngine';
import { drawMapCanvas } from './view/canvasRender';
import { setupInteractionEngine } from './ui/interaction';
import { runSystematicTests } from './engine/testRunner';

console.log("Initializing Civilization 7 Map Planner runtime pipeline...");

const canvas = document.getElementById('mapCanvas') as HTMLCanvasElement;

if (canvas) {
    // 1. RUN MODULE 6 TESTS FIRST: Halt visual pipeline execution if core data math breaks
    const testsClean = runSystematicTests();

    if (testsClean) {
        console.log("🚀 All systematic tests passed successfully. Booting production canvas workspace...");

        // 2. Initialize production scale map layout configurations (14 columns by 10 rows)
        const productionMap = createMapFactory(14, 10, 'Grassland');

        // 3. Kick off default math transformations
        recalculateMapAdjacencies(productionMap);

        // 4. Fire the paint context refresh pass out to the user window viewport
        drawMapCanvas(canvas, productionMap);

        // 5. Establish live cursor point interaction listeners
        setupInteractionEngine(canvas, productionMap);
    } else {
        console.error("❌ CRITICAL: App initialization suspended because safety unit tests failed.");

        // Visual indicator fallbacks indicating execution suspension directly on the layout screen canvas
        const ctx = canvas.getContext('2d');
        if (ctx) {
            ctx.fillStyle = '#ff4d4d';
            ctx.font = 'bold 16px sans-serif';
            ctx.fillText("SYSTEM INITIALIZATION ERROR: Verification Checks Failed.", 50, 50);
            ctx.fillText("Check browser developer console for detailed logs.", 50, 80);
        }
    }
} else {
    console.error("❌ CRITICAL BOOT ERROR: Target viewport node canvas context missing from DOM tree.");
}
