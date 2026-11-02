import { createMapFactory } from './factory';
import { recalculateMapAdjacencies, getHoneycombGrid } from './mathEngine';

/** Executes a sequence of validation tests directly against your math loops.
 * Returns true if all test cases pass cleanly.
 */
export function runSystematicTests(): boolean {
  console.group("🧪 STARTING SYSTEMATIC VERIFICATION SUITE...");
  let allPassed = true;

  // --- Test Case 1: Boundary Edge Adjacency Fault Triage ---
  // Ensuring looking up neighbors off the outer borders doesn't trigger undefined pointer crash faults
  try {
    const edgeMap = createMapFactory(4, 4, 'Grassland');
    // Place a Campus at the absolute corner index boundary (0,0)
    edgeMap.tiles['0,0'].infrastructure = 'Campus';
    // Place a Mountain directly adjacent at row index 1
    edgeMap.tiles['0,1'].terrain = 'Mountain';

    recalculateMapAdjacencies(edgeMap);

    const campusBonus = edgeMap.tiles['0,0'].yields.bonus.science;
    if (campusBonus === 2) {
      console.log("✅ TEST 1 PASSED: Grid boundary lookup safely handled edge limits without throwing crash faults.");
    } else {
      console.error(`❌ TEST 1 FAILED: Expected +2 Science bonus on boundary tile, but calculated: ${campusBonus}`);
      allPassed = false;
    }
  } catch (err) {
    console.error("❌ TEST 1 CRASHED: Adjacency engine choked on border calculations:", err);
    allPassed = false;
  }

  // --- Test Case 2: Multi-Tile Cluster Accumulation Evaluation ---
  // Placing a triangle setup of Farms to ensure dynamic bonus accumulation maps correctly
  try {
    const clusterMap = createMapFactory(5, 5, 'Plains');
    // Interlock three separate Farms adjacent to each other
    clusterMap.tiles['1,1'].infrastructure = 'Farm';
    clusterMap.tiles['2,1'].infrastructure = 'Farm';
    clusterMap.tiles['1,2'].infrastructure = 'Farm';

    recalculateMapAdjacencies(clusterMap);

    // Coordinate '1,1' touches both other farms, meaning it should aggregate +2 Food bonus points
    const farmBonus = clusterMap.tiles['1,1'].yields.bonus.food;
    if (farmBonus === 2) {
      console.log("✅ TEST 2 PASSED: Cluster rulesets accurately aggregated stacked modifier points.");
    } else {
      console.error(`❌ TEST 2 FAILED: Expected +2 Food bonus on clustered Farm tile, but calculated: ${farmBonus}`);
      allPassed = false;
    }
  } catch (err) {
    console.error("❌ TEST 2 CRASHED: Farm cluster accumulation logic threw an exception:", err);
    allPassed = false;
  }

  // --- Test Case 3: Coordinate Mouse Hit Matrix Precision Calibration ---
  // Checking that a known structural pixel point accurately resolves onto its geometric math key index
  try {
    const calibrationMap = createMapFactory(4, 4, 'Grassland');
    const geoGrid = getHoneycombGrid(calibrationMap);

    // Pick the absolute root centre hex token (0,0)
    const rootHex = geoGrid.getHex({ q: 0, r: 0 });

    if (rootHex) {
      // Run pointToHex lookup using the precise physical centre vector point of that hex tile
      const resolvedHex = geoGrid.pointToHex({ x: rootHex.x, y: rootHex.y });
      const resolvedKey = resolvedHex ? `${resolvedHex.q},${resolvedHex.r}` : 'MISSING';

      if (resolvedKey === '0,0') {
        console.log("✅ TEST 3 PASSED: Cursor conversion handler resolved coordinate mappings accurately.");
      } else {
        console.error(`❌ TEST 3 FAILED: Click position on center vector (0,0) misaligned and resolved to key: ${resolvedKey}`);
        allPassed = false;
      }
    }
  } catch (err) {
    console.error("❌ TEST 3 CRASHED: Geometric coordinate mapping verification failed:", err);
    allPassed = false;
  }

  // --- Test Case 4: Canvas Interface Viewport Element Availability ---
  if (typeof window !== 'undefined') {
    const canvas = (document.getElementById('mapCanvas') as HTMLCanvasElement);
    if (canvas && canvas.width > 0 && canvas.height > 0) {
      console.log("✅ TEST 4 PASSED: HTML5 Viewport context is active with stable boundary dimensions.");
    } else {
      console.error("❌ TEST 4 FAILED: HTML5 canvas element context is uninstantiated or dimensions collapsed.");
      allPassed = false;
    }
  } else {
    console.warn("⚠️ TEST 4 SKIPPED: Canvas test requires browser window context.");
  }

  console.groupEnd();
  return allPassed;
}