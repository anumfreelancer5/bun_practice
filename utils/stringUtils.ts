/**
 * String utility functions
 */

/**
 * Capitalizes the first letter of a string
 */
export function capitalize(str: string): string {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

/**
 * Converts a string to camelCase
 */
export function toCamelCase(str: string): string {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
      return index === 0 ? word.toLowerCase() : word.toUpperCase();
    })
    .replace(/\s+/g, '');
}

/**
 * Converts a string to PascalCase
 */
export function toPascalCase(str: string): string {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, word => {
      return word.toUpperCase();
    })
    .replace(/\s+/g, '');
}

/**
 * Converts a string to kebab-case
 */
export function toKebabCase(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase();
}

/**
 * Converts a string to snake_case
 */
export function toSnakeCase(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, '$1_$2')
    .replace(/[\s-]+/g, '_')
    .toLowerCase();
}

/**
 * Truncates a string to a specified length and adds ellipsis
 */
export function truncate(str: string, maxLength: number, suffix: string = '...'): string {
  if (maxLength < 0) throw new Error('maxLength cannot be negative');
  if (str.length <= maxLength) return str;
  if (suffix.length >= maxLength) return suffix.slice(0, maxLength);
  return str.slice(0, maxLength - suffix.length) + suffix;
}

/**
 * Removes leading and trailing whitespace and reduces multiple spaces to single spaces
 */
export function normalizeWhitespace(str: string): string {
  return str.trim().replace(/\s+/g, ' ');
}

/**
 * Counts the number of words in a string
 */
export function wordCount(str: string): number {
  return str
    .trim()
    .split(/\s+/)
    .filter(word => word.length > 0).length;
}

/**
 * Reverses a string
 */
export function reverse(str: string): string {
  return str.split('').reverse().join('');
}

/**
 * Checks if a string is a palindrome
 */
export function isPalindrome(str: string): boolean {
  const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, '');
  return cleaned === reverse(cleaned);
}

/**
 * Extracts email addresses from a string
 */
export function extractEmails(str: string): string[] {
  const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g;
  return str.match(emailRegex) || [];
}

/**
 * Extracts URLs from a string
 */
export function extractUrls(str: string): string[] {
  const urlRegex =
    /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;
  return str.match(urlRegex) || [];
}

/**
 * Generates a random string of specified length
 */
