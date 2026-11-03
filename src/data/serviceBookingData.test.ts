import test from 'node:test';
import assert from 'node:assert/strict';
import {
  cleanBookingPhoneDigits,
  formatBookingPhoneOnBlur,
  validateBookingPhoneDigits,
  estimateServicePrice,
  formatEstimatedPriceText,
  getTimeSlotsForDate,
  createSeededServiceBookings,
  parseServiceBookingUrl,
  generateServiceBookingCode,
  generateBookingIcsContent,
  parseVietnameseDateInput,
  formatIsoDateForDisplay,
  addDaysToIso,
  isDateClosed,
  resolveServiceBySlugOrName,
  mapPetSpeciesToBookingPetType,
  mapWeightStringToRangeId,
} from './serviceBookingData';
import { SERVICES_DATA } from './servicesData';

test('cleanBookingPhoneDigits strips non-digits, converts +84/84 to 0, and caps at 10 digits', () => {
  assert.equal(cleanBookingPhoneDigits('+84 337 203 332'), '0337203332');
  assert.equal(cleanBookingPhoneDigits('84912345678'), '0912345678');
  assert.equal(cleanBookingPhoneDigits('0912 345 678'), '0912345678');
  assert.equal(cleanBookingPhoneDigits('09123456789999'), '0912345678');
  assert.equal(cleanBookingPhoneDigits('abc033-720-3332xyz'), '0337203332');
});

test('formatBookingPhoneOnBlur formats 10-digit string as 4-3-3', () => {
  assert.equal(formatBookingPhoneOnBlur('0337203332'), '0337 203 332');
  assert.equal(formatBookingPhoneOnBlur('+84 912 345 678'), '0912 345 678');
  assert.equal(formatBookingPhoneOnBlur('0912'), '0912');
  assert.equal(formatBookingPhoneOnBlur('091234'), '0912 34');
});

test('validateBookingPhoneDigits returns exact VI and EN messages for empty, <10 digits, and bad prefix', () => {
  assert.equal(validateBookingPhoneDigits('', 'vi'), 'Vui lòng nhập số điện thoại');
  assert.equal(validateBookingPhoneDigits('', 'en'), 'Please enter your phone number');

  assert.equal(
    validateBookingPhoneDigits('09123', 'vi'),
    'Số điện thoại cần đủ 10 số (bạn đã nhập 5)'
  );
  assert.equal(
    validateBookingPhoneDigits('09123', 'en'),
    'Phone number must be 10 digits (you entered 5)'
  );

  assert.equal(
    validateBookingPhoneDigits('0123456789', 'vi'),
    'Số điện thoại phải bắt đầu bằng 03, 05, 07, 08 hoặc 09'
  );
  assert.equal(
    validateBookingPhoneDigits('0123456789', 'en'),
    'Phone number must start with 03, 05, 07, 08, or 09'
  );

  assert.equal(validateBookingPhoneDigits('0337203332', 'vi'), null);
  assert.equal(validateBookingPhoneDigits('+84 912 345 678', 'vi'), null);
});

test('estimateServicePrice respects dependsOnWeight and weight range tiers', () => {
  const checkup = SERVICES_DATA.find((s) => s.slug === 'kham-tong-quat')!;
  const training = SERVICES_DATA.find((s) => s.slug === 'huan-luyen')!;

  assert.equal(checkup.dependsOnWeight, true);
  assert.equal(estimateServicePrice(checkup, 'under_5'), 590000);
  assert.equal(estimateServicePrice(checkup, '5_to_10'), 690000);
  assert.equal(estimateServicePrice(checkup, '10_to_20'), 820000);
  assert.equal(estimateServicePrice(checkup, 'over_20'), 980000);

  // Training does not depend on weight
  assert.equal(training.dependsOnWeight, false);
  assert.equal(estimateServicePrice(training, 'over_20'), 690000);
  assert.equal(formatEstimatedPriceText(checkup, 'under_5', 'vi'), 'Từ 590.000đ');
  assert.equal(formatEstimatedPriceText(checkup, '5_to_10', 'en'), 'From 690.000đ');
});

