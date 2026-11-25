/**
 * Safe Local Storage Utility
 * Wraps localStorage access in try/catch blocks to gracefully handle
 * private browsing mode, disabled storage, quota exceeded, or corrupted JSON.
 */

export const STORAGE_KEYS = {
  PROFILES: 'sewora_profiles_v1',
  ACTIVE_PROFILE_ID: 'sewora_active_profile_id_v1',
  PROJECTS: 'sewora_projects_v1',
  THEME: 'sewora_theme_v1',
  UNIT: 'sewora_unit_v1',
  FIT_PREFERENCE: 'sewora_fit_v1',
  ACTIVE_GARMENT_ID: 'sewora_active_garment_v1'
};

export const safeStorage = {
  get: (key, defaultValue = null) => {
    try {
      if (typeof window === 'undefined' || !window.localStorage) {
        return defaultValue;
      }
      const item = window.localStorage.getItem(key);
      if (item === null) return defaultValue;
      return JSON.parse(item);
    } catch (error) {
      console.warn(`[safeStorage] Failed to read key "${key}":`, error);
      return defaultValue;
    }
  },

  set: (key, value) => {
    try {
      if (typeof window === 'undefined' || !window.localStorage) {
        return false;
      }
      window.localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.warn(`[safeStorage] Failed to write key "${key}":`, error);
      return false;
    }
  },

  remove: (key) => {
    try {
      if (typeof window === 'undefined' || !window.localStorage) {
        return false;
      }
      window.localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.warn(`[safeStorage] Failed to remove key "${key}":`, error);
      return false;
    }
  }
};
