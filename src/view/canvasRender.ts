import { IMapConfig } from '../types/grid';
import { CivHex } from '../engine/mathEngine';

// Configuration lookup dictionary mapping flat hexadecimal colour codes directly onto terrains
const TERRAIN_COLORS: Record<string, string> = {
  Ocean:     '#0f3057', // Deep Indigo Blue
  Coast:     '#00587a', // Shallow Teal Blue
  Grassland: '#519259', // Vibrant Grass Green
  Plains:    /* plains colour */ '#b19f7a', // Earthy Tan/Khaki
  Desert:    '#f4d160', // Soft Sand Yellow
  Tundra:    '#687980', // Cold Slid Slate Grey
  Mountain:  '#4a47a3'  // Distinct Muted Purple
};

/** Iterates through active data attributes to paint geometric path matrices onto the screen */
export function drawMapCanvas(canvas: HTMLCanvasElement, mapConfig: IMapConfig): void {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  // 1. Core Cleanup Pass: Flush previous render vectors from the viewing monitor screen
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // 2. Compute bounding box of all hexes to center the map on canvas
  let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
  Object.keys(mapConfig.tiles).forEach(key => {
    const tile = mapConfig.tiles[key];
    const hex = new CivHex({ q: tile.q, r: tile.r });
    hex.corners.forEach(c => {
      if (c.x < minX) minX = c.x;
      if (c.x > maxX) maxX = c.x;
      if (c.y < minY) minY = c.y;
      if (c.y > maxY) maxY = c.y;
    });
  });

  const mapWidth = maxX - minX;
  const mapHeight = maxY - minY;
  const offsetX = (canvas.width - mapWidth) / 2 - minX;
  const offsetY = (canvas.height - mapHeight) / 2 - minY;

  ctx.save();
  ctx.translate(offsetX, offsetY);

  // 3. Main Operational Draw Loop
  Object.keys(mapConfig.tiles).forEach(key => {
    const tile = mapConfig.tiles[key];
    const hex = new CivHex({ q: tile.q, r: tile.r });

    // --- Part A: Trace the Hexagon Edge Vector Path ---
    ctx.beginPath();
    ctx.moveTo(hex.corners[0].x, hex.corners[0].y);
    for (let i = 1; i < 6; i++) {
      ctx.lineTo(hex.corners[i].x, hex.corners[i].y);
    }
    ctx.closePath();

    // --- Part B: Layer Styling and Complex Fills ---
    // Fallback to plain green if an entry is missing from our config map
    ctx.fillStyle = TERRAIN_COLORS[tile.terrain] || '#519259';
    ctx.fill();

    // Draw the tile border outlines distinctly
    ctx.strokeStyle = '#222222';
    ctx.lineWidth = 1;
    ctx.stroke();

    // Optional infrastructure indicators (simple overlay circle highlights)
    if (tile.infrastructure !== 'None') {
      ctx.beginPath();
      ctx.arc(hex.x, hex.y, 14, 0, 2 * Math.PI);
      ctx.fillStyle = tile.infrastructure.includes('Zone') || tile.infrastructure === 'Campus' ? '#e27474' : '#f5f0bb';
      ctx.fill();
    }

    // --- Part C: Centre Vertex Numerical Overlay Text Strings ---
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 11px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Label capital, infrastructure shortcodes, or coordinate locations cleanly
    if (tile.isStartingTile) {
      ctx.fillStyle = '#ffdf65';
      ctx.fillText('CAPITAL', hex.x, hex.y - 4);
    } else if (tile.infrastructure !== 'None') {
      const displayLabel = tile.infrastructure.substring(0, 4).toUpperCase();
      ctx.fillText(displayLabel, hex.x, hex.y - 4);
    } else {
      ctx.fillStyle = 'rgba(255,255,255,0.4)';
      ctx.fillText(`${tile.q},${tile.r}`, hex.x, hex.y - 4);
    }

    // Display calculated dynamic yields directly underneath labels
    if (tile.yields.total.production > 0 || tile.yields.total.science > 0) {
      ctx.fillStyle = '#ffdf65';
      ctx.font = '9px sans-serif';

      let yieldString = '';
      if (tile.yields.total.science > 0) yieldString += `🔬${tile.yields.total.science} `;
      if (tile.yields.total.production > 0) yieldString += `🔨${tile.yields.total.production}`;

      ctx.fillText(yieldString.trim(), hex.x, hex.y + 10);
    }
  });
}