import { IMapConfig } from '../types/grid';
import { getHoneycombGrid, recalculateMapAdjacencies } from '../engine/mathEngine';
import { drawMapCanvas } from '../view/canvasRender';
import { BASE_TERRAIN_YIELDS } from '../engine/config';
import { saveMapConfig } from '../engine/mapState';

// Global state container tracking active toolbar configuration modifiers
let activeBrushType: 'terrain' | 'infra' = 'terrain';
let activeBrushValue: string = 'Grassland';

/**
 * Attaches event tracking modules onto DOM nodes to make the planner fully interactive.
 * Accepts a getter function so the handler always resolves the *current* map instance
 * after a save/load swap.
 */
export function setupInteractionEngine(canvas: HTMLCanvasElement, getMapConfig: () => IMapConfig): void {
  const displayLabel = document.getElementById('activeBrushDisplay');
  const buttons = document.querySelectorAll('.brush-btn');

  // --- Part A: Synchronise Toolbar Sidebar Actions ---
  buttons.forEach(button => {
    button.addEventListener('click', (e) => {
      const target = e.currentTarget as HTMLButtonElement;
      const type = target.getAttribute('data-type') as 'terrain' | 'infra';
      const val = target.getAttribute('data-val') || 'None';

      activeBrushType = type;
      activeBrushValue = val;

      if (displayLabel) {
        displayLabel.textContent = `${type.toUpperCase()}: ${val.replace('_', ' ')}`;
      }
    });
  });

  // --- Part B: Handle Viewport Click Vector Transformations ---
  canvas.addEventListener('click', (event) => {
    const rect = canvas.getBoundingClientRect();

    // Calculate the mouse position relative to the canvas boundary
    const clickX = event.clientX - rect.left;
    const clickY = event.clientY - rect.top;

    // Resolve the current map instance via getter so edits apply to the active map
    const currentMap = getMapConfig();
    const geoGrid = getHoneycombGrid(currentMap);
    const resolvedHex = geoGrid.pointToHex({ x: clickX, y: clickY });

    if (!resolvedHex) return;

    // Resolve matching cell hash index key string
    const mapKey = `${resolvedHex.q},${resolvedHex.r}`;
    const tileState = currentMap.tiles[mapKey];

    if (!tileState) return;

    // --- Part C: State Mutation Router ---
    if (activeBrushType === 'terrain') {
      const chosenTerrain = activeBrushValue as keyof typeof BASE_TERRAIN_YIELDS;
      tileState.terrain = chosenTerrain;
      // Re-fetch immutable foundation yields automatically on terrain transformation
      tileState.yields.base = { ...BASE_TERRAIN_YIELDS[chosenTerrain] };
    } else if (activeBrushType === 'infra') {
      tileState.infrastructure = activeBrushValue as any;
    }

    // --- Part D: The Unified Pipeline Refresh Cycle ---
    // 1. Recalculate all macro-adjacency changes across the map state
    recalculateMapAdjacencies(currentMap);

    // 2. Wipe the previous screen layer and repaint the new calculations instantly
    drawMapCanvas(canvas, currentMap);

    // 3. Persist the current map configuration to browser storage
    saveMapConfig(currentMap);
  });
}