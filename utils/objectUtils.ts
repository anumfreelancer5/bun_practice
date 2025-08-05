/**
 * Object utility functions
 */

/**
 * Deep clones an object
 */
export function deepClone<T>(obj: T): T {
  if (obj === null || typeof obj !== 'object') return obj;
  if (obj instanceof Date) return new Date(obj.getTime()) as T;
  if (obj instanceof Array) return obj.map(item => deepClone(item)) as T;
  if (obj instanceof Set) return new Set([...obj].map(item => deepClone(item))) as T;
  if (obj instanceof Map) {
    const cloned = new Map();
    obj.forEach((value, key) => cloned.set(deepClone(key), deepClone(value)));
    return cloned as T;
  }
  if (typeof obj === 'object') {
    const cloned = {} as T;
    Object.keys(obj).forEach(key => {
      (cloned as any)[key] = deepClone((obj as any)[key]);
    });
    return cloned;
  }
  return obj;
}

/**
 * Checks if two objects are deeply equal
 */
export function deepEqual(a: any, b: any): boolean {
  if (a === b) return true;
  if (a === null || b === null) return false;
  if (typeof a !== typeof b) return false;

  if (typeof a !== 'object') return false;

  if (a instanceof Date && b instanceof Date) {
    return a.getTime() === b.getTime();
  }

  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false;
    return a.every((item, index) => deepEqual(item, b[index]));
  }

  if (Array.isArray(a) || Array.isArray(b)) return false;

  const keysA = Object.keys(a);
  const keysB = Object.keys(b);

  if (keysA.length !== keysB.length) return false;

  return keysA.every(key => keysB.includes(key) && deepEqual(a[key], b[key]));
}

/**
 * Merges multiple objects deeply
 */
export function deepMerge<T extends object>(...objects: Partial<T>[]): T {
  if (objects.length === 0) return {} as T;
  if (objects.length === 1) return objects[0] as T;

  const result = {} as T;

  for (const obj of objects) {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const value = obj[key];
        if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
          (result as any)[key] = deepMerge((result as any)[key] || {}, value);
        } else {
          (result as any)[key] = value;
        }
      }
    }
  }

  return result;
}

/**
 * Gets a value from an object using a dot-notation path
 */
export function get(obj: any, path: string, defaultValue?: any): any {
  const keys = path.split('.');
  let current = obj;

  for (const key of keys) {
    if (current === null || current === undefined || !(key in current)) {
      return defaultValue;
    }
    current = current[key];
  }

  return current;
}

/**
 * Sets a value in an object using a dot-notation path
 */
export function set(obj: any, path: string, value: any): void {
  const keys = path.split('.');
  let current = obj;

  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i]!;
    if (!(key in current) || typeof current[key] !== 'object') {
      current[key] = {};
    }
    current = current[key];
  }

  current[keys[keys.length - 1]!] = value;
}

/**
 * Checks if an object has a property using a dot-notation path
 */
export function has(obj: any, path: string): boolean {
  const keys = path.split('.');
  let current = obj;

  for (const key of keys) {
    if (current === null || current === undefined || !(key in current)) {
      return false;
    }
    current = current[key];
  }

  return true;
}

/**
 * Removes a property from an object using a dot-notation path
 */
export function unset(obj: any, path: string): boolean {
  const keys = path.split('.');
  let current = obj;

  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i]!;
    if (current === null || current === undefined || !(key in current)) {
      return false;
    }
    current = current[key];
  }

  const lastKey = keys[keys.length - 1]!;
  if (lastKey in current) {
    delete current[lastKey];
    return true;
  }

  return false;
}

/**
 * Picks specified properties from an object
 */
export function pick<T extends object, K extends keyof T>(obj: T, ...keys: K[]): Pick<T, K> {
  const result = {} as Pick<T, K>;
  for (const key of keys) {
    if (key in obj) {
      result[key] = obj[key];
    }
  }
  return result;
}

/**
 * Omits specified properties from an object
 */
export function omit<T extends object, K extends keyof T>(obj: T, ...keys: K[]): Omit<T, K> {
  const result = { ...obj };
  for (const key of keys) {
    delete result[key];
  }
  return result;
}

/**
 * Inverts the keys and values of an object
 */
