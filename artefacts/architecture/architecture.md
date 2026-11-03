# Technical Requirements

Project: Civ 7 City Planner
Architecture: Single-Page Application (SPA) / Client-Side Only
Language: TypeScript

1. Functional Requirements (FR)


FR-1: Grid Architecture & Geometry

• FR-1.1: The system must maintain a discrete hexagonal grid system utilizing an orientation matching Civilization VII baseline standards.
• FR-1.2: Grid tracking and geometric vectors must use an axial (q, r) or cube (q, r, s) coordinate space to ensure clear neighbor mapping.
• FR-1.3: The initial canvas dimension must default to a fixed rectangular configuration before expansion.

FR-2: State Architecture & Data Schemas

• FR-2.1: Every singular hex cell object in memory must independently carry an explicit data schema containing properties for state validation.
• FR-2.2: The data payload model is in `artefacts/architecture/data-model.md`

FR-3: User Interface & Canvas Interactivity

• FR-3.1: The UI must expose a static Sidebar Tool Picker containing discrete selection brushes for Terrain, Features, Infrastructure, and Meta-states (Starting Tiles).
• FR-3.2: The rendering engine must trap raw cursor pixel coordinates (x, y) on click events over the viewport element.
• FR-3.3: The input system must automatically map screen coordinates to structural grid keys using a bounding box detection matrix.
• FR-3.4: When an active grid key is resolved, the application must write the selected sidebar attribute state into that specific cell index.

FR-4: Adjacency Calculation Engine

• FR-4.1: Any mutation to a tile state must immediately run an evaluation pass across the entire active grid block.
• FR-4.2: The calculation engine must completely flush existing dynamically derived yields before applying rulesets.
• FR-4.3: The calculation engine must query localized neighbor index rings to evaluate specific adjacency criteria:
	• Rule A (Districts): If infrastructure === 'Campus', query immediate surrounding ring cells. For every neighbor where terrain === 'Mountain', increment yields.bonus.science by +2.
	• Rule B (Clusters): If infrastructure === 'Farm', parse neighbor array items. For every adjacent hex where infrastructure === 'Farm', increment yields.bonus.food by +1.
• FR-4.4: The system must run a final reduction step summing yields.base and yields.bonus into yields.total for canvas updates.

2. Non-Functional Requirements (NFR)


NFR-1: Performance & Operational Targets

• NFR-1.1 (Refresh Rate): The canvas clearing and vector draw operations must complete in under 16.67 milliseconds (targeting a native 60 FPS update rate).
• NFR-1.2 (Pipeline Lag): The combined calculation logic sweep and canvas update pipeline must execute in under 50 milliseconds after an edit action, ensuring zero visible interface stutter.
• NFR-1.3 (Memory Load): The total in-memory representation for standard map scales (up to ~7,000 active hex elements) must remain under 50 megabytes of RAM overhead.

NFR-2: Technical Stack & Environment Limits

• NFR-2.1 (Zero Server Overhead): The application must run entirely within the client runtime environment. No remote API dependencies, databases, or active servers are allowed.
• NFR-2.2 (Geometric Dependency): The math engine must rely on Honeycomb to handle coordinate lookups, cursor conversions, and neighbor indexes.
• NFR-2.3 (Rendering Dependency): The visual output pipeline must rely on the native HTML5 Canvas 2D Context API, avoiding complex heavy third-party graphics engines.
• NFR-2.4 (Strict Compilation): The complete code structure must compile under strict TypeScript configurations ("strict": true in tsconfig.json).

NFR-3: Portability & Maintainability

• NFR-3.1 (Compatibility): The application interface and drawing layers must operate natively across modern standard web runtimes supporting ECMAScript 2022+ features.
• NFR-3.2 (Decoupled Engine Logic): The adjacency engine must remain isolated from visual canvas drawing code. Math state shifts must accept and return raw plain object data parameters, making it easy to swap out the frontend view layer later.