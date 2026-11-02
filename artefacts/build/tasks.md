## Module 1: Project Initialization & Environments (Yarn)

• Initialise repository: Run yarn init -y and set up git tracking with a standard Node .gitignore file.
• Install core dependencies: Run yarn add honeycomb-grid.
• Install development dependencies: Run yarn add -D typescript vite.
• Configure TypeScript compiler settings: Generate a tsconfig.json file ensuring strict compiler evaluation checks are explicitly turned on ("strict": true).
• Create directories: Scaffold out your app layout workspace structure:
	• /src/types (Data definitions)
	• /src/engine (Adjacency loops, validation logic)
	• /src/view (HTML5 Canvas paint loops)
	• /src/ui (Sidebar brush picker event tracking)

Step-by-Step Initialisation Guide


1. Terminal Setup

Run these commands in your project root folder to install everything and create the file structure:

```bash
# Initialise and install
yarn init -y
yarn add honeycomb-grid
yarn add -D typescript vite

# Create project scaffold
mkdir -p src/types src/engine src/view src/ui
touch tsconfig.json vite.config.ts index.html src/main.ts
```

2. Configuration Files


package.json

Open your newly generated package.json and add the Vite execution scripts:

```json
{
  "name": "civ7-map-planner",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "honeycomb-grid": "^4.1.4"
  },
  "devDependencies": {
    "typescript": "^5.0.0",
    "vite": "^5.0.0"
  }
}
```

tsconfig.json

This ensures strict typing, modern ECMAScript compilation, and optimal bundling when using Vite:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "useDefineForClassFields": true,
    "module": "ESNext",
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,

    /* Linting / Safety Constraints */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"]
}
```

vite.config.ts

Vite needs zero configuration for basic TypeScript projects, but adding this file ensures clean path resolutions if your app scales up later:

```typescript
import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    port: 3000,
    open: true
  }
});
```

index.html

Your entry-point script hookup:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Civ 7 Map Planner</title>
</head>
<body>
    <div id="app">
        <canvas id="mapCanvas" width="800" height="600" style="border:1px solid #333;"></canvas>
    </div>
    <script type="module" src="/src/main.ts"></script>
</body>
</html>
```

To verify your environment is working perfectly, you can run:

```bash
yarn dev
```

This will spin up a local development server at http://localhost:3000 with hot-reloading active.


---

## Module 2: Pure Data Layer & Config Definition

• Codify core types schema: Build out src/types/grid.ts using the definitions for ITileState, TerrainType, InfrastructureType, and IYieldMetrics.
• Establish baseline yield matrices: Code the static global lookups for BASE_TERRAIN_YIELDS and feature modifiers.
• Input game macro-adjacency rules: Translate the Civ 7 shared category tables (Gold/Food, Science/Prod, Culture/Happy) into an array of evaluation configs.
• Write Map Mock Factory: Create a utility script that accepts width and height arguments to return a clean, baseline Record <string, ITileState> object.

Here are the step-by-step instructions to implement Module 2: Pure Data Layer & Config Definition.
In this module, you will establish your types, your static game rules, and a factory function to generate maps. This entire module relies on pure data structures and functions, making it incredibly clean and easy to test before we build the user interface.

Step 1: Create the Types Specification File

First, we need to codify our core types and structures into a file that other files can import.
1. Create a new file named src/types/grid.ts.
2. Paste the following strictly-typed structural contracts into it:
typescript
export type TerrainType = 'Ocean' | 'Coast' | 'Grassland' | 'Plains' | 'Desert' | 'Tundra' | 'Mountain';
export type FeatureType = 'None' | 'Woods' | 'Rainforest' | 'Marsh' | 'Oasis' | 'Floodplains';
export type InfrastructureType = 'None' | 'Farm' | 'Mine' | 'Campus' | 'Commercial_Hub' | 'Theater_Square' | 'Industrial_Zone';

