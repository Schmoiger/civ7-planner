# Civ 7 City Planner


1. Project Goal & Core Value

The purpose of this project is to build a lightweight, browser-based, zero-install interactive hex mapping application. It allows players to design Civilization VII map scenarios, place starting tiles, track base attributes, and automatically calculate real-time adjacency yield bonuses to optimize empire-building strategies.

2. Functional Requirements


Module A: The Canvas Workspace (Frontend UI)

• Blank Workspace Initialization: On application load, render an adjustable flat-bordered grid of pointy-top hexagons, defaulting to a "Tiny" map size of a centre tile surrounded by a ring of single tiles. The centre tile should be a Capital.
• Tool/Brush Selector Sidebar: An intuitive menu panel allows the user to select an active "brush" or "placement mode."
• Interactive Editing: Clicking on any grid tile applies the currently selected active brush element to that specific tile.
• Dynamic Visual Rendering: Redraw the canvas immediately on tile updates to show terrain-specific colour-coding, coordinate indices, and dynamic text overlays representing localized resource yields.
• There should be an ability to save/load maps.

Module B: Data Structure & Map State (Core Logic)

• Hex Coordinate System: Map geometry must strictly utilize axial/cube coordinates (q, r) managed by Honeycomb to allow unambiguous math operations and neighbor queries.
• Tile Data Attributes: Every hexagon item in the global map array must cleanly maintain independent state data keys:
	• terrain (e.g., Grassland, Plains, Mountain, Ocean, Desert)
	• improvement or district (e.g., Farm, Mine, Campus, Commercial Hub)
	• isStartingTile (Boolean flag)
	• baseYields (Numeric object mapping Food, Production, Science, Culture, Gold)
	• bonusYields (Numeric object tracking dynamically generated updates)

Module C: Adjacency Calculation Engine

• Game mechanics are detailed in `artefacts/product/tiles.md`
• Dynamic Recalculation Loop: Every single map edit must immediately trigger a global calculation sweep that clears historical dynamic bonuses and re-aggregates new ones from scratch.
• Rule Set Implementation: Implement a modular, single-directional pattern evaluating tile neighborhoods:
	• Example 1: Districts (e.g., Campus) query immediate surrounding neighbor hex rings. If neighbor terrain === 'Mountain', increment the user's bonusYields.science counter.
	• Example 2: Overlapping tile groups (e.g., adjacent Farms) look up neighbor attributes and increment bonusYields.food to reward grouping.

3. Non-Functional & Technical Requirements

• Technology Stack Constraints: Pure client-side TypeScript/JavaScript app. Uses Honeycomb for geometric coordinate tracking and native HTML5 Canvas API for screen drawing.
• Zero Server Dependency: All math transformations, state updates, and rendering pipelines must complete directly within the user's local browser context to maintain instant responsiveness without server API calls.
• Performance Benchmarks: Map paint operations and adjacency logic sweeps must execute within standard frame refresh bounds, avoiding noticeable micro-stutter when clicking.
