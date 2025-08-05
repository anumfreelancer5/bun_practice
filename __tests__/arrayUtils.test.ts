import { describe, expect, test } from 'bun:test';
import * as ArrayUtils from '../utils/arrayUtils';

describe('ArrayUtils', () => {
  describe('unique', () => {
    test('should remove duplicates', () => {
      expect(ArrayUtils.unique([1, 2, 2, 3, 3, 4])).toEqual([1, 2, 3, 4]);
      expect(ArrayUtils.unique(['a', 'b', 'a', 'c'])).toEqual(['a', 'b', 'c']);
      expect(ArrayUtils.unique([])).toEqual([]);
    });
  });

  describe('chunk', () => {
    test('should split array into chunks', () => {
      expect(ArrayUtils.chunk([1, 2, 3, 4, 5, 6], 2)).toEqual([[1, 2], [3, 4], [5, 6]]);
      expect(ArrayUtils.chunk([1, 2, 3, 4, 5], 3)).toEqual([[1, 2, 3], [4, 5]]);
      expect(ArrayUtils.chunk([], 2)).toEqual([]);
    });
  });

  describe('flatten', () => {
    test('should flatten nested arrays', () => {
      expect(ArrayUtils.flatten([[1, 2], [3, 4]])).toEqual([1, 2, 3, 4]);
      expect(ArrayUtils.flatten([1, [2, [3, 4]]])).toEqual([1, 2, 3, 4]);
      expect(ArrayUtils.flatten([])).toEqual([]);
    });
  });

  describe('groupBy', () => {
    test('should group items by key function', () => {
      const items = [
        { type: 'fruit', name: 'apple' },
        { type: 'vegetable', name: 'carrot' },
        { type: 'fruit', name: 'banana' }
      ];
      const grouped = ArrayUtils.groupBy(items, item => item.type);
      expect(grouped.fruit).toHaveLength(2);
      expect(grouped.vegetable).toHaveLength(1);
    });
  });

  describe('intersection', () => {
    test('should find common elements', () => {
      expect(ArrayUtils.intersection([1, 2, 3], [2, 3, 4], [3, 4, 5])).toEqual([3]);
      expect(ArrayUtils.intersection([1, 2], [3, 4])).toEqual([]);
      expect(ArrayUtils.intersection([1, 2, 3])).toEqual([1, 2, 3]);
    });
  });

  describe('difference', () => {
    test('should find elements in first array but not in second', () => {
      expect(ArrayUtils.difference([1, 2, 3, 4], [2, 4])).toEqual([1, 3]);
      expect(ArrayUtils.difference([1, 2], [1, 2, 3])).toEqual([]);
    });
  });

  describe('shuffle', () => {
    test('should shuffle array randomly', () => {
      const original = [1, 2, 3, 4, 5];
      const shuffled = ArrayUtils.shuffle(original);
      expect(shuffled).toHaveLength(original.length);
      expect(shuffled.sort()).toEqual(original.sort());
    });
  });

  describe('range', () => {
    test('should create range of numbers', () => {
      expect(ArrayUtils.range(0, 5)).toEqual([0, 1, 2, 3, 4]);
      expect(ArrayUtils.range(2, 6)).toEqual([2, 3, 4, 5]);
      expect(ArrayUtils.range(5)).toEqual([0, 1, 2, 3, 4]);
    });
  });

  describe('take', () => {
    test('should take first n elements', () => {
      expect(ArrayUtils.take([1, 2, 3, 4, 5], 3)).toEqual([1, 2, 3]);
      expect(ArrayUtils.take([1, 2], 5)).toEqual([1, 2]);
      expect(ArrayUtils.take([1, 2, 3], 0)).toEqual([]);
    });
  });

  describe('windowed', () => {
    test('should create sliding windows', () => {
      expect(ArrayUtils.windowed([1, 2, 3, 4], 3)).toEqual([[1, 2, 3], [2, 3, 4]]);
      expect(ArrayUtils.windowed([1, 2], 3)).toEqual([]);
      expect(ArrayUtils.windowed([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [2, 3], [3, 4], [4, 5]]);
    });
  });

  describe('sample', () => {
    test('should return random element', () => {
      const arr = [1, 2, 3, 4, 5];
      const result = ArrayUtils.sample(arr);
      expect(arr).toContain(result);
      expect(ArrayUtils.sample([])).toBeUndefined();
    });
  });

  describe('sampleSize', () => {
    test('should return random sample of specified size', () => {
      const arr = [1, 2, 3, 4, 5];
      const result = ArrayUtils.sampleSize(arr, 3);
      expect(result).toHaveLength(3);
      result.forEach(item => expect(arr).toContain(item));
    });
  });

  describe('union', () => {
    test('should return union of arrays', () => {
      expect(ArrayUtils.union([1, 2], [2, 3], [3, 4])).toEqual([1, 2, 3, 4]);
      expect(ArrayUtils.union([1, 1, 2], [2, 3])).toEqual([1, 2, 3]);
    });
  });

  describe('zip', () => {
    test('should zip arrays together', () => {
      expect(ArrayUtils.zip([1, 2], ['a', 'b'])).toEqual([[1, 'a'], [2, 'b']]);
      expect(ArrayUtils.zip([1, 2, 3], ['a', 'b'])).toEqual([[1, 'a'], [2, 'b']]);
    });
  });

  describe('partition', () => {
    test('should partition array by predicate', () => {
      const [evens, odds] = ArrayUtils.partition([1, 2, 3, 4, 5], x => x % 2 === 0);
      expect(evens).toEqual([2, 4]);
      expect(odds).toEqual([1, 3, 5]);
    });
  });

  describe('countBy', () => {
    test('should count occurrences of each element', () => {
      const result = ArrayUtils.countBy([1, 2, 2, 3, 3, 3]);
      expect(result.get(1)).toBe(1);
      expect(result.get(2)).toBe(2);
      expect(result.get(3)).toBe(3);
    });
  });

  describe('compact', () => {
    test('should remove falsy values', () => {
      expect(ArrayUtils.compact([1, 0, 2, false, 3, '', 4, null, 5, undefined])).toEqual([1, 2, 3, 4, 5]);
    });
  });

  describe('maxBy', () => {
    test('should find max by selector', () => {
      const people = [{name: 'John', age: 30}, {name: 'Jane', age: 25}, {name: 'Bob', age: 35}];
      expect(ArrayUtils.maxBy(people, p => p.age)).toEqual({name: 'Bob', age: 35});
      expect(ArrayUtils.maxBy([], p => p)).toBeUndefined();
    });
  });

  describe('minBy', () => {
    test('should find min by selector', () => {
      const people = [{name: 'John', age: 30}, {name: 'Jane', age: 25}, {name: 'Bob', age: 35}];
      expect(ArrayUtils.minBy(people, p => p.age)).toEqual({name: 'Jane', age: 25});
      expect(ArrayUtils.minBy([], p => p)).toBeUndefined();
    });
  });

  describe('sortBy', () => {
    test('should sort by selector', () => {
      const people = [{name: 'John', age: 30}, {name: 'Jane', age: 25}, {name: 'Bob', age: 35}];
      const sorted = ArrayUtils.sortBy(people, p => p.age);
      expect(sorted[0]?.name).toBe('Jane');
      expect(sorted[2]?.name).toBe('Bob');
    });
  });

  describe('isEqual', () => {
    test('should check array equality', () => {
      expect(ArrayUtils.isEqual([1, 2, 3], [1, 2, 3])).toBe(true);
      expect(ArrayUtils.isEqual([1, 2, 3], [1, 2, 4])).toBe(false);
      expect(ArrayUtils.isEqual([1, 2], [1, 2, 3])).toBe(false);
    });
  });

  describe('rotate', () => {
    test('should rotate array', () => {
      expect(ArrayUtils.rotate([1, 2, 3, 4, 5], 2)).toEqual([4, 5, 1, 2, 3]);
      expect(ArrayUtils.rotate([1, 2, 3, 4, 5], -1)).toEqual([2, 3, 4, 5, 1]);
    });
  });

  describe('findLast', () => {
    test('should find last matching element', () => {
      expect(ArrayUtils.findLast([1, 2, 3, 2, 1], x => x === 2)).toBe(2);
      expect(ArrayUtils.findLast([1, 2, 3], x => x === 4)).toBeUndefined();
    });
  });

  describe('without', () => {
    test('should exclude specified values', () => {
      expect(ArrayUtils.without([1, 2, 3, 4, 5], 2, 4)).toEqual([1, 3, 5]);
      expect(ArrayUtils.without([1, 2, 3], 4, 5)).toEqual([1, 2, 3]);
    });
  });

  describe('takeWhile', () => {
    test('should take elements while predicate is true', () => {
      expect(ArrayUtils.takeWhile([1, 2, 3, 4, 5], x => x < 4)).toEqual([1, 2, 3]);
      expect(ArrayUtils.takeWhile([5, 4, 3, 2, 1], x => x < 4)).toEqual([]);
    });
  });

  describe('dropWhile', () => {
    test('should drop elements while predicate is true', () => {
      expect(ArrayUtils.dropWhile([1, 2, 3, 4, 5], x => x < 4)).toEqual([4, 5]);
      expect(ArrayUtils.dropWhile([5, 4, 3, 2, 1], x => x < 4)).toEqual([5, 4, 3, 2, 1]);
    });
  });

  describe('drop', () => {
    test('should drop n elements from beginning', () => {
      expect(ArrayUtils.drop([1, 2, 3, 4, 5], 2)).toEqual([3, 4, 5]);
      expect(ArrayUtils.drop([1, 2, 3], 5)).toEqual([]);
    });
  });

  describe('nth', () => {
    test('should get nth element', () => {
      expect(ArrayUtils.nth([1, 2, 3, 4, 5], 2)).toBe(3);
      expect(ArrayUtils.nth([1, 2, 3], -1)).toBe(3);
      expect(ArrayUtils.nth([1, 2, 3], 10)).toBeUndefined();
    });
  });

  describe('findLastIndex', () => {
    test('should find last index matching predicate', () => {
      expect(ArrayUtils.findLastIndex([1, 2, 3, 2, 1], x => x === 2)).toBe(3);
      expect(ArrayUtils.findLastIndex([1, 2, 3], x => x === 4)).toBe(-1);
    });
  });

  describe('transpose', () => {
    test('should transpose matrix', () => {
      expect(ArrayUtils.transpose([[1, 2, 3], [4, 5, 6]])).toEqual([[1, 4], [2, 5], [3, 6]]);
      expect(ArrayUtils.transpose([[1, 2], [3, 4], [5, 6]])).toEqual([[1, 3, 5], [2, 4, 6]]);
    });
  });

  describe('interleave', () => {
    test('should interleave arrays', () => {
      expect(ArrayUtils.interleave([1, 3, 5], [2, 4, 6])).toEqual([1, 2, 3, 4, 5, 6]);
      expect(ArrayUtils.interleave([1, 2], [3, 4], [5, 6])).toEqual([1, 3, 5, 2, 4, 6]);
    });
  });

  describe('weightedSample', () => {
    test('should return undefined for empty arrays', () => {
      expect(ArrayUtils.weightedSample([], [])).toBeUndefined();
      expect(ArrayUtils.weightedSample(['a'], [])).toBeUndefined();
      expect(ArrayUtils.weightedSample([], [1])).toBeUndefined();
    });

    test('should throw error for mismatched array lengths', () => {
      expect(() => ArrayUtils.weightedSample(['a', 'b'], [1])).toThrow('Array and weights must have the same length');
    });

    test('should throw error for negative weights', () => {
      expect(() => ArrayUtils.weightedSample(['a', 'b'], [1, -1])).toThrow('Weights must be non-negative');
    });

    test('should return undefined for zero total weight', () => {
      expect(ArrayUtils.weightedSample(['a', 'b'], [0, 0])).toBeUndefined();
    });

    test('should return only element with non-zero weight', () => {
      expect(ArrayUtils.weightedSample(['a', 'b'], [1, 0])).toBe('a');
      expect(ArrayUtils.weightedSample(['a', 'b'], [0, 1])).toBe('b');
    });

    test('should work with single element', () => {
      expect(ArrayUtils.weightedSample(['a'], [5])).toBe('a');
    });
  });

  describe('weightedSampleSize', () => {
    test('should return empty array for n <= 0', () => {
      expect(ArrayUtils.weightedSampleSize(['a', 'b'], [1, 1], 0)).toEqual([]);
      expect(ArrayUtils.weightedSampleSize(['a', 'b'], [1, 1], -1)).toEqual([]);
    });

    test('should return empty array for empty inputs', () => {
      expect(ArrayUtils.weightedSampleSize([], [], 5)).toEqual([]);
      expect(ArrayUtils.weightedSampleSize(['a'], [], 5)).toEqual([]);
    });

    test('should return n samples with replacement', () => {
      const result = ArrayUtils.weightedSampleSize(['a'], [1], 3);
      expect(result).toEqual(['a', 'a', 'a']);
    });

    test('should respect weights distribution', () => {
      const result = ArrayUtils.weightedSampleSize(['a', 'b'], [1, 0], 5);
      expect(result).toEqual(['a', 'a', 'a', 'a', 'a']);
    });
  });

  describe('weightedSampleSizeWithoutReplacement', () => {
    test('should return empty array for n <= 0', () => {
      expect(ArrayUtils.weightedSampleSizeWithoutReplacement(['a', 'b'], [1, 1], 0)).toEqual([]);
    });

    test('should throw error for mismatched array lengths', () => {
      expect(() => ArrayUtils.weightedSampleSizeWithoutReplacement(['a', 'b'], [1], 2)).toThrow('Array and weights must have the same length');
    });

    test('should return unique elements without replacement', () => {
      const result = ArrayUtils.weightedSampleSizeWithoutReplacement(['a', 'b', 'c'], [1, 1, 1], 2);
      expect(result).toHaveLength(2);
      expect(new Set(result).size).toBe(2); // All unique
    });

    test('should not exceed array length', () => {
      const result = ArrayUtils.weightedSampleSizeWithoutReplacement(['a', 'b'], [1, 1], 5);
      expect(result).toHaveLength(2);
    });

    test('should respect zero weights', () => {
      const result = ArrayUtils.weightedSampleSizeWithoutReplacement(['a', 'b', 'c'], [1, 0, 1], 2);
      expect(result).not.toContain('b');
    });
  });

  describe('weightedAverage', () => {
    test('should return 0 for empty arrays', () => {
      expect(ArrayUtils.weightedAverage([], [])).toBe(0);
    });

    test('should throw error for mismatched array lengths', () => {
      expect(() => ArrayUtils.weightedAverage([1, 2], [1])).toThrow('Values and weights must have the same length');
    });

    test('should return 0 for zero total weight', () => {
      expect(ArrayUtils.weightedAverage([1, 2, 3], [0, 0, 0])).toBe(0);
    });

    test('should calculate weighted average correctly', () => {
      expect(ArrayUtils.weightedAverage([1, 2, 3], [1, 1, 1])).toBe(2);
      expect(ArrayUtils.weightedAverage([1, 2, 3], [1, 2, 3])).toBe(2.3333333333333335);
      expect(ArrayUtils.weightedAverage([10, 20], [1, 4])).toBe(18);
    });

    test('should handle single value', () => {
      expect(ArrayUtils.weightedAverage([5], [3])).toBe(5);
    });
  });

  describe('weightedSum', () => {
    test('should return 0 for empty arrays', () => {
      expect(ArrayUtils.weightedSum([], [])).toBe(0);
    });

    test('should throw error for mismatched array lengths', () => {
      expect(() => ArrayUtils.weightedSum([1, 2], [1])).toThrow('Values and weights must have the same length');
    });

    test('should calculate weighted sum correctly', () => {
      expect(ArrayUtils.weightedSum([1, 2, 3], [1, 1, 1])).toBe(6);
      expect(ArrayUtils.weightedSum([1, 2, 3], [2, 3, 4])).toBe(20);
      expect(ArrayUtils.weightedSum([10, 20], [0.5, 0.5])).toBe(15);
    });

    test('should handle zero weights', () => {
      expect(ArrayUtils.weightedSum([1, 2, 3], [0, 0, 0])).toBe(0);
    });
  });

  describe('weightedFrequency', () => {
    test('should throw error for mismatched array lengths', () => {
      expect(() => ArrayUtils.weightedFrequency(['a', 'b'], [1])).toThrow('Array and weights must have the same length');
    });

    test('should create weighted frequency map', () => {
      const result = ArrayUtils.weightedFrequency(['a', 'b', 'a'], [1, 2, 3]);
      expect(result.get('a')).toBe(4);
      expect(result.get('b')).toBe(2);
    });

    test('should handle empty arrays', () => {
      const result = ArrayUtils.weightedFrequency([], []);
      expect(result.size).toBe(0);
    });

    test('should accumulate weights for duplicate items', () => {
      const result = ArrayUtils.weightedFrequency(['x', 'y', 'x', 'x'], [1, 2, 3, 4]);
      expect(result.get('x')).toBe(8);
      expect(result.get('y')).toBe(2);
    });
  });

  describe('weightedMax', () => {
    test('should return undefined for empty arrays', () => {
      expect(ArrayUtils.weightedMax([], [])).toBeUndefined();
    });

    test('should throw error for mismatched array lengths', () => {
      expect(() => ArrayUtils.weightedMax(['a', 'b'], [1])).toThrow('Array and weights must have the same length');
    });

    test('should return element with maximum weight', () => {
      expect(ArrayUtils.weightedMax(['a', 'b', 'c'], [1, 3, 2])).toBe('b');
      expect(ArrayUtils.weightedMax([10, 20, 30], [5, 1, 3])).toBe(10);
    });

    test('should return first element for ties', () => {
      expect(ArrayUtils.weightedMax(['a', 'b', 'c'], [2, 2, 1])).toBe('a');
    });

    test('should handle single element', () => {
      expect(ArrayUtils.weightedMax(['only'], [42])).toBe('only');
    });
  });

  describe('weightedMin', () => {
    test('should return undefined for empty arrays', () => {
      expect(ArrayUtils.weightedMin([], [])).toBeUndefined();
    });

    test('should throw error for mismatched array lengths', () => {
      expect(() => ArrayUtils.weightedMin(['a', 'b'], [1])).toThrow('Array and weights must have the same length');
    });

    test('should return element with minimum weight', () => {
      expect(ArrayUtils.weightedMin(['a', 'b', 'c'], [3, 1, 2])).toBe('b');
      expect(ArrayUtils.weightedMin([10, 20, 30], [5, 1, 3])).toBe(20);
    });

    test('should return first element for ties', () => {
      expect(ArrayUtils.weightedMin(['a', 'b', 'c'], [1, 1, 2])).toBe('a');
    });

    test('should handle single element', () => {
      expect(ArrayUtils.weightedMin(['only'], [42])).toBe('only');
    });

    test('should handle negative weights', () => {
      expect(ArrayUtils.weightedMin(['a', 'b', 'c'], [1, -5, 2])).toBe('b');
    });
  });
});
