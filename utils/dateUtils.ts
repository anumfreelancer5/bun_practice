/**
 * Date utility functions
 */

/**
 * Formats a date to a string using common patterns
 */
export function formatDate(date: Date, format: string): string {
  const map: Record<string, string> = {
    YYYY: date.getFullYear().toString(),
    YY: date.getFullYear().toString().slice(-2),
    MM: String(date.getMonth() + 1).padStart(2, '0'),
    M: String(date.getMonth() + 1),
    DD: String(date.getDate()).padStart(2, '0'),
    D: String(date.getDate()),
    HH: String(date.getHours()).padStart(2, '0'),
    H: String(date.getHours()),
    mm: String(date.getMinutes()).padStart(2, '0'),
    m: String(date.getMinutes()),
    ss: String(date.getSeconds()).padStart(2, '0'),
    s: String(date.getSeconds()),
    SSS: String(date.getMilliseconds()).padStart(3, '0'),
  };

  return format.replace(/YYYY|YY|MM|M|DD|D|HH|H|mm|m|ss|s|SSS/g, match => map[match] || match);
}

/**
 * Parses a date string with various formats
 */
export function parseDate(dateString: string): Date | null {
  // Try common formats
  const formats = [
    /^(\d{4})-(\d{2})-(\d{2})$/, // YYYY-MM-DD
    /^(\d{2})\/(\d{2})\/(\d{4})$/, // MM/DD/YYYY
    /^(\d{2})-(\d{2})-(\d{4})$/, // MM-DD-YYYY
    /^(\d{4})\/(\d{2})\/(\d{2})$/, // YYYY/MM/DD
  ];

  for (const format of formats) {
    const match = dateString.match(format);
    if (match) {
      const [, part1, part2, part3] = match;
      // Handle different date formats
      if (format === formats[0] || format === formats[3]) {
        // YYYY-MM-DD or YYYY/MM/DD
        return new Date(parseInt(part1!), parseInt(part2!) - 1, parseInt(part3!));
      } else {
        // MM/DD/YYYY or MM-DD-YYYY
        return new Date(parseInt(part3!), parseInt(part1!) - 1, parseInt(part2!));
      }
    }
  }

  // Fallback to native parsing
  const parsed = new Date(dateString);
  return isNaN(parsed.getTime()) ? null : parsed;
}

/**
 * Adds time to a date
 */
export function addTime(
  date: Date,
  value: number,
  unit: 'years' | 'months' | 'days' | 'hours' | 'minutes' | 'seconds' | 'milliseconds'
): Date {
  const result = new Date(date);

  switch (unit) {
    case 'years':
      result.setFullYear(result.getFullYear() + value);
      break;
    case 'months':
      result.setMonth(result.getMonth() + value);
      break;
    case 'days':
      result.setDate(result.getDate() + value);
      break;
    case 'hours':
      result.setHours(result.getHours() + value);
      break;
    case 'minutes':
      result.setMinutes(result.getMinutes() + value);
      break;
    case 'seconds':
      result.setSeconds(result.getSeconds() + value);
      break;
    case 'milliseconds':
      result.setMilliseconds(result.getMilliseconds() + value);
      break;
  }

  return result;
}

/**
 * Subtracts time from a date
 */
export function subtractTime(
  date: Date,
  value: number,
  unit: 'years' | 'months' | 'days' | 'hours' | 'minutes' | 'seconds' | 'milliseconds'
): Date {
  return addTime(date, -value, unit);
}

/**
 * Gets the difference between two dates
 */
export function dateDiff(
  date1: Date,
  date2: Date,
  unit: 'years' | 'months' | 'days' | 'hours' | 'minutes' | 'seconds' | 'milliseconds' = 'days'
): number {
  const diffInMs = date2.getTime() - date1.getTime();

  switch (unit) {
    case 'years':
      return diffInMs / (1000 * 60 * 60 * 24 * 365.25);
    case 'months':
      return diffInMs / (1000 * 60 * 60 * 24 * 30.44); // Average month
    case 'days':
      return diffInMs / (1000 * 60 * 60 * 24);
    case 'hours':
      return diffInMs / (1000 * 60 * 60);
    case 'minutes':
      return diffInMs / (1000 * 60);
    case 'seconds':
      return diffInMs / 1000;
    case 'milliseconds':
      return diffInMs;
    default:
      return diffInMs / (1000 * 60 * 60 * 24);
  }
}

/**
 * Checks if a date is between two other dates
 */
export function isBetween(date: Date, start: Date, end: Date, inclusive: boolean = true): boolean {
  if (inclusive) {
    return date >= start && date <= end;
  }
  return date > start && date < end;
}

/**
 * Gets the start of a time period for a date
 */
export function startOf(
  date: Date,
  unit: 'year' | 'month' | 'day' | 'hour' | 'minute' | 'second'
): Date {
  const result = new Date(date);

  if (
    unit === 'year' ||
    unit === 'month' ||
    unit === 'day' ||
    unit === 'hour' ||
    unit === 'minute' ||
    unit === 'second'
  ) {
    result.setMilliseconds(0);
  }
  if (
    unit === 'year' ||
    unit === 'month' ||
    unit === 'day' ||
    unit === 'hour' ||
    unit === 'minute'
  ) {
    result.setSeconds(0);
  }
  if (unit === 'year' || unit === 'month' || unit === 'day' || unit === 'hour') {
    result.setMinutes(0);
  }
  if (unit === 'year' || unit === 'month' || unit === 'day') {
    result.setHours(0);
  }
  if (unit === 'year' || unit === 'month') {
    result.setDate(1);
  }
  if (unit === 'year') {
    result.setMonth(0);
  }

  return result;
}

