import { describe, expect, test } from 'bun:test';
import * as ObjectUtils from '../utils/objectUtils';

describe('ObjectUtils', () => {
  describe('deepClone', () => {
    test('should deep clone objects', () => {
      const original = {
        a: 1,
        b: { c: 2, d: [3, 4] },
        e: new Date('2023-01-01'),
        f: new Set([1, 2, 3]),
        g: new Map([['key', 'value']])
      };
      
      const cloned = ObjectUtils.deepClone(original);
      
      expect(cloned).toEqual(original);
      expect(cloned).not.toBe(original);
      expect(cloned.b).not.toBe(original.b);
      expect(cloned.b.d).not.toBe(original.b.d);
      expect(cloned.e).not.toBe(original.e);
      expect(cloned.f).not.toBe(original.f);
      expect(cloned.g).not.toBe(original.g);
    });

    test('should handle primitive values', () => {
      expect(ObjectUtils.deepClone(null)).toBe(null);
      expect(ObjectUtils.deepClone(undefined)).toBe(undefined);
      expect(ObjectUtils.deepClone(42)).toBe(42);
      expect(ObjectUtils.deepClone('string')).toBe('string');
      expect(ObjectUtils.deepClone(true)).toBe(true);
    });
  });

  describe('deepEqual', () => {
    test('should check deep equality', () => {
      const obj1 = { a: 1, b: { c: 2, d: [3, 4] } };
      const obj2 = { a: 1, b: { c: 2, d: [3, 4] } };
      const obj3 = { a: 1, b: { c: 2, d: [3, 5] } };
      
      expect(ObjectUtils.deepEqual(obj1, obj2)).toBe(true);
      expect(ObjectUtils.deepEqual(obj1, obj3)).toBe(false);
    });

    test('should handle dates', () => {
      const date1 = new Date('2023-01-01');
      const date2 = new Date('2023-01-01');
      const date3 = new Date('2023-01-02');
      
      expect(ObjectUtils.deepEqual(date1, date2)).toBe(true);
      expect(ObjectUtils.deepEqual(date1, date3)).toBe(false);
    });

    test('should handle arrays', () => {
      expect(ObjectUtils.deepEqual([1, 2, 3], [1, 2, 3])).toBe(true);
      expect(ObjectUtils.deepEqual([1, 2, 3], [1, 2, 4])).toBe(false);
      expect(ObjectUtils.deepEqual([1, 2], [1, 2, 3])).toBe(false);
    });

    test('should handle primitive values', () => {
      expect(ObjectUtils.deepEqual(null, null)).toBe(true);
      expect(ObjectUtils.deepEqual(undefined, undefined)).toBe(true);
      expect(ObjectUtils.deepEqual(42, 42)).toBe(true);
      expect(ObjectUtils.deepEqual('test', 'test')).toBe(true);
      expect(ObjectUtils.deepEqual(null, undefined)).toBe(false);
    });
  });

  describe('deepMerge', () => {
    test('should merge objects deeply', () => {
      const obj1 = { a: 1, b: { c: 2 } };
      const obj2 = { b: { d: 3 }, e: 4 };
      const obj3 = { b: { e: 5 }, f: 6 };
      
      const result = ObjectUtils.deepMerge(obj1, obj2, obj3) as any;
      
      expect(result).toEqual({
        a: 1,
        b: { c: 2, d: 3, e: 5 },
        e: 4,
        f: 6
      });
    });

    test('should handle empty objects', () => {
      expect(ObjectUtils.deepMerge()).toEqual({});
      expect(ObjectUtils.deepMerge({ a: 1 })).toEqual({ a: 1 });
    });

    test('should handle arrays by replacement', () => {
      const obj1 = { arr: [1, 2] };
      const obj2 = { arr: [3, 4] };
      
      const result = ObjectUtils.deepMerge(obj1, obj2);
      expect(result.arr).toEqual([3, 4]);
    });
  });

  describe('get', () => {
    test('should get nested values using dot notation', () => {
      const obj = {
        a: {
          b: {
            c: 'value'
          }
        },
        x: null
      };
      
      expect(ObjectUtils.get(obj, 'a.b.c')).toBe('value');
      expect(ObjectUtils.get(obj, 'a.b')).toEqual({ c: 'value' });
      expect(ObjectUtils.get(obj, 'x')).toBe(null);
      expect(ObjectUtils.get(obj, 'a.b.d', 'default')).toBe('default');
      expect(ObjectUtils.get(obj, 'missing.path', 'default')).toBe('default');
    });
  });

  describe('set', () => {
    test('should set nested values using dot notation', () => {
      const obj = {};
      
      ObjectUtils.set(obj, 'a.b.c', 'value');
      expect(obj).toEqual({ a: { b: { c: 'value' } } });
      
      ObjectUtils.set(obj, 'a.b.d', 'another');
      expect(obj).toEqual({ a: { b: { c: 'value', d: 'another' } } });
    });

    test('should override existing values', () => {
      const obj = { a: { b: 'old' } };
      ObjectUtils.set(obj, 'a.b', 'new');
      expect(obj.a.b).toBe('new');
    });
  });

  describe('has', () => {
    test('should check if nested path exists', () => {
      const obj = {
        a: {
          b: {
            c: null
          }
        }
      };
      
      expect(ObjectUtils.has(obj, 'a.b.c')).toBe(true);
      expect(ObjectUtils.has(obj, 'a.b')).toBe(true);
      expect(ObjectUtils.has(obj, 'a.b.d')).toBe(false);
      expect(ObjectUtils.has(obj, 'missing')).toBe(false);
    });
  });

  describe('unset', () => {
    test('should remove nested property', () => {
      const obj: any = {
        a: {
          b: {
            c: 'value',
            d: 'another'
          }
        }
      };
      
      expect(ObjectUtils.unset(obj, 'a.b.c')).toBe(true);
      expect(obj).toEqual({ a: { b: { d: 'another' } } });
      
      expect(ObjectUtils.unset(obj, 'missing.path')).toBe(false);
    });
  });

  describe('pick', () => {
    test('should pick specified properties', () => {
      const obj = { a: 1, b: 2, c: 3, d: 4 };
      const picked = ObjectUtils.pick(obj, 'a', 'c');
      
      expect(picked).toEqual({ a: 1, c: 3 });
    });

    test('should handle non-existent properties', () => {
      const obj = { a: 1, b: 2 };
      const picked = ObjectUtils.pick(obj, 'a', 'c' as any);
      
      expect(picked).toEqual({ a: 1 });
    });
  });

  describe('omit', () => {
    test('should omit specified properties', () => {
      const obj = { a: 1, b: 2, c: 3, d: 4 };
      const omitted = ObjectUtils.omit(obj, 'b', 'd');
      
      expect(omitted).toEqual({ a: 1, c: 3 });
    });
  });

  describe('invert', () => {
    test('should invert object keys and values', () => {
      const obj = { a: 1, b: 2, c: 3 };
      const inverted = ObjectUtils.invert(obj);
      
      expect(inverted).toEqual({ '1': 'a', '2': 'b', '3': 'c' });
    });
  });

  describe('mapValues', () => {
    test('should map over object values', () => {
      const obj = { a: 1, b: 2, c: 3 };
      const mapped = ObjectUtils.mapValues(obj, (value, key) => value * 2);
      
      expect(mapped).toEqual({ a: 2, b: 4, c: 6 });
    });

    test('should provide key to mapper function', () => {
      const obj = { a: 1, b: 2 };
      const mapped = ObjectUtils.mapValues(obj, (value, key) => `${key}-${value}`);
      
      expect(mapped).toEqual({ a: 'a-1', b: 'b-2' });
    });
  });

  describe('mapKeys', () => {
    test('should map over object keys', () => {
      const obj = { a: 1, b: 2, c: 3 };
      const mapped = ObjectUtils.mapKeys(obj, (key, value) => key.toUpperCase());
      
      expect(mapped).toEqual({ A: 1, B: 2, C: 3 });
    });
  });

  describe('filterObject', () => {
    test('should filter object properties', () => {
      const obj = { a: 1, b: 2, c: 3, d: 4 };
      const filtered = ObjectUtils.filterObject(obj, (value) => value % 2 === 0);
      
      expect(filtered).toEqual({ b: 2, d: 4 });
    });

    test('should provide key to predicate', () => {
      const obj = { apple: 1, banana: 2, cherry: 3 };
      const filtered = ObjectUtils.filterObject(obj, (value, key) => key.startsWith('a'));
      
      expect(filtered).toEqual({ apple: 1 });
    });
  });

  describe('getPaths', () => {
    test('should get all paths in object', () => {
      const obj = {
        a: 1,
        b: {
          c: 2,
          d: {
            e: 3
          }
        }
      };
      
      const paths = ObjectUtils.getPaths(obj);
      expect(paths).toContain('a');
      expect(paths).toContain('b');
      expect(paths).toContain('b.c');
      expect(paths).toContain('b.d');
      expect(paths).toContain('b.d.e');
    });
  });

  describe('flatten', () => {
    test('should flatten nested object', () => {
      const obj = {
        a: 1,
        b: {
          c: 2,
          d: {
            e: 3
          }
        }
      };
      
      const flattened = ObjectUtils.flatten(obj);
      expect(flattened).toEqual({
        'a': 1,
        'b.c': 2,
        'b.d.e': 3
      });
    });
  });

  describe('unflatten', () => {
    test('should unflatten object with dot notation keys', () => {
      const flattened = {
        'a': 1,
        'b.c': 2,
        'b.d.e': 3
      };
      
      const unflattened = ObjectUtils.unflatten(flattened);
      expect(unflattened).toEqual({
        a: 1,
        b: {
          c: 2,
          d: {
            e: 3
          }
        }
      });
    });
  });

  describe('isEmpty', () => {
    test('should check if object is empty', () => {
      expect(ObjectUtils.isEmpty({})).toBe(true);
      expect(ObjectUtils.isEmpty([])).toBe(true);
      expect(ObjectUtils.isEmpty(null)).toBe(true);
      expect(ObjectUtils.isEmpty(undefined)).toBe(true);
      
      expect(ObjectUtils.isEmpty({ a: 1 })).toBe(false);
      expect(ObjectUtils.isEmpty([1])).toBe(false);
      expect(ObjectUtils.isEmpty('string')).toBe(false);
    });
  });

  describe('isPlainObject', () => {
    test('should check if value is plain object', () => {
      expect(ObjectUtils.isPlainObject({})).toBe(true);
      expect(ObjectUtils.isPlainObject({ a: 1 })).toBe(true);
      expect(ObjectUtils.isPlainObject(Object.create(null))).toBe(true);
      
      expect(ObjectUtils.isPlainObject([])).toBe(false);
      expect(ObjectUtils.isPlainObject(null)).toBe(false);
      expect(ObjectUtils.isPlainObject(new Date())).toBe(false);
      expect(ObjectUtils.isPlainObject(new Map())).toBe(false);
    });
  });

  describe('compact', () => {
    test('should remove falsy values', () => {
      const obj = {
        a: 1,
        b: 0,
        c: 'hello',
        d: '',
        e: true,
        f: false,
        g: null,
        h: undefined
      };
      
      const compacted = ObjectUtils.compact(obj);
      expect(compacted).toEqual({
        a: 1,
        c: 'hello',
        e: true
      });
    });
  });

  describe('groupBy', () => {
    test('should group array by key', () => {
      const items = [
        { type: 'fruit', name: 'apple' },
        { type: 'vegetable', name: 'carrot' },
        { type: 'fruit', name: 'banana' },
        { type: 'vegetable', name: 'lettuce' }
      ];
      
      const grouped = ObjectUtils.groupBy(items, 'type');
      
      expect(grouped.fruit).toHaveLength(2);
      expect(grouped.vegetable).toHaveLength(2);
      expect(grouped.fruit[0]?.name).toBe('apple');
      expect(grouped.fruit[1]?.name).toBe('banana');
    });
  });

  describe('keyBy', () => {
    test('should create object keyed by function result', () => {
      const items = [
        { id: 1, name: 'apple' },
        { id: 2, name: 'banana' },
        { id: 3, name: 'cherry' }
      ];
      
      const keyed = ObjectUtils.keyBy(items, item => item.id);
      
      expect(keyed['1']).toEqual({ id: 1, name: 'apple' });
      expect(keyed['2']).toEqual({ id: 2, name: 'banana' });
      expect(keyed['3']).toEqual({ id: 3, name: 'cherry' });
    });
  });

  describe('safeStringify', () => {
    test('should safely stringify valid objects', () => {
      const obj = { a: 1, b: 'hello' };
      expect(ObjectUtils.safeStringify(obj)).toBe('{"a":1,"b":"hello"}');
    });

    test('should return null for circular references', () => {
      const obj: any = { a: 1 };
      obj.circular = obj;
      
      expect(ObjectUtils.safeStringify(obj)).toBeNull();
    });

    test('should handle spacing', () => {
      const obj = { a: 1 };
      const result = ObjectUtils.safeStringify(obj, 2);
      expect(result).toContain('  '); // Should have indentation
    });
  });

  describe('safeParse', () => {
    test('should safely parse valid JSON', () => {
      const json = '{"a":1,"b":"hello"}';
      const result = ObjectUtils.safeParse(json);
      expect(result).toEqual({ a: 1, b: 'hello' });
    });

    test('should return null for invalid JSON', () => {
      expect(ObjectUtils.safeParse('invalid json')).toBeNull();
      expect(ObjectUtils.safeParse('{"unclosed": ')).toBeNull();
    });
  });
});
