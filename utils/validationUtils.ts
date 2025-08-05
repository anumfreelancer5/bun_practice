/**
 * Validation utility functions
 */

/**
 * Checks if a value is null or undefined
 */
export function isNil(value: any): value is null | undefined {
  return value === null || value === undefined;
}

/**
 * Checks if a value is not null and not undefined
 */
export function isNotNil<T>(value: T | null | undefined): value is T {
  return value !== null && value !== undefined;
}

/**
 * Checks if a value is a string
 */
export function isString(value: any): value is string {
  return typeof value === 'string';
}

/**
 * Checks if a value is a number
 */
export function isNumber(value: any): value is number {
  return typeof value === 'number' && !isNaN(value);
}

/**
 * Checks if a value is a boolean
 */
export function isBoolean(value: any): value is boolean {
  return typeof value === 'boolean';
}

/**
 * Checks if a value is a function
 */
export function isFunction(value: any): value is Function {
  return typeof value === 'function';
}

/**
 * Checks if a value is an object (but not null or array)
 */
export function isObject(value: any): value is object {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

/**
 * Checks if a value is an array
 */
export function isArray(value: any): value is any[] {
  return Array.isArray(value);
}

/**
 * Checks if a value is a Date object
 */
export function isDate(value: any): value is Date {
  return value instanceof Date && !isNaN(value.getTime());
}

/**
 * Checks if a value is a RegExp
 */
export function isRegExp(value: any): value is RegExp {
  return value instanceof RegExp;
}

/**
 * Checks if a value is a Promise
 */
export function isPromise(value: any): value is Promise<any> {
  return value instanceof Promise || (value && typeof value.then === 'function');
}

/**
 * Checks if a string is empty (length 0)
 */
export function isEmpty(value: string): boolean;
/**
 * Checks if an array is empty (length 0)
 */
export function isEmpty(value: any[]): boolean;
/**
 * Checks if an object is empty (no own properties)
 */
export function isEmpty(value: object): boolean;
/**
 * Checks if a value is empty (null, undefined, empty string, empty array, or empty object)
 */
export function isEmpty(value: any): boolean {
  if (isNil(value)) return true;
  if (isString(value) || isArray(value)) return value.length === 0;
  if (isObject(value)) return Object.keys(value).length === 0;
  return false;
}

/**
 * Checks if a value is not empty
 */
export function isNotEmpty(value: any): boolean {
  return !isEmpty(value);
}

/**
 * Checks if a string contains only whitespace
 */
export function isBlank(value: string): boolean {
  return isString(value) && value.trim().length === 0;
}

/**
 * Checks if a string is not blank
 */
export function isNotBlank(value: string): boolean {
  return !isBlank(value);
}

/**
 * Checks if a number is an integer
 */
export function isInteger(value: any): value is number {
  return isNumber(value) && Number.isInteger(value);
}

/**
 * Checks if a number is a float
 */
export function isFloat(value: any): value is number {
  return isNumber(value) && !Number.isInteger(value);
}

/**
 * Checks if a number is positive
 */
export function isPositive(value: number): boolean {
  return isNumber(value) && value > 0;
}

/**
 * Checks if a number is negative
 */
export function isNegative(value: number): boolean {
  return isNumber(value) && value < 0;
}

/**
 * Checks if a number is zero
 */
export function isZero(value: number): boolean {
  return isNumber(value) && value === 0;
}

/**
 * Checks if a number is finite
 */
export function isFinite(value: any): value is number {
  return isNumber(value) && Number.isFinite(value);
}

/**
 * Checks if a value is NaN
 */
export function isNaN(value: any): boolean {
  return Number.isNaN(value);
}

/**
 * Checks if a number is even
 */
export function isEven(value: number): boolean {
  return isInteger(value) && value % 2 === 0;
}

/**
 * Checks if a number is odd
 */
export function isOdd(value: number): boolean {
  return isInteger(value) && value % 2 !== 0;
}

/**
 * Checks if a number is within a range (inclusive)
 */
export function isInRange(value: number, min: number, max: number): boolean {
  return isNumber(value) && value >= min && value <= max;
}

/**
 * Checks if a string is a valid email
 */
export function isEmail(value: string): boolean {
  if (!isString(value)) return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(value);
}

/**
 * Checks if a string is a valid URL
 */
export function isURL(value: string): boolean {
  if (!isString(value)) return false;
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
}

/**
 * Checks if a string is a valid JSON
 */
export function isJSON(value: string): boolean {
  if (!isString(value)) return false;
  try {
    JSON.parse(value);
    return true;
  } catch {
    return false;
  }
}

/**
 * Checks if a string contains only alphabetic characters
 */
export function isAlpha(value: string): boolean {
  if (!isString(value)) return false;
  return /^[a-zA-Z]+$/.test(value);
}

/**
 * Checks if a string contains only numeric characters
 */
export function isNumeric(value: string): boolean {
  if (!isString(value)) return false;
  return /^[0-9]+$/.test(value);
}

/**
 * Checks if a string contains only alphanumeric characters
 */
export function isAlphanumeric(value: string): boolean {
  if (!isString(value)) return false;
  return /^[a-zA-Z0-9]+$/.test(value);
}

/**
 * Checks if a string is a valid hexadecimal color
 */
export function isHexColor(value: string): boolean {
  if (!isString(value)) return false;
  return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(value);
}

/**
 * Checks if a string is a valid credit card number (using Luhn algorithm)
 */
export function isCreditCard(value: string): boolean {
  if (!isString(value)) return false;

  const cleaned = value.replace(/\D/g, '');
  if (cleaned.length < 13 || cleaned.length > 19) return false;

  let sum = 0;
  let isEven = false;

  for (let i = cleaned.length - 1; i >= 0; i--) {
    let digit = parseInt(cleaned[i]!);

    if (isEven) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }

    sum += digit;
    isEven = !isEven;
  }

  return sum % 10 === 0;
}

