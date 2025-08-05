import { describe, expect, test, jest } from 'bun:test';
import * as FunctionalUtils from '../utils/functionalUtils';

describe('FunctionalUtils', () => {
  describe('debounce', () => {
    test('should delay function execution', async () => {
      const mockFn = jest.fn();
      const debouncedFn = FunctionalUtils.debounce(mockFn, 100);
      
      debouncedFn();
      debouncedFn();
      debouncedFn();
      
      expect(mockFn).not.toHaveBeenCalled();
      
      await new Promise(resolve => setTimeout(resolve, 150));
      expect(mockFn).toHaveBeenCalledTimes(1);
    });
  });

  describe('throttle', () => {
    test('should limit function calls', async () => {
      const mockFn = jest.fn();
      const throttledFn = FunctionalUtils.throttle(mockFn, 100);
      
      throttledFn();
      throttledFn();
      throttledFn();
      
      expect(mockFn).toHaveBeenCalledTimes(1);
      
      await new Promise(resolve => setTimeout(resolve, 150));
      throttledFn();
      expect(mockFn).toHaveBeenCalledTimes(2);
    });
  });

  describe('memoize', () => {
    test('should cache function results', () => {
      const expensiveFn = jest.fn((x: number) => x * 2);
      const memoizedFn = FunctionalUtils.memoize(expensiveFn);
      
      expect(memoizedFn(5)).toBe(10);
      expect(memoizedFn(5)).toBe(10);
      expect(expensiveFn).toHaveBeenCalledTimes(1);
      
      expect(memoizedFn(10)).toBe(20);
      expect(expensiveFn).toHaveBeenCalledTimes(2);
    });

    test('should use custom key generator', () => {
      const fn = jest.fn((obj: { x: number; y: number }) => obj.x + obj.y);
      const memoizedFn = FunctionalUtils.memoize(fn, (obj) => `${obj.x}-${obj.y}`);
      
      expect(memoizedFn({ x: 1, y: 2 })).toBe(3);
      expect(memoizedFn({ x: 1, y: 2 })).toBe(3);
      expect(fn).toHaveBeenCalledTimes(1);
    });
  });

  describe('compose', () => {
    test('should compose functions right to left', () => {
      const add1 = (x: number) => x + 1;
      const multiply2 = (x: number) => x * 2;
      const composed = FunctionalUtils.compose(multiply2, add1);
      
      expect(composed(5)).toBe(12); // (5 + 1) * 2
    });
  });

  describe('pipe', () => {
    test('should compose functions left to right', () => {
      const add1 = (x: number) => x + 1;
      const multiply2 = (x: number) => x * 2;
      const piped = FunctionalUtils.pipe(add1, multiply2);
      
      expect(piped(5)).toBe(12); // (5 + 1) * 2
    });
  });

  describe('curry', () => {
    test('should create curried function', () => {
      const add = (a: number, b: number, c: number) => a + b + c;
      const curriedAdd = FunctionalUtils.curry(add);
      
      expect(curriedAdd(1)(2)(3)).toBe(6);
      expect(curriedAdd(1, 2)(3)).toBe(6);
      expect(curriedAdd(1)(2, 3)).toBe(6);
      expect(curriedAdd(1, 2, 3)).toBe(6);
    });
  });

  describe('partial', () => {
    test('should create partially applied function', () => {
      const multiply = (a: number, b: number, c: number) => a * b * c;
      const multiplyBy2 = FunctionalUtils.partial(multiply, 2);
      
      expect(multiplyBy2(3, 4)).toBe(24); // 2 * 3 * 4
    });
  });

  describe('negate', () => {
    test('should negate predicate result', () => {
      const isEven = (x: number) => x % 2 === 0;
      const isOdd = FunctionalUtils.negate(isEven);
      
      expect(isOdd(2)).toBe(false);
      expect(isOdd(3)).toBe(true);
    });
  });

  describe('constant', () => {
    test('should return constant value', () => {
      const getConstant = FunctionalUtils.constant(42);
      
      expect(getConstant()).toBe(42);
      expect(getConstant()).toBe(42);
    });
  });

  describe('identity', () => {
    test('should return input unchanged', () => {
      expect(FunctionalUtils.identity(5)).toBe(5);
      expect(FunctionalUtils.identity('hello')).toBe('hello');
      
      const obj = { x: 1 };
      expect(FunctionalUtils.identity(obj)).toBe(obj);
    });
  });

  describe('always', () => {
    test('should always return same value regardless of arguments', () => {
      const alwaysTrue = FunctionalUtils.always(true);
      
      expect(alwaysTrue()).toBe(true);
      expect(alwaysTrue(1, 2, 3)).toBe(true);
      expect(alwaysTrue('any', 'args')).toBe(true);
    });
  });

  describe('once', () => {
    test('should call function only once', () => {
      const mockFn = jest.fn(() => 'result');
      const onceFn = FunctionalUtils.once(mockFn);
      
      expect(onceFn()).toBe('result');
      expect(onceFn()).toBe('result');
      expect(onceFn()).toBe('result');
      expect(mockFn).toHaveBeenCalledTimes(1);
    });
  });

  describe('times', () => {
    test('should call function limited number of times', () => {
      const mockFn = jest.fn(() => 'result');
      const timesFn = FunctionalUtils.times(2, mockFn);
      
      expect(timesFn()).toBe('result');
      expect(timesFn()).toBe('result');
      expect(timesFn()).toBe('result'); // Third call, but should still return last result
      expect(mockFn).toHaveBeenCalledTimes(2);
    });
  });

  describe('after', () => {
    test('should call function after n calls', () => {
      const mockFn = jest.fn(() => 'result');
      const afterFn = FunctionalUtils.after(3, mockFn);
      
      expect(afterFn()).toBeUndefined();
      expect(afterFn()).toBeUndefined();
      expect(afterFn()).toBe('result');
      expect(afterFn()).toBe('result');
      expect(mockFn).toHaveBeenCalledTimes(2);
    });
  });

  describe('before', () => {
    test('should call function before n calls', () => {
      const mockFn = jest.fn(() => 'result');
      const beforeFn = FunctionalUtils.before(2, mockFn);
      
      expect(beforeFn()).toBe('result');
      expect(beforeFn()).toBe('result'); // Second call, but should still work
      expect(beforeFn()).toBe('result'); // Third call, should return cached result
      expect(mockFn).toHaveBeenCalledTimes(2);
    });
  });

  describe('flip', () => {
    test('should flip function arguments', () => {
      const subtract = (a: number, b: number) => a - b;
      const flippedSubtract = FunctionalUtils.flip(subtract);
      
      expect(subtract(10, 3)).toBe(7);
      expect(flippedSubtract(3, 10)).toBe(7);
    });
  });

  describe('reverseArgs', () => {
    test('should reverse all arguments', () => {
      const concat = (a: string, b: string, c: string) => a + b + c;
      const reversedConcat = FunctionalUtils.reverseArgs(concat);
      
      expect(concat('a', 'b', 'c')).toBe('abc');
      expect(reversedConcat('a', 'b', 'c')).toBe('cba');
    });
  });

  describe('attempt', () => {
    test('should return result on success', () => {
      const successFn = () => 'success';
      expect(FunctionalUtils.attempt(successFn, 'default')).toBe('success');
    });

    test('should return default value on error', () => {
      const errorFn = () => {
        throw new Error('test error');
      };
      expect(FunctionalUtils.attempt(errorFn, 'default')).toBe('default');
    });
  });

  describe('over', () => {
    test('should apply multiple functions to same arguments', () => {
      const add1 = (x: number) => x + 1;
      const multiply2 = (x: number) => x * 2;
      const overFn = FunctionalUtils.over(add1, multiply2);
      
      expect(overFn(5)).toEqual([6, 10]);
    });
  });

  describe('overEvery', () => {
    test('should check if all predicates return true', () => {
      const isPositive = (x: number) => x > 0;
      const isEven = (x: number) => x % 2 === 0;
      const overEveryFn = FunctionalUtils.overEvery(isPositive, isEven);
      
      expect(overEveryFn(4)).toBe(true);  // positive and even
      expect(overEveryFn(3)).toBe(false); // positive but odd
      expect(overEveryFn(-2)).toBe(false); // even but negative
    });
  });

  describe('overSome', () => {
    test('should check if any predicate returns true', () => {
      const isNegative = (x: number) => x < 0;
      const isEven = (x: number) => x % 2 === 0;
      const overSomeFn = FunctionalUtils.overSome(isNegative, isEven);
      
      expect(overSomeFn(-3)).toBe(true);  // negative (but odd)
      expect(overSomeFn(4)).toBe(true);   // even (but positive)
      expect(overSomeFn(3)).toBe(false);  // positive and odd
    });
  });

  describe('delay', () => {
    test('should delay function execution and return promise', async () => {
      const mockFn = jest.fn(() => 'result');
      const delayedFn = FunctionalUtils.delay(mockFn, 100);
      
      const promise = delayedFn();
      expect(mockFn).not.toHaveBeenCalled();
      
      const result = await promise;
      expect(result).toBe('result');
      expect(mockFn).toHaveBeenCalledTimes(1);
    });
  });

  describe('promisify', () => {
    test('should wrap function result in promise', async () => {
      const syncFn = (x: number) => x * 2;
      const promisifiedFn = FunctionalUtils.promisify(syncFn);
      
      const result = await promisifiedFn(5);
      expect(result).toBe(10);
    });
  });

  describe('retry', () => {
    test('should retry failed function', async () => {
      let attempts = 0;
      const flakyFn = async () => {
        attempts++;
        if (attempts < 3) {
          throw new Error('Temporary failure');
        }
        return 'success';
      };

      const result = await FunctionalUtils.retry(flakyFn, 3, 10);
      expect(result).toBe('success');
      expect(attempts).toBe(3);
    });

    test('should throw after max attempts', async () => {
      const alwaysFailFn = async () => {
        throw new Error('Always fails');
      };

      await expect(FunctionalUtils.retry(alwaysFailFn, 2, 10)).rejects.toThrow('Always fails');
    });
  });

  describe('batch', () => {
    test('should batch multiple calls', async () => {
      const processor = jest.fn(async (items: number[]) => 
        items.map(x => x * 2)
      );
      
      const batchFn = FunctionalUtils.batch(processor, 3, 0);
      
      const promises = [
        batchFn(1),
        batchFn(2),
        batchFn(3),
      ];
      
      const results = await Promise.all(promises);
      expect(results).toEqual([2, 4, 6]);
      expect(processor).toHaveBeenCalledTimes(1);
      expect(processor).toHaveBeenCalledWith([1, 2, 3]);
    });

    test('should handle batch size limit', async () => {
      const processor = jest.fn(async (items: number[]) => 
        items.map(x => x * 2)
      );
      
      const batchFn = FunctionalUtils.batch(processor, 2, 0);
      
      const promises = [
        batchFn(1),
        batchFn(2),
        batchFn(3),
      ];
      
      const results = await Promise.all(promises);
      expect(results).toEqual([2, 4, 6]);
      expect(processor).toHaveBeenCalledTimes(2);
    });
  });
});
