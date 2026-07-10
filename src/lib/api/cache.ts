const cache = new Map<string, unknown>();

export function getCached<T>(key: string): T | null {
  return (cache.get(key) as T) || null;
}

export function setCached<T>(key: string, value: T): void {
  cache.set(key, value);
}

export function clearCache(): void {
  cache.clear();
}