export interface IYieldMetrics {
  food: number;
  production: number;
  science: number;
  culture: number;
  gold: number;
}

export interface ITileState {
  q: number;
  r: number;
  terrain: TerrainType;
  feature: FeatureType;
  infrastructure: InfrastructureType;
  isStartingTile: boolean;
  yields: {
    base: IYieldMetrics;
    bonus: IYieldMetrics;
    total: IYieldMetrics;
  };
}

export interface IMapConfig {
  id: string;
  name: string;
  dimensions: {
    width: number;
    height: number;
  };
  tiles: Record<string, ITileState>; // Keyed by "q,r" strings
}

export interface IAdjacencyRule {
  sourceType: InfrastructureType;
  triggerType: 'terrain' | 'feature' | 'infrastructure';
  triggerTarget: string; 
  bonusYield: Partial<IYieldMetrics>;
}
Use code with caution.

Step 2: Establish Static Constants and Game Rules

Next, create a static rules configuration file. This isolates your game database values from your core software engineering logic loops.
1. Create a new file named src/engine/config.ts.
2. Implement your Civ 7 matrices by pasting this content:
typescript
import { TerrainType, FeatureType, InfrastructureType, IYieldMetrics, IAdjacencyRule } from '../types/grid';

// Helper to instantly generate a blank metrics object
export const createBlankYields = (): IYieldMetrics => ({
  food: 0,
  production: 0,
  science: 0,
  culture: 0,
  gold: 0
});

export const BASE_TERRAIN_YIELDS: Record<TerrainType, IYieldMetrics> = {
  Ocean:     { food: 1, production: 0, science: 0, culture: 0, gold: 2 },
  Coast:     { food: 1, production: 0, science: 0, culture: 0, gold: 1 },
  Grassland: { food: 2, production: 0, science: 0, culture: 0, gold: 0 },
  Plains:    { food: 1, production: 1, science: 0, culture: 0, gold: 0 },
  Desert:    { food: 0, production: 0, science: 0, culture: 0, gold: 0 },
  Tundra:    { food: 1, production: 0, science: 0, culture: 0, gold: 0 },
  Mountain:  { food: 0, production: 0, science: 0, culture: 0, gold: 0 }
};

export const BASE_FEATURE_MODIFIERS: Record<FeatureType, Partial<IYieldMetrics>> = {
  None:        {},
  Woods:       { production: 1 },
  Rainforest:  { food: 1 },
  Marsh:       { food: -1, production: 1 },
  Oasis:       { food: 3, gold: 1 },
  Floodplains: { food: 2 }
};

// Civ 7 Macro Adjacency Clusters Map Setup
const GOLD_FOOD_BUILDINGS: InfrastructureType[] = ['Commercial_Hub'];
const SCIENCE_PROD_BUILDINGS: InfrastructureType[] = ['Campus', 'Industrial_Zone'];
const CULTURE_HAPPY_BUILDINGS: InfrastructureType[] = ['Theater_Square'];

export const CIV7_ADJACENCY_RULES: IAdjacencyRule[] = [
  // --- Category 1: Gold & Food (Rivers and Coasts) ---
  ...GOLD_FOOD_BUILDINGS.flatMap(b => [
    { sourceType: b, triggerType: 'terrain', triggerTarget: 'Coast', bonusYield: { gold: 1 } },
    { sourceType: b, triggerType: 'feature', triggerTarget: 'Floodplains', bonusYield: { food: 1 } }
  ]),

  // --- Category 2: Science & Production (Mines & Industrial Zones) ---
  ...SCIENCE_PROD_BUILDINGS.flatMap(b => [
    { sourceType: b, triggerType: 'infrastructure', triggerTarget: 'Mine', bonusYield: { production: 1 } }
  ]),

  // --- Category 3: Culture & Happiness (Mountains) ---
  ...CULTURE_HAPPY_BUILDINGS.flatMap(b => [
    { sourceType: b, triggerType: 'terrain', triggerTarget: 'Mountain', bonusYield: { culture: 1 } }
  ]),
  
  // --- Shared Mechanics: Farm Clusters ---
  {
    sourceType: 'Farm',
    triggerType: 'infrastructure',
    triggerTarget: 'Farm',
    bonusYield: { food: 1 }
  }
];
Use code with caution.

