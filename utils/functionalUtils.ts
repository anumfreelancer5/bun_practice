/**
 * Functional programming utility functions
 */

/**
 * Creates a debounced function that delays invoking func until after wait milliseconds
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | undefined;

  return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
    const context = this;

    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), wait);
  };
}

/**
 * Creates a throttled function that only invokes func at most once per every wait milliseconds
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;

  return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
    const context = this;

    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), wait);
    }
  };
}

/**
 * Creates a memoized version of a function
 */
export function memoize<T extends (...args: any[]) => any>(
  func: T,
  keyGenerator?: (...args: Parameters<T>) => string
): T {
  const cache = new Map<string, ReturnType<T>>();

  return ((...args: Parameters<T>) => {
    const key = keyGenerator ? keyGenerator(...args) : JSON.stringify(args);

    if (cache.has(key)) {
      return cache.get(key)!;
    }

    const result = func(...args);
    cache.set(key, result);
    return result;
  }) as T;
}

/**
 * Creates a function that is the composition of the provided functions
 */
export function compose<T>(...functions: Array<(arg: any) => any>): (arg: T) => any {
  return (arg: T) => functions.reduceRight((result, fn) => fn(result), arg);
}

/**
 * Creates a function that is the composition of the provided functions (left to right)
 */
export function pipe<T>(...functions: Array<(arg: any) => any>): (arg: T) => any {
  return (arg: T) => functions.reduce((result, fn) => fn(result), arg);
}

/**
 * Creates a curried version of a function
 */
export function curry<T extends (...args: any[]) => any>(func: T): any {
  return function curried(this: ThisParameterType<T>, ...args: any[]): any {
    if (args.length >= func.length) {
      return func.apply(this, args);
    }
    return (...nextArgs: any[]) => curried.apply(this, [...args, ...nextArgs]);
  };
}

/**
 * Creates a partially applied function
 */
export function partial<T extends (...args: any[]) => any>(
  func: T,
  ...partialArgs: any[]
): (...args: any[]) => ReturnType<T> {
  return (...remainingArgs: any[]) => func(...partialArgs, ...remainingArgs);
}

/**
 * Creates a function that negates the result of a predicate function
 */
export function negate<T extends (...args: any[]) => boolean>(
  predicate: T
): (...args: Parameters<T>) => boolean {
  return (...args: Parameters<T>) => !predicate(...args);
}

/**
 * Creates a function that returns a constant value
 */
export function constant<T>(value: T): () => T {
  return () => value;
}

/**
 * Identity function - returns its argument unchanged
 */
export function identity<T>(value: T): T {
  return value;
}

/**
 * Creates a function that always returns the same value regardless of arguments
 */
export function always<T>(value: T): (...args: any[]) => T {
  return () => value;
}

/**
 * Creates a function that calls the provided function once and caches the result
 */
export function once<T extends (...args: any[]) => any>(func: T): T {
  let called = false;
  let result: ReturnType<T>;

  return ((...args: Parameters<T>) => {
    if (!called) {
      called = true;
      result = func(...args);
    }
    return result;
  }) as T;
}

/**
 * Creates a function that can only be called a limited number of times
 */
export function times<T extends (...args: any[]) => any>(n: number, func: T): T {
  let count = 0;
  let result: ReturnType<T>;

  return ((...args: Parameters<T>) => {
    if (count < n) {
      count++;
      result = func(...args);
    }
    return result;
  }) as T;
}

/**
 * Creates a function that invokes func after it's called n times
 */
export function after<T extends (...args: any[]) => any>(n: number, func: T): T {
  let count = 0;

  return ((...args: Parameters<T>) => {
    count++;
    if (count >= n) {
      return func(...args);
    }
  }) as T;
}

/**
 * Creates a function that invokes func only before it's called n times
 */
export function before<T extends (...args: any[]) => any>(n: number, func: T): T {
  let count = 0;
  let result: ReturnType<T>;

  return ((...args: Parameters<T>) => {
    if (count < n) {
      count++;
      result = func(...args);
    }
    return result;
  }) as T;
}

/**
 * Creates a function that flips the order of arguments
 */
export function flip<T extends (a: any, b: any, ...rest: any[]) => any>(
  func: T
): (
  b: Parameters<T>[1],
  a: Parameters<T>[0],
  ...rest: Parameters<T> extends [any, any, ...infer Rest] ? Rest : []
) => ReturnType<T> {
  return (b, a, ...rest) => func(a, b, ...rest);
}

/**
 * Creates a function that accepts arguments in reverse order
 */
export function reverseArgs<T extends (...args: any[]) => any>(func: T): T {
  return ((...args: Parameters<T>) => func(...args.reverse())) as T;
}

/**
 * Tries to invoke a function and returns the result or a default value on error
 */
export function attempt<T, D>(func: () => T, defaultValue: D): T | D {
  try {
    return func();
  } catch {
    return defaultValue;
  }
}

/**
 * Creates a function that invokes iteratees with the arguments it receives
 */
export function over<T extends (...args: any[]) => any>(
  ...iteratees: T[]
): (...args: Parameters<T>) => ReturnType<T>[] {
  return (...args: Parameters<T>) => iteratees.map(fn => fn(...args));
}

/**
 * Creates a function that checks if all iteratees return truthy for the arguments
 */
export function overEvery<T extends (...args: any[]) => boolean>(
  ...predicates: T[]
): (...args: Parameters<T>) => boolean {
  return (...args: Parameters<T>) => predicates.every(predicate => predicate(...args));
}

/**
 * Creates a function that checks if any iteratee returns truthy for the arguments
 */
export function overSome<T extends (...args: any[]) => boolean>(
  ...predicates: T[]
): (...args: Parameters<T>) => boolean {
  return (...args: Parameters<T>) => predicates.some(predicate => predicate(...args));
}

/**
 * Creates a function that invokes the provided function with a delay
 */
export function delay<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => Promise<ReturnType<T>> {
  return (...args: Parameters<T>) => {
    return new Promise<ReturnType<T>>(resolve => {
      setTimeout(() => {
        resolve(func(...args));
      }, wait);
    });
  };
}

/**
 * Creates a function that returns a promise that resolves with the function result
 */
export function promisify<T extends (...args: any[]) => any>(
  func: T
): (...args: Parameters<T>) => Promise<ReturnType<T>> {
  return (...args: Parameters<T>) => Promise.resolve(func(...args));
}

/**
 * Retries a function a specified number of times
 */
export async function retry<T>(
  func: () => Promise<T>,
  maxAttempts: number,
  delayMs: number = 1000
): Promise<T> {
  let lastError: Error;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await func();
    } catch (error) {
      lastError = error as Error;
      if (attempt < maxAttempts) {
        await new Promise(resolve => setTimeout(resolve, delayMs));
      }
    }
  }

  throw lastError!;
}

/**
 * Creates a function that batches multiple calls and processes them together
 */
export function batch<T, R>(
  processor: (items: T[]) => Promise<R[]> | R[],
  batchSize: number = 10,
  delayMs: number = 0
): (item: T) => Promise<R> {
  let items: T[] = [];
  let resolvers: Array<{ resolve: (value: R) => void; reject: (reason: any) => void }> = [];
  let timeout: ReturnType<typeof setTimeout> | undefined;

  const processBatch = async () => {
    const currentItems = [...items];
    const currentResolvers = [...resolvers];

    items = [];
    resolvers = [];

    try {
      const results = await processor(currentItems);
      currentResolvers.forEach((resolver, index) => {
        resolver.resolve(results[index]!);
      });
    } catch (error) {
      currentResolvers.forEach(resolver => {
        resolver.reject(error);
      });
    }
  };

  return (item: T) => {
    return new Promise<R>((resolve, reject) => {
      items.push(item);
      resolvers.push({ resolve, reject });

      if (items.length >= batchSize) {
        clearTimeout(timeout);
        processBatch();
      } else if (delayMs > 0 && !timeout) {
        timeout = setTimeout(() => {
          timeout = undefined;
          processBatch();
        }, delayMs);
      } else if (delayMs === 0) {
        // Process immediately if no delay
        setTimeout(processBatch, 0);
      }
    });
  };
}
