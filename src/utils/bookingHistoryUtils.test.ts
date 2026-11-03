import test from 'node:test';
import assert from 'node:assert/strict';
import {
  CANCEL_HOURS,
  maskBookingPhone,
  maskBookingEmail,
  getHoursUntilBooking,
  canModifyBooking,
  getUpcomingCountdownText,
  formatBookingDateWithWeekday,
  getBookingTabCategory,
  doesBookingBelongToUser,
  filterAndSortBookings,
  lookupSingleBooking,
  checkLookupRateLimit,
  evaluateAddBookingToPetProfile,
  createCareRecordFromBooking,
  buildRebookUrl,
  parseMyBookingsUrl,
} from './bookingHistoryUtils';
import { createSeededServiceBookings } from '../data/serviceBookingData';
import { initialPets } from '../data/mockData';
import { Booking, UserAccount } from '../types';

test('maskBookingPhone and maskBookingEmail mask sensitive owner contact details', () => {
  assert.equal(maskBookingPhone('0337 203 332'), '0337 *** 332');
  assert.equal(maskBookingPhone('+84337203332'), '0337 *** 332');
  assert.equal(maskBookingEmail('phanthidinhthuy6@gmail.com'), 'p***@gmail.com');
  assert.equal(maskBookingEmail('minhanh@animora.vn'), 'm***@animora.vn');
});

test('canModifyBooking enforces CANCEL_HOURS = 24 and status rules', () => {
  assert.equal(CANCEL_HOURS, 24);
  const now = new Date(2026, 10, 2, 9, 0, 0); // 2026-11-02 09:00

  // 4 days away, status "Đã xác nhận" -> allowed
  const farBooking: Booking = {
    id: 'bk-far',
    code: 'DL-2026-0001',
    service: 'Khám tổng quát',
    petType: 'Mèo',
    date: '2026-11-06',
    timeSlot: '09:00',
    fullName: 'Phan Thị Đình Thùy',
    phone: '0337 203 332',
    status: 'Đã xác nhận',
    createdAt: '2026-11-01T00:00:00Z',
  };
  const farCheck = canModifyBooking(farBooking, now);
  assert.equal(farCheck.allowed, true);
  assert.ok(farCheck.hoursRemaining >= 96);

  // 9 hours away (< 24h), status "Mới" -> disallowed with reason within_24h
  const nearBooking: Booking = {
    ...farBooking,
    id: 'bk-near',
    code: 'DL-2026-0002',
    date: '2026-11-02',
    timeSlot: '18:00',
    status: 'Mới',
  };
  const nearCheck = canModifyBooking(nearBooking, now);
  assert.equal(nearCheck.allowed, false);
  assert.equal(nearCheck.reason, 'within_24h');
  assert.equal( getHoursUntilBooking(nearBooking, now), 9);

  // Completed booking -> disallowed with reason status
  const completedBooking: Booking = {
    ...farBooking,
    id: 'bk-done',
    status: 'Hoàn thành',
  };
  const doneCheck = canModifyBooking(completedBooking, now);
  assert.equal(doneCheck.allowed, false);
  assert.equal(doneCheck.reason, 'status');
});

test('seeded bookings contain 6 owner bookings (2 upcoming with 1 within 24h, 2 completed, 1 cancelled, 1 no-show)', () => {
  const now = new Date(2026, 10, 2, 2, 0, 0);
  const todayIso = '2026-11-02';
  const allSeeded = createSeededServiceBookings(todayIso, now);

  const demoUser: UserAccount = {
    id: 'user-demo-owner',
    fullName: 'Phan Thị Đình Thùy',
    email: 'phanthidinhthuy6@gmail.com',
    phone: '0337203332',
    passwordHash: '123456',
    role: 'owner',
    createdAt: '2026-01-15',
    addresses: [],
  };

  const userBookings = allSeeded.filter((b) => doesBookingBelongToUser(b, demoUser));
  assert.equal(userBookings.length, 6);

  const upcoming = filterAndSortBookings(userBookings, { tab: 'upcoming', now });
  const past = filterAndSortBookings(userBookings, { tab: 'past', now });
  const cancelled = filterAndSortBookings(userBookings, { tab: 'cancelled', now });

  assert.equal(upcoming.length, 2);
  assert.equal(past.length, 3); // 2 completed + 1 no-show
  assert.equal(cancelled.length, 1);

  // Verify 1 upcoming is within 24h and 1 upcoming is >= 24h
  const modStates = upcoming.map((b) => canModifyBooking(b, now));
  assert.equal(modStates.some((m) => m.allowed), true);
  assert.equal(modStates.some((m) => !m.allowed && m.reason === 'within_24h'), true);
});

