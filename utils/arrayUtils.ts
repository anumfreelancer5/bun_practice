/**
 * Array utility functions
 */

/**
 * Removes duplicate values from an array
 */
export function unique<T>(array: T[]): T[] {
  return [...new Set(array)];
}

/**
 * Flattens a nested array to any depth
 */
export function flatten<T>(array: any[]): T[] {
  return array.reduce<T[]>((acc, val) => {
    return acc.concat(Array.isArray(val) ? flatten<T>(val) : val);
  }, []);
}

/**
 * Groups array elements by a key function
 */
export function groupBy<T, K extends string | number | symbol>(
  array: T[],
  keyFn: (item: T) => K
): Record<K, T[]> {
  return array.reduce(
    (groups, item) => {
      const key = keyFn(item);
      if (!groups[key]) {
        groups[key] = [];
      }
      groups[key]!.push(item);
      return groups;
    },
    {} as Record<K, T[]>
  );
}

/**
 * Chunks an array into smaller arrays of specified size
 */
export function chunk<T>(array: T[], size: number): T[][] {
  if (size <= 0) throw new Error('Chunk size must be greater than 0');
  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
}

/**
 * Shuffles an array randomly
 */
export function shuffle<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j]!, shuffled[i]!];
  }
  return shuffled;
}

/**
 * Returns a random element from an array
 */
export function sample<T>(array: T[]): T | undefined {
  if (array.length === 0) return undefined;
  return array[Math.floor(Math.random() * array.length)];
}

/**
 * Returns n random elements from an array
 */
export function sampleSize<T>(array: T[], n: number): T[] {
  if (n <= 0) return [];
  if (array.length === 0) return [];
  if (n >= array.length) return shuffle(array);
  const shuffled = shuffle(array);
  return shuffled.slice(0, n);
}

/**
 * Returns a weighted random element from an array based on weights
 */
export function weightedSample<T>(array: T[], weights: number[]): T | undefined {
  if (array.length === 0 || weights.length === 0) return undefined;
  if (array.length !== weights.length) {
    throw new Error('Array and weights must have the same length');
  }
  
  // Check for valid weights
  if (weights.some(w => w < 0)) {
    throw new Error('Weights must be non-negative');
  }
  
  const totalWeight = weights.reduce((sum, weight) => sum + weight, 0);
  if (totalWeight === 0) return undefined;
  
  const random = Math.random() * totalWeight;
  let cumulativeWeight = 0;
  
  for (let i = 0; i < array.length; i++) {
    cumulativeWeight += weights[i]!;
    if (random <= cumulativeWeight) {
      return array[i];
    }
  }
  
  return array[array.length - 1]; // fallback
}

/**
 * Returns n weighted random elements from an array (with replacement)
 */
export function weightedSampleSize<T>(array: T[], weights: number[], n: number): T[] {
  if (n <= 0) return [];
  if (array.length === 0 || weights.length === 0) return [];
  
  const result: T[] = [];
  for (let i = 0; i < n; i++) {
    const sample = weightedSample(array, weights);
    if (sample !== undefined) {
      result.push(sample);
    }
  }
  return result;
}

/**
 * Returns n weighted random elements from an array without replacement
 */
export function weightedSampleSizeWithoutReplacement<T>(
  array: T[], 
  weights: number[], 
  n: number
): T[] {
  if (n <= 0) return [];
  if (array.length === 0 || weights.length === 0) return [];
  if (array.length !== weights.length) {
    throw new Error('Array and weights must have the same length');
  }
  
  const availableItems = [...array];
  const availableWeights = [...weights];
  const result: T[] = [];
  
  for (let i = 0; i < Math.min(n, array.length); i++) {
    const sample = weightedSample(availableItems, availableWeights);
    if (sample !== undefined) {
      const index = availableItems.indexOf(sample);
      result.push(sample);
      availableItems.splice(index, 1);
      availableWeights.splice(index, 1);
    }
  }
  
  return result;
}

/**
 * Finds the intersection of two or more arrays
 */
