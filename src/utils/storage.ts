// storage.ts

// Get item from localStorage and parse as JSON
export function getLocalStorage<T>(key: string): T | null {
  try {
    const value = localStorage.getItem(key);
    if (!value) return null;
    return JSON.parse(value) as T;
  } catch (error) {
    console.error(`Error getting key "${key}" from localStorage`, error);
    return null;
  }
}

// Set item in localStorage as JSON string
export function setLocalStorage<T>(key: string, value: T): void {
  try {
    const serialized = JSON.stringify(value);
    localStorage.setItem(key, serialized);
  } catch (error) {
    console.error(`Error setting key "${key}" in localStorage`, error);
  }
}

// Optional: Remove item
export function removeLocalStorage(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing key "${key}" from localStorage`, error);
  }
}
