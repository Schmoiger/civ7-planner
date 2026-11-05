# Civ 7 City Planner


1. Project Goal & Core Value

The purpose of this project is to build a lightweight, browser-based, zero-install interactive hex mapping application. It allows players to design Civilization VII map scenarios, place starting tiles, track base attributes, and automatically calculate real-time adjacency yield bonuses to optimize empire-building strategies.

2. Functional Requirements


Module A: The Canvas Workspace (Frontend UI)

• Blank Workspace Initialization: On application load, render an adjustable flat-bordered grid of pointy-top hexagons, defaulting to a "Tiny" map size of a centre tile surrounded by a ring of single tiles. The centre tile should be a Capital.
• Tool/Brush Selector Sidebar: An intuitive menu panel allows the user to select an active "brush" or "placement mode."
• Interactive Editing: Clicking on any grid tile applies the currently selected active brush element to that specific tile.
• Dynamic Visual Rendering: Redraw the canvas immediately on tile updates to show terrain-specific colour-coding, coordinate indices, and dynamic text overlays representing localized resource yields.

Module B: Data Structure & Map State (Core Logic)

• Hex Coordinate System: Map geometry must strictly utilize axial/cube coordinates (q, r) managed by Honeycomb to allow unambiguous math operations and neighbor queries.
• Tile Data Attributes: Every hexagon item in the global map array must cleanly maintain independent state data keys:
	• terrain (e.g., Grassland, Plains, Mountain, Ocean, Desert)
	• improvement or district (e.g., Farm, Mine, Campus, Commercial Hub)
	• isStartingTile (Boolean flag)
	• baseYields (Numeric object mapping Food, Production, Science, Culture, Gold)
	• bonusYields (Numeric object tracking dynamically generated updates)

Module C: Adjacency Calculation Engine

• Dynamic Recalculation Loop: Every single map edit must immediately trigger a global calculation sweep that clears historical dynamic bonuses and re-aggregates new ones from scratch.
• Rule Set Implementation: Implement a modular, single-directional pattern evaluating tile neighborhoods:
	• Example 1: Districts (e.g., Campus) query immediate surrounding neighbor hex rings. If neighbor terrain === 'Mountain', increment the user's bonusYields.science counter.
	• Example 2: Overlapping tile groups (e.g., adjacent Farms) look up neighbor attributes and increment bonusYields.food to reward grouping.

3. Non-Functional & Technical Requirements

• Technology Stack Constraints: Pure client-side TypeScript/JavaScript app. Uses Honeycomb for geometric coordinate tracking and native HTML5 Canvas API for screen drawing.
• Zero Server Dependency: All math transformations, state updates, and rendering pipelines must complete directly within the user's local browser context to maintain instant responsiveness without server API calls.
• Performance Benchmarks: Map paint operations and adjacency logic sweeps must execute within standard frame refresh bounds, avoiding noticeable micro-stutter when clicking.

4. Direct Feature Comparisons & Phased Implementation

To keep development manageable, prioritize features by breaking them down into logical versions using a direct scope matrix:

Feature Dimension	Phase 1 (MVP - Current Scope)	Phase 2 (Intermediate)	Phase 3 (Advanced Game Parity)
Grid Boundary	Fixed flat rectangular canvas	Scrollable & draggable viewports	Toroidal world wrapping (horizontal edge looping)
Visual Elements	Solid flat colour fills with text strings	Vector icons or basic emoji stamps	Rich sprite textures & visual resource art assets
Calculation Depth	1-tier adjacency checks (e.g., Campus next to Mountain)	Multi-tile complex chaining (e.g., District Triangles)	Multi-tier progression scales (e.g., Age/Era tech evolution)
Data Persistence	App-state memory reset on reload	Local Browser Storage autosaves	JSON string state export & save-file file downloading


5. Immediate Next Technical Steps

1. Build UI HTML Interface Structure: Set up a clean layout dividing your webpage into a sidebar control panel on the left (with layout selection buttons) and the main interactive map canvas element on the right.
2. Abstract Brush Tool Selection States: Create a global variable tracking the currently chosen configuration state (e.g., let activeBrush = 'Mountain').
3. Refactor Interactive Mouse Click Coordinates Handler: Update the existing canvas mouse event loop so it references activeBrush values directly rather than forcing hardcoded terrain cycle loops.
Would you like help generating the basic HTML and CSS layouts for the Sidebar and Canvas container panels so you can connect them directly to your brush picker logic?
