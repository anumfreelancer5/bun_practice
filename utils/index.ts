/**
 * Utility functions index
 * Exports all utilities via namespaced modules to avoid naming conflicts
 */

// Export modules as namespaces to avoid naming conflicts
export * as StringUtils from './stringUtils.js';
export * as MathUtils from './mathUtils.js';
export * as ArrayUtils from './arrayUtils.js';
export * as ObjectUtils from './objectUtils.js';
export * as DateUtils from './dateUtils.js';
export * as FunctionalUtils from './functionalUtils.js';
export * as ValidationUtils from './validationUtils.js';

// Import modules for default export
import * as StringUtils from './stringUtils.js';
import * as MathUtils from './mathUtils.js';
import * as ArrayUtils from './arrayUtils.js';
import * as ObjectUtils from './objectUtils.js';
import * as DateUtils from './dateUtils.js';
import * as FunctionalUtils from './functionalUtils.js';
import * as ValidationUtils from './validationUtils.js';

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