export function randomString(
  length: number,
  charset: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
): string {
  if (length < 0) throw new Error('Length cannot be negative');
  if (charset.length === 0) throw new Error('Charset cannot be empty');

  let result = '';
  for (let i = 0; i < length; i++) {
    result += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  return result;
}

/**
 * Escapes HTML special characters
 */
export function escapeHtml(str: string): string {
  const htmlEscapes: { [key: string]: string } = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  };
  return str.replace(/[&<>"']/g, match => htmlEscapes[match] || match);
}

/**
 * Unescapes HTML entities
 */
export function unescapeHtml(str: string): string {
  const htmlUnescapes: { [key: string]: string } = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#39;': "'",
  };
  return str.replace(/&(?:amp|lt|gt|quot|#39);/g, match => htmlUnescapes[match] || match);
}

/**
 * Slugifies a string (URL-friendly version)
 */
export function slugify(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Converts a string to title case
 */
export function toTitleCase(str: string): string {
  return str.toLowerCase().replace(/\b\w/g, l => l.toUpperCase());
}

/**
 * Pads a string to a certain length with another string
 */
export function pad(str: string, length: number, padString: string = ' '): string {
  if (str.length >= length) return str;
  const padLength = length - str.length;
  const padLeft = Math.floor(padLength / 2);
  const padRight = padLength - padLeft;
  return padString.repeat(padLeft) + str + padString.repeat(padRight);
}

/**
 * Pads a string on the left to a certain length with another string
 */
export function padLeft(str: string, length: number, padString: string = ' '): string {
  if (str.length >= length) return str;
  const padLength = length - str.length;
  return padString.repeat(Math.ceil(padLength / padString.length)).slice(0, padLength) + str;
}

/**
 * Pads a string on the right to a certain length with another string
 */
export function padRight(str: string, length: number, padString: string = ' '): string {
  if (str.length >= length) return str;
  const padLength = length - str.length;
  return str + padString.repeat(Math.ceil(padLength / padString.length)).slice(0, padLength);
}

/**
 * Removes specified characters from the beginning and end of a string
 */
export function strip(str: string, chars: string = ' \t\n\r'): string {
  const charSet = new Set(chars);
  let start = 0;
  let end = str.length;

  while (start < end && charSet.has(str[start]!)) start++;
  while (end > start && charSet.has(str[end - 1]!)) end--;

  return str.slice(start, end);
}

/**
 * Removes specified characters from the beginning of a string
 */
export function stripLeft(str: string, chars: string = ' \t\n\r'): string {
  const charSet = new Set(chars);
  let start = 0;

  while (start < str.length && charSet.has(str[start]!)) start++;
  return str.slice(start);
}

/**
 * Removes specified characters from the end of a string
 */
export function stripRight(str: string, chars: string = ' \t\n\r'): string {
  const charSet = new Set(chars);
  let end = str.length;

  while (end > 0 && charSet.has(str[end - 1]!)) end--;
  return str.slice(0, end);
}

/**
 * Replaces multiple consecutive whitespace characters with a single space
 */
export function collapseWhitespace(str: string): string {
  return str.replace(/\s+/g, ' ');
}

/**
 * Converts string to alternating case (aLtErNaTiNg)
 */
export function toAlternatingCase(str: string): string {
  return str
    .split('')
    .map((char, index) => (index % 2 === 0 ? char.toLowerCase() : char.toUpperCase()))
    .join('');
}

/**
 * Checks if a string starts with any of the given prefixes
 */
export function startsWithAny(str: string, prefixes: string[]): boolean {
  return prefixes.some(prefix => str.startsWith(prefix));
}

/**
 * Checks if a string ends with any of the given suffixes
 */
export function endsWithAny(str: string, suffixes: string[]): boolean {
  return suffixes.some(suffix => str.endsWith(suffix));
}

/**
 * Counts occurrences of a substring in a string
 */
export function countOccurrences(str: string, searchStr: string): number {
  if (searchStr.length === 0) return 0;
  let count = 0;
  let position = 0;

  while ((position = str.indexOf(searchStr, position)) !== -1) {
    count++;
    position += searchStr.length;
  }
  return count;
}

/**
 * Splits a string into lines
 */
export function lines(str: string): string[] {
  return str.split(/\r?\n/);
}

/**
 * Removes empty lines from a string
 */
export function removeEmptyLines(str: string): string {
  return lines(str)
    .filter(line => line.trim().length > 0)
    .join('\n');
}

/**
 * Indents each line of a string with the specified string
 */
export function indent(str: string, indentStr: string = '  '): string {
  return lines(str)
    .map(line => (line.length > 0 ? indentStr + line : line))
    .join('\n');
}

/**
 * Removes common leading whitespace from each line
 */
export function dedent(str: string): string {
  const textLines = lines(str);
  if (textLines.length === 0) return str;

  // Find minimum indentation (excluding empty lines)
  const nonEmptyLines = textLines.filter(line => line.trim().length > 0);
  if (nonEmptyLines.length === 0) return str;

  const minIndent = Math.min(
    ...nonEmptyLines.map(line => {
      const match = line.match(/^(\s*)/);
      return match ? match[1]!.length : 0;
    })
  );

  // Remove the common indentation
  return textLines.map(line => line.slice(minIndent)).join('\n');
}

/**
 * Wraps text to a specified line length
 */
export function wordWrap(str: string, maxLength: number): string {
  if (maxLength <= 0) throw new Error('Max length must be greater than 0');

  const words = str.split(/\s+/);
  const result: string[] = [];
  let currentLine = '';

  for (const word of words) {
    if (currentLine.length === 0) {
      currentLine = word;
    } else if (currentLine.length + 1 + word.length <= maxLength) {
      currentLine += ' ' + word;
    } else {
      result.push(currentLine);
      currentLine = word;
    }
  }

  if (currentLine.length > 0) {
    result.push(currentLine);
  }

  return result.join('\n');
}

/**
 * Creates a string by repeating the input string n times
 */
export function repeat(str: string, count: number): string {
  if (count < 0) throw new Error('Count cannot be negative');
  return str.repeat(count);
}

/**
 * Removes all occurrences of specified substrings from a string
 */
export function removeAll(str: string, ...substrings: string[]): string {
  let result = str;
  for (const substring of substrings) {
    result = result.split(substring).join('');
  }
  return result;
}

/**
 * Masks parts of a string with a specified character
 */
export function mask(str: string, maskChar: string = '*', start: number = 0, end?: number): string {
  const actualEnd = end ?? str.length;
  const before = str.slice(0, start);
  const masked = maskChar.repeat(Math.max(0, actualEnd - start));
  const after = str.slice(actualEnd);
  return before + masked + after;
}

/**
 * Checks if a string contains only digits
 */
export function isNumeric(str: string): boolean {
  return /^\d+$/.test(str);
}

/**
 * Checks if a string contains only alphabetic characters
 */
export function isAlpha(str: string): boolean {
  return /^[a-zA-Z]+$/.test(str);
}

/**
 * Checks if a string contains only alphanumeric characters
 */
export function isAlphanumeric(str: string): boolean {
  return /^[a-zA-Z0-9]+$/.test(str);
}

/**
 * Generates a hash code for a string (simple hash function)
 */
export function hashCode(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return hash;
}

/**
 * Converts a string to base64 encoding
 */
export function toBase64(str: string): string {
  return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (_, p1) => {
    return String.fromCharCode(parseInt(p1, 16));
  }));
}

/**
 * Decodes a base64 string
 */
export function fromBase64(str: string): string {
  return decodeURIComponent(Array.prototype.map.call(atob(str), (c: string) => {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
}

/**
 * Finds the longest common prefix of an array of strings
 */
export function longestCommonPrefix(strings: string[]): string {
  if (strings.length === 0) return '';
  if (strings.length === 1) return strings[0]!;

  let prefix = '';
  const minLength = Math.min(...strings.map(s => s.length));

  for (let i = 0; i < minLength; i++) {
    const char = strings[0]![i];
    if (strings.every(str => str[i] === char)) {
      prefix += char;
    } else {
      break;
    }
  }

  return prefix;
}

/**
 * Finds the longest common suffix of an array of strings
 */
export function longestCommonSuffix(strings: string[]): string {
  if (strings.length === 0) return '';
  if (strings.length === 1) return strings[0]!;

  let suffix = '';
  const minLength = Math.min(...strings.map(s => s.length));

  for (let i = 1; i <= minLength; i++) {
    const char = strings[0]![strings[0]!.length - i];
    if (strings.every(str => str[str.length - i] === char)) {
      suffix = char + suffix;
    } else {
      break;
    }
  }

  return suffix;
}

/**
 * Calculates the Levenshtein distance between two strings
 */
export function levenshteinDistance(str1: string, str2: string): number {
  const matrix: number[][] = Array(str2.length + 1)
    .fill(null)
    .map(() => Array(str1.length + 1).fill(null));

  for (let i = 0; i <= str1.length; i++) {
    matrix[0]![i] = i;
  }

  for (let j = 0; j <= str2.length; j++) {
    matrix[j]![0] = j;
  }

  for (let j = 1; j <= str2.length; j++) {
    for (let i = 1; i <= str1.length; i++) {
      const indicator = str1[i - 1] === str2[j - 1] ? 0 : 1;
      matrix[j]![i] = Math.min(
        matrix[j]![i - 1]! + 1, // deletion
        matrix[j - 1]![i]! + 1, // insertion
        matrix[j - 1]![i - 1]! + indicator // substitution
      );
    }
  }

  return matrix[str2.length]![str1.length]!;
}

/**
 * Calculates the similarity between two strings (0-1 scale based on Levenshtein distance)
 */
export function similarity(str1: string, str2: string): number {
  const maxLength = Math.max(str1.length, str2.length);
  if (maxLength === 0) return 1;
  return (maxLength - levenshteinDistance(str1, str2)) / maxLength;
}

/**
 * Checks if a string is a valid credit card number using Luhn algorithm
 */
export function isValidCreditCard(str: string): boolean {
  const cleaned = str.replace(/\D/g, '');
  if (cleaned.length < 13 || cleaned.length > 19) return false;

  let sum = 0;
  let isEven = false;

  for (let i = cleaned.length - 1; i >= 0; i--) {
    let digit = parseInt(cleaned[i]!, 10);

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
 * Checks if a string is a valid UUID
 */
export function isValidUUID(str: string): boolean {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(str);
}

/**
 * Extracts phone numbers from a string (US format)
 */
export function extractPhoneNumbers(str: string): string[] {
  const phoneRegex = /(?:\+?1[-.\s]?)?\(?[0-9]{3}\)?[-.\s]?[0-9]{3}[-.\s]?[0-9]{4}/g;
  return str.match(phoneRegex) || [];
}

/**
 * Converts a string to morse code
 */
export function toMorseCode(str: string): string {
  const morseMap: { [key: string]: string } = {
    'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.',
    'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
    'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.',
    'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
    'Y': '-.--', 'Z': '--..', '0': '-----', '1': '.----', '2': '..---',
    '3': '...--', '4': '....-', '5': '.....', '6': '-....', '7': '--...',
    '8': '---..', '9': '----.', ' ': '/'
  };

  return str
    .toUpperCase()
    .split('')
    .map(char => morseMap[char] || char)
    .join(' ');
}

/**
 * Converts morse code back to text
 */
export function fromMorseCode(str: string): string {
  const morseMap: { [key: string]: string } = {
    '.-': 'A', '-...': 'B', '-.-.': 'C', '-..': 'D', '.': 'E', '..-.': 'F',
    '--.': 'G', '....': 'H', '..': 'I', '.---': 'J', '-.-': 'K', '.-..': 'L',
    '--': 'M', '-.': 'N', '---': 'O', '.--.': 'P', '--.-': 'Q', '.-.': 'R',
    '...': 'S', '-': 'T', '..-': 'U', '...-': 'V', '.--': 'W', '-..-': 'X',
    '-.--': 'Y', '--..': 'Z', '-----': '0', '.----': '1', '..---': '2',
    '...--': '3', '....-': '4', '.....': '5', '-....': '6', '--...': '7',
    '---..': '8', '----.': '9', '/': ' '
  };

  return str
    .split(' ')
    .map(code => morseMap[code] || code)
    .join('');
}

/**
 * Generates a random UUID v4
 */
export function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

/**
 * Converts string to hexadecimal
 */
export function toHex(str: string): string {
  return Array.from(str)
    .map(c => c.charCodeAt(0).toString(16).padStart(2, '0'))
    .join('');
}

/**
 * Converts hexadecimal back to string
 */
export function fromHex(hex: string): string {
  const result = [];
  for (let i = 0; i < hex.length; i += 2) {
    result.push(String.fromCharCode(parseInt(hex.substr(i, 2), 16)));
  }
  return result.join('');
}

/**
 * Checks if a string contains only ASCII characters
 */
export function isAscii(str: string): boolean {
  for (let i = 0; i < str.length; i++) {
    if (str.charCodeAt(i) > 127) {
      return false;
    }
  }
  return true;
}

/**
 * Removes all diacritics/accents from a string
 */
export function removeDiacritics(str: string): string {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

/**
 * Capitalizes each word in a string
 */
export function capitalizeWords(str: string): string {
  return str.replace(/\b\w/g, char => char.toUpperCase());
}

/**
 * Swaps the case of each character in a string
 */
export function swapCase(str: string): string {
  return str
    .split('')
    .map(char => char === char.toLowerCase() ? char.toUpperCase() : char.toLowerCase())
    .join('');
}

/**
 * Checks if a string is a valid hex color
 */
export function isValidHexColor(str: string): boolean {
  return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(str);
}

/**
 * Extracts all numbers from a string
 */
export function extractNumbers(str: string): number[] {
  const matches = str.match(/-?\d+\.?\d*/g);
  return matches ? matches.map(Number) : [];
}

/**
 * Converts a string to binary representation
 */
export function toBinary(str: string): string {
  return Array.from(str)
    .map(char => char.charCodeAt(0).toString(2).padStart(8, '0'))
    .join(' ');
}

/**
 * Converts binary back to string
 */
export function fromBinary(binary: string): string {
  if (!binary.trim()) return '';
  return binary
    .split(' ')
    .filter(bin => bin.length > 0)
    .map(bin => String.fromCharCode(parseInt(bin, 2)))
    .join('');
}
