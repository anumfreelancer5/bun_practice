# TypeScript Utility Library

A comprehensive collection of utility functions for TypeScript/JavaScript projects, built with Bun.

## Installation

```bash
bun install
```

## Running Tests

```bash
bun test
```

## Building with Bun

This project is built using the [Bun JavaScript runtime](https://bun.sh/), which provides fast bundling, transpilation, and package management.

### Prerequisites

Make sure you have Bun installed:

```bash
# Install Bun
curl -fsSL https://bun.sh/install | bash

# Verify installation
bun --version
```

### Build Commands

```bash
# Install dependencies
bun install

# Build for production
bun run build

# Build and watch for changes (development)
bun run build --watch

# Type checking
bun run typecheck

# Lint the code
bun run lint

# Format code
bun run format
```

### Build Configuration

The project uses Bun's built-in bundler with TypeScript support. Key features:

- **Fast bundling** - Bun's native bundler is significantly faster than traditional tools
- **TypeScript support** - Built-in TypeScript compilation without additional setup
- **Tree shaking** - Automatic dead code elimination for smaller bundle sizes
- **Source maps** - Generated for debugging in development mode

### Output

Build artifacts are generated in the `dist/` directory:

- `dist/index.js` - Main bundle
- `dist/index.d.ts` - TypeScript declarations
- `dist/utils/` - Individual utility modules for tree-shaking

## Publishing to npm

This section explains how to publish your utility library to npm so others can install and use it.

### npm Setup

1. **Create an npm account** at [npmjs.com](https://www.npmjs.com/)

2. **Login to npm** in your terminal:

   ```bash
   npm login
   ```

3. **Verify your login**:

   ```bash
   npm whoami
   ```

### Prepare for Publishing

1. **Update package.json** with publishing details:

   Your `package.json` is already well-configured! Key fields are already set:
   - ✅ `name`: "@codecaine/utils-library"
   - ✅ `version`: "1.0.0"
   - ✅ `main`, `types`, `exports` properly configured
   - ✅ `files` array includes dist, README, LICENSE
   - ✅ `keywords`, `author`, `repository` set
   - ✅ `prepublishOnly` script for validation

2. **Build the project**:

   ```bash
   bun run build
   ```

3. **Test the package locally** (optional):

   ```bash
   npm pack
   # This creates a .tgz file you can test locally
   ```

### Publishing Steps

1. **Check what will be published**:

   ```bash
   npm publish --dry-run
   ```

2. **Publish to npm**:

   ```bash
   # For scoped packages (recommended)
   npm publish --access public
   
   # For unscoped packages
   npm publish
   ```

### Version Management

Use semantic versioning (semver) for your releases:

```bash
# Patch version (bug fixes): 1.0.0 -> 1.0.1
npm version patch

# Minor version (new features): 1.0.0 -> 1.1.0
npm version minor

# Major version (breaking changes): 1.0.0 -> 2.0.0
npm version major

# Then publish the new version
npm publish --access public
```

### Automated Publishing with GitHub Actions

Create `.github/workflows/publish.yml` for automated publishing:

```yaml
name: Publish to npm

on:
  release:
    types: [published]

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: oven-sh/setup-bun@v1
      - run: bun install
      - run: bun run build
      - run: bun test
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
          registry-url: 'https://registry.npmjs.org'
      - run: npm publish --access public
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

### Usage After Publishing

Once published, users can install your package:

```bash
# Install the package
npm install @codecaine/utils-library

# Or with bun
bun add @codecaine/utils-library
```

And use it in their projects:

```typescript
import { StringUtils, ArrayUtils } from '@codecaine/utils-library';

console.log(StringUtils.capitalize('hello')); // "Hello"
console.log(ArrayUtils.unique([1, 2, 2, 3])); // [1, 2, 3]
```

### Quick Publishing Checklist

1. ✅ **package.json configured** (already done)

2. **Create npm account** and login:

   ```bash
   npm login
   ```

3. **Run validation and build**:

   ```bash
   bun run validate  # runs typecheck, lint, and tests
   bun run build     # builds the project
   ```

4. **Test publish** (optional):

   ```bash
   npm publish --dry-run
   ```

5. **Publish to npm**:

   ```bash
   npm publish --access public
   ```

Your project includes a `prepublishOnly` script that automatically runs validation and build before publishing, ensuring your package is always in a good state when published!

## 📚 Documentation

### Import Options

```typescript
// Named imports (recommended for tree-shaking)
import { StringUtils, MathUtils } from '@codecaine/utils-library';

// Individual module imports
import StringUtils from '@codecaine/utils-library/string';
import MathUtils from '@codecaine/utils-library/math';

// Default import (all utilities)
import Utils from '@codecaine/utils-library';
Utils.string.capitalize('hello'); // "Hello"
```

### Categories

| Category | Functions | Description |
|----------|-----------|-------------|
| 📝 **String** | 90+ | Text manipulation, formatting, analysis, encoding |
| 🔢 **Math** | 45+ | Mathematical operations, calculations |
| 📋 **Array** | 40+ | Array processing, transformation |
| 🏗️ **Object** | 25+ | Object manipulation, deep operations |
| 📅 **Date** | 25+ | Date/time utilities, formatting |
| ⚡ **Functional** | 20+ | Functional programming patterns |
| ✅ **Validation** | 35+ | Type checking, input validation |

## Array Utils

### Basic Operations

```typescript
import { unique, chunk, flatten } from './utils/arrayUtils';

// Remove duplicates
unique([1, 2, 2, 3, 3, 4]); // [1, 2, 3, 4]
unique(['a', 'b', 'a', 'c']); // ['a', 'b', 'c']

// Split array into chunks
chunk([1, 2, 3, 4, 5, 6], 2); // [[1, 2], [3, 4], [5, 6]]
chunk([1, 2, 3, 4, 5], 3); // [[1, 2, 3], [4, 5]]

// Flatten nested arrays
flatten([[1, 2], [3, 4]]); // [1, 2, 3, 4]
flatten([1, [2, [3, 4]]]); // [1, 2, 3, 4]
```

### Grouping and Filtering

```typescript
import { groupBy, intersection, difference, partition } from './utils/arrayUtils';

// Group items by key function
const items = [
  { type: 'fruit', name: 'apple' },
  { type: 'vegetable', name: 'carrot' },
  { type: 'fruit', name: 'banana' }
];
groupBy(items, item => item.type);
// { fruit: [{ type: 'fruit', name: 'apple' }, { type: 'fruit', name: 'banana' }], vegetable: [{ type: 'vegetable', name: 'carrot' }] }

// Find common elements
intersection([1, 2, 3], [2, 3, 4], [3, 4, 5]); // [3]

// Find elements in first array but not in second
difference([1, 2, 3, 4], [2, 4]); // [1, 3]

// Partition array by predicate
const [evens, odds] = partition([1, 2, 3, 4, 5], x => x % 2 === 0);
// evens: [2, 4], odds: [1, 3, 5]
```

### Array Manipulation

```typescript
import { shuffle, range, take, windowed, zip } from './utils/arrayUtils';

// Shuffle array randomly
shuffle([1, 2, 3, 4, 5]); // randomized order

// Create range of numbers
range(0, 5); // [0, 1, 2, 3, 4]
range(2, 6); // [2, 3, 4, 5]
range(5); // [0, 1, 2, 3, 4]

// Take first n elements
take([1, 2, 3, 4, 5], 3); // [1, 2, 3]

// Create sliding windows
windowed([1, 2, 3, 4], 3); // [[1, 2, 3], [2, 3, 4]]

// Zip arrays together
zip([1, 2], ['a', 'b']); // [[1, 'a'], [2, 'b']]
```

### Finding and Sampling

```typescript
import { sample, sampleSize, maxBy, minBy, sortBy } from './utils/arrayUtils';

// Get random element
sample([1, 2, 3, 4, 5]); // random element from array

// Get multiple random elements
sampleSize([1, 2, 3, 4, 5], 3); // 3 random elements

// Find max/min by selector
const people = [
  { name: 'John', age: 30 },
  { name: 'Jane', age: 25 },
  { name: 'Bob', age: 35 }
];
maxBy(people, p => p.age); // { name: 'Bob', age: 35 }
minBy(people, p => p.age); // { name: 'Jane', age: 25 }

// Sort by selector
sortBy(people, p => p.age); // sorted by age ascending
```

### Utility Functions

```typescript
import { compact, countBy, isEqual, rotate } from './utils/arrayUtils';

// Remove falsy values
compact([1, 0, 2, false, 3, '', 4, null, 5, undefined]); // [1, 2, 3, 4, 5]

// Count occurrences
const counts = countBy([1, 2, 2, 3, 3, 3]);
counts.get(1); // 1
counts.get(2); // 2
counts.get(3); // 3

// Check array equality
isEqual([1, 2, 3], [1, 2, 3]); // true
isEqual([1, 2, 3], [1, 2, 4]); // false

// Rotate array
rotate([1, 2, 3, 4, 5], 2); // [4, 5, 1, 2, 3]
rotate([1, 2, 3, 4, 5], -1); // [2, 3, 4, 5, 1]
```

## String Utils

### Basic String Operations

```typescript
import { capitalize, reverse, truncate, mask } from './utils/stringUtils';

// Capitalize first letter
capitalize('hello'); // 'Hello'
capitalize('HELLO'); // 'Hello'

// Reverse string
reverse('hello'); // 'olleh'
reverse('12345'); // '54321'

// Truncate with ellipsis
truncate('Hello World', 5); // 'He...'
truncate('Hello World', 8, '***'); // 'Hello***'

// Mask part of string
mask('1234567890', '*', 2, 6); // '12****7890'
mask('password', 'x', 2); // 'paxxxxxx'
```

### Case Conversion

```typescript
import { toCamelCase, toPascalCase, toKebabCase, toSnakeCase, toTitleCase } from './utils/stringUtils';

// Convert to camelCase
toCamelCase('hello world'); // 'helloWorld'

// Convert to PascalCase
toPascalCase('hello world'); // 'HelloWorld'

// Convert to kebab-case
toKebabCase('helloWorld'); // 'hello-world'

// Convert to snake_case
toSnakeCase('helloWorld'); // 'hello_world'

// Convert to Title Case
toTitleCase('hello world'); // 'Hello World'
```

### URL and Slug Generation

```typescript
import { slugify, extractUrls, extractEmails } from './utils/stringUtils';

// Create URL-friendly slug
slugify('Hello World!'); // 'hello-world'
slugify('Special@#$Characters'); // 'specialcharacters'

// Extract URLs from text
extractUrls('Visit https://example.com or http://test.org');
// ['https://example.com', 'http://test.org']

// Extract email addresses
extractEmails('Contact john@example.com or jane@test.org for help');
// ['john@example.com', 'jane@test.org']
```

### Text Processing

```typescript
import { normalizeWhitespace, wordCount, isPalindrome, randomString } from './utils/stringUtils';

// Normalize whitespace
normalizeWhitespace('  hello   world  '); // 'hello world'

// Count words
wordCount('hello world'); // 2
wordCount('  hello   world  '); // 2

// Check if palindrome
isPalindrome('racecar'); // true
isPalindrome('A man a plan a canal Panama'); // true

// Generate random string
randomString(10); // random 10-character string
randomString(5, 'ABC'); // random 5-character string using only A, B, C
```

### HTML and Padding

```typescript
import { escapeHtml, unescapeHtml, pad, padLeft, padRight } from './utils/stringUtils';

// Escape HTML
escapeHtml('<div>Hello & "World"</div>'); // '&lt;div&gt;Hello &amp; &quot;World&quot;&lt;/div&gt;'

// Unescape HTML
unescapeHtml('&lt;div&gt;Hello &amp; &quot;World&quot;&lt;/div&gt;'); // '<div>Hello & "World"</div>'

// Pad string
pad('hello', 10); // '  hello   '
padLeft('hello', 10, '*'); // '*****hello'
padRight('hello', 10, '*'); // 'hello*****'
```

## Math Utils

### Basic Math Operations

```typescript
import { clamp, average, sum, product, percentage } from './utils/mathUtils';

// Clamp number within range
clamp(5, 0, 10); // 5
clamp(-5, 0, 10); // 0
clamp(15, 0, 10); // 10

// Calculate average
average([1, 2, 3, 4, 5]); // 3

// Calculate sum
sum([1, 2, 3, 4, 5]); // 15

// Calculate product
product([1, 2, 3, 4]); // 24

// Calculate percentage
percentage(25, 100); // 25
percentage(1, 8); // 12.5
```

### Number Properties

```typescript
import { isPrime, isEven, isOdd, factorial, fibonacci } from './utils/mathUtils';

// Check if prime
isPrime(17); // true
isPrime(4); // false

// Check if even/odd
isEven(2); // true
isOdd(3); // true

// Calculate factorial
factorial(5); // 120

// Generate fibonacci sequence
fibonacci(5); // [0, 1, 1, 2, 3]
```

### Advanced Math

```typescript
import { gcd, lcm, lerp, mapRange, distance } from './utils/mathUtils';

// Greatest common divisor
gcd(12, 8); // 4

// Least common multiple
lcm(12, 8); // 24

// Linear interpolation
lerp(0, 10, 0.5); // 5

// Map value from one range to another
mapRange(5, 0, 10, 0, 100); // 50

// Distance between two points
distance(0, 0, 3, 4); // 5
```

### Statistics

```typescript
import { median, mode, standardDeviation } from './utils/mathUtils';

// Calculate median
median([1, 2, 3, 4, 5]); // 3
median([1, 2, 3, 4]); // 2.5

// Calculate mode
mode([1, 2, 2, 3, 4]); // [2]
mode([1, 1, 2, 2, 3]); // [1, 2]

// Calculate standard deviation
standardDeviation([2, 4, 4, 4, 5, 5, 7, 9]); // approximately 2
```

### Random Numbers

```typescript
import { randomBetween, randomIntBetween } from './utils/mathUtils';

// Random float in range
randomBetween(1, 10); // random float between 1 and 10

// Random integer in range
randomIntBetween(1, 5); // random integer between 1 and 5 (inclusive)
```

### Unit Conversion

```typescript
import { toRadians, toDegrees, roundTo } from './utils/mathUtils';

// Convert degrees to radians
toRadians(180); // π (approximately 3.14159)

// Convert radians to degrees
toDegrees(Math.PI); // 180

// Round to decimal places
roundTo(3.14159, 2); // 3.14
```

## Date Utils

### Date Formatting and Parsing

```typescript
import { formatDate, parseDate } from './utils/dateUtils';

const date = new Date(2023, 11, 25, 14, 30, 45, 123); // Dec 25, 2023 14:30:45.123

// Format dates
formatDate(date, 'YYYY-MM-DD'); // '2023-12-25'
formatDate(date, 'DD/MM/YYYY'); // '25/12/2023'
formatDate(date, 'HH:mm:ss'); // '14:30:45'

// Parse dates
parseDate('2023-12-25'); // Date object
parseDate('12/25/2023'); // Date object
parseDate('invalid-date'); // null
```

### Date Arithmetic

```typescript
import { addTime, subtractTime, dateDiff } from './utils/dateUtils';

const date = new Date(2023, 11, 25);

// Add time
addTime(date, 1, 'years'); // Dec 25, 2024
addTime(date, 2, 'months'); // Feb 25, 2024
addTime(date, 7, 'days'); // Jan 1, 2024

// Subtract time
subtractTime(date, 1, 'years'); // Dec 25, 2022

// Calculate difference
const date1 = new Date(2023, 0, 1);
const date2 = new Date(2023, 0, 8);
dateDiff(date1, date2, 'days'); // 7
```

### Date Comparisons

```typescript
import { isBetween, isSameDay, isToday, isYesterday, isTomorrow } from './utils/dateUtils';

// Check if between dates
const start = new Date(2023, 0, 1);
const middle = new Date(2023, 5, 15);
const end = new Date(2023, 11, 31);
isBetween(middle, start, end); // true

// Check same day
const date1 = new Date(2023, 5, 15, 10, 30);
const date2 = new Date(2023, 5, 15, 20, 45);
isSameDay(date1, date2); // true

// Check relative to today
isToday(new Date()); // true
isYesterday(new Date(Date.now() - 24 * 60 * 60 * 1000)); // true
```

### Date Utilities

```typescript
import { startOf, endOf, isLeapYear, getDaysInMonth, getAge } from './utils/dateUtils';

const date = new Date(2023, 5, 15, 14, 30, 45);

// Get start/end of period
startOf(date, 'year'); // Jan 1, 2023 00:00:00
startOf(date, 'month'); // Jun 1, 2023 00:00:00
endOf(date, 'day'); // Jun 15, 2023 23:59:59

// Check leap year
isLeapYear(2020); // true
isLeapYear(2021); // false

// Get days in month
getDaysInMonth(2023, 1); // 28 (February)
getDaysInMonth(2024, 1); // 29 (February in leap year)

// Calculate age
getAge(new Date(1990, 0, 1)); // current age
```

## Object Utils

### Deep Operations

```typescript
import { deepClone, deepEqual, deepMerge } from './utils/objectUtils';

// Deep clone objects
const original = { a: 1, b: { c: 2, d: [3, 4] } };
const cloned = deepClone(original);
// cloned is completely independent copy

// Deep equality check
const obj1 = { a: 1, b: { c: 2, d: [3, 4] } };
const obj2 = { a: 1, b: { c: 2, d: [3, 4] } };
deepEqual(obj1, obj2); // true

// Deep merge objects
const merged = deepMerge(
  { a: 1, b: { c: 2 } },
  { b: { d: 3 }, e: 4 },
  { b: { e: 5 }, f: 6 }
);
// { a: 1, b: { c: 2, d: 3, e: 5 }, e: 4, f: 6 }
```

### Property Access

```typescript
import { get, set, has, unset } from './utils/objectUtils';

const obj = { a: { b: { c: 'value' } } };

// Get nested values
get(obj, 'a.b.c'); // 'value'
get(obj, 'a.b.d', 'default'); // 'default'

// Set nested values
set(obj, 'a.b.d', 'new value');
// obj.a.b.d = 'new value'

// Check if path exists
has(obj, 'a.b.c'); // true
has(obj, 'a.b.d'); // false

// Remove property
unset(obj, 'a.b.c'); // removes the property
```

### Object Manipulation

```typescript
import { pick, omit, invert } from './utils/objectUtils';

const obj = { a: 1, b: 2, c: 3, d: 4 };

// Pick specified properties
pick(obj, 'a', 'c'); // { a: 1, c: 3 }

// Omit specified properties
omit(obj, 'b', 'd'); // { a: 1, c: 3 }

// Invert keys and values
invert({ a: 1, b: 2, c: 3 }); // { '1': 'a', '2': 'b', '3': 'c' }
```

## Functional Utils

### Function Control

```typescript
import { debounce, throttle, memoize, once } from './utils/functionalUtils';

// Debounce function calls
const debouncedFn = debounce(() => console.log('called'), 100);
debouncedFn(); // will only execute after 100ms of no calls

// Throttle function calls
const throttledFn = throttle(() => console.log('called'), 100);
throttledFn(); // will execute at most once per 100ms

// Memoize expensive functions
const expensiveFn = (x: number) => x * 2;
const memoizedFn = memoize(expensiveFn);
memoizedFn(5); // calculates and caches result
memoizedFn(5); // returns cached result

// Call function only once
const onceFn = once(() => 'result');
onceFn(); // 'result'
onceFn(); // 'result' (same result, function not called again)
```

### Function Composition

```typescript
import { compose, pipe, curry, partial } from './utils/functionalUtils';

const add1 = (x: number) => x + 1;
const multiply2 = (x: number) => x * 2;

// Compose functions (right to left)
const composed = compose(multiply2, add1);
composed(5); // 12 ((5 + 1) * 2)

// Pipe functions (left to right)
const piped = pipe(add1, multiply2);
piped(5); // 12 ((5 + 1) * 2)

// Curry function
const add = (a: number, b: number, c: number) => a + b + c;
const curriedAdd = curry(add);
curriedAdd(1)(2)(3); // 6
curriedAdd(1, 2)(3); // 6

// Partial application
const multiply = (a: number, b: number, c: number) => a * b * c;
const multiplyBy2 = partial(multiply, 2);
multiplyBy2(3, 4); // 24
```

### Function Utilities

```typescript
import { negate, constant, identity, always, flip } from './utils/functionalUtils';

// Negate predicate
const isEven = (x: number) => x % 2 === 0;
const isOdd = negate(isEven);
isOdd(3); // true

// Return constant value
const getConstant = constant(42);
getConstant(); // 42

// Identity function
identity(5); // 5

// Always return same value
const alwaysTrue = always(true);
alwaysTrue(1, 2, 3); // true

// Flip function arguments
const subtract = (a: number, b: number) => a - b;
const flippedSubtract = flip(subtract);
subtract(10, 3); // 7
flippedSubtract(3, 10); // 7
```

## Validation Utils

### Basic Type Validation

```typescript
import { 
  isNil, isNotNil, isEmpty, isNotEmpty, isArray, isObject, 
  isFunction, isBoolean, isDate, isRegExp, isPromise, isInteger 
} from './utils/validationUtils';

// Check for null/undefined
isNil(null); // true
isNil(undefined); // true
isNotNil(0); // true

// Check if empty
isEmpty(''); // true
isEmpty([]); // true
isEmpty({}); // true
isNotEmpty('test'); // true

// Type checks
isArray([1, 2, 3]); // true
isObject({ a: 1 }); // true
isFunction(() => {}); // true
isBoolean(true); // true
isDate(new Date()); // true
isRegExp(/test/); // true
isPromise(Promise.resolve(1)); // true
isInteger(42); // true
```

### String Validation

```typescript
import { isEmail, isURL, isBlank, isHexColor, isUUID } from './utils/validationUtils';

// Email validation
isEmail('user@example.com'); // true
isEmail('invalid-email'); // false

// URL validation
isURL('https://example.com'); // true
isURL('not-a-url'); // false

// Blank string check
isBlank(''); // true
isBlank('   '); // true
isBlank('hello'); // false

// Hex color validation
isHexColor('#ff0000'); // true
isHexColor('#f00'); // true
isHexColor('ff0000'); // false

// UUID validation
isUUID('550e8400-e29b-41d4-a716-446655440000'); // true
```

### Other Validations

```typescript
import { isCreditCard, isInRange, isOneOf } from './utils/validationUtils';

// Credit card validation (Luhn algorithm)
isCreditCard('4532015112830366'); // true (Visa test number)
isCreditCard('1234567890123456'); // false

// Range validation
isInRange(5, 0, 10); // true
isInRange(15, 0, 10); // false

// Value in list validation
isOneOf('red', ['red', 'blue', 'green']); // true
isOneOf('yellow', ['red', 'blue', 'green']); // false
```

## License

This project is licensed under the MIT License.