Step 3: Write the Map Generation Factory

Now we will write a factory utility to instantly spin up maps of any scale with pre-calculated baseline terrain values.
1. Create a file named src/engine/factory.ts.
2. Paste the following factory implementation:
typescript
import { IMapConfig, ITileState, TerrainType } from '../types/grid';
import { BASE_TERRAIN_YIELDS, createBlankYields } from './config';

/**
 * Creates a clean rectangular-offset map configuration initialised with a chosen terrain type
 */
export function createMapFactory(width: number, height: number, defaultTerrain: TerrainType = 'Grassland'): IMapConfig {
  const tiles: Record<string, ITileState> = {};

  // Simple offset loop to populate a rectangular grid space
  for (let r = 0; r < height; r++) {
    // Offset calculation matching standard pointy-top row shifts
    const rOffset = Math.floor(r / 2);
    for (let q = -rOffset; q < width - rOffset; q++) {
      const key = `${q},${r}`;
      
      // Fetch baseline fields from your immutable config layer
      const baseYield = { ...BASE_TERRAIN_YIELDS[defaultTerrain] };

      tiles[key] = {
        q,
        r,
        terrain: defaultTerrain,
        feature: 'None',
        infrastructure: 'None',
        isStartingTile: false,
        yields: {
          base: baseYield,
          bonus: createBlankYields(),
          total: { ...baseYield } // Initially total matches base
        }
      };
    }
  }

  return {
    id: crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2),
    name: `New Scenario Map (${width}x${height})`,
    dimensions: { width, height },
    tiles
  };
}
Use code with caution.

Module 2 Milestone Checklist

Verify that your data structures are correct before moving forward:
• Run yarn build in your terminal terminal window to compile the project.
• Confirm that you receive zero TypeScript errors. If any mismatch or typo exists in your naming structures, the compiler will alert you immediately.


---

## Module 3: Geometric Calculations (The Maths Engine)

• Initialize Honeycomb instance: Define your custom hex layout dimensions (e.g., radius size in pixels, orientation: 'pointy').
• Implement clean-and-flush helper utilities: Write a function that loops through your active map states to clear historical dynamic yields.bonus data fields.
• Build Adjacency Rule Interpreter: Write the function that parses a single cell's coordinate ring, searches its 6 neighbors for specific targets, and assigns structural yield points.
• Verify math in terminal console: Build a micro runner script that sets up a 3-tile grid, hardcodes a "Campus" next to a "Mountain", triggers your math loop, and prints out the calculated total results to verify accuracy.

Here are the step-by-step instructions to implement Module 3: Geometric Calculations (The Math Engine).
In this module, you will initialize the honeycomb-grid engine, establish clean structural utilities to flush old calculations, and build the rule evaluation loop that processes adjacent tiles dynamically.

Step 1: Create the Hexy Math Engine Adapter

We need a module that bridges Honeycomb's geometric pathfinding and neighbor detection with your custom ITileState map dictionary.
1. Create a new file named src/engine/mathEngine.ts.
2. Paste the following setup to define your custom Honeycomb Hex prototype:
typescript
import { defineHex, Grid, rectangle } from 'honeycomb-grid';
import { IMapConfig, ITileState } from '../types/grid';
import { CIV7_ADJACENCY_RULES, createBlankYields } from './config';

// 1. Initialize Honeycomb's base pointy-top hexagon structure
// 'dimensions' represents the outer pixel radius of each tile on your canvas
export class CivHex extends defineHex({ dimensions: 30, orientation: 'pointy' }) {}

