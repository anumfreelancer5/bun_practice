/**
 * Utility functions index
 * Exports all utilities via namespaced modules to avoid naming conflicts
 */

// Export modules as namespaces to avoid naming conflicts
export * as StringUtils from './utils/stringUtils.js';
export * as MathUtils from './utils/mathUtils.js';
export * as ArrayUtils from './utils/arrayUtils.js';
export * as ObjectUtils from './utils/objectUtils.js';
export * as DateUtils from './utils/dateUtils.js';
export * as FunctionalUtils from './utils/functionalUtils.js';
export * as ValidationUtils from './utils/validationUtils.js';

// Import modules for default export
import * as StringUtils from './utils/stringUtils.js';
import * as MathUtils from './utils/mathUtils.js';
import * as ArrayUtils from './utils/arrayUtils.js';
import * as ObjectUtils from './utils/objectUtils.js';
import * as DateUtils from './utils/dateUtils.js';
import * as FunctionalUtils from './utils/functionalUtils.js';
import * as ValidationUtils from './utils/validationUtils.js';

// Default export with organized namespaces
export default {
  string: StringUtils,
  math: MathUtils,
  array: ArrayUtils,
  object: ObjectUtils,
  date: DateUtils,
  functional: FunctionalUtils,
  validation: ValidationUtils,
};