export function intersection<T>(...arrays: T[][]): T[] {
  if (arrays.length === 0) return [];
  if (arrays.length === 1) return arrays[0] || [];

  return arrays.reduce((acc, current) => {
    return acc.filter(item => current.includes(item));
  });
}

/**
 * Finds the difference between two arrays (elements in first array but not in second)
 */
export function difference<T>(array1: T[], array2: T[]): T[] {
  return array1.filter(item => !array2.includes(item));
}

/**
 * Finds the union of two or more arrays (all unique elements)
 */
export function union<T>(...arrays: T[][]): T[] {
  return unique(arrays.flat());
}

/**
 * Zips multiple arrays together into tuples
 */
export function zip<T extends readonly unknown[][]>(
  ...arrays: T
): Array<{
  [K in keyof T]: T[K] extends readonly (infer U)[] ? U | undefined : never;
}> {
  if (arrays.length === 0) return [] as any;
  const minLength = Math.min(...arrays.map(arr => arr.length));
  const result: any[] = [];

  for (let i = 0; i < minLength; i++) {
    result.push(arrays.map(arr => arr[i]));
  }
  return result;
}

/**
 * Partitions an array based on a predicate function
 */
export function partition<T>(array: T[], predicate: (item: T) => boolean): [T[], T[]] {
  const passed: T[] = [];
  const failed: T[] = [];

  array.forEach(item => {
    if (predicate(item)) {
      passed.push(item);
    } else {
      failed.push(item);
    }
  });

  return [passed, failed];
}

/**
 * Counts occurrences of each element in an array
 */
export function countBy<T>(array: T[]): Map<T, number> {
  const counts = new Map<T, number>();
  array.forEach(item => {
    counts.set(item, (counts.get(item) || 0) + 1);
  });
  return counts;
}

/**
 * Removes falsy values from an array
 */
export function compact<T>(array: (T | null | undefined | false | 0 | '')[]): T[] {
  return array.filter(Boolean) as T[];
}

/**
 * Finds the maximum element in an array based on a selector function
 */
export function maxBy<T>(array: T[], selector: (item: T) => number): T | undefined {
  if (array.length === 0) return undefined;
  return array.reduce((max, current) => (selector(current) > selector(max) ? current : max));
}

/**
 * Finds the minimum element in an array based on a selector function
 */
export function minBy<T>(array: T[], selector: (item: T) => number): T | undefined {
  if (array.length === 0) return undefined;
  return array.reduce((min, current) => (selector(current) < selector(min) ? current : min));
}

/**
 * Sorts an array by multiple criteria
 */
export function sortBy<T>(array: T[], ...selectors: ((item: T) => any)[]): T[] {
  return [...array].sort((a, b) => {
    for (const selector of selectors) {
      const aVal = selector(a);
      const bVal = selector(b);
      if (aVal < bVal) return -1;
      if (aVal > bVal) return 1;
    }
    return 0;
  });
}

/**
 * Creates a range of numbers
 */
export function range(start: number, end?: number, step: number = 1): number[] {
  if (step === 0) throw new Error('Step cannot be zero');

  if (end === undefined) {
    end = start;
    start = 0;
  }

  const result: number[] = [];
  if (step > 0) {
    for (let i = start; i < end; i += step) {
      result.push(i);
    }
  } else if (step < 0) {
    for (let i = start; i > end; i += step) {
      result.push(i);
    }
  }
  return result;
}

/**
 * Checks if two arrays are equal
 */
export function isEqual<T>(array1: T[], array2: T[]): boolean {
  if (array1.length !== array2.length) return false;
  return array1.every((item, index) => item === array2[index]);
}

/**
 * Rotates an array by n positions
 */
export function rotate<T>(array: T[], n: number): T[] {
  if (array.length === 0) return array;
  const normalizedN = ((n % array.length) + array.length) % array.length;
  return [...array.slice(-normalizedN), ...array.slice(0, -normalizedN)];
}

/**
 * Finds the last element that satisfies the predicate
 */
export function findLast<T>(array: T[], predicate: (item: T) => boolean): T | undefined {
  for (let i = array.length - 1; i >= 0; i--) {
    if (predicate(array[i]!)) {
      return array[i];
    }
  }
  return undefined;
}

