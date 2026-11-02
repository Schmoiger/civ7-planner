import { defineHex, Grid, rectangle } from 'honeycomb';

// 1. Define what attributes a Civilization tile holds
interface CivCustomData {
  terrain: 'Grassland' | 'Mountain' | 'Campus';
  scienceBonus: number;
}

// 2. Build the Hex class (using Pointy-top hexes, matching Civ standards)
// The 'dimensions' property controls the size (radius in pixels) of each hex tile
class CivHex extends defineHex({ dimensions: 30, orientation: 'pointy' }) {
  terrain: CivCustomData['terrain'] = 'Grassland';
  scienceBonus: number = 0;
}

// 3. Initialize an 8x6 blank grid canvas
const grid = new Grid(CivHex, rectangle({ width: 8, height: 6 }));
const canvas = document.getElementById('mapCanvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d')!;

// 4. THE CALCULATOR: Run adjacency math across the whole grid
function calculateAdjacencies() {
  grid.forEach(hex => {
    // Reset bonuses before recalculating
    hex.scienceBonus = 0;

    // Rule: Campuses get +2 Science for every adjacent Mountain
    if (hex.terrain === 'Campus') {
      const neighbors = grid.neighborsOf(hex);
      neighbors.forEach(neighbor => {
        if (neighbor && neighbor.terrain === 'Mountain') {
          hex.scienceBonus += 2;
        }
      });
    }
  });
}

// 5. THE RENDERER: Standard HTML Canvas drawing commands
function drawMap() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear screen

  grid.forEach(hex => {
    // Get the physical pixel corners of this specific hexagon from Honeycomb
    const corners = hex.corners;

    ctx.beginPath();
    ctx.moveTo(corners[0].x, corners[0].y);
    for (let i = 1; i < 6; i++) {
      ctx.lineTo(corners[i].x, corners[i].y);
    }
    ctx.closePath();

    // Color code our tiles simply
    if (hex.terrain === 'Mountain') ctx.fillStyle = '#888888'; // Grey
    else if (hex.terrain === 'Campus') ctx.fillStyle = '#3399ff'; // Blue
    else ctx.fillStyle = '#77cc33'; // Grass Green

    ctx.fill();
    ctx.stroke(); // Draw hex outline

    // Draw data overlay text inside the tile
    ctx.fillStyle = '#000000';
    ctx.font = '11px sans-serif';
    ctx.textAlign = 'center';
    
    // Show coordinates and current bonus yield
    ctx.fillText(`${hex.q},${hex.r}`, hex.x, hex.y - 5);
    if (hex.scienceBonus > 0) {
      ctx.fillText(`+${hex.scienceBonus} Sci`, hex.x, hex.y + 10);
    }
  });
}

// 6. THE INTERACTION: Turn clicks into map placements
canvas.addEventListener('click', (event) => {
  const rect = canvas.getBoundingClientRect();
  const clickX = event.clientX - rect.left;
  const clickY = event.clientY - rect.top;

  // Honeycomb automatically maps a 2D pixel point directly to the correct Hex coordinate
  const clickedHex = grid.pointToHex({ x: clickX, y: clickY });

  if (clickedHex) {
    // Cycle through terrains on click for testing: Grassland -> Mountain -> Campus
    if (clickedHex.terrain === 'Grassland') clickedHex.terrain = 'Mountain';
    else if (clickedHex.terrain === 'Mountain') clickedHex.terrain = 'Campus';
    else clickedHex.terrain = 'Grassland';

    // Update data state and redraw!
    calculateAdjacencies();
    drawMap();
  }
});

// Run initial drawing sequence on load
calculateAdjacencies();
drawMap();
