Module 1: Project Initialization & Environments (Yarn)

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
Now that your environment setup is ready, would you like me to write the complete implementation for Module 2 (the types.ts data model file combined with your factory functions) so you can begin storing tile data?