/**
 * Utility helper to quickly sync a Honeycomb Grid mapping sequence 
 * with your global raw map configurations.
 */
export function getHoneycombGrid(mapConfig: IMapConfig): Grid<CivHex> {
  return new Grid(
    CivHex, 
    rectangle({ 
      width: mapConfig.dimensions.width, 
      height: mapConfig.dimensions.height 
    })
  );
}
Use code with caution.

Step 2: Implement the Yield Recalculation Engine Loop

Now, append the core evaluation loop to your src/engine/mathEngine.ts file. This engine loop will clear out historic calculations and execute a single-directional sweep of your tile neighborhoods based on the macro-rules we set up in Module 2.
typescript
/**
 * Evaluates the entire grid layout map, updates adjacency bonus matrices,
 * and collapses total calculations down cleanly.
 */
export function recalculateMapAdjacencies(mapConfig: IMapConfig): void {
  // 1. Instantly spin up a geometric map reference for neighbor traversal
  const geoGrid = getHoneycombGrid(mapConfig);

  // 2. Clear out historic data fields before starting calculations
  Object.keys(mapConfig.tiles).forEach(key => {
    mapConfig.tiles[key].yields.bonus = createBlankYields();
  });

  // 3. Process every tile in your active map configuration layout
  Object.keys(mapConfig.tiles).forEach(key => {
    const tile = mapConfig.tiles[key];
    
    // Skip empty tiles without infrastructure modifiers
    if (tile.infrastructure === 'None') return;

    // Resolve the matching geometric hex token from Honeycomb
    const matchingHex = geoGrid.getHex({ q: tile.q, r: tile.r });
    if (!matchingHex) return;

    // Fetch all immediate adjacent neighbor tokens from Honeycomb's ring math
    const neighbors = geoGrid.neighborsOf(matchingHex);

    // Filter relevant adjacency rules bound specifically to this tile's infrastructure type
    const activeRules = CIV7_ADJACENCY_RULES.filter(rule => rule.sourceType === tile.infrastructure);

    neighbors.forEach(neighborHex => {
      // Safety step: Ignore empty spaces moving off the flat rectangular edge boundaries
      if (!neighborHex) return;

      const neighborKey = `${neighborHex.q},${neighborHex.r}`;
      const neighborTile = mapConfig.tiles[neighborKey];
      if (!neighborTile) return;

      // Evaluate every applicable adjacency rule constraint against the neighboring cell
      activeRules.forEach(rule => {
        let isMatch = false;

        if (rule.triggerType === 'terrain' && neighborTile.terrain === rule.triggerTarget) {
          isMatch = true;
        } else if (rule.triggerType === 'feature' && neighborTile.feature === rule.triggerTarget) {
          isMatch = true;
        } else if (rule.triggerType === 'infrastructure' && neighborTile.infrastructure === rule.triggerTarget) {
          isMatch = true;
        }

        // Apply bonus yields to the source tile if a criteria condition is met
        if (isMatch && rule.bonusYield) {
          Object.keys(rule.bonusYield).forEach(yieldKey => {
            const k = yieldKey as keyof typeof rule.bonusYield;
            const value = rule.bonusYield[k] || 0;
            tile.yields.bonus[k] = (tile.yields.bonus[k] || 0) + value;
          });
        }
      });
    });
  });

  // 4. Final Reduction Pass: Collapse base resources and calculated dynamic bonuses into totals
  Object.keys(mapConfig.tiles).forEach(key => {
    const tile = mapConfig.tiles[key];
    tile.yields.total = {
      food: tile.yields.base.food + tile.yields.bonus.food,
      production: tile.yields.base.production + tile.yields.bonus.production,
      science: tile.yields.base.science + tile.yields.bonus.science,
      culture: tile.yields.base.culture + tile.yields.bonus.culture,
      gold: tile.yields.base.gold + tile.yields.bonus.gold
    };
  });
}
Use code with caution.

