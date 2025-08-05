import { describe, expect, test } from 'bun:test';
import * as ValidationUtils from '../utils/validationUtils';

describe('ValidationUtils', () => {
  describe('isEmail', () => {
    test('should validate email addresses', () => {
      expect(ValidationUtils.isEmail('user@example.com')).toBe(true);
      expect(ValidationUtils.isEmail('test.email+tag@domain.co.uk')).toBe(true);
      expect(ValidationUtils.isEmail('invalid-email')).toBe(false);
      expect(ValidationUtils.isEmail('user@')).toBe(false);
      expect(ValidationUtils.isEmail('')).toBe(false);
    });
  });

  describe('isURL', () => {
    test('should validate URLs', () => {
      expect(ValidationUtils.isURL('https://example.com')).toBe(true);
      expect(ValidationUtils.isURL('http://test.org/path?query=1')).toBe(true);
      expect(ValidationUtils.isURL('ftp://files.example.com')).toBe(true);
      expect(ValidationUtils.isURL('not-a-url')).toBe(false);
      expect(ValidationUtils.isURL('')).toBe(false);
    });
  });

  describe('isCreditCard', () => {
    test('should validate credit card numbers', () => {
      expect(ValidationUtils.isCreditCard('4532015112830366')).toBe(true); // Visa test number
      expect(ValidationUtils.isCreditCard('5555555555554444')).toBe(true); // Mastercard test number
      expect(ValidationUtils.isCreditCard('1234567890123456')).toBe(false);
      expect(ValidationUtils.isCreditCard('123')).toBe(false);
    });
  });

  describe('isInRange', () => {
    test('should check if number is in range', () => {
      expect(ValidationUtils.isInRange(5, 0, 10)).toBe(true);
      expect(ValidationUtils.isInRange(0, 0, 10)).toBe(true);
      expect(ValidationUtils.isInRange(10, 0, 10)).toBe(true);
      expect(ValidationUtils.isInRange(-1, 0, 10)).toBe(false);
      expect(ValidationUtils.isInRange(11, 0, 10)).toBe(false);
    });
  });

  describe('isUUID', () => {
    test('should validate UUID format', () => {
      expect(ValidationUtils.isUUID('550e8400-e29b-41d4-a716-446655440000')).toBe(true);
      expect(ValidationUtils.isUUID('6ba7b810-9dad-11d1-80b4-00c04fd430c8')).toBe(true);
      expect(ValidationUtils.isUUID('not-a-uuid')).toBe(false);
      expect(ValidationUtils.isUUID('550e8400-e29b-41d4-a716')).toBe(false);
    });
  });

  describe('isHexColor', () => {
    test('should validate hex color format', () => {
      expect(ValidationUtils.isHexColor('#ff0000')).toBe(true);
      expect(ValidationUtils.isHexColor('#FF0000')).toBe(true);
      expect(ValidationUtils.isHexColor('#f00')).toBe(true);
      expect(ValidationUtils.isHexColor('ff0000')).toBe(false);
      expect(ValidationUtils.isHexColor('#gg0000')).toBe(false);
    });
  });

  describe('isOneOf', () => {
    test('should check if value is in allowed list', () => {
      expect(ValidationUtils.isOneOf('red', ['red', 'blue', 'green'])).toBe(true);
      expect(ValidationUtils.isOneOf('yellow', ['red', 'blue', 'green'])).toBe(false);
      expect(ValidationUtils.isOneOf(42, [1, 42, 100])).toBe(true);
    });
  });

  describe('isBlank', () => {
    test('should check if string is blank', () => {
      expect(ValidationUtils.isBlank('')).toBe(true);
      expect(ValidationUtils.isBlank('   ')).toBe(true);
      expect(ValidationUtils.isBlank('hello')).toBe(false);
    });
  });

  describe('isEmpty', () => {
    test('should check if value is empty', () => {
      expect(ValidationUtils.isEmpty('')).toBe(true);
      expect(ValidationUtils.isEmpty([])).toBe(true);
      expect(ValidationUtils.isEmpty({})).toBe(true);
      expect(ValidationUtils.isEmpty('hello')).toBe(false);
      expect(ValidationUtils.isEmpty([1, 2, 3])).toBe(false);
    });
  });

  describe('isInteger', () => {
    test('should check if value is integer', () => {
      expect(ValidationUtils.isInteger(42)).toBe(true);
      expect(ValidationUtils.isInteger(0)).toBe(true);
      expect(ValidationUtils.isInteger(3.14)).toBe(false);
      expect(ValidationUtils.isInteger('42')).toBe(false);
    });
  });

  describe('isNil', () => {
    test('should check if value is nil (null or undefined)', () => {
      expect(ValidationUtils.isNil(null)).toBe(true);
      expect(ValidationUtils.isNil(undefined)).toBe(true);
      expect(ValidationUtils.isNil(0)).toBe(false);
      expect(ValidationUtils.isNil('')).toBe(false);
      expect(ValidationUtils.isNil(false)).toBe(false);
    });
  });

  describe('isNotNil', () => {
    test('should check if value is not nil', () => {
      expect(ValidationUtils.isNotNil(null)).toBe(false);
      expect(ValidationUtils.isNotNil(undefined)).toBe(false);
      expect(ValidationUtils.isNotNil(0)).toBe(true);
      expect(ValidationUtils.isNotNil('')).toBe(true);
      expect(ValidationUtils.isNotNil(false)).toBe(true);
    });
  });

  describe('isArray', () => {
    test('should check if value is an array', () => {
      expect(ValidationUtils.isArray([])).toBe(true);
      expect(ValidationUtils.isArray([1, 2, 3])).toBe(true);
      expect(ValidationUtils.isArray('array')).toBe(false);
      expect(ValidationUtils.isArray({ length: 0 })).toBe(false);
    });
  });

  describe('isObject', () => {
    test('should check if value is a plain object', () => {
      expect(ValidationUtils.isObject({})).toBe(true);
      expect(ValidationUtils.isObject({ a: 1 })).toBe(true);
      expect(ValidationUtils.isObject([])).toBe(false);
      expect(ValidationUtils.isObject(null)).toBe(false);
      expect(ValidationUtils.isObject('object')).toBe(false);
    });
  });

  describe('isFunction', () => {
    test('should check if value is a function', () => {
      expect(ValidationUtils.isFunction(() => {})).toBe(true);
      expect(ValidationUtils.isFunction(function() {})).toBe(true);
      expect(ValidationUtils.isFunction(Math.max)).toBe(true);
      expect(ValidationUtils.isFunction('function')).toBe(false);
      expect(ValidationUtils.isFunction({})).toBe(false);
    });
  });

  describe('isBoolean', () => {
    test('should check if value is a boolean', () => {
      expect(ValidationUtils.isBoolean(true)).toBe(true);
      expect(ValidationUtils.isBoolean(false)).toBe(true);
      expect(ValidationUtils.isBoolean(1)).toBe(false);
      expect(ValidationUtils.isBoolean('true')).toBe(false);
    });
  });

  describe('isDate', () => {
    test('should check if value is a valid Date object', () => {
      expect(ValidationUtils.isDate(new Date())).toBe(true);
      expect(ValidationUtils.isDate(new Date('2023-01-01'))).toBe(true);
      expect(ValidationUtils.isDate(new Date('invalid'))).toBe(false);
      expect(ValidationUtils.isDate('2023-01-01')).toBe(false);
    });
  });

  describe('isRegExp', () => {
    test('should check if value is a RegExp', () => {
      expect(ValidationUtils.isRegExp(/test/)).toBe(true);
      expect(ValidationUtils.isRegExp(new RegExp('test'))).toBe(true);
      expect(ValidationUtils.isRegExp('/test/')).toBe(false);
      expect(ValidationUtils.isRegExp({})).toBe(false);
    });
  });

  describe('isPromise', () => {
    test('should check if value is a Promise', () => {
      expect(ValidationUtils.isPromise(Promise.resolve(1))).toBe(true);
      expect(ValidationUtils.isPromise(new Promise(() => {}))).toBe(true);
      expect(ValidationUtils.isPromise({ then: () => {} })).toBe(true); // thenable objects are considered promises
      expect(ValidationUtils.isPromise({})).toBe(false);
    });
  });

  describe('isNotEmpty', () => {
    test('should check if value is not empty', () => {
      expect(ValidationUtils.isNotEmpty('test')).toBe(true);
      expect(ValidationUtils.isNotEmpty([1])).toBe(true);
      expect(ValidationUtils.isNotEmpty({ a: 1 })).toBe(true);
      expect(ValidationUtils.isNotEmpty('')).toBe(false);
      expect(ValidationUtils.isNotEmpty([])).toBe(false);
      expect(ValidationUtils.isNotEmpty({})).toBe(false);
    });
  });

  describe('isBlank', () => {
    test('should check if string is blank (empty or whitespace)', () => {
      expect(ValidationUtils.isBlank('')).toBe(true);
      expect(ValidationUtils.isBlank('   ')).toBe(true);
      expect(ValidationUtils.isBlank('\t\n')).toBe(true);
      expect(ValidationUtils.isBlank('test')).toBe(false);
      expect(ValidationUtils.isBlank(' test ')).toBe(false);
    });
  });

  describe('isNotBlank', () => {
    test('should check if string is not blank', () => {
      expect(ValidationUtils.isNotBlank('test')).toBe(true);
      expect(ValidationUtils.isNotBlank(' test ')).toBe(true);
      expect(ValidationUtils.isNotBlank('')).toBe(false);
      expect(ValidationUtils.isNotBlank('   ')).toBe(false);
      expect(ValidationUtils.isNotBlank('\t\n')).toBe(false);
    });
  });

  describe('isFloat', () => {
    test('should check if value is a float', () => {
      expect(ValidationUtils.isFloat(3.14)).toBe(true);
      expect(ValidationUtils.isFloat(0.5)).toBe(true);
      expect(ValidationUtils.isFloat(42)).toBe(false);
      expect(ValidationUtils.isFloat('3.14')).toBe(false);
    });
  });

  describe('isPositive', () => {
    test('should check if number is positive', () => {
      expect(ValidationUtils.isPositive(1)).toBe(true);
      expect(ValidationUtils.isPositive(0.1)).toBe(true);
      expect(ValidationUtils.isPositive(0)).toBe(false);
      expect(ValidationUtils.isPositive(-1)).toBe(false);
    });
  });

  describe('isNegative', () => {
    test('should check if number is negative', () => {
      expect(ValidationUtils.isNegative(-1)).toBe(true);
      expect(ValidationUtils.isNegative(-0.1)).toBe(true);
      expect(ValidationUtils.isNegative(0)).toBe(false);
      expect(ValidationUtils.isNegative(1)).toBe(false);
    });
  });

  describe('isZero', () => {
    test('should check if number is zero', () => {
      expect(ValidationUtils.isZero(0)).toBe(true);
      expect(ValidationUtils.isZero(-0)).toBe(true);
      expect(ValidationUtils.isZero(1)).toBe(false);
      expect(ValidationUtils.isZero(-1)).toBe(false);
    });
  });

  describe('isFinite', () => {
    test('should check if number is finite', () => {
      expect(ValidationUtils.isFinite(42)).toBe(true);
      expect(ValidationUtils.isFinite(3.14)).toBe(true);
      expect(ValidationUtils.isFinite(Infinity)).toBe(false);
      expect(ValidationUtils.isFinite(-Infinity)).toBe(false);
      expect(ValidationUtils.isFinite(NaN)).toBe(false);
    });
  });

  describe('isNaN', () => {
    test('should check if value is NaN', () => {
      expect(ValidationUtils.isNaN(NaN)).toBe(true);
      expect(ValidationUtils.isNaN(Number.NaN)).toBe(true);
      expect(ValidationUtils.isNaN(0 / 0)).toBe(true);
      expect(ValidationUtils.isNaN(42)).toBe(false);
      expect(ValidationUtils.isNaN('42')).toBe(false);
    });
  });

  describe('isEven', () => {
    test('should check if number is even', () => {
      expect(ValidationUtils.isEven(2)).toBe(true);
      expect(ValidationUtils.isEven(0)).toBe(true);
      expect(ValidationUtils.isEven(-2)).toBe(true);
      expect(ValidationUtils.isEven(1)).toBe(false);
      expect(ValidationUtils.isEven(3)).toBe(false);
    });
  });

  describe('isOdd', () => {
    test('should check if number is odd', () => {
      expect(ValidationUtils.isOdd(1)).toBe(true);
      expect(ValidationUtils.isOdd(3)).toBe(true);
      expect(ValidationUtils.isOdd(-1)).toBe(true);
      expect(ValidationUtils.isOdd(2)).toBe(false);
      expect(ValidationUtils.isOdd(0)).toBe(false);
    });
  });

  describe('isInRange', () => {
    test('should check if number is in range', () => {
      expect(ValidationUtils.isInRange(5, 1, 10)).toBe(true);
      expect(ValidationUtils.isInRange(1, 1, 10)).toBe(true);
      expect(ValidationUtils.isInRange(10, 1, 10)).toBe(true);
      expect(ValidationUtils.isInRange(0, 1, 10)).toBe(false);
      expect(ValidationUtils.isInRange(11, 1, 10)).toBe(false);
    });
  });

  describe('isJSON', () => {
    test('should validate JSON strings', () => {
      expect(ValidationUtils.isJSON('{"name": "John"}')).toBe(true);
      expect(ValidationUtils.isJSON('[1, 2, 3]')).toBe(true);
      expect(ValidationUtils.isJSON('"string"')).toBe(true);
      expect(ValidationUtils.isJSON('123')).toBe(true);
      expect(ValidationUtils.isJSON('invalid json')).toBe(false);
      expect(ValidationUtils.isJSON('{name: "John"}')).toBe(false);
    });
  });

  describe('isAlpha', () => {
    test('should validate alphabetic strings', () => {
      expect(ValidationUtils.isAlpha('Hello')).toBe(true);
      expect(ValidationUtils.isAlpha('world')).toBe(true);
      expect(ValidationUtils.isAlpha('Hello123')).toBe(false);
      expect(ValidationUtils.isAlpha('Hello World')).toBe(false);
    });
  });

  describe('isNumeric', () => {
    test('should validate numeric strings', () => {
      expect(ValidationUtils.isNumeric('123')).toBe(true);
      expect(ValidationUtils.isNumeric('0')).toBe(true);
      expect(ValidationUtils.isNumeric('123.45')).toBe(false); // only integers allowed
      expect(ValidationUtils.isNumeric('-123')).toBe(false); // negative not allowed
      expect(ValidationUtils.isNumeric('abc')).toBe(false);
      expect(ValidationUtils.isNumeric('12a')).toBe(false);
    });
  });

  describe('isAlphanumeric', () => {
    test('should validate alphanumeric strings', () => {
      expect(ValidationUtils.isAlphanumeric('Hello123')).toBe(true);
      expect(ValidationUtils.isAlphanumeric('abc')).toBe(true);
      expect(ValidationUtils.isAlphanumeric('123')).toBe(true);
      expect(ValidationUtils.isAlphanumeric('Hello World')).toBe(false);
      expect(ValidationUtils.isAlphanumeric('test@example')).toBe(false);
    });
  });

  describe('isHexColor', () => {
    test('should validate hex color codes', () => {
      expect(ValidationUtils.isHexColor('#FF0000')).toBe(true);
      expect(ValidationUtils.isHexColor('#f00')).toBe(true);
      expect(ValidationUtils.isHexColor('#123abc')).toBe(true);
      expect(ValidationUtils.isHexColor('FF0000')).toBe(false);
      expect(ValidationUtils.isHexColor('#gg0000')).toBe(false);
    });
  });

  describe('isPhoneNumber', () => {
    test('should validate phone numbers', () => {
      expect(ValidationUtils.isPhoneNumber('+1-555-123-4567')).toBe(true);
      expect(ValidationUtils.isPhoneNumber('(555) 123-4567')).toBe(true);
      expect(ValidationUtils.isPhoneNumber('555.123.4567')).toBe(false); // dots not allowed by regex
      expect(ValidationUtils.isPhoneNumber('5551234567')).toBe(true);
      expect(ValidationUtils.isPhoneNumber('123')).toBe(false);
      expect(ValidationUtils.isPhoneNumber('invalid-phone')).toBe(false);
    });
  });

  describe('isUUID', () => {
    test('should validate UUID strings', () => {
      expect(ValidationUtils.isUUID('123e4567-e89b-12d3-a456-426614174000')).toBe(true);
      expect(ValidationUtils.isUUID('550e8400-e29b-41d4-a716-446655440000')).toBe(true);
      expect(ValidationUtils.isUUID('invalid-uuid')).toBe(false);
      expect(ValidationUtils.isUUID('123e4567-e89b-12d3-a456')).toBe(false);
    });
  });

  describe('isPlainObject', () => {
    test('should check if value is a plain object', () => {
      expect(ValidationUtils.isPlainObject({})).toBe(true);
      expect(ValidationUtils.isPlainObject({ a: 1 })).toBe(true);
      expect(ValidationUtils.isPlainObject([])).toBe(false);
      expect(ValidationUtils.isPlainObject(new Date())).toBe(false);
      expect(ValidationUtils.isPlainObject(null)).toBe(false);
    });
  });

  describe('hasUniqueValues', () => {
    test('should check if array has unique values', () => {
      expect(ValidationUtils.hasUniqueValues([1, 2, 3])).toBe(true);
      expect(ValidationUtils.hasUniqueValues(['a', 'b', 'c'])).toBe(true);
      expect(ValidationUtils.hasUniqueValues([1, 2, 2])).toBe(false);
      expect(ValidationUtils.hasUniqueValues(['a', 'a', 'b'])).toBe(false);
    });
  });

  describe('matches', () => {
    test('should check if string matches pattern', () => {
      expect(ValidationUtils.matches('hello123', /^[a-z]+\d+$/)).toBe(true);
      expect(ValidationUtils.matches('test@example.com', /\S+@\S+\.\S+/)).toBe(true);
      expect(ValidationUtils.matches('hello world', 'hello')).toBe(true); // string pattern uses includes
      expect(ValidationUtils.matches('hello', /^\d+$/)).toBe(false);
    });
  });

  describe('startsWith', () => {
    test('should check if string starts with prefix', () => {
      expect(ValidationUtils.startsWith('hello world', 'hello')).toBe(true);
      expect(ValidationUtils.startsWith('test', 'te')).toBe(true);
      expect(ValidationUtils.startsWith('hello', 'world')).toBe(false);
      expect(ValidationUtils.startsWith('test', 'TEST')).toBe(false);
    });
  });

  describe('endsWith', () => {
    test('should check if string ends with suffix', () => {
      expect(ValidationUtils.endsWith('hello world', 'world')).toBe(true);
      expect(ValidationUtils.endsWith('test', 'st')).toBe(true);
      expect(ValidationUtils.endsWith('hello', 'world')).toBe(false);
      expect(ValidationUtils.endsWith('test', 'TEST')).toBe(false);
    });
  });

  describe('satisfiesAll', () => {
    test('should check if value satisfies all predicates', () => {
      const isLong = (s: string) => s.length > 3;
      const hasAt = (s: string) => s.includes('@');
      const endsWithCom = (s: string) => s.endsWith('.com');
      
      expect(ValidationUtils.satisfiesAll('test@example.com', isLong, hasAt, endsWithCom)).toBe(true);
      expect(ValidationUtils.satisfiesAll('test', isLong, hasAt, endsWithCom)).toBe(false);
    });
  });

  describe('satisfiesAny', () => {
    test('should check if value satisfies any predicate', () => {
      const isLong = (s: string) => s.length > 10;
      const hasAt = (s: string) => s.includes('@');
      const startsWithAdmin = (s: string) => s.startsWith('admin');
      
      expect(ValidationUtils.satisfiesAny('test@example.com', isLong, hasAt, startsWithAdmin)).toBe(true);
      expect(ValidationUtils.satisfiesAny('short', isLong, hasAt, startsWithAdmin)).toBe(false);
    });
  });

  describe('createTypeGuard', () => {
    test('should create a type guard function', () => {
      const isPositiveNumber = ValidationUtils.createTypeGuard<number>(
        (value): value is number => typeof value === 'number' && value > 0
      );
      
      expect(isPositiveNumber(5)).toBe(true);
      expect(isPositiveNumber(-1)).toBe(false);
      expect(isPositiveNumber('5')).toBe(false);
    });
  });

  describe('isOneOf', () => {
    test('should check if value is one of allowed values', () => {
      expect(ValidationUtils.isOneOf('apple', ['apple', 'banana', 'cherry'])).toBe(true);
      expect(ValidationUtils.isOneOf(2, [1, 2, 3])).toBe(true);
      expect(ValidationUtils.isOneOf('grape', ['apple', 'banana', 'cherry'])).toBe(false);
      expect(ValidationUtils.isOneOf(4, [1, 2, 3])).toBe(false);
    });
  });

  describe('hasRequiredProperties', () => {
    test('should check if object has required properties', () => {
      const obj = { name: 'John', age: 30, email: 'john@example.com' };
      expect(ValidationUtils.hasRequiredProperties(obj, ['name'])).toBe(true);
      expect(ValidationUtils.hasRequiredProperties(obj, ['name', 'age'])).toBe(true);
      expect(ValidationUtils.hasRequiredProperties(obj, ['name', 'phone'])).toBe(false);
      expect(ValidationUtils.hasRequiredProperties({}, ['name'])).toBe(false);
    });
  });

  describe('combineValidations', () => {
    test('should combine multiple validation results', () => {
      const results = [
        { isValid: true, errors: [] },
        { isValid: true, errors: [] },
        { isValid: false, errors: ['Error 1'] }
      ];
      const combined = ValidationUtils.combineValidations(...results);
      expect(combined.isValid).toBe(false);
      expect(combined.errors).toContain('Error 1');
    });
  });

  describe('validate', () => {
    test('should validate value with custom rules', () => {
      const rules = [
        { test: (v: number) => v > 0, message: 'Must be positive' },
        { test: (v: number) => v < 100, message: 'Must be less than 100' }
      ];
      
      expect(ValidationUtils.validate(5, rules)).toEqual({ isValid: true, errors: [] });
      expect(ValidationUtils.validate(-1, rules)).toEqual({ isValid: false, errors: ['Must be positive'] });
      expect(ValidationUtils.validate(150, rules)).toEqual({ isValid: false, errors: ['Must be less than 100'] });
    });
  });
});
