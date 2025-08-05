import { describe, expect, test } from 'bun:test';
import * as DateUtils from '../utils/dateUtils';

describe('DateUtils', () => {
  describe('formatDate', () => {
    test('should format date with various patterns', () => {
      const date = new Date(2023, 11, 25, 14, 30, 45, 123); // Dec 25, 2023 14:30:45.123
      
      expect(DateUtils.formatDate(date, 'YYYY-MM-DD')).toBe('2023-12-25');
      expect(DateUtils.formatDate(date, 'DD/MM/YYYY')).toBe('25/12/2023');
      expect(DateUtils.formatDate(date, 'HH:mm:ss')).toBe('14:30:45');
      expect(DateUtils.formatDate(date, 'YYYY-MM-DD HH:mm:ss.SSS')).toBe('2023-12-25 14:30:45.123');
    });
  });

  describe('parseDate', () => {
    test('should parse various date formats', () => {
      expect(DateUtils.parseDate('2023-12-25')).toEqual(new Date(2023, 11, 25));
      expect(DateUtils.parseDate('12/25/2023')).toEqual(new Date(2023, 11, 25));
      expect(DateUtils.parseDate('12-25-2023')).toEqual(new Date(2023, 11, 25));
      expect(DateUtils.parseDate('2023/12/25')).toEqual(new Date(2023, 11, 25));
    });

    test('should return null for invalid dates', () => {
      expect(DateUtils.parseDate('invalid-date')).toBeNull();
      expect(DateUtils.parseDate('not-a-date-at-all')).toBeNull();
      expect(DateUtils.parseDate('')).toBeNull();
    });
  });

  describe('addTime', () => {
    test('should add time to date', () => {
      const date = new Date(2023, 11, 25);
      
      expect(DateUtils.addTime(date, 1, 'years')).toEqual(new Date(2024, 11, 25));
      expect(DateUtils.addTime(date, 2, 'months')).toEqual(new Date(2024, 1, 25));
      expect(DateUtils.addTime(date, 7, 'days')).toEqual(new Date(2024, 0, 1));
      expect(DateUtils.addTime(date, 2, 'hours')).toEqual(new Date(2023, 11, 25, 2));
    });
  });

  describe('subtractTime', () => {
    test('should subtract time from date', () => {
      const date = new Date(2023, 11, 25);
      
      expect(DateUtils.subtractTime(date, 1, 'years')).toEqual(new Date(2022, 11, 25));
      expect(DateUtils.subtractTime(date, 1, 'months')).toEqual(new Date(2023, 10, 25));
      expect(DateUtils.subtractTime(date, 1, 'days')).toEqual(new Date(2023, 11, 24));
    });
  });

  describe('dateDiff', () => {
    test('should calculate difference between dates', () => {
      const date1 = new Date(2023, 0, 1);
      const date2 = new Date(2023, 0, 8);
      
      expect(DateUtils.dateDiff(date1, date2, 'days')).toBe(7);
      expect(DateUtils.dateDiff(date1, date2, 'hours')).toBe(7 * 24);
      expect(DateUtils.dateDiff(date1, date2, 'minutes')).toBe(7 * 24 * 60);
    });
  });

  describe('isBetween', () => {
    test('should check if date is between two dates', () => {
      const start = new Date(2023, 0, 1);
      const middle = new Date(2023, 5, 15);
      const end = new Date(2023, 11, 31);
      
      expect(DateUtils.isBetween(middle, start, end)).toBe(true);
      expect(DateUtils.isBetween(start, middle, end)).toBe(false);
      expect(DateUtils.isBetween(start, start, end, true)).toBe(true);
      expect(DateUtils.isBetween(start, start, end, false)).toBe(false);
    });
  });

  describe('startOf', () => {
    test('should get start of time period', () => {
      const date = new Date(2023, 5, 15, 14, 30, 45, 123);
      
      expect(DateUtils.startOf(date, 'year')).toEqual(new Date(2023, 0, 1, 0, 0, 0, 0));
      expect(DateUtils.startOf(date, 'month')).toEqual(new Date(2023, 5, 1, 0, 0, 0, 0));
      expect(DateUtils.startOf(date, 'day')).toEqual(new Date(2023, 5, 15, 0, 0, 0, 0));
      expect(DateUtils.startOf(date, 'hour')).toEqual(new Date(2023, 5, 15, 14, 0, 0, 0));
    });
  });

  describe('endOf', () => {
    test('should get end of time period', () => {
      const date = new Date(2023, 5, 15, 14, 30, 45, 123);
      
      expect(DateUtils.endOf(date, 'year')).toEqual(new Date(2023, 11, 31, 23, 59, 59, 999));
      expect(DateUtils.endOf(date, 'day')).toEqual(new Date(2023, 5, 15, 23, 59, 59, 999));
      expect(DateUtils.endOf(date, 'hour')).toEqual(new Date(2023, 5, 15, 14, 59, 59, 999));
    });
  });

  describe('isLeapYear', () => {
    test('should check if year is leap year', () => {
      expect(DateUtils.isLeapYear(2020)).toBe(true);
      expect(DateUtils.isLeapYear(2021)).toBe(false);
      expect(DateUtils.isLeapYear(2000)).toBe(true);
      expect(DateUtils.isLeapYear(1900)).toBe(false);
      expect(DateUtils.isLeapYear(2024)).toBe(true);
    });
  });

  describe('getDaysInMonth', () => {
    test('should get correct days in month', () => {
      expect(DateUtils.getDaysInMonth(2023, 1)).toBe(28); // February 2023
      expect(DateUtils.getDaysInMonth(2024, 1)).toBe(29); // February 2024 (leap year)
      expect(DateUtils.getDaysInMonth(2023, 0)).toBe(31); // January
      expect(DateUtils.getDaysInMonth(2023, 3)).toBe(30); // April
    });
  });

  describe('getDayOfYear', () => {
    test('should get day of year', () => {
      expect(DateUtils.getDayOfYear(new Date(2023, 0, 1))).toBe(1);
      expect(DateUtils.getDayOfYear(new Date(2023, 0, 31))).toBe(31);
      expect(DateUtils.getDayOfYear(new Date(2023, 11, 31))).toBe(365);
    });
  });

  describe('getWeekOfYear', () => {
    test('should get week of year', () => {
      expect(DateUtils.getWeekOfYear(new Date(2023, 0, 1))).toBeGreaterThan(0);
      expect(DateUtils.getWeekOfYear(new Date(2023, 0, 1))).toBeLessThanOrEqual(53);
    });
  });

  describe('getDateRange', () => {
    test('should get array of dates in range', () => {
      const start = new Date(2023, 0, 1);
      const end = new Date(2023, 0, 3);
      const range = DateUtils.getDateRange(start, end);
      
      expect(range).toHaveLength(3);
      expect(range[0]).toEqual(start);
      expect(range[2]).toEqual(end);
    });
  });

  describe('isSameDay', () => {
    test('should check if two dates are same day', () => {
      const date1 = new Date(2023, 5, 15, 10, 30);
      const date2 = new Date(2023, 5, 15, 20, 45);
      const date3 = new Date(2023, 5, 16, 10, 30);
      
      expect(DateUtils.isSameDay(date1, date2)).toBe(true);
      expect(DateUtils.isSameDay(date1, date3)).toBe(false);
    });
  });

  describe('isToday', () => {
    test('should check if date is today', () => {
      const today = new Date();
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      
      expect(DateUtils.isToday(today)).toBe(true);
      expect(DateUtils.isToday(yesterday)).toBe(false);
    });
  });

  describe('isYesterday', () => {
    test('should check if date is yesterday', () => {
      const today = new Date();
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      
      expect(DateUtils.isYesterday(yesterday)).toBe(true);
      expect(DateUtils.isYesterday(today)).toBe(false);
    });
  });

  describe('isTomorrow', () => {
    test('should check if date is tomorrow', () => {
      const today = new Date();
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      
      expect(DateUtils.isTomorrow(tomorrow)).toBe(true);
      expect(DateUtils.isTomorrow(today)).toBe(false);
    });
  });

  describe('getRelativeTime', () => {
    test('should get relative time string', () => {
      const now = new Date(2023, 5, 15, 12, 0, 0);
      const hourAgo = new Date(2023, 5, 15, 11, 0, 0);
      const hourLater = new Date(2023, 5, 15, 13, 0, 0);
      
      expect(DateUtils.getRelativeTime(hourAgo, now)).toBe('1 hour ago');
      expect(DateUtils.getRelativeTime(hourLater, now)).toBe('in 1 hour');
      expect(DateUtils.getRelativeTime(now, now)).toBe('just now');
    });
  });

  describe('getAge', () => {
    test('should calculate age correctly', () => {
      const birthDate = new Date(1990, 5, 15);
      const currentDate = new Date(2023, 5, 15);
      
      expect(DateUtils.getAge(birthDate, currentDate)).toBe(33);
      
      const beforeBirthday = new Date(2023, 5, 14);
      expect(DateUtils.getAge(birthDate, beforeBirthday)).toBe(32);
    });
  });

  describe('isWeekend', () => {
    test('should check if date is weekend', () => {
      const saturday = new Date(2023, 5, 17); // June 17, 2023 was Saturday
      const sunday = new Date(2023, 5, 18);   // June 18, 2023 was Sunday
      const monday = new Date(2023, 5, 19);   // June 19, 2023 was Monday
      
      expect(DateUtils.isWeekend(saturday)).toBe(true);
      expect(DateUtils.isWeekend(sunday)).toBe(true);
      expect(DateUtils.isWeekend(monday)).toBe(false);
    });
  });

  describe('isWeekday', () => {
    test('should check if date is weekday', () => {
      const saturday = new Date(2023, 5, 17);
      const monday = new Date(2023, 5, 19);
      
      expect(DateUtils.isWeekday(saturday)).toBe(false);
      expect(DateUtils.isWeekday(monday)).toBe(true);
    });
  });

  describe('getNextWeekday', () => {
    test('should get next occurrence of weekday', () => {
      const monday = new Date(2023, 5, 19); // Monday
      const nextFriday = DateUtils.getNextWeekday(monday, 5); // 5 = Friday
      
      expect(nextFriday.getDay()).toBe(5);
      expect(nextFriday > monday).toBe(true);
    });
  });

  describe('getPreviousWeekday', () => {
    test('should get previous occurrence of weekday', () => {
      const friday = new Date(2023, 5, 23); // Friday
      const previousMonday = DateUtils.getPreviousWeekday(friday, 1); // 1 = Monday
      
      expect(previousMonday.getDay()).toBe(1);
      expect(previousMonday < friday).toBe(true);
    });
  });

  describe('toUTC', () => {
    test('should convert date to UTC', () => {
      const localDate = new Date(2023, 5, 15, 12, 0, 0);
      const utcDate = DateUtils.toUTC(localDate);
      
      expect(utcDate).toBeInstanceOf(Date);
      // The UTC conversion should add the timezone offset
      const expectedTime = localDate.getTime() + localDate.getTimezoneOffset() * 60000;
      expect(utcDate.getTime()).toBe(expectedTime);
    });
  });

  describe('fromUTC', () => {
    test('should convert UTC date to local time', () => {
      const utcDate = new Date(Date.UTC(2023, 5, 15, 12, 0, 0));
      const localDate = DateUtils.fromUTC(utcDate);
      
      expect(localDate).toBeInstanceOf(Date);
      // The local conversion should subtract the timezone offset
      const expectedTime = utcDate.getTime() - utcDate.getTimezoneOffset() * 60000;
      expect(localDate.getTime()).toBe(expectedTime);
    });
  });
});
