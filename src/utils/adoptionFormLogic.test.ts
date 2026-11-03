import test from 'node:test';
import assert from 'node:assert/strict';
import {
  cleanPhone,
  formatPhone433,
  validatePhoneDigits,
  isValidDraftPhone,
  hasMeaningfulDraftValues,
  VIETNAMESE_PROVINCES,
} from './adoptionFormLogic';

test('cleanPhone strips non-digit characters except + and cuts to 10 digits', () => {
  assert.equal(cleanPhone('0337 203 332'), '0337203332');
  assert.equal(cleanPhone('abc0337xyz203--332'), '0337203332');
  assert.equal(cleanPhone('03372033329999'), '0337203332'); // max 10 digits
  assert.equal(cleanPhone(''), '');
});

test('cleanPhone handles +84 and 84 prefix replacement to 0', () => {
  assert.equal(cleanPhone('+84337203332'), '0337203332');
  assert.equal(cleanPhone('+84901234567'), '0901234567');
  assert.equal(cleanPhone('84901234567'), '0901234567');
  assert.equal(cleanPhone('+840901234567'), '0901234567');
});

test('cleanPhone does not automatically prepend 0 or 84 when user enters partial digits', () => {
  assert.equal(cleanPhone('912'), '912');
  assert.equal(cleanPhone('033'), '033');
});

test('formatPhone433 formats 10 digits into 4-3-3 pattern', () => {
  assert.equal(formatPhone433('0337203332'), '0337 203 332');
  assert.equal(formatPhone433('0912345678'), '0912 345 678');
  assert.equal(formatPhone433('033'), '033');
  assert.equal(formatPhone433('033720'), '0337 20');
  assert.equal(formatPhone433(''), '');
});

test('validatePhoneDigits validates presence, length, and valid prefixes', () => {
  // Empty
  const emptyVi = validatePhoneDigits('', false);
  assert.equal(emptyVi.isValid, false);
  assert.equal(emptyVi.error, 'Vui lòng nhập số điện thoại');

  const emptyEn = validatePhoneDigits('', true);
  assert.equal(emptyEn.isValid, false);
  assert.equal(emptyEn.error, 'Please enter your phone number');

  // Fewer than 10 digits
  const shortVi = validatePhoneDigits('0337203', false);
  assert.equal(shortVi.isValid, false);
  assert.equal(shortVi.error, 'Số điện thoại cần đủ 10 số (bạn đã nhập 7)');

  const shortEn = validatePhoneDigits('0337203', true);
  assert.equal(shortEn.isValid, false);
  assert.equal(shortEn.error, 'Phone number must be 10 digits (you entered 7)');

  // Wrong prefix (e.g. 01, 04, 06)
  const wrongPrefixVi = validatePhoneDigits('0123456789', false);
  assert.equal(wrongPrefixVi.isValid, false);
  assert.equal(wrongPrefixVi.error, 'Số điện thoại phải bắt đầu bằng 03, 05, 07, 08 hoặc 09');

  const wrongPrefixEn = validatePhoneDigits('0423456789', true);
  assert.equal(wrongPrefixEn.isValid, false);
  assert.equal(wrongPrefixEn.error, 'Phone number must start with 03, 05, 07, 08, or 09');

  // Valid numbers
  assert.equal(validatePhoneDigits('0337203332').isValid, true);
  assert.equal(validatePhoneDigits('0567890123').isValid, true);
  assert.equal(validatePhoneDigits('0767890123').isValid, true);
  assert.equal(validatePhoneDigits('0867890123').isValid, true);
  assert.equal(validatePhoneDigits('0912345678').isValid, true);
});

test('isValidDraftPhone strictly checks valid 10-digit phone', () => {
  assert.equal(isValidDraftPhone('0337203332'), true);
  assert.equal(isValidDraftPhone('00030337203'), false); // Corrupted 11 digits
  assert.equal(isValidDraftPhone('12345'), false);
  assert.equal(isValidDraftPhone(''), false);
});

test('hasMeaningfulDraftValues only returns true if real data is entered', () => {
  assert.equal(hasMeaningfulDraftValues(null), false);
  assert.equal(hasMeaningfulDraftValues({}), false);
  assert.equal(hasMeaningfulDraftValues({ applicantName: '   ' }), false);
  assert.equal(hasMeaningfulDraftValues({ applicantName: 'Nguyễn Văn A' }), true);
  assert.equal(hasMeaningfulDraftValues({ phoneDigits: '0337203332' }), true);
  assert.equal(hasMeaningfulDraftValues({ phoneDigits: '00030337203' }), false);
});

test('VIETNAMESE_PROVINCES has Đà Nẵng first followed by alphabetical provinces', () => {
  assert.equal(VIETNAMESE_PROVINCES[0], 'Đà Nẵng');
  assert.ok(VIETNAMESE_PROVINCES.includes('Hà Nội'));
  assert.ok(VIETNAMESE_PROVINCES.includes('TP. Hồ Chí Minh'));
  assert.ok(VIETNAMESE_PROVINCES.includes('Hải Phòng'));
});