/**
 * Checks if a string is a valid phone number (basic format)
 */
export function isPhoneNumber(value: string): boolean {
  if (!isString(value)) return false;
  const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
  return phoneRegex.test(value);
}

/**
 * Checks if a string is a valid UUID
 */
export function isUUID(value: string): boolean {
  if (!isString(value)) return false;
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(value);
}

/**
 * Checks if a value is a plain object (created by {} or new Object())
 */
export function isPlainObject(value: any): value is Record<string, any> {
  if (!isObject(value)) return false;

  const proto = Object.getPrototypeOf(value);
  return proto === null || proto === Object.prototype;
}

/**
 * Checks if an array contains only unique values
 */
export function hasUniqueValues(array: any[]): boolean {
  if (!isArray(array)) return false;
  return new Set(array).size === array.length;
}

/**
 * Checks if a string matches a pattern
 */
export function matches(value: string, pattern: RegExp | string): boolean {
  if (!isString(value)) return false;
  if (isString(pattern)) {
    return value.includes(pattern);
  }
  return pattern.test(value);
}

/**
 * Checks if a string starts with a prefix
 */
export function startsWith(value: string, prefix: string): boolean {
  if (!isString(value) || !isString(prefix)) return false;
  return value.startsWith(prefix);
}

/**
 * Checks if a string ends with a suffix
 */
export function endsWith(value: string, suffix: string): boolean {
  if (!isString(value) || !isString(suffix)) return false;
  return value.endsWith(suffix);
}

/**
 * Checks if a value satisfies all provided predicates
 */
export function satisfiesAll<T>(value: T, ...predicates: Array<(value: T) => boolean>): boolean {
  return predicates.every(predicate => predicate(value));
}

/**
 * Checks if a value satisfies any of the provided predicates
 */
export function satisfiesAny<T>(value: T, ...predicates: Array<(value: T) => boolean>): boolean {
  return predicates.some(predicate => predicate(value));
}

/**
 * Creates a type guard function
 */
export function createTypeGuard<T>(predicate: (value: any) => boolean): (value: any) => value is T {
  return (value: any): value is T => predicate(value);
}

/**
 * Validates that a value is one of the allowed values
 */
export function isOneOf<T>(value: any, allowedValues: T[]): value is T {
  return allowedValues.includes(value);
}

/**
 * Validates that an object has all required properties
 */
export function hasRequiredProperties<T extends object>(
  obj: any,
  requiredProps: Array<keyof T>
): obj is T {
  if (!isObject(obj)) return false;
  return requiredProps.every(prop => prop in obj);
}

/**
 * Creates a validation result object
 */
export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

/**
 * Combines multiple validation results
 */
export function combineValidations(...results: ValidationResult[]): ValidationResult {
  return {
    isValid: results.every(result => result.isValid),
    errors: results.flatMap(result => result.errors),
  };
}

/**
 * Creates a validation function that returns a ValidationResult
 */
export function validate(
  value: any,
  rules: Array<{ test: (value: any) => boolean; message: string }>
): ValidationResult {
  const errors: string[] = [];

  for (const rule of rules) {
    if (!rule.test(value)) {
      errors.push(rule.message);
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}