test('lookupSingleBooking matches case-insensitive code and normalized phone with or without spaces/+84, and returns generic error on mismatch', () => {
  const now = new Date(2026, 10, 2, 9, 0, 0);
  const seeded = createSeededServiceBookings('2026-11-02', now);

  // Exact match with spaces
  const res1 = lookupSingleBooking(seeded, '  dl-2026-0001 ', '0337 203 332', 'vi');
  assert.ok(res1.found);
  assert.equal(res1.found?.code, 'DL-2026-0001');
  assert.equal(res1.error, null);

  // Exact match with +84
  const res2 = lookupSingleBooking(seeded, 'DL-2026-0001', '+84337203332', 'vi');
  assert.ok(res2.found);
  assert.equal(res2.found?.code, 'DL-2026-0001');

  // Wrong code -> generic error
  const wrongCode = lookupSingleBooking(seeded, 'DL-2026-9999', '0337 203 332', 'vi');
  assert.equal(wrongCode.found, null);
  assert.equal(
    wrongCode.error,
    'Không tìm thấy lịch hẹn. Vui lòng kiểm tra lại mã và số điện thoại.'
  );

  // Wrong phone -> exact same generic error
  const wrongPhone = lookupSingleBooking(seeded, 'DL-2026-0001', '0912 345 678', 'vi');
  assert.equal(wrongPhone.found, null);
  assert.equal(wrongPhone.error, wrongCode.error);

  // Honeypot filled -> rejected
  const botAttempt = lookupSingleBooking(
    seeded,
    'DL-2026-0001',
    '0337 203 332',
    'vi',
    'spam-bot'
  );
  assert.equal(botAttempt.found, null);
});

test('checkLookupRateLimit allows up to 5 attempts per minute and blocks the 6th', () => {
  const baseTime = 1_700_000_000_000;
  let timestamps: number[] = [];

  for (let i = 0; i < 5; i++) {
    const res = checkLookupRateLimit(timestamps, baseTime + i * 1000);
    assert.equal(res.allowed, true);
    timestamps = res.updatedTimestamps;
  }

  // 6th attempt within the same minute is blocked
  const sixth = checkLookupRateLimit(timestamps, baseTime + 10_000);
  assert.equal(sixth.allowed, false);

  // After 61 seconds, allowed again
  const afterWindow = checkLookupRateLimit(timestamps, baseTime + 61_000);
  assert.equal(afterWindow.allowed, true);
});

test('countdown text, weekday formatting, CareRecord eligibility, and URL parsing work accurately', () => {
  const now = new Date(2026, 10, 2, 9, 0, 0); // 2026-11-02
  assert.equal(
    getUpcomingCountdownText({ date: '2026-11-02', timeSlot: '18:00' }, 'vi', now),
    'Hôm nay'
  );
  assert.equal(
    getUpcomingCountdownText({ date: '2026-11-03', timeSlot: '09:00' }, 'vi', now),
    'Ngày mai'
  );
  assert.equal(
    getUpcomingCountdownText({ date: '2026-11-05', timeSlot: '09:00' }, 'vi', now),
    'Còn 3 ngày'
  );

  // 20/11/2026 is Friday (Thứ Sáu)
  assert.equal(
    formatBookingDateWithWeekday('2026-11-20', '09:00', 'vi'),
    'Thứ Sáu, 20/11/2026 · 09:00'
  );

  const seeded = createSeededServiceBookings('2026-11-02', now);
  const completedMayMay = seeded.find((b) => b.code === 'DL-2026-0003')!;
  const evalResult = evaluateAddBookingToPetProfile(completedMayMay, initialPets);
  assert.equal(evalResult.eligible, true);
  assert.equal(evalResult.matchedPet?.name, 'Mây Mây');
  assert.ok(evalResult.careType);

  const record = createCareRecordFromBooking(
    completedMayMay,
    evalResult.matchedPet!,
    evalResult.careType!
  );
  assert.equal(record.pet, 'pet-1');
  assert.equal(record.status, 'done');

  assert.equal(
    buildRebookUrl(completedMayMay),
    '/dat-lich?service=kham-tong-quat&pet=M%C3%A2y+M%C3%A2y'
  );

  assert.deepEqual(parseMyBookingsUrl('/lich-hen', '?code=dl-2026-0001'), {
    isMyBookingsRoute: true,
    detailCode: null,
    queryCode: 'DL-2026-0001',
  });
  assert.deepEqual(parseMyBookingsUrl('/lich-hen/dl-2026-0002', ''), {
    isMyBookingsRoute: true,
    detailCode: 'DL-2026-0002',
    queryCode: 'DL-2026-0002',
  });
});