export function invert<T extends Record<string | number, string | number>>(
  obj: T
): Record<string, string> {
  const result: Record<string, string> = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      result[String(obj[key])] = String(key);
    }
  }
  return result;
}

/**
 * Maps over object values, creating a new object
 */
export function mapValues<T, U>(
  obj: Record<string, T>,
  mapper: (value: T, key: string) => U
): Record<string, U> {
  const result: Record<string, U> = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key];
      if (value !== undefined) {
        result[key] = mapper(value, key);
      }
    }
  }
  return result;
}

/**
 * Maps over object keys, creating a new object
 */
export function mapKeys<T>(
  obj: Record<string, T>,
  mapper: (key: string, value: T) => string
): Record<string, T> {
  const result: Record<string, T> = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key];
      if (value !== undefined) {
        const newKey = mapper(key, value);
        result[newKey] = value;
      }
    }
  }
  return result;
}

/**
 * Filters object properties based on a predicate
 */
export function filterObject<T>(
  obj: Record<string, T>,
  predicate: (value: T, key: string) => boolean
): Record<string, T> {
  const result: Record<string, T> = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key];
      if (value !== undefined && predicate(value, key)) {
        result[key] = value;
      }
    }
  }
  return result;
}

/**
 * Gets all paths in an object as dot-notation strings
 */
export function getPaths(obj: any, prefix: string = ''): string[] {
  const paths: string[] = [];

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const currentPath = prefix ? `${prefix}.${key}` : key;
      paths.push(currentPath);

      if (obj[key] !== null && typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
        paths.push(...getPaths(obj[key], currentPath));
      }
    }
  }

  return paths;
}

/**
 * Flattens a nested object into a single level with dot-notation keys
 */
export function flatten(obj: any, prefix: string = ''): Record<string, any> {
  const result: Record<string, any> = {};

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const currentPath = prefix ? `${prefix}.${key}` : key;

      if (obj[key] !== null && typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
        Object.assign(result, flatten(obj[key], currentPath));
      } else {
        result[currentPath] = obj[key];
      }
    }
  }

  return result;
}

/**
 * Unflattens a flat object with dot-notation keys into a nested object
 */
export function unflatten(obj: Record<string, any>): any {
  const result: any = {};

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      set(result, key, obj[key]);
    }
  }

  return result;
}

/**
 * Checks if an object is empty (has no own properties)
 */
export function isEmpty(obj: any): boolean {
  if (obj === null || obj === undefined) return true;
  if (Array.isArray(obj)) return obj.length === 0;
  if (typeof obj === 'object') return Object.keys(obj).length === 0;
  return false;
}

/**
 * Checks if a value is a plain object (created by {} or new Object())
 */
export function isPlainObject(value: any): value is Record<string, any> {
  if (value === null || typeof value !== 'object') return false;
  if (Array.isArray(value)) return false;

  const proto = Object.getPrototypeOf(value);
  return proto === null || proto === Object.prototype;
}

/**
 * Creates an object with only truthy values
 */
export function compact<T>(obj: Record<string, T>): Record<string, NonNullable<T>> {
  const result: Record<string, NonNullable<T>> = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key) && obj[key]) {
      result[key] = obj[key] as NonNullable<T>;
    }
  }
  return result;
}

/**
 * Groups an array of objects by a key
 */
export function groupBy<T, K extends keyof T>(array: T[], key: K): Record<string, T[]> {
  const result: Record<string, T[]> = {};

  for (const item of array) {
    const groupKey = String(item[key]);
    if (!result[groupKey]) {
      result[groupKey] = [];
    }
    result[groupKey]!.push(item);
  }

  return result;
}

/**
 * Creates an object from an array using a key function
 */
export function keyBy<T>(array: T[], keyFn: (item: T) => string | number): Record<string, T> {
  const result: Record<string, T> = {};

  for (const item of array) {
    const key = String(keyFn(item));
    result[key] = item;
  }

  return result;
}

/**
 * Safely converts an object to JSON string with error handling
 */
export function safeStringify(obj: any, space?: number): string | null {
  try {
    return JSON.stringify(obj, null, space);
  } catch {
    return null;
  }
}

/**
 * Safely parses a JSON string with error handling
 */
export function safeParse<T = any>(jsonString: string): T | null {
  try {
    return JSON.parse(jsonString);
  } catch {
    return null;
  }
}