/**
 * Creates an array with all elements from the first array that are not in the subsequent arrays
 */
export function without<T>(array: T[], ...values: T[]): T[] {
  return array.filter(item => !values.includes(item));
}

/**
 * Takes elements from the beginning of an array while the predicate is true
 */
export function takeWhile<T>(array: T[], predicate: (item: T) => boolean): T[] {
  const result: T[] = [];
  for (const item of array) {
    if (!predicate(item)) break;
    result.push(item);
  }
  return result;
}

/**
 * Drops elements from the beginning of an array while the predicate is true
 */
export function dropWhile<T>(array: T[], predicate: (item: T) => boolean): T[] {
  let startIndex = 0;
  while (startIndex < array.length && predicate(array[startIndex]!)) {
    startIndex++;
  }
  return array.slice(startIndex);
}

/**
 * Takes the first n elements from an array
 */
export function take<T>(array: T[], n: number): T[] {
  if (n <= 0) return [];
  return array.slice(0, n);
}

/**
 * Drops the first n elements from an array
 */
export function drop<T>(array: T[], n: number): T[] {
  if (n <= 0) return [...array];
  return array.slice(n);
}

/**
 * Returns the nth element from an array (supports negative indexing)
 */
export function nth<T>(array: T[], index: number): T | undefined {
  const len = array.length;
  if (len === 0) return undefined;
  const normalizedIndex = index < 0 ? len + index : index;
  return array[normalizedIndex];
}

/**
 * Finds the index of the last element that satisfies the predicate
 */
export function findLastIndex<T>(
  array: T[],
  predicate: (item: T, index: number) => boolean
): number {
  for (let i = array.length - 1; i >= 0; i--) {
    if (predicate(array[i]!, i)) {
      return i;
    }
  }
  return -1;
}

/**
 * Creates an array of arrays, grouping elements together based on size
 */
export function windowed<T>(array: T[], size: number): T[][] {
  if (size <= 0) throw new Error('Window size must be greater than 0');
  if (size > array.length) return [];

  const result: T[][] = [];
  for (let i = 0; i <= array.length - size; i++) {
    result.push(array.slice(i, i + size));
  }
  return result;
}

/**
 * Transposes a 2D array (converts rows to columns)
 */
export function transpose<T>(matrix: T[][]): T[][] {
  if (matrix.length === 0) return [];
  return matrix[0]!.map((_, colIndex) => matrix.map(row => row[colIndex]!));
}

/**
 * Interleaves multiple arrays
 */
export function interleave<T>(...arrays: T[][]): T[] {
  const maxLength = Math.max(...arrays.map(arr => arr.length));
  const result: T[] = [];

  for (let i = 0; i < maxLength; i++) {
    for (const array of arrays) {
      if (i < array.length) {
        result.push(array[i]!);
      }
    }
  }
  return result;
}

/**
 * Calculates the sum of all elements in a numeric array
 */
export function arraySum(array: number[]): number {
  return array.reduce((sum, num) => sum + num, 0);
}

/**
 * Calculates the product of all elements in a numeric array
 */
export function arrayProduct(array: number[]): number {
  return array.reduce((product, num) => product * num, 1);
}

/**
 * Calculates the weighted average of an array
 */
export function weightedAverage(values: number[], weights: number[]): number {
  if (values.length === 0 || weights.length === 0) return 0;
  if (values.length !== weights.length) {
    throw new Error('Values and weights must have the same length');
  }
  
  const weightedSum = values.reduce((sum, value, index) => sum + value * weights[index]!, 0);
  const totalWeight = weights.reduce((sum, weight) => sum + weight, 0);
  
  return totalWeight === 0 ? 0 : weightedSum / totalWeight;
}

/**
 * Calculates the weighted sum of an array
 */
export function weightedSum(values: number[], weights: number[]): number {
  if (values.length === 0 || weights.length === 0) return 0;
  if (values.length !== weights.length) {
    throw new Error('Values and weights must have the same length');
  }
  
  return values.reduce((sum, value, index) => sum + value * weights[index]!, 0);
}

/**
 * Creates a weighted frequency distribution from an array and weights
 */
