// --- Map Persistence Layer (Module A: Canvas Workspace) ---
// Save / load the City map state to/from browser localStorage so maps
// survive page reloads without any server dependency.

import { IMapConfig } from '../types/grid';

const STORAGE_KEY = 'civ7-map-planner:maps';
const ACTIVE_MAP_KEY = 'civ7-map-planner:activeMapId';

/** Serialized shape of a saved map (JSON-safe copy of IMapConfig). */
export interface ISavedMap {
  id: string;
  name: string;
  savedAt: number;
  config: IMapConfig;
}

/** List every map id currently stored in localStorage. */
export function getSavedMapIds(): string[] {
  if (typeof localStorage === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: ISavedMap[] = JSON.parse(raw);
    return parsed.map(m => m.id);
  } catch {
    return [];
  }
}

/** Persist a map configuration to localStorage. */
export function saveMapConfig(mapConfig: IMapConfig): void {
  if (typeof localStorage === 'undefined') return;

  const saved: ISavedMap = {
    id: mapConfig.id,
    name: mapConfig.name,
    savedAt: Date.now(),
    config: mapConfig,
  };

  let existing: ISavedMap[] = [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) existing = JSON.parse(raw);
  } catch {
    existing = [];
  }

  // Replace entry with same id, otherwise append
  const index = existing.findIndex(m => m.id === saved.id);
  if (index >= 0) existing[index] = saved;
  else existing.push(saved);

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
    localStorage.setItem(ACTIVE_MAP_KEY, saved.id);
    console.log(`💾 Map "${saved.name}" saved to localStorage (id: ${saved.id})`);
  } catch (err) {
    console.error('❌ Failed to persist map to localStorage:', err);
  }
}

/** Load a previously saved map by id. Returns null if not found. */
export function loadMapConfig(mapId?: string): IMapConfig | null {
  if (typeof localStorage === 'undefined') return null;

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed: ISavedMap[] = JSON.parse(raw);

    let target: ISavedMap | undefined;
    if (mapId) {
      target = parsed.find(m => m.id === mapId);
    } else {
      const activeId = localStorage.getItem(ACTIVE_MAP_KEY);
      target = activeId ? parsed.find(m => m.id === activeId) : parsed[0];
    }

    if (!target) return null;

    console.log(`📂 Map "${target.name}" loaded from localStorage (id: ${target.id})`);
    return { ...target.config };
  } catch (err) {
    console.error('❌ Failed to load map from localStorage:', err);
    return null;
  }
}

/** Delete a saved map by id. Returns true if removed. */
export function deleteMapConfig(mapId: string): boolean {
  if (typeof localStorage === 'undefined') return false;

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return false;
    const parsed: ISavedMap[] = JSON.parse(raw);

    const filtered = parsed.filter(m => m.id !== mapId);
    if (filtered.length === parsed.length) return false;

    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));

    const activeId = localStorage.getItem(ACTIVE_MAP_KEY);
    if (activeId === mapId) {
      localStorage.removeItem(ACTIVE_MAP_KEY);
    }

    console.log(`🗑️ Map ${mapId} deleted from localStorage`);
    return true;
  } catch (err) {
    console.error('❌ Failed to delete map from localStorage:', err);
    return false;
  }
}