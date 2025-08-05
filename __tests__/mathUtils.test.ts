import { describe, expect, test } from 'bun:test';
import * as MathUtils from '../utils/mathUtils';

describe('MathUtils', () => {
  describe('clamp', () => {
    test('should clamp number within range', () => {
      expect(MathUtils.clamp(5, 0, 10)).toBe(5);
      expect(MathUtils.clamp(-5, 0, 10)).toBe(0);
      expect(MathUtils.clamp(15, 0, 10)).toBe(10);
    });
  });

  describe('average', () => {
    test('should calculate average', () => {
      expect(MathUtils.average([1, 2, 3, 4, 5])).toBe(3);
      expect(MathUtils.average([10, 20])).toBe(15);
      expect(MathUtils.average([5])).toBe(5);
    });
  });

  describe('isPrime', () => {
    test('should check if number is prime', () => {
      expect(MathUtils.isPrime(2)).toBe(true);
      expect(MathUtils.isPrime(17)).toBe(true);
      expect(MathUtils.isPrime(4)).toBe(false);
      expect(MathUtils.isPrime(1)).toBe(false);
      expect(MathUtils.isPrime(0)).toBe(false);
    });
  });

  describe('factorial', () => {
    test('should calculate factorial', () => {
      expect(MathUtils.factorial(0)).toBe(1);
      expect(MathUtils.factorial(1)).toBe(1);
      expect(MathUtils.factorial(5)).toBe(120);
      expect(MathUtils.factorial(10)).toBe(3628800);
    });
  });

  describe('fibonacci', () => {
    test('should generate fibonacci sequence', () => {
      expect(MathUtils.fibonacci(0)).toEqual([]);
      expect(MathUtils.fibonacci(1)).toEqual([0]);
      expect(MathUtils.fibonacci(5)).toEqual([0, 1, 1, 2, 3]);
    });
  });

  describe('gcd', () => {
    test('should calculate greatest common divisor', () => {
      expect(MathUtils.gcd(12, 8)).toBe(4);
      expect(MathUtils.gcd(17, 13)).toBe(1);
      expect(MathUtils.gcd(100, 25)).toBe(25);
    });
  });

  describe('lerp', () => {
    test('should interpolate between values', () => {
      expect(MathUtils.lerp(0, 10, 0.5)).toBe(5);
      expect(MathUtils.lerp(10, 20, 0.25)).toBe(12.5);
      expect(MathUtils.lerp(0, 100, 0)).toBe(0);
      expect(MathUtils.lerp(0, 100, 1)).toBe(100);
    });
  });

  describe('roundTo', () => {
    test('should round to specified decimal places', () => {
      expect(MathUtils.roundTo(3.14159, 2)).toBe(3.14);
      expect(MathUtils.roundTo(2.7777, 3)).toBe(2.778);
      expect(MathUtils.roundTo(5, 2)).toBe(5);
    });
  });

  describe('isEven', () => {
    test('should check if number is even', () => {
      expect(MathUtils.isEven(2)).toBe(true);
      expect(MathUtils.isEven(3)).toBe(false);
      expect(MathUtils.isEven(0)).toBe(true);
    });
  });

  describe('percentage', () => {
    test('should calculate percentage', () => {
      expect(MathUtils.percentage(25, 100)).toBe(25);
      expect(MathUtils.percentage(1, 8)).toBe(12.5);
      expect(MathUtils.percentage(0, 100)).toBe(0);
    });
  });

  describe('mapRange', () => {
    test('should map value from one range to another', () => {
      expect(MathUtils.mapRange(5, 0, 10, 0, 100)).toBe(50);
      expect(MathUtils.mapRange(2, 0, 10, 100, 200)).toBe(120);
    });

    test('should throw error for zero-width input range', () => {
      expect(() => MathUtils.mapRange(5, 10, 10, 0, 100)).toThrow('Input range cannot have zero width');
    });
  });

  describe('randomBetween', () => {
    test('should generate random number in range', () => {
      const result = MathUtils.randomBetween(1, 10);
      expect(result).toBeGreaterThanOrEqual(1);
      expect(result).toBeLessThan(10);
    });
  });

  describe('randomIntBetween', () => {
    test('should generate random integer in range', () => {
      const result = MathUtils.randomIntBetween(1, 5);
      expect(result).toBeGreaterThanOrEqual(1);
      expect(result).toBeLessThanOrEqual(5);
      expect(Number.isInteger(result)).toBe(true);
    });
  });

  describe('isOdd', () => {
    test('should check if number is odd', () => {
      expect(MathUtils.isOdd(1)).toBe(true);
      expect(MathUtils.isOdd(2)).toBe(false);
      expect(MathUtils.isOdd(3)).toBe(true);
      expect(MathUtils.isOdd(0)).toBe(false);
    });
  });

  describe('lcm', () => {
    test('should calculate least common multiple', () => {
      expect(MathUtils.lcm(12, 8)).toBe(24);
      expect(MathUtils.lcm(15, 20)).toBe(60);
      expect(MathUtils.lcm(7, 13)).toBe(91);
    });
  });

  describe('toRadians', () => {
    test('should convert degrees to radians', () => {
      expect(MathUtils.toRadians(180)).toBeCloseTo(Math.PI);
      expect(MathUtils.toRadians(90)).toBeCloseTo(Math.PI / 2);
      expect(MathUtils.toRadians(0)).toBe(0);
    });
  });

  describe('toDegrees', () => {
    test('should convert radians to degrees', () => {
      expect(MathUtils.toDegrees(Math.PI)).toBeCloseTo(180);
      expect(MathUtils.toDegrees(Math.PI / 2)).toBeCloseTo(90);
      expect(MathUtils.toDegrees(0)).toBe(0);
    });
  });

  describe('distance', () => {
    test('should calculate distance between two points', () => {
      expect(MathUtils.distance(0, 0, 3, 4)).toBe(5);
      expect(MathUtils.distance(1, 1, 4, 5)).toBe(5);
      expect(MathUtils.distance(0, 0, 0, 0)).toBe(0);
    });
  });

  describe('median', () => {
    test('should calculate median', () => {
      expect(MathUtils.median([1, 2, 3, 4, 5])).toBe(3);
      expect(MathUtils.median([1, 2, 3, 4])).toBe(2.5);
      expect(MathUtils.median([5])).toBe(5);
      expect(MathUtils.median([])).toBe(0);
    });
  });

  describe('mode', () => {
    test('should calculate mode', () => {
      expect(MathUtils.mode([1, 2, 2, 3, 4])).toEqual([2]);
      expect(MathUtils.mode([1, 1, 2, 2, 3])).toEqual([1, 2]);
      expect(MathUtils.mode([1, 2, 3])).toEqual([1, 2, 3]);
      expect(MathUtils.mode([])).toEqual([]);
    });
  });

  describe('standardDeviation', () => {
    test('should calculate standard deviation', () => {
      expect(MathUtils.standardDeviation([2, 4, 4, 4, 5, 5, 7, 9])).toBeCloseTo(2);
      expect(MathUtils.standardDeviation([1, 1, 1, 1])).toBe(0);
      expect(MathUtils.standardDeviation([])).toBe(0);
    });
  });

  describe('sum', () => {
    test('should calculate sum', () => {
      expect(MathUtils.sum([1, 2, 3, 4, 5])).toBe(15);
      expect(MathUtils.sum([10, -5, 3])).toBe(8);
      expect(MathUtils.sum([])).toBe(0);
    });
  });

  describe('product', () => {
    test('should calculate product', () => {
      expect(MathUtils.product([1, 2, 3, 4])).toBe(24);
      expect(MathUtils.product([2, 5])).toBe(10);
      expect(MathUtils.product([])).toBe(1);
    });
  });

  describe('isNearlyEqual', () => {
    test('should check if numbers are nearly equal', () => {
      expect(MathUtils.isNearlyEqual(0.1 + 0.2, 0.3)).toBe(false); // Due to floating point precision
      expect(MathUtils.isNearlyEqual(0.1 + 0.2, 0.3, 0.001)).toBe(true);
      expect(MathUtils.isNearlyEqual(1, 1)).toBe(true);
    });
  });

  describe('normalize', () => {
    test('should normalize value to 0-1 range', () => {
      expect(MathUtils.normalize(5, 0, 10)).toBe(0.5);
      expect(MathUtils.normalize(0, 0, 10)).toBe(0);
      expect(MathUtils.normalize(10, 0, 10)).toBe(1);
      expect(MathUtils.normalize(5, 5, 5)).toBe(0); // Edge case where min equals max
    });
  });

  describe('smoothstep', () => {
    test('should perform smoothstep interpolation', () => {
      expect(MathUtils.smoothstep(0, 1, 0.5)).toBe(0.5);
      expect(MathUtils.smoothstep(0, 1, 0)).toBe(0);
      expect(MathUtils.smoothstep(0, 1, 1)).toBe(1);
    });
  });

  describe('percentageOf', () => {
    test('should calculate value from percentage of total', () => {
      expect(MathUtils.percentageOf(50, 100)).toBe(50);
      expect(MathUtils.percentageOf(25, 200)).toBe(50);
      expect(MathUtils.percentageOf(0, 100)).toBe(0);
    });
  });

  describe('toOrdinal', () => {
    test('should convert number to ordinal', () => {
      expect(MathUtils.toOrdinal(1)).toBe('1st');
      expect(MathUtils.toOrdinal(2)).toBe('2nd');
      expect(MathUtils.toOrdinal(3)).toBe('3rd');
      expect(MathUtils.toOrdinal(4)).toBe('4th');
      expect(MathUtils.toOrdinal(21)).toBe('21st');
      expect(MathUtils.toOrdinal(22)).toBe('22nd');
      expect(MathUtils.toOrdinal(23)).toBe('23rd');
    });
  });

  describe('isPerfectSquare', () => {
    test('should check if number is perfect square', () => {
      expect(MathUtils.isPerfectSquare(16)).toBe(true);
      expect(MathUtils.isPerfectSquare(25)).toBe(true);
      expect(MathUtils.isPerfectSquare(15)).toBe(false);
      expect(MathUtils.isPerfectSquare(-4)).toBe(false);
      expect(MathUtils.isPerfectSquare(0)).toBe(true);
    });
  });

  describe('isPowerOfTwo', () => {
    test('should check if number is power of two', () => {
      expect(MathUtils.isPowerOfTwo(1)).toBe(true);
      expect(MathUtils.isPowerOfTwo(2)).toBe(true);
      expect(MathUtils.isPowerOfTwo(4)).toBe(true);
      expect(MathUtils.isPowerOfTwo(8)).toBe(true);
      expect(MathUtils.isPowerOfTwo(3)).toBe(false);
      expect(MathUtils.isPowerOfTwo(0)).toBe(false);
    });
  });

  describe('nextPowerOfTwo', () => {
    test('should find next power of two', () => {
      expect(MathUtils.nextPowerOfTwo(1)).toBe(1);
      expect(MathUtils.nextPowerOfTwo(2)).toBe(2);
      expect(MathUtils.nextPowerOfTwo(3)).toBe(4);
      expect(MathUtils.nextPowerOfTwo(5)).toBe(8);
      expect(MathUtils.nextPowerOfTwo(15)).toBe(16);
    });
  });

  describe('digitalRoot', () => {
    test('should calculate digital root', () => {
      expect(MathUtils.digitalRoot(38)).toBe(2); // 3+8=11, 1+1=2
      expect(MathUtils.digitalRoot(123)).toBe(6); // 1+2+3=6
      expect(MathUtils.digitalRoot(0)).toBe(0);
      expect(MathUtils.digitalRoot(9)).toBe(9);
    });
  });

  describe('nthRoot', () => {
    test('should calculate nth root', () => {
      expect(MathUtils.nthRoot(8, 3)).toBeCloseTo(2);
      expect(MathUtils.nthRoot(16, 4)).toBeCloseTo(2);
      expect(MathUtils.nthRoot(25, 2)).toBeCloseTo(5);
    });

    test('should throw error for 0th root', () => {
      expect(() => MathUtils.nthRoot(8, 0)).toThrow('Cannot calculate 0th root');
    });
  });

  describe('binomial', () => {
    test('should calculate binomial coefficient', () => {
      expect(MathUtils.binomial(5, 2)).toBe(10);
      expect(MathUtils.binomial(10, 3)).toBe(120);
      expect(MathUtils.binomial(5, 0)).toBe(1);
      expect(MathUtils.binomial(5, 5)).toBe(1);
      expect(MathUtils.binomial(5, 6)).toBe(0);
    });
  });

  describe('hypot', () => {
    test('should calculate hypotenuse', () => {
      expect(MathUtils.hypot(3, 4)).toBe(5);
      expect(MathUtils.hypot(5, 12)).toBe(13);
      expect(MathUtils.hypot(0, 0)).toBe(0);
    });
  });

  describe('circleArea', () => {
    test('should calculate circle area', () => {
      expect(MathUtils.circleArea(1)).toBeCloseTo(Math.PI);
      expect(MathUtils.circleArea(2)).toBeCloseTo(4 * Math.PI);
      expect(MathUtils.circleArea(0)).toBe(0);
    });
  });

  describe('circleCircumference', () => {
    test('should calculate circle circumference', () => {
      expect(MathUtils.circleCircumference(1)).toBeCloseTo(2 * Math.PI);
      expect(MathUtils.circleCircumference(2)).toBeCloseTo(4 * Math.PI);
      expect(MathUtils.circleCircumference(0)).toBe(0);
    });
  });

  describe('triangleArea', () => {
    test('should calculate triangle area using Heron\'s formula', () => {
      expect(MathUtils.triangleArea(3, 4, 5)).toBeCloseTo(6);
      expect(MathUtils.triangleArea(5, 5, 8)).toBeCloseTo(12);
    });
  });

  describe('temperature', () => {
    test('should convert between temperature scales', () => {
      expect(MathUtils.temperature.celsiusToFahrenheit(0)).toBe(32);
      expect(MathUtils.temperature.fahrenheitToCelsius(32)).toBe(0);
      expect(MathUtils.temperature.celsiusToKelvin(0)).toBe(273.15);
      expect(MathUtils.temperature.kelvinToCelsius(273.15)).toBe(0);
      expect(MathUtils.temperature.fahrenheitToKelvin(32)).toBe(273.15);
      expect(MathUtils.temperature.kelvinToFahrenheit(273.15)).toBe(32);
    });
  });

  describe('sequence', () => {
    test('should generate arithmetic sequence', () => {
      expect(MathUtils.sequence(1, 5, 2)).toEqual([1, 3, 5, 7, 9]);
      expect(MathUtils.sequence(0, 3, 1)).toEqual([0, 1, 2]);
    });

    test('should generate sequence with function step', () => {
      const fibonacci = (prev: number, index: number) => index === 0 ? 1 : prev + (index === 1 ? 1 : 0);
      // This is a simple test - the actual fibonacci logic would be more complex
      expect(MathUtils.sequence(0, 3, (prev) => prev + 1)).toEqual([0, 1, 2]);
    });
  });

  describe('divisors', () => {
    test('should find all divisors', () => {
      expect(MathUtils.divisors(12)).toEqual([1, 2, 3, 4, 6, 12]);
      expect(MathUtils.divisors(7)).toEqual([1, 7]);
      expect(MathUtils.divisors(1)).toEqual([1]);
    });
  });

  describe('variance', () => {
    test('should calculate population variance', () => {
      expect(MathUtils.variance([1, 2, 3, 4, 5])).toBe(2);
      expect(MathUtils.variance([1, 1, 1])).toBe(0);
    });

    test('should calculate sample variance', () => {
      expect(MathUtils.variance([1, 2, 3, 4, 5], true)).toBe(2.5);
    });
  });

  describe('range', () => {
    test('should calculate range of numbers', () => {
      expect(MathUtils.range([1, 5, 3, 9, 2])).toBe(8); // 9 - 1
      expect(MathUtils.range([5, 5, 5])).toBe(0);
      expect(MathUtils.range([])).toBe(0);
    });
  });

  describe('geometricMean', () => {
    test('should calculate geometric mean', () => {
      expect(MathUtils.geometricMean([1, 2, 8])).toBeCloseTo(2);
      expect(MathUtils.geometricMean([4, 9])).toBeCloseTo(6);
    });

    test('should throw error for non-positive numbers', () => {
      expect(() => MathUtils.geometricMean([1, -2, 3])).toThrow('Geometric mean requires all positive numbers');
    });
  });

  describe('harmonicMean', () => {
    test('should calculate harmonic mean', () => {
      expect(MathUtils.harmonicMean([1, 2, 4])).toBeCloseTo(1.714, 3);
      expect(MathUtils.harmonicMean([2, 2, 2])).toBe(2);
    });

    test('should throw error for arrays containing zero', () => {
      expect(() => MathUtils.harmonicMean([1, 0, 3])).toThrow('Harmonic mean is undefined for arrays containing zero');
    });
  });
});
