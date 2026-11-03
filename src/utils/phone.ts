export const VALID_VN_PHONE_PREFIXES = ['03', '05', '07', '08', '09'];

/**
 * Pure function cleanPhone(input):
 * (1) remove every character that is not 0-9 or "+"
 * (2) if it starts with "+84" or "84" and has 9 or more digits after it, replace that prefix with "0"
 * (3) remove any remaining "+"
 * (4) cut to 10 digits
 * Never prepends digits automatically.
 */
export function cleanPhone(input: string): string {
  if (!input) return '';
  let val = input.replace(/[^0-9+]/g, '');

  if (val.startsWith('+84')) {
    const after = val.slice(3).replace(/\D/g, '');
    if (after.length >= 9) {
      val = '0' + (after.startsWith('0') ? after.slice(1) : after);
    }
  } else if (val.startsWith('84')) {
    const after = val.slice(2).replace(/\D/g, '');
    if (after.length >= 9) {
      val = '0' + (after.startsWith('0') ? after.slice(1) : after);
    }
  }

  val = val.replace(/\+/g, '');
  return val.slice(0, 10);
}

/**
 * Pure function formatPhone(digits):
 * Formats a 10-digit string into 4-3-3 grouping (e.g. "0337 203 332")
 */
export function formatPhone(digits: string): string {
  if (!digits) return '';
  const cleanDigits = digits.replace(/\D/g, '').slice(0, 10);
  if (cleanDigits.length <= 4) return cleanDigits;
  if (cleanDigits.length <= 7) {
    return `${cleanDigits.slice(0, 4)} ${cleanDigits.slice(4)}`;
  }
  return `${cleanDigits.slice(0, 4)} ${cleanDigits.slice(4, 7)} ${cleanDigits.slice(7, 10)}`;
}

/**
 * Validates 10-digit Vietnamese phone numbers.
 * Returns null if valid, or an error string if invalid.
 */
export function validatePhone(digits: string, isEn = false): string | null {
  const trimmed = digits.trim();
  if (!trimmed) {
    return isEn ? 'Please enter your phone number' : 'Vui lòng nhập số điện thoại';
  }
  if (trimmed.length < 10) {
    return isEn
      ? `Phone number must be 10 digits (you entered ${trimmed.length})`
      : `Số điện thoại cần đủ 10 số (bạn đã nhập ${trimmed.length})`;
  }
  const prefix = trimmed.slice(0, 2);
  if (!VALID_VN_PHONE_PREFIXES.includes(prefix)) {
    return isEn
      ? 'Phone number must start with 03, 05, 07, 08, or 09'
      : 'Số điện thoại phải bắt đầu bằng 03, 05, 07, 08 hoặc 09';
  }
  return null;
}
