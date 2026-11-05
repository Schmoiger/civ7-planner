import { recalculateMapAdjacencies } from './engine/mathEngine';
import { drawMapCanvas } from './view/canvasRender';
import { setupInteractionEngine } from './ui/interaction';
import { runSystematicTests } from './engine/testRunner';
import { IMapConfig, ITileState, TerrainType, createBlankYields } from './types/grid';
import { BASE_TERRAIN_YIELDS } from './engine/config';

/**
 * Creates a small hexagonal map: a capital tile surrounded by exactly 1 ring of grassland.
 * Total tiles: 1 (capital) + 6 (ring) = 7 tiles.
 */
function createCapitalRingMap(): IMapConfig {
  const tiles: Record<string, ITileState> = {};
  const terrain: TerrainType = 'Grassland';
  const baseYield = { ...BASE_TERRAIN_YIELDS[terrain] };

  // Center capital tile at (0,0)
  const centerKey = '0,0';
  tiles[centerKey] = {
    q: 0, r: 0, terrain, feature: 'None', infrastructure: 'None',
    isStartingTile: true,
    yields: { base: { ...baseYield }, bonus: createBlankYields(), total: { ...baseYield } }
  };

  // 1 ring of grassland around the capital (6 axial-direction neighbors)
  const ringDirections = [
    { q: 1, r: 0 }, { q: 0, r: 1 }, { q: -1, r: 1 },
    { q: -1, r: 0 }, { q: 0, r: -1 }, { q: 1, r: -1 }
  ];

  ringDirections.forEach(dir => {
    const key = `${dir.q},${dir.r}`;
    tiles[key] = {
      q: dir.q, r: dir.r, terrain, feature: 'None', infrastructure: 'None',
      isStartingTile: false,
      yields: { base: { ...baseYield }, bonus: createBlankYields(), total: { ...baseYield } }
    };
  });

  return {
    id: crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2),
    name: 'Capital Ring Map (1 ring)',
    dimensions: { width: 3, height: 3 },
    tiles
  };
}

console.log("Initializing Civilization 7 Map Planner runtime pipeline...");

const canvas = document.getElementById('mapCanvas') as HTMLCanvasElement;

if (canvas) {
    // 1. RUN MODULE 6 TESTS FIRST: Halt visual pipeline execution if core data math breaks
    const testsClean = runSystematicTests();

    if (testsClean) {
        console.log("🚀 All systematic tests passed successfully. Booting production canvas workspace...");

        // 2. Initialize small map: capital surrounded by 1 ring of grassland
        const productionMap = createCapitalRingMap();

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