/**
 * Gets the end of a time period for a date
 */
export function endOf(
  date: Date,
  unit: 'year' | 'month' | 'day' | 'hour' | 'minute' | 'second'
): Date {
  const result = new Date(date);

  switch (unit) {
    case 'year':
      result.setMonth(11);
      result.setDate(31);
      result.setHours(23, 59, 59, 999);
      break;
    case 'month':
      result.setMonth(result.getMonth() + 1, 0);
      result.setHours(23, 59, 59, 999);
      break;
    case 'day':
      result.setHours(23, 59, 59, 999);
      break;
    case 'hour':
      result.setMinutes(59, 59, 999);
      break;
    case 'minute':
      result.setSeconds(59, 999);
      break;
    case 'second':
      result.setMilliseconds(999);
      break;
  }

  return result;
}

/**
 * Checks if a year is a leap year
 */
export function isLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

/**
 * Gets the number of days in a month
 */
export function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

/**
 * Gets the day of the year (1-366)
 */
export function getDayOfYear(date: Date): number {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - start.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

/**
 * Gets the week number of the year (1-53)
 */
export function getWeekOfYear(date: Date): number {
  const start = new Date(date.getFullYear(), 0, 1);
  const days = Math.floor((date.getTime() - start.getTime()) / (24 * 60 * 60 * 1000));
  return Math.ceil((days + start.getDay() + 1) / 7);
}

/**
 * Gets an array of dates between two dates
 */
export function getDateRange(start: Date, end: Date): Date[] {
  const dates: Date[] = [];
  const current = new Date(start);

  while (current <= end) {
    dates.push(new Date(current));
    current.setDate(current.getDate() + 1);
  }

  return dates;
}

/**
 * Checks if two dates are on the same day
 */
export function isSameDay(date1: Date, date2: Date): boolean {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

/**
 * Checks if a date is today
 */
export function isToday(date: Date): boolean {
  return isSameDay(date, new Date());
}

/**
 * Checks if a date is yesterday
 */
export function isYesterday(date: Date): boolean {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return isSameDay(date, yesterday);
}

/**
 * Checks if a date is tomorrow
 */
export function isTomorrow(date: Date): boolean {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return isSameDay(date, tomorrow);
}

/**
 * Gets a relative time string (e.g., "2 hours ago", "in 3 days")
 */
export function getRelativeTime(date: Date, now: Date = new Date()): string {
  const diffMs = now.getTime() - date.getTime();
  const isPast = diffMs > 0;
  const absDiffMs = Math.abs(diffMs);

  const units = [
    { name: 'year', ms: 1000 * 60 * 60 * 24 * 365 },
    { name: 'month', ms: 1000 * 60 * 60 * 24 * 30 },
    { name: 'day', ms: 1000 * 60 * 60 * 24 },
    { name: 'hour', ms: 1000 * 60 * 60 },
    { name: 'minute', ms: 1000 * 60 },
    { name: 'second', ms: 1000 },
  ];

  for (const unit of units) {
    const value = Math.floor(absDiffMs / unit.ms);
    if (value >= 1) {
      const plural = value > 1 ? 's' : '';
      return isPast ? `${value} ${unit.name}${plural} ago` : `in ${value} ${unit.name}${plural}`;
    }
  }

  return 'just now';
}

/**
 * Gets the age from a birth date
 */
export function getAge(birthDate: Date, currentDate: Date = new Date()): number {
  let age = currentDate.getFullYear() - birthDate.getFullYear();
  const monthDiff = currentDate.getMonth() - birthDate.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && currentDate.getDate() < birthDate.getDate())) {
    age--;
  }

  return age;
}

/**
 * Checks if a date is a weekend (Saturday or Sunday)
 */
export function isWeekend(date: Date): boolean {
  const day = date.getDay();
  return day === 0 || day === 6; // Sunday = 0, Saturday = 6
}

/**
 * Checks if a date is a weekday (Monday through Friday)
 */
export function isWeekday(date: Date): boolean {
  return !isWeekend(date);
}

/**
 * Gets the next occurrence of a specific day of the week
 */
export function getNextWeekday(date: Date, dayOfWeek: number): Date {
  const result = new Date(date);
  const daysUntilTarget = (dayOfWeek - date.getDay() + 7) % 7 || 7;
  result.setDate(date.getDate() + daysUntilTarget);
  return result;
}

/**
 * Gets the previous occurrence of a specific day of the week
 */
export function getPreviousWeekday(date: Date, dayOfWeek: number): Date {
  const result = new Date(date);
  const daysSinceTarget = (date.getDay() - dayOfWeek + 7) % 7 || 7;
  result.setDate(date.getDate() - daysSinceTarget);
  return result;
}

/**
 * Converts a Date to UTC
 */
export function toUTC(date: Date): Date {
  return new Date(date.getTime() + date.getTimezoneOffset() * 60000);
}

/**
 * Converts a UTC Date to local time
 */
export function fromUTC(date: Date): Date {
  return new Date(date.getTime() - date.getTimezoneOffset() * 60000);
}
