import { describe, it, expect } from 'vitest';
import { cleanPhone, formatPhone, validatePhone } from '../src/utils/phone';

describe('Phone Utility Tests', () => {
  it('cleanPhone handles standard typing of digits', () => {
    expect(cleanPhone('0337203332')).toBe('0337203332');
  });

  it('cleanPhone handles pasting "+84 337 203 332"', () => {
    expect(cleanPhone('+84 337 203 332')).toBe('0337203332');
  });

  it('cleanPhone handles pasting formatted "033-720-3332"', () => {
    expect(cleanPhone('033-720-3332')).toBe('0337203332');
  });

  it('cleanPhone limits max digits to 10', () => {
    expect(cleanPhone('0337203332999')).toBe('0337203332');
  });

  it('formatPhone formats 10 digits into 4-3-3 pattern', () => {
    expect(formatPhone('0337203332')).toBe('0337 203 332');
  });

  it('formatPhone never modifies the underlying raw stored digits', () => {
    const rawDigits = '0337203332';
    const formatted = formatPhone(rawDigits);
    expect(formatted).toBe('0337 203 332');
    expect(rawDigits).toBe('0337203332');
  });

  it('validatePhone returns error for empty input', () => {
    expect(validatePhone('')).toBe('Vui lòng nhập số điện thoại');
  });

  it('validatePhone returns error for too short input', () => {
    expect(validatePhone('03372033')).toBe('Số điện thoại cần đủ 10 số (bạn đã nhập 8)');
  });

  it('validatePhone returns error for invalid prefix', () => {
    expect(validatePhone('0123456789')).toBe('Số điện thoại phải bắt đầu bằng 03, 05, 07, 08 hoặc 09');
  });

  it('validatePhone returns null for valid 10-digit number', () => {
    expect(validatePhone('0337203332')).toBeNull();
  });
});