export function weightedFrequency<T>(array: T[], weights: number[]): Map<T, number> {
  if (array.length !== weights.length) {
    throw new Error('Array and weights must have the same length');
  }
  
  const frequency = new Map<T, number>();
  array.forEach((item, index) => {
    const currentWeight = frequency.get(item) || 0;
    frequency.set(item, currentWeight + weights[index]!);
  });
  
  return frequency;
}

/**
 * Picks the most weighted element from an array
 */
export function weightedMax<T>(array: T[], weights: number[]): T | undefined {
  if (array.length === 0 || weights.length === 0) return undefined;
  if (array.length !== weights.length) {
    throw new Error('Array and weights must have the same length');
  }
  
  let maxWeight = weights[0]!;
  let maxIndex = 0;
  
  for (let i = 1; i < weights.length; i++) {
    if (weights[i]! > maxWeight) {
      maxWeight = weights[i]!;
      maxIndex = i;
    }
  }
  
  return array[maxIndex];
}

/**
 * Picks the least weighted element from an array
 */
export function weightedMin<T>(array: T[], weights: number[]): T | undefined {
  if (array.length === 0 || weights.length === 0) return undefined;
  if (array.length !== weights.length) {
    throw new Error('Array and weights must have the same length');
  }
  
  let minWeight = weights[0]!;
  let minIndex = 0;
  
  for (let i = 1; i < weights.length; i++) {
    if (weights[i]! < minWeight) {
      minWeight = weights[i]!;
      minIndex = i;
    }
  }
  
  return array[minIndex];
}

/**
 * Groups consecutive elements that are the same
 */
export function groupConsecutive<T>(array: T[]): T[][] {
  if (array.length === 0) return [];

  const groups: T[][] = [];
  let currentGroup = [array[0]!];

  for (let i = 1; i < array.length; i++) {
    if (array[i] === array[i - 1]) {
      currentGroup.push(array[i]!);
    } else {
      groups.push(currentGroup);
      currentGroup = [array[i]!];
    }
  }
  groups.push(currentGroup);

  return groups;
}

/**
 * Checks if an array is sorted in ascending order
 */
export function isSorted<T>(array: T[], compareFn?: (a: T, b: T) => number): boolean {
  if (array.length <= 1) return true;

  const compare =
    compareFn ||
    ((a: T, b: T) => {
      if (a < b) return -1;
      if (a > b) return 1;
      return 0;
    });

  for (let i = 1; i < array.length; i++) {
    if (compare(array[i - 1]!, array[i]!) > 0) {
      return false;
    }
  }
  return true;
}

/**
 * Returns all permutations of an array
 */
export function permutations<T>(array: T[]): T[][] {
  if (array.length <= 1) return [array];

  const result: T[][] = [];
  for (let i = 0; i < array.length; i++) {
    const rest = [...array.slice(0, i), ...array.slice(i + 1)];
    const perms = permutations(rest);
    for (const perm of perms) {
      result.push([array[i]!, ...perm]);
    }
  }
  return result;
}

/**
 * Returns all combinations of size k from an array
 */
export function combinations<T>(array: T[], k: number): T[][] {
  if (k === 0) return [[]];
  if (k > array.length) return [];
  if (k === array.length) return [array];

  const result: T[][] = [];
  for (let i = 0; i <= array.length - k; i++) {
    const head = array[i]!;
    const tailCombinations = combinations(array.slice(i + 1), k - 1);
    for (const tailCombination of tailCombinations) {
      result.push([head, ...tailCombination]);
    }
  }
  return result;
}

/**
 * Removes elements at specified indices
 */
export function removeAt<T>(array: T[], ...indices: number[]): T[] {
  const indexSet = new Set(indices.map(i => (i < 0 ? array.length + i : i)));
  return array.filter((_, index) => !indexSet.has(index));
}

/**
 * Inserts elements at a specified index
 */
export function insertAt<T>(array: T[], index: number, ...elements: T[]): T[] {
  const normalizedIndex = index < 0 ? Math.max(0, array.length + index + 1) : index;
  return [...array.slice(0, normalizedIndex), ...elements, ...array.slice(normalizedIndex)];
}