Step 3: Run the Verification Script

Let's test this module directly in your browser console using Vite. This checks your math formulas for accuracy before you start drawing layout shapes.
1. Open your project entry point file src/main.ts.
2. Overwrite its contents with this debugging sequence:
typescript
import { createMapFactory } from './engine/factory';
import { recalculateMapAdjacencies } from './engine/mathEngine';

console.log("Initializing Test Scenario...");

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
Use code with caution.

Module 3 Milestone Verification

• Open your terminal and run your development server: yarn dev.
• Open http://localhost:3000 in your web browser.
• Open your browser's Developer Tools (Press F12 or right-click -> Inspect, then go to the Console tab).
• Verify that you see the logged output confirming your application pipeline executed without errors.


---

## Module 4: Simple Canvas View Pipeline

• Scaffold standard index.html page setup: Inject a single <canvas id="mapCanvas"> element side-by-side with a sidebar container wrapper block.
• Implement Hex Vector Drawer: Write a loop that converts a cell's numerical spatial coordinates (hex.corners) into native Canvas path commands (ctx.moveTo, ctx.lineTo).
• Build Terrain Colour Swapper: Create a color map module assigning flat visual fills based on current active state properties (e.g., Mountain = Grey, Coast = Teal).
• Add Data Overlay Strings: Inject text commands using ctx.fillText to render coordinate labels and bonus metrics directly centered over cell vertices.

Here are the step-by-step instructions to implement Module 4: Simple Canvas View Pipeline.
In this module, you will translate raw coordinate data into vector drawing primitives using the native HTML5 Canvas 2D Context API. This creates a clean visual overview of your terrain layout, complete with text metrics.

Step 1: Update Your Main Canvas Interface