test('getTimeSlotsForDate marks full seeded slots and past slots as disabled', () => {
  const baseDate = new Date(2026, 10, 2, 10, 30, 0); // 2026-11-02 10:30
  const todayIso = '2026-11-02';
  const tomorrowIso = addDaysToIso(todayIso, 1); // 2026-11-03
  const fullyBookedIso = addDaysToIso(todayIso, 3); // 2026-11-05
  const closedIso = addDaysToIso(todayIso, 5); // 2026-11-07 (closed offset 5)

  const seeded = createSeededServiceBookings(todayIso);

  // Tomorrow slots: 09:00 and 14:00 are full, 08:00 and 10:00 are available
  const tomorrowSlots = getTimeSlotsForDate(tomorrowIso, seeded, baseDate);
  assert.equal(tomorrowSlots.length, 12); // 08:00 to 19:00
  const slot09 = tomorrowSlots.find((s) => s.time === '09:00')!;
  const slot10 = tomorrowSlots.find((s) => s.time === '10:00')!;
  const slot14 = tomorrowSlots.find((s) => s.time === '14:00')!;
  assert.equal(slot09.isFull, true);
  assert.equal(slot09.disabled, true);
  assert.equal(slot09.reasonVi, 'Hết chỗ');
  assert.equal(slot10.disabled, false);
  assert.equal(slot14.isFull, true);

  // Today slots: anything <= 10:30 is past today
  const todaySlots = getTimeSlotsForDate(todayIso, seeded, baseDate);
  const today10 = todaySlots.find((s) => s.time === '10:00')!;
  const today11 = todaySlots.find((s) => s.time === '11:00')!;
  assert.equal(today10.isPastToday, true);
  assert.equal(today10.disabled, true);
  assert.equal(today11.isPastToday, false);
  assert.equal(today11.disabled, false);

  // Fully booked day: all slots disabled
  const fullDaySlots = getTimeSlotsForDate(fullyBookedIso, seeded, baseDate);
  assert.equal(fullDaySlots.every((s) => s.disabled), true);

  // Closed day: returns empty slots
  assert.equal(isDateClosed(closedIso, todayIso), true);
  const closedDaySlots = getTimeSlotsForDate(closedIso, seeded, baseDate);
  assert.equal(closedDaySlots.length, 0);
});

test('parseServiceBookingUrl parses /dat-lich, /dat-lich?service=slug, and /dat-lich/thanh-cong', () => {
  assert.deepEqual(parseServiceBookingUrl('/dat-lich', ''), {
    isBookingRoute: true,
    isSuccessRoute: false,
    preselectedServiceSlug: null,
  });

  assert.deepEqual(parseServiceBookingUrl('/dat-lich', '?service=spa-tam'), {
    isBookingRoute: true,
    isSuccessRoute: false,
    preselectedServiceSlug: 'spa-tam',
  });

  assert.deepEqual(parseServiceBookingUrl('/dat-lich/thanh-cong', ''), {
    isBookingRoute: true,
    isSuccessRoute: true,
    preselectedServiceSlug: null,
  });

  assert.deepEqual(parseServiceBookingUrl('/dich-vu', ''), {
    isBookingRoute: false,
    isSuccessRoute: false,
    preselectedServiceSlug: null,
  });
});

test('date parsing, booking code, and ICS generation work accurately', () => {
  assert.equal(parseVietnameseDateInput('15/11/2026'), '2026-11-15');
  assert.equal(parseVietnameseDateInput('31/02/2026'), null);
  assert.equal(formatIsoDateForDisplay('2026-11-15', 'vi'), '15/11/2026');

  const code = generateServiceBookingCode(0);
  assert.equal(code, 'DL-2026-0001');

  const ics = generateBookingIcsContent(
    {
      id: 'bk-1',
      code: 'DL-2026-0009',
      service: 'Spa & tắm',
      petType: 'Mèo',
      petName: 'Mây Mây',
      date: '2026-11-15',
      timeSlot: '10:00',
      fullName: 'Nguyễn Minh Anh',
      phone: '0912345678',
      createdAt: '2026-11-02T00:00:00Z',
    },
    'vi'
  );
  assert.ok(ics.includes('BEGIN:VCALENDAR'));
  assert.ok(ics.includes('DL-2026-0009'));
  assert.ok(ics.includes('Mây Mây'));
});

test('saved pet mapping and service resolution work cleanly', () => {
  assert.equal(mapPetSpeciesToBookingPetType('Thỏ'), 'Thỏ & chuột');
  assert.equal(mapPetSpeciesToBookingPetType('Hamster'), 'Thỏ & chuột');
  assert.equal(mapWeightStringToRangeId('3.8 kg'), 'under_5');
  assert.equal(mapWeightStringToRangeId('7.8 kg'), '5_to_10');
  assert.equal(mapWeightStringToRangeId('24.5 kg'), 'over_20');
  assert.equal(resolveServiceBySlugOrName('luu-tru').id, 'boarding');
});
