import { describe, expect, test } from 'bun:test';
import * as StringUtils from '../utils/stringUtils';

describe('StringUtils', () => {
  describe('capitalize', () => {
    test('should capitalize first letter', () => {
      expect(StringUtils.capitalize('hello')).toBe('Hello');
      expect(StringUtils.capitalize('HELLO')).toBe('Hello'); // Converts to lowercase after first char
      expect(StringUtils.capitalize('')).toBe('');
    });
  });

  describe('toCamelCase', () => {
    test('should convert to camelCase', () => {
      expect(StringUtils.toCamelCase('hello world')).toBe('helloWorld');
      expect(StringUtils.toCamelCase('hello-world')).toBe('hello-World'); // Only handles spaces
      expect(StringUtils.toCamelCase('hello_world')).toBe('hello_world'); // Only handles spaces
      expect(StringUtils.toCamelCase('HelloWorld')).toBe('helloWorld');
    });
  });

  describe('slugify', () => {
    test('should create URL-friendly slug', () => {
      expect(StringUtils.slugify('Hello World!')).toBe('hello-world');
      expect(StringUtils.slugify('  Multiple   Spaces  ')).toBe('multiple-spaces');
      expect(StringUtils.slugify('Special@#$Characters')).toBe('specialcharacters');
    });
  });

  describe('truncate', () => {
    test('should truncate string with ellipsis', () => {
      expect(StringUtils.truncate('Hello World', 5)).toBe('He...');
      expect(StringUtils.truncate('Hi', 5)).toBe('Hi');
      expect(StringUtils.truncate('Hello World', 8, '***')).toBe('Hello***');
    });
  });

  describe('isPalindrome', () => {
    test('should check if string is palindrome', () => {
      expect(StringUtils.isPalindrome('racecar')).toBe(true);
      expect(StringUtils.isPalindrome('A man a plan a canal Panama')).toBe(true);
      expect(StringUtils.isPalindrome('hello')).toBe(false);
    });
  });

  describe('extractEmails', () => {
    test('should extract email addresses', () => {
      const text = 'Contact john@example.com or jane@test.org for help';
      const emails = StringUtils.extractEmails(text);
      expect(emails).toEqual(['john@example.com', 'jane@test.org']);
    });
  });

  describe('wordCount', () => {
    test('should count words correctly', () => {
      expect(StringUtils.wordCount('hello world')).toBe(2);
      expect(StringUtils.wordCount('  hello   world  ')).toBe(2);
      expect(StringUtils.wordCount('')).toBe(0);
    });
  });

  describe('mask', () => {
    test('should mask part of string', () => {
      expect(StringUtils.mask('1234567890', '*', 2, 6)).toBe('12****7890');
      expect(StringUtils.mask('password', 'x', 2)).toBe('paxxxxxx');
    });
  });

  describe('toPascalCase', () => {
    test('should convert to PascalCase', () => {
      expect(StringUtils.toPascalCase('hello world')).toBe('HelloWorld');
      expect(StringUtils.toPascalCase('hello-world')).toBe('Hello-World');
      expect(StringUtils.toPascalCase('helloWorld')).toBe('HelloWorld');
    });
  });

  describe('toKebabCase', () => {
    test('should convert to kebab-case', () => {
      expect(StringUtils.toKebabCase('helloWorld')).toBe('hello-world');
      expect(StringUtils.toKebabCase('HelloWorld')).toBe('hello-world');
      expect(StringUtils.toKebabCase('hello world')).toBe('hello-world');
      expect(StringUtils.toKebabCase('hello_world')).toBe('hello-world');
    });
  });

  describe('toSnakeCase', () => {
    test('should convert to snake_case', () => {
      expect(StringUtils.toSnakeCase('helloWorld')).toBe('hello_world');
      expect(StringUtils.toSnakeCase('HelloWorld')).toBe('hello_world');
      expect(StringUtils.toSnakeCase('hello world')).toBe('hello_world');
      expect(StringUtils.toSnakeCase('hello-world')).toBe('hello_world');
    });
  });

  describe('normalizeWhitespace', () => {
    test('should normalize whitespace', () => {
      expect(StringUtils.normalizeWhitespace('  hello   world  ')).toBe('hello world');
      expect(StringUtils.normalizeWhitespace('hello\n\nworld')).toBe('hello world');
      expect(StringUtils.normalizeWhitespace('hello\t\tworld')).toBe('hello world');
    });
  });

  describe('reverse', () => {
    test('should reverse string', () => {
      expect(StringUtils.reverse('hello')).toBe('olleh');
      expect(StringUtils.reverse('12345')).toBe('54321');
      expect(StringUtils.reverse('')).toBe('');
    });
  });

  describe('extractUrls', () => {
    test('should extract URLs from text', () => {
      const text = 'Visit https://example.com or http://test.org';
      const urls = StringUtils.extractUrls(text);
      expect(urls).toEqual(['https://example.com', 'http://test.org']);
    });
  });

  describe('randomString', () => {
    test('should generate random string', () => {
      const result = StringUtils.randomString(10);
      expect(result).toHaveLength(10);
      expect(typeof result).toBe('string');
    });

    test('should use custom charset', () => {
      const result = StringUtils.randomString(5, 'ABC');
      expect(result).toHaveLength(5);
      expect(/^[ABC]+$/.test(result)).toBe(true);
    });

    test('should throw error for negative length', () => {
      expect(() => StringUtils.randomString(-1)).toThrow('Length cannot be negative');
    });

    test('should throw error for empty charset', () => {
      expect(() => StringUtils.randomString(5, '')).toThrow('Charset cannot be empty');
    });
  });

  describe('escapeHtml', () => {
    test('should escape HTML characters', () => {
      expect(StringUtils.escapeHtml('<div>Hello & "World"</div>')).toBe('&lt;div&gt;Hello &amp; &quot;World&quot;&lt;/div&gt;');
      expect(StringUtils.escapeHtml("It's a test")).toBe('It&#39;s a test');
    });
  });

  describe('unescapeHtml', () => {
    test('should unescape HTML entities', () => {
      expect(StringUtils.unescapeHtml('&lt;div&gt;Hello &amp; &quot;World&quot;&lt;/div&gt;')).toBe('<div>Hello & "World"</div>');
      expect(StringUtils.unescapeHtml('It&#39;s a test')).toBe("It's a test");
    });
  });

  describe('toTitleCase', () => {
    test('should convert to title case', () => {
      expect(StringUtils.toTitleCase('hello world')).toBe('Hello World');
      expect(StringUtils.toTitleCase('HELLO WORLD')).toBe('Hello World');
      expect(StringUtils.toTitleCase('heLLo WoRLd')).toBe('Hello World');
    });
  });

  describe('pad', () => {
    test('should pad string from both sides', () => {
      expect(StringUtils.pad('hello', 10)).toBe('  hello   ');
      expect(StringUtils.pad('hello', 10, '*')).toBe('**hello***');
      expect(StringUtils.pad('hello', 3)).toBe('hello'); // Already longer
    });
  });

  describe('padLeft', () => {
    test('should pad string on the left', () => {
      expect(StringUtils.padLeft('hello', 10)).toBe('     hello');
      expect(StringUtils.padLeft('hello', 10, '*')).toBe('*****hello');
      expect(StringUtils.padLeft('hello', 3)).toBe('hello'); // Already longer
    });
  });

  describe('padRight', () => {
    test('should pad string on the right', () => {
      expect(StringUtils.padRight('hello', 10)).toBe('hello     ');
      expect(StringUtils.padRight('hello', 10, '*')).toBe('hello*****');
      expect(StringUtils.padRight('hello', 3)).toBe('hello'); // Already longer
    });
  });

  describe('strip', () => {
    test('should strip characters from both ends', () => {
      expect(StringUtils.strip('  hello  ')).toBe('hello');
      expect(StringUtils.strip('***hello***', '*')).toBe('hello');
      expect(StringUtils.strip('\t\nhello\t\n')).toBe('hello');
    });
  });

  describe('stripLeft', () => {
    test('should strip characters from left end', () => {
      expect(StringUtils.stripLeft('  hello  ')).toBe('hello  ');
      expect(StringUtils.stripLeft('***hello***', '*')).toBe('hello***');
    });
  });

  describe('stripRight', () => {
    test('should strip characters from right end', () => {
      expect(StringUtils.stripRight('  hello  ')).toBe('  hello');
      expect(StringUtils.stripRight('***hello***', '*')).toBe('***hello');
    });
  });

  describe('collapseWhitespace', () => {
    test('should collapse multiple whitespace to single space', () => {
      expect(StringUtils.collapseWhitespace('hello    world')).toBe('hello world');
      expect(StringUtils.collapseWhitespace('hello\n\n\nworld')).toBe('hello world');
      expect(StringUtils.collapseWhitespace('hello\t\t\tworld')).toBe('hello world');
    });
  });

  describe('toAlternatingCase', () => {
    test('should convert to alternating case', () => {
      expect(StringUtils.toAlternatingCase('hello')).toBe('hElLo');
      expect(StringUtils.toAlternatingCase('world')).toBe('wOrLd');
      expect(StringUtils.toAlternatingCase('ABC')).toBe('aBc');
    });
  });

  describe('startsWithAny', () => {
    test('should check if string starts with any prefix', () => {
      expect(StringUtils.startsWithAny('hello world', ['hello', 'hi'])).toBe(true);
      expect(StringUtils.startsWithAny('hello world', ['hi', 'hey'])).toBe(false);
      expect(StringUtils.startsWithAny('hello world', [])).toBe(false);
    });
  });

  describe('endsWithAny', () => {
    test('should check if string ends with any suffix', () => {
      expect(StringUtils.endsWithAny('hello world', ['world', 'earth'])).toBe(true);
      expect(StringUtils.endsWithAny('hello world', ['earth', 'mars'])).toBe(false);
      expect(StringUtils.endsWithAny('hello world', [])).toBe(false);
    });
  });

  describe('countOccurrences', () => {
    test('should count substring occurrences', () => {
      expect(StringUtils.countOccurrences('hello hello world', 'hello')).toBe(2);
      expect(StringUtils.countOccurrences('abababab', 'ab')).toBe(4);
      expect(StringUtils.countOccurrences('hello world', 'xyz')).toBe(0);
      expect(StringUtils.countOccurrences('hello world', '')).toBe(0);
    });
  });

  describe('lines', () => {
    test('should split string into lines', () => {
      expect(StringUtils.lines('hello\nworld')).toEqual(['hello', 'world']);
      expect(StringUtils.lines('hello\r\nworld')).toEqual(['hello', 'world']);
      expect(StringUtils.lines('hello')).toEqual(['hello']);
    });
  });

  describe('removeEmptyLines', () => {
    test('should remove empty lines', () => {
      expect(StringUtils.removeEmptyLines('hello\n\nworld\n\n')).toBe('hello\nworld');
      expect(StringUtils.removeEmptyLines('hello\n   \nworld')).toBe('hello\nworld');
    });
  });

  describe('indent', () => {
    test('should indent lines', () => {
      expect(StringUtils.indent('hello\nworld')).toBe('  hello\n  world');
      expect(StringUtils.indent('hello\nworld', '    ')).toBe('    hello\n    world');
      expect(StringUtils.indent('hello\n\nworld')).toBe('  hello\n\n  world');
    });
  });

  describe('dedent', () => {
    test('should remove common indentation', () => {
      expect(StringUtils.dedent('  hello\n  world')).toBe('hello\nworld');
      expect(StringUtils.dedent('    hello\n  world')).toBe('  hello\nworld');
      expect(StringUtils.dedent('hello\nworld')).toBe('hello\nworld');
    });
  });

  describe('wordWrap', () => {
    test('should wrap text to specified length', () => {
      expect(StringUtils.wordWrap('hello world test', 10)).toBe('hello\nworld test');
      expect(StringUtils.wordWrap('hello world', 5)).toBe('hello\nworld');
    });

    test('should throw error for invalid max length', () => {
      expect(() => StringUtils.wordWrap('hello', 0)).toThrow('Max length must be greater than 0');
      expect(() => StringUtils.wordWrap('hello', -1)).toThrow('Max length must be greater than 0');
    });
  });

  describe('repeat', () => {
    test('should repeat string n times', () => {
      expect(StringUtils.repeat('hello', 3)).toBe('hellohellohello');
      expect(StringUtils.repeat('a', 5)).toBe('aaaaa');
      expect(StringUtils.repeat('hello', 0)).toBe('');
    });

    test('should throw error for negative count', () => {
      expect(() => StringUtils.repeat('hello', -1)).toThrow('Count cannot be negative');
    });
  });

  describe('removeAll', () => {
    test('should remove all occurrences of substrings', () => {
      expect(StringUtils.removeAll('hello world', 'l')).toBe('heo word');
      expect(StringUtils.removeAll('hello world', 'hello', 'world')).toBe(' ');
      expect(StringUtils.removeAll('abcabc', 'a', 'b')).toBe('cc');
    });
  });

  describe('isNumeric', () => {
    test('should check if string contains only digits', () => {
      expect(StringUtils.isNumeric('12345')).toBe(true);
      expect(StringUtils.isNumeric('123a45')).toBe(false);
      expect(StringUtils.isNumeric('')).toBe(false);
      expect(StringUtils.isNumeric('12.34')).toBe(false);
    });
  });

  describe('isAlpha', () => {
    test('should check if string contains only letters', () => {
      expect(StringUtils.isAlpha('hello')).toBe(true);
      expect(StringUtils.isAlpha('Hello')).toBe(true);
      expect(StringUtils.isAlpha('hello123')).toBe(false);
      expect(StringUtils.isAlpha('')).toBe(false);
      expect(StringUtils.isAlpha('hello world')).toBe(false);
    });
  });

  describe('isAlphanumeric', () => {
    test('should check if string contains only letters and numbers', () => {
      expect(StringUtils.isAlphanumeric('hello123')).toBe(true);
      expect(StringUtils.isAlphanumeric('Hello123')).toBe(true);
      expect(StringUtils.isAlphanumeric('hello')).toBe(true);
      expect(StringUtils.isAlphanumeric('123')).toBe(true);
      expect(StringUtils.isAlphanumeric('hello 123')).toBe(false);
      expect(StringUtils.isAlphanumeric('')).toBe(false);
    });
  });

  describe('hashCode', () => {
    test('should generate hash code for string', () => {
      const hash1 = StringUtils.hashCode('hello');
      const hash2 = StringUtils.hashCode('hello');
      const hash3 = StringUtils.hashCode('world');
      
      expect(hash1).toBe(hash2); // Same string should have same hash
      expect(hash1).not.toBe(hash3); // Different strings should have different hashes
      expect(typeof hash1).toBe('number');
    });
  });

  describe('toBase64', () => {
    test('should convert string to base64', () => {
      expect(StringUtils.toBase64('hello')).toBe('aGVsbG8=');
      expect(StringUtils.toBase64('Hello World!')).toBe('SGVsbG8gV29ybGQh');
      expect(StringUtils.toBase64('')).toBe('');
    });

    test('should handle unicode characters', () => {
      expect(StringUtils.toBase64('café')).toBe('Y2Fmw6k=');
      expect(StringUtils.toBase64('🚀')).toBe('8J+agA==');
    });
  });

  describe('fromBase64', () => {
    test('should decode base64 string', () => {
      expect(StringUtils.fromBase64('aGVsbG8=')).toBe('hello');
      expect(StringUtils.fromBase64('SGVsbG8gV29ybGQh')).toBe('Hello World!');
      expect(StringUtils.fromBase64('')).toBe('');
    });

    test('should handle unicode characters', () => {
      expect(StringUtils.fromBase64('Y2Fmw6k=')).toBe('café');
      expect(StringUtils.fromBase64('8J+agA==')).toBe('🚀');
    });
  });

  describe('longestCommonPrefix', () => {
    test('should find longest common prefix', () => {
      expect(StringUtils.longestCommonPrefix(['flower', 'flow', 'flight'])).toBe('fl');
      expect(StringUtils.longestCommonPrefix(['dog', 'racecar', 'car'])).toBe('');
      expect(StringUtils.longestCommonPrefix(['interspecies', 'interstellar', 'interstate'])).toBe('inters');
    });

    test('should handle edge cases', () => {
      expect(StringUtils.longestCommonPrefix([])).toBe('');
      expect(StringUtils.longestCommonPrefix(['single'])).toBe('single');
      expect(StringUtils.longestCommonPrefix(['', 'abc'])).toBe('');
    });
  });

  describe('longestCommonSuffix', () => {
    test('should find longest common suffix', () => {
      expect(StringUtils.longestCommonSuffix(['testing', 'running', 'jumping'])).toBe('ing');
      expect(StringUtils.longestCommonSuffix(['abc', 'def', 'ghi'])).toBe('');
      expect(StringUtils.longestCommonSuffix(['hello', 'jello', 'bello'])).toBe('ello');
    });

    test('should handle edge cases', () => {
      expect(StringUtils.longestCommonSuffix([])).toBe('');
      expect(StringUtils.longestCommonSuffix(['single'])).toBe('single');
      expect(StringUtils.longestCommonSuffix(['abc', ''])).toBe('');
    });
  });

  describe('levenshteinDistance', () => {
    test('should calculate edit distance correctly', () => {
      expect(StringUtils.levenshteinDistance('kitten', 'sitting')).toBe(3);
      expect(StringUtils.levenshteinDistance('hello', 'hello')).toBe(0);
      expect(StringUtils.levenshteinDistance('', 'abc')).toBe(3);
      expect(StringUtils.levenshteinDistance('abc', '')).toBe(3);
      expect(StringUtils.levenshteinDistance('sunday', 'saturday')).toBe(3);
    });
  });

  describe('similarity', () => {
    test('should calculate similarity between strings', () => {
      expect(StringUtils.similarity('hello', 'hello')).toBe(1);
      expect(StringUtils.similarity('', '')).toBe(1);
      expect(StringUtils.similarity('abc', 'xyz')).toBe(0);
      expect(StringUtils.similarity('hello', 'hallo')).toBeCloseTo(0.8, 1);
    });
  });

  describe('isValidCreditCard', () => {
    test('should validate credit card numbers', () => {
      expect(StringUtils.isValidCreditCard('4532015112830366')).toBe(true); // Valid Visa
      expect(StringUtils.isValidCreditCard('4532-0151-1283-0366')).toBe(true); // Valid with dashes
      expect(StringUtils.isValidCreditCard('4532 0151 1283 0366')).toBe(true); // Valid with spaces
      expect(StringUtils.isValidCreditCard('1234567890123456')).toBe(false); // Invalid
      expect(StringUtils.isValidCreditCard('123')).toBe(false); // Too short
    });
  });

  describe('isValidUUID', () => {
    test('should validate UUID format', () => {
      expect(StringUtils.isValidUUID('550e8400-e29b-41d4-a716-446655440000')).toBe(true);
      expect(StringUtils.isValidUUID('6ba7b810-9dad-11d1-80b4-00c04fd430c8')).toBe(true);
      expect(StringUtils.isValidUUID('invalid-uuid')).toBe(false);
      expect(StringUtils.isValidUUID('550e8400-e29b-41d4-a716')).toBe(false);
    });
  });

  describe('extractPhoneNumbers', () => {
    test('should extract phone numbers', () => {
      const text = 'Call me at (555) 123-4567 or 555.123.4567';
      const phones = StringUtils.extractPhoneNumbers(text);
      expect(phones).toEqual(['(555) 123-4567', '555.123.4567']);
    });

    test('should handle different formats', () => {
      const text = 'Numbers: 555-123-4567, (555)123-4567, 555 123 4567';
      const phones = StringUtils.extractPhoneNumbers(text);
      expect(phones.length).toBeGreaterThan(0);
    });
  });

  describe('toMorseCode', () => {
    test('should convert text to morse code', () => {
      expect(StringUtils.toMorseCode('HELLO')).toBe('.... . .-.. .-.. ---');
      expect(StringUtils.toMorseCode('SOS')).toBe('... --- ...');
      expect(StringUtils.toMorseCode('HELLO WORLD')).toBe('.... . .-.. .-.. --- / .-- --- .-. .-.. -..');
    });

    test('should handle numbers', () => {
      expect(StringUtils.toMorseCode('123')).toBe('.---- ..--- ...--');
    });
  });

  describe('fromMorseCode', () => {
    test('should convert morse code to text', () => {
      expect(StringUtils.fromMorseCode('.... . .-.. .-.. ---')).toBe('HELLO');
      expect(StringUtils.fromMorseCode('... --- ...')).toBe('SOS');
      expect(StringUtils.fromMorseCode('.... . .-.. .-.. --- / .-- --- .-. .-.. -..')).toBe('HELLO WORLD');
    });
  });

  describe('generateUUID', () => {
    test('should generate valid UUID', () => {
      const uuid = StringUtils.generateUUID();
      expect(StringUtils.isValidUUID(uuid)).toBe(true);
      expect(uuid).toHaveLength(36);
    });

    test('should generate unique UUIDs', () => {
      const uuid1 = StringUtils.generateUUID();
      const uuid2 = StringUtils.generateUUID();
      expect(uuid1).not.toBe(uuid2);
    });
  });

  describe('toHex', () => {
    test('should convert string to hex', () => {
      expect(StringUtils.toHex('hello')).toBe('68656c6c6f');
      expect(StringUtils.toHex('A')).toBe('41');
      expect(StringUtils.toHex('')).toBe('');
    });
  });

  describe('fromHex', () => {
    test('should convert hex to string', () => {
      expect(StringUtils.fromHex('68656c6c6f')).toBe('hello');
      expect(StringUtils.fromHex('41')).toBe('A');
      expect(StringUtils.fromHex('')).toBe('');
    });
  });

  describe('isAscii', () => {
    test('should check if string is ASCII', () => {
      expect(StringUtils.isAscii('hello')).toBe(true);
      expect(StringUtils.isAscii('Hello123!@#')).toBe(true);
      expect(StringUtils.isAscii('café')).toBe(false);
      expect(StringUtils.isAscii('🚀')).toBe(false);
      expect(StringUtils.isAscii('')).toBe(true);
    });
  });

  describe('removeDiacritics', () => {
    test('should remove accents and diacritics', () => {
      expect(StringUtils.removeDiacritics('café')).toBe('cafe');
      expect(StringUtils.removeDiacritics('naïve')).toBe('naive');
      expect(StringUtils.removeDiacritics('résumé')).toBe('resume');
      expect(StringUtils.removeDiacritics('hello')).toBe('hello');
    });
  });

  describe('capitalizeWords', () => {
    test('should capitalize each word', () => {
      expect(StringUtils.capitalizeWords('hello world')).toBe('Hello World');
      expect(StringUtils.capitalizeWords('the quick brown fox')).toBe('The Quick Brown Fox');
      expect(StringUtils.capitalizeWords('HELLO WORLD')).toBe('HELLO WORLD');
    });
  });

  describe('swapCase', () => {
    test('should swap case of each character', () => {
      expect(StringUtils.swapCase('Hello World')).toBe('hELLO wORLD');
      expect(StringUtils.swapCase('ABC123def')).toBe('abc123DEF');
      expect(StringUtils.swapCase('')).toBe('');
    });
  });

  describe('isValidHexColor', () => {
    test('should validate hex color codes', () => {
      expect(StringUtils.isValidHexColor('#FF0000')).toBe(true);
      expect(StringUtils.isValidHexColor('#fff')).toBe(true);
      expect(StringUtils.isValidHexColor('#123456')).toBe(true);
      expect(StringUtils.isValidHexColor('FF0000')).toBe(false); // Missing #
      expect(StringUtils.isValidHexColor('#GG0000')).toBe(false); // Invalid chars
      expect(StringUtils.isValidHexColor('#FF00')).toBe(false); // Wrong length
    });
  });

  describe('extractNumbers', () => {
    test('should extract all numbers from string', () => {
      expect(StringUtils.extractNumbers('I have 5 cats and 3.5 dogs')).toEqual([5, 3.5]);
      expect(StringUtils.extractNumbers('Price: $19.99, Tax: $2.50')).toEqual([19.99, 2.5]);
      expect(StringUtils.extractNumbers('No numbers here')).toEqual([]);
      expect(StringUtils.extractNumbers('Negative: -42, Positive: 42')).toEqual([-42, 42]);
    });
  });

  describe('toBinary', () => {
    test('should convert string to binary', () => {
      expect(StringUtils.toBinary('A')).toBe('01000001');
      expect(StringUtils.toBinary('Hi')).toBe('01001000 01101001');
      expect(StringUtils.toBinary('')).toBe('');
    });
  });

  describe('fromBinary', () => {
    test('should convert binary to string', () => {
      expect(StringUtils.fromBinary('01000001')).toBe('A');
      expect(StringUtils.fromBinary('01001000 01101001')).toBe('Hi');
      expect(StringUtils.fromBinary('')).toBe('');
    });
  });

  describe('round trip conversions', () => {
    test('base64 round trip', () => {
      const original = 'Hello, World! 🌍';
      const encoded = StringUtils.toBase64(original);
      const decoded = StringUtils.fromBase64(encoded);
      expect(decoded).toBe(original);
    });

    test('hex round trip', () => {
      const original = 'Hello, World!';
      const encoded = StringUtils.toHex(original);
      const decoded = StringUtils.fromHex(encoded);
      expect(decoded).toBe(original);
    });

    test('binary round trip', () => {
      const original = 'ABC';
      const encoded = StringUtils.toBinary(original);
      const decoded = StringUtils.fromBinary(encoded);
      expect(decoded).toBe(original);
    });

    test('morse code round trip', () => {
      const original = 'HELLO WORLD';
      const encoded = StringUtils.toMorseCode(original);
      const decoded = StringUtils.fromMorseCode(encoded);
      expect(decoded).toBe(original);
    });
  });
});