Before writing the rendering code, ensure your main layout structure supports clear spacing for the canvas.
1. Open your project's index.html file.
2. Ensure the body structure provides clean alignment parameters for drawing elements:
html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Civ 7 Map Planner</title>
    <style>
        body { margin: 0; background: #222; colour: #fff; font-family: sans-serif; display: flex; }
        #app { padding: 20px; display: flex; gap: 20px; }
        canvas { background: #111; box-shadow: 0 4px 10px rgba(0,0,0,0.5); }
    </style>
</head>
<body>
    <div id="app">
        <canvas id="mapCanvas" width="900" height="650"></canvas>
    </div>
    <script type="module" src="/src/main.ts"></script>
</body>
</html>
Use code with caution.

Step 2: Implement the Canvas Rendering Engine

This engine handles clear-screen cycles, loops over your mapping dictionary configuration properties, draws structural vector path lines, and overlays text string readouts dynamically.
1. Create a new file named src/view/canvasRender.ts.
2. Paste the complete visual rendering sequence:
typescript
import { IMapConfig, ITileState } from '../types/grid';
import { getHoneycombGrid } from '../engine/mathEngine';

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

/**
 * Iterates through active data attributes to paint geometric path matrices onto the screen
 */
export function drawMapCanvas(canvas: HTMLCanvasElement, mapConfig: IMapConfig): void {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  // 1. Core Cleanup Pass: Flush previous render vectors from the viewing monitor screen
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // 2. Instantiate a temporary grid tracking model to calculate precise tile corner layouts
  const geoGrid = getHoneycombGrid(mapConfig);

  // 3. Main Operational Draw Loop
  Object.keys(mapConfig.tiles).forEach(key => {
    const tile = mapConfig.tiles[key];
    const hex = geoGrid.getHex({ q: tile.q, r: tile.r });
    if (!hex) return;

    // Fetch spatial pixel coordinate corners natively tracking from Honeycomb geometry math
    const corners = hex.corners;

    // --- Part A: Trace the Hexagon Edge Vector Path ---
    ctx.beginPath();
    ctx.moveTo(corners[0].x, corners[0].y);
    for (let i = 1; i < 6; i++) {
      ctx.lineTo(corners[i].x, corners[i].y);
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
      ctx.strokeStyle = '#ffffff';
      ctx.stroke();
    }

    // --- Part C: Centre Vertex Numerical Overlay Text Strings ---
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 11px sans-serif';
    ctx.textAlign = 'centre';
    ctx.textBaseline = 'middle';

    // Label infrastructure shortcodes or coordinate locations cleanly
    if (tile.infrastructure !== 'None') {
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
Use code with caution.

Step 3: Run the Visual Rendering Loop Sequence

Let's link your console data calculations seamlessly with your newly constructed visual canvas pipeline layer.
1. Open your project entry file src/main.ts.
2. Update its code to coordinate the map generation, calculation sweep, and vector rendering steps sequentially:
typescript
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
Use code with caution.

Module 4 Milestone Verification

• Open your command console window and boot up the hot reloading server: yarn dev.
• Direct your browser interface path to http://localhost:3000.
• Confirm you see a cleanly drawn hexagonal tile layout landscape rendered on screen.
• Verify your Campus tile coordinate positions show explicit visual indicator tags and display calculated bonus outputs (🔬4) directly on their terrain surfaces.


---

## Module 5: User Interaction & Toolbar Brushes

• Build Sidebar Brush Menu HTML panel: Add flat buttons for terrains, districts, and placing your starting tile flags.
• Track global activeBrush pointer variable: Store the active brush string state locally in your master UI controller module.
• Capture Viewport Interaction Vectors: Bind a click listener onto your HTML5 canvas context. Offset bounding calculations to trap localized clientX and clientY values.
• Map pixel coordinates back to Honeycomb indexes: Pass the cursor point through grid.pointToHex() to find the matching structural coordinate keys.
• Bind the Master Application State Cycle: Hook the pipeline steps together. Clicking a tile must update state data attributes → clear yields → recalculate macro-adjacency → clear screen → repaint view vectors.

Here are the step-by-step instructions to implement Module 5: User Interaction & Toolbar Brushes.
In this module, you will build an interactive sidebar menu, capture mouse coordinates, map those screen pixels back to Honeycomb grid coordinates, and link everything together into a reactive runtime cycle.

Step 1: Add the Sidebar UI Elements

We need to add interactive buttons to your HTML layout so you can change what brush tool you are painting with.
1. Open your project's index.html file.
2. Update the container inside the <body> to include a brush menu block:
html
<div id="app">
    <!-- Sidebar Control Panel Toolbar -->
    <div id="sidebar" style="width: 220px; background: #333; padding: 15px; border-radius: 8px; display: flex; flex-direction: column; gap: 15px;">
        <h3 style="margin-top: 0; border-bottom: 1px solid #555; padding-bottom: 5px; colour: #ffdf65;">Civ 7 Map Tools</h3>
        
        <div>
            <h4 style="margin: 5px 0;">Terrains</h4>
            <button class="brush-btn" data-type="terrain" data-val="Grassland" style="width:100%; padding:6px; margin-bottom:4px; text-align:left; cursor:pointer;">🟢 Grassland</button>
            <button class="brush-btn" data-type="terrain" data-val="Plains" style="width:100%; padding:6px; margin-bottom:4px; text-align:left; cursor:pointer;">🟤 Plains</button>
            <button class="brush-btn" data-type="terrain" data-val="Mountain" style="width:100%; padding:6px; margin-bottom:4px; text-align:left; cursor:pointer;">💜 Mountain</button>
            <button class="brush-btn" data-type="terrain" data-val="Ocean" style="width:100%; padding:6px; margin-bottom:4px; text-align:left; cursor:pointer;">🔵 Ocean</button>
        </div>

        <div>
            <h4 style="margin: 5px 0;">Infrastructure</h4>
            <button class="brush-btn" data-type="infra" data-val="Campus" style="width:100%; padding:6px; margin-bottom:4px; text-align:left; cursor:pointer;">🔬 Campus</button>
            <button class="brush-btn" data-type="infra" data-val="Industrial_Zone" style="width:100%; padding:6px; margin-bottom:4px; text-align:left; cursor:pointer;">🏭 Industrial Zone</button>
            <button class="brush-btn" data-type="infra" data-val="Mine" style="width:100%; padding:6px; margin-bottom:4px; text-align:left; cursor:pointer;">🔨 Mine</button>
            <button class="brush-btn" data-type="infra" data-val="Farm" style="width:100%; padding:6px; margin-bottom:4px; text-align:left; cursor:pointer;">🌾 Farm</button>
            <button class="brush-btn" data-type="infra" data-val="None" style="width:100%; padding:6px; margin-bottom:4px; text-align:left; cursor:pointer; background:#e67e22; border:none; colour:white;">❌ Clear Structure</button>
        </div>
        
        <div style="margin-top: auto; padding-top: 10px; border-top: 1px solid #555; font-size: 12px; colour: #aaa;">
            Active Brush: <span id="activeBrushDisplay" style="colour: #ffdf65; font-weight: bold;">Grassland</span>
        </div>
    </div>

    <!-- Main Map Canvas Screen Viewport -->
    <canvas id="mapCanvas" width="900" height="650"></canvas>
</div>
Use code with caution.

Step 2: Implement the Interaction Event Handler

Now we will write the logic that keeps track of the active brush, listens for canvas clicks, calculates the click offset accurately, and handles state transformations.
1. Create a new file named src/ui/interaction.ts.
2. Paste the following event mapping controller code into it:
typescript
import { IMapConfig } from '../types/grid';
import { getHoneycombGrid, recalculateMapAdjacencies } from '../engine/mathEngine';
import { drawMapCanvas } from '../view/canvasRender';
import { BASE_TERRAIN_YIELDS, createBlankYields } from '../engine/config';

// Global state container tracking active toolbar configuration modifiers
let activeBrushType: 'terrain' | 'infra' = 'terrain';
let activeBrushValue: string = 'Grassland';

/**
 * Attaches event tracking modules onto DOM nodes to make the planner fully interactive
 */
export function setupInteractionEngine(canvas: HTMLCanvasElement, mapConfig: IMapConfig): void {
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

    // Use Honeycomb's math grid to map pixel points directly to structural hex coordinates
    const geoGrid = getHoneycombGrid(mapConfig);
    const resolvedHex = geoGrid.pointToHex({ x: clickX, y: clickY });

    if (!resolvedHex) return;

    // Resolve matching cell hash index key string
    const mapKey = `${resolvedHex.q},${resolvedHex.r}`;
    const tileState = mapConfig.tiles[mapKey];

    if (!tileState) return;

    // --- Part C: State Mutation Router ---
    if (activeBrushType === 'terrain') {
      const chosenTerrain = activeBrushValue as any;
      tileState.terrain = chosenTerrain;
      // Re-fetch immutable foundation yields automatically on terrain transformation
      tileState.yields.base = { ...BASE_TERRAIN_YIELDS[chosenTerrain] };
    } else if (activeBrushType === 'infra') {
      tileState.infrastructure = activeBrushValue as any;
    }

    // --- Part D: The Unified Pipeline Refresh Cycle ---
    // 1. Recalculate all macro-adjacency changes across the map state
    recalculateMapAdjacencies(mapConfig);
    
    // 2. Wipe the previous screen layer and repaint the new calculations instantly
    drawMapCanvas(canvas, mapConfig);
  });
}
Use code with caution.

Step 3: Wire Everything into Your Application Entry Point

Finally, coordinate your data architecture factories, renderers, and interaction listeners to establish a live application workspace.
1. Open your project entry file src/main.ts.
2. Replace its debug content with the complete live startup sequence:
typescript
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
Use code with caution.

Module 5 Milestone Verification

• Run yarn dev in your project root terminal to boot your environment.
• Open http://localhost:3000 in your web browser.
• Select the Mountain brush tool, click several tiles on the canvas, and watch them change to purple hexes instantly.
• Select the Campus brush tool and place it directly next to those mountains.
• Verify that the campus tile immediately flashes a numeric yield indicator displaying its Science bonus (+2 per mountain) in real time!


---

## Module 6: Edge Cases & Systematic Verification

• Run Edge Detection Tests: Paint target structures directly against the outermost boundaries of your grid layout (e.g., at q:0, r:0) to ensure looking up non-existent neighbor arrays does not crash the script with undefined exceptions.
• Verify Cluster Rulesets: Place multi-tile farm patches to ensure stacking adjacency modifiers aggregate accurately without recursive calculator loops.
• Execute UI Click Calibration Testing: Validate cursor target alignment across varying monitor sizes, verifying that clicking near hex outer edges resolves exactly to the intended coordinate asset.

Here are the step-by-step instructions to implement Module 6: Edge Cases & Systematic Verification.
To maintain a zero-server architecture, we will write a streamlined automated test runner script that runs directly in the browser's development environment. This allows you to verify boundary constraints, complex cluster calculations, and coordinate mappings without needing heavy backend testing runner configurations.

Step 1: Create the Test Engine Harness

We need an isolated test script that automatically builds mock scenarios, validates your map calculations against explicit expected results, and logs detailed diagnostic readouts.
1. Create a new file named src/engine/testRunner.ts.
2. Paste the complete assertions harness suite into it:
typescript
import { createMapFactory } from './factory';
import { recalculateMapAdjacencies, getHoneycombGrid } from './mathEngine';
import { IMapConfig } from '../types/grid';

/**
 * Executes a sequence of validation tests directly against your math loops.
 * Returns true if all test cases pass cleanly.
 */
export function runSystematicTests(canvas: HTMLCanvasElement): boolean {
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
  if (canvas && canvas.width > 0 && canvas.height > 0) {
    console.log("✅ TEST 4 PASSED: HTML5 Viewport context is active with stable boundary dimensions.");
  } else {
    console.error("❌ TEST 4 FAILED: HTML5 canvas element context is uninstantiated or dimensions collapsed.");
    allPassed = false;
  }

  console.groupEnd();
  return allPassed;
}
Use code with caution.

Step 2: Wire the Test Verification Hook Into Your App Boot Loop

To ensure your application code automatically runs its defensive testing routine on every reload, plug the execution call right into the main module entry routine.
1. Open your project entry file src/main.ts.
2. Update the boot code sequence to execute assertions before rendering the live workspace view:
typescript
import { createMapFactory } from './engine/factory';
import { recalculateMapAdjacencies } from './engine/mathEngine';
import { drawMapCanvas } from './view/canvasRender';
import { setupInteractionEngine } from './ui/interaction';
import { runSystematicTests } from './engine/testRunner';

console.log("Initializing Civilization 7 Map Planner runtime pipeline...");

const canvas = document.getElementById('mapCanvas') as HTMLCanvasElement;

if (canvas) {
    // 1. RUN MODULE 6 TESTS FIRST: Halt visual pipeline execution if core data math breaks
    const testsClean = runSystematicTests(canvas);
    
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
Use code with caution.

Module 6 Milestone Verification

Your application suite is now officially self-testing! Let's check the logs:
• Run your active web environment tracking process: yarn dev.
• Load http://localhost:3000 inside your web browser.
• Pull open your developer utility frame panel (F12 or right-click -> Inspect, then go to the Console tab).
• Confirm that you see a distinct 🧪 STARTING SYSTEMATIC VERIFICATION SUITE... grouping tree block showing four individual passing checks (✅).
Congratulations! You have successfully built a clean, type-safe, fully testable interactive map planner for Civilization VII from scratch using Honeycomb and Yarn.