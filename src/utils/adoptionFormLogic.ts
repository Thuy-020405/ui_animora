/**
 * Pure adoption form utilities: phone cleaning, formatting, validation,
 * draft inspection, and province lists.
 */

export const VIETNAMESE_PROVINCES: string[] = [
  'Đà Nẵng',
  'An Giang',
  'Bà Rịa - Vũng Tàu',
  'Bắc Giang',
  'Bắc Kạn',
  'Bạc Liêu',
  'Bắc Ninh',
  'Bến Tre',
  'Bình Định',
  'Bình Dương',
  'Bình Phước',
  'Bình Thuận',
  'Cà Mau',
  'Cần Thơ',
  'Cao Bằng',
  'Đắk Lắk',
  'Đắk Nông',
  'Điện Biên',
  'Đồng Nai',
  'Đồng Tháp',
  'Gia Lai',
  'Hà Giang',
  'Hà Nam',
  'Hà Nội',
  'Hà Tĩnh',
  'Hải Dương',
  'Hải Phòng',
  'Hậu Giang',
  'Hòa Bình',
  'Hưng Yên',
  'Khánh Hòa',
  'Kiên Giang',
  'Kon Tum',
  'Lai Châu',
  'Lâm Đồng',
  'Lạng Sơn',
  'Lào Cai',
  'Long An',
  'Nam Định',
  'Nghệ An',
  'Ninh Bình',
  'Ninh Thuận',
  'Phú Thọ',
  'Phú Yên',
  'Quảng Bình',
  'Quảng Nam',
  'Quảng Ngãi',
  'Quảng Ninh',
  'Quảng Trị',
  'Sóc Trăng',
  'Sơn La',
  'Tây Ninh',
  'Thái Bình',
  'Thái Nguyên',
  'Thanh Hóa',
  'Thừa Thiên Huế',
  'Tiền Giang',
  'TP. Hồ Chí Minh',
  'Trà Vinh',
  'Tuyên Quang',
  'Vĩnh Long',
  'Vĩnh Phúc',
  'Yên Bái',
  'Tỉnh / Thành khác',
];

/**
 * Pure function cleanPhone(input):
 * (1) remove every character that is not 0-9 or "+"
 * (2) if it starts with "+84" or "84" and has more than 9 digits after it, replace that prefix with "0"
 *     (also handles standard 9 digits e.g. +84912345678)
 * (3) remove any remaining "+"
 * (4) cut to 10 digits
 * Never prepends digits automatically.
 */
export function cleanPhone(input: string): string {
  if (!input) return '';
  // (1) remove every character that is not 0-9 or "+"
  let val = input.replace(/[^0-9+]/g, '');

  // (2) if it starts with "+84" or "84" and has 9 or more digits after it, replace that prefix with "0"
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

  // (3) remove any remaining "+"
  val = val.replace(/\+/g, '');

  // (4) cut to 10 digits
  return val.slice(0, 10);
}

/**
 * Pure function formatPhone433(digits):
 * Formats a 10-digit number into groups 4-3-3: "0337 203 332"
 * Computed at render time only, never stored in state.
 */
export function formatPhone433(digits: string): string {
  if (!digits) return '';
  const cleanDigits = digits.replace(/\D/g, '').slice(0, 10);
  if (cleanDigits.length <= 4) return cleanDigits;
  if (cleanDigits.length <= 7) {
    return `${cleanDigits.slice(0, 4)} ${cleanDigits.slice(4)}`;
  }
  return `${cleanDigits.slice(0, 4)} ${cleanDigits.slice(4, 7)} ${cleanDigits.slice(7, 10)}`;
}

export const VALID_VN_PHONE_PREFIXES = ['03', '05', '07', '08', '09'];

/**
 * Validates phone digits:
 * - empty -> "Vui lòng nhập số điện thoại"
 * - fewer than 10 digits -> "Số điện thoại cần đủ 10 số (bạn đã nhập {n})"
 * - wrong prefix -> "Số điện thoại phải bắt đầu bằng 03, 05, 07, 08 hoặc 09"
 * - valid -> returns isValid: true
 */
export function validatePhoneDigits(
  digits: string,
  isEn: boolean = false
): { isValid: boolean; error?: string } {
  const trimmed = digits.trim();
  if (!trimmed) {
    return {
      isValid: false,
      error: isEn ? 'Please enter your phone number' : 'Vui lòng nhập số điện thoại',
    };
  }
  if (trimmed.length < 10) {
    return {
      isValid: false,
      error: isEn
        ? `Phone number must be 10 digits (you entered ${trimmed.length})`
        : `Số điện thoại cần đủ 10 số (bạn đã nhập ${trimmed.length})`,
    };
  }
  const prefix = trimmed.slice(0, 2);
  if (!VALID_VN_PHONE_PREFIXES.includes(prefix)) {
    return {
      isValid: false,
      error: isEn
        ? 'Phone number must start with 03, 05, 07, 08, or 09'
        : 'Số điện thoại phải bắt đầu bằng 03, 05, 07, 08 hoặc 09',
    };
  }
  return { isValid: true };
}

/**
 * Checks whether raw draft phone is strictly valid to restore.
 * Drops invalid or corrupted draft phones.
 */
export function isValidDraftPhone(phoneDigits: string): boolean {
  if (!phoneDigits || typeof phoneDigits !== 'string') return false;
  const digits = phoneDigits.replace(/\D/g, '');
  return digits.length === 10 && VALID_VN_PHONE_PREFIXES.includes(digits.slice(0, 2));
}

/**
 * Determines whether a stored draft contains at least one meaningful, non-empty user value.
 */
export function hasMeaningfulDraftValues(draft: any): boolean {
  if (!draft || typeof draft !== 'object') return false;
  if (draft.applicantName && draft.applicantName.trim().length > 0) return true;
  if (draft.phoneDigits && isValidDraftPhone(draft.phoneDigits)) return true;
  if (draft.phone && isValidDraftPhone(cleanPhone(draft.phone))) return true;
  if (draft.email && draft.email.trim().length > 0) return true;
  if (draft.notes && draft.notes.trim().length > 0) return true;
  if (draft.otherPetsDetail && draft.otherPetsDetail.trim().length > 0) return true;
  if (draft.hadPetBefore || draft.housingType) return true;
  return false;
}
