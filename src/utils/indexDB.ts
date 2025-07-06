import { DataProps } from "@/types";
import { openDB } from "idb";

// Check if IndexedDB is available (browser environment) (Client Side)
const isBrowser = typeof window !== "undefined" && typeof indexedDB !== "undefined";
const CACHE_EXPIRATION_TIME = 86400000;

const dbPromise = isBrowser
    ? openDB("DataCacheDB", 1, {
          upgrade(db) {
              if (!db.objectStoreNames.contains("datasets")) {
                  db.createObjectStore("datasets", { keyPath: "key" });
              }
          },
      })
    : null;

export async function getCachedData(key: string): Promise<DataProps[] | null> {
    if (!dbPromise) return null;
    const db = await dbPromise;
    const cached = await db.get("datasets", key);

    if (cached) {
        const now = Date.now();
        if (now - cached.timestamp < CACHE_EXPIRATION_TIME) {
            return cached.data;
        }
    }

    return null;
}

export async function cacheData(key: string, data: DataProps[]) {
    if (!dbPromise) return; // Do nothing if not in the browser
    const db = await dbPromise;

    // Store data with a timestamp
    await db.put("datasets", { key, data, timestamp: Date.now() });
}
