import test from 'node:test';
import assert from 'node:assert/strict';
import {
  INITIAL_PET_PROFILES,
  INITIAL_WEIGHT_LOGS,
  INITIAL_CARE_RECORDS,
  computeDaysFromToday,
  evaluateCareRecordDue,
  getCareRecordStatusBadge,
  getNearestReminderForPet,
  hasPetDueSoonOrOverdue,
  sortAndGroupCareRecords,
  computeWeightTrend,
  validateCareRecordInput,
  offsetDaysIso,
} from './petProfilesData';

test('Seeded 6 pets have varied histories: many records, zero records, overdue item, upcoming item', () => {
  assert.equal(INITIAL_PET_PROFILES.length, 6);

  // Pet 1 (Mây Mây): many records (>= 6) and upcoming item
  const mayMayRecords = INITIAL_CARE_RECORDS.filter((r) => r.pet === 'pet-1');
  assert.ok(mayMayRecords.length >= 6);
  const mayMayReminder = getNearestReminderForPet(mayMayRecords, 'vi');
  assert.equal(mayMayReminder.state, 'upcoming');
  assert.equal(mayMayReminder.days, 9);

  // Pet 2 (Bơ): overdue item
  const boRecords = INITIAL_CARE_RECORDS.filter((r) => r.pet === 'pet-2');
  const boReminder = getNearestReminderForPet(boRecords, 'vi');
  assert.equal(boReminder.state, 'overdue');
  assert.equal(boReminder.days, 6);
  assert.equal(hasPetDueSoonOrOverdue(boRecords), true);

  // Pet 4 (Hạt Dẻ): zero records (empty state)
  const hatDeRecords = INITIAL_CARE_RECORDS.filter((r) => r.pet === 'pet-4');
  assert.equal(hatDeRecords.length, 0);
  const hatDeReminder = getNearestReminderForPet(hatDeRecords, 'vi');
  assert.equal(hatDeReminder.state, 'up_to_date');
  assert.equal(hasPetDueSoonOrOverdue(hatDeRecords), false);

  // Pet 5 (Rio): completed records only, nothing due within 60 days -> up_to_date
  const rioRecords = INITIAL_CARE_RECORDS.filter((r) => r.pet === 'pet-5');
  assert.ok(rioRecords.length > 0);
  const rioReminder = getNearestReminderForPet(rioRecords, 'vi');
  assert.equal(rioReminder.state, 'up_to_date');
});

test('getCareRecordStatusBadge returns type-specific done labels and accurate upcoming/overdue pills', () => {
  const vaccineDone = getCareRecordStatusBadge(
    {
      id: 't1',
      pet: 'pet-1',
      type: 'vaccine',
      name: 'Rabies',
      date: '2025-05-01',
      status: 'done',
    },
    'vi'
  );
  assert.equal(vaccineDone.label, 'Đã tiêm');
  assert.equal(vaccineDone.variant, 'done');

  const dewormDoneEn = getCareRecordStatusBadge(
    {
      id: 't2',
      pet: 'pet-1',
      type: 'deworm',
      name: 'Drontal',
      date: '2025-05-01',
      status: 'done',
    },
    'en'
  );
  assert.equal(dewormDoneEn.label, 'Dewormed');

  const checkupDone = getCareRecordStatusBadge(
    {
      id: 't3',
      pet: 'pet-1',
      type: 'checkup',
      name: 'General',
      date: '2025-05-01',
      status: 'done',
    },
    'vi'
  );
  assert.equal(checkupDone.label, 'Đã khám');

  const spaDone = getCareRecordStatusBadge(
    {
      id: 't4',
      pet: 'pet-1',
      type: 'spa',
      name: 'Spa',
      date: '2025-05-01',
      status: 'done',
    },
    'vi'
  );
  assert.equal(spaDone.label, 'Đã hoàn thành');

  const upcomingRec = getCareRecordStatusBadge(
    {
      id: 't5',
      pet: 'pet-1',
      type: 'vaccine',
      name: 'FVRCP',
      date: offsetDaysIso(-350),
      nextDueDate: offsetDaysIso(12),
      status: 'upcoming',
    },
    'vi'
  );
  assert.equal(upcomingRec.label, 'Còn 12 ngày');
  assert.equal(upcomingRec.variant, 'upcoming');

  const overdueRec = getCareRecordStatusBadge(
    {
      id: 't6',
      pet: 'pet-2',
      type: 'vaccine',
      name: 'Bordetella',
      date: offsetDaysIso(-370),
      nextDueDate: offsetDaysIso(-4),
      status: 'overdue',
    },
    'vi'
  );
  assert.equal(overdueRec.label, 'Quá hạn');
  assert.equal(overdueRec.variant, 'overdue');
});

test('computeWeightTrend computes last 6 weights, delta, and SVG paths accurately', () => {
  const mayMayWeights = INITIAL_WEIGHT_LOGS.filter((w) => w.pet === 'pet-1');
  const trendVi = computeWeightTrend(mayMayWeights, 'vi');
  assert.equal(trendVi.lastSix.length, 6);
  assert.equal(trendVi.latestKg, 3.8);
  assert.equal(trendVi.deltaKg, 0.2);
  assert.equal(trendVi.formattedLatest, '3,8 kg');
  assert.equal(trendVi.formattedDelta, '+0,2 kg');
  assert.ok(trendVi.linePath.startsWith('M '));
  assert.ok(trendVi.areaPath.endsWith(' Z'));
});

test('sortAndGroupCareRecords sorts newest first and groups by year', () => {
  const mayMayRecords = INITIAL_CARE_RECORDS.filter((r) => r.pet === 'pet-1');
  const { filtered, groupedByYear, showYearGroups } = sortAndGroupCareRecords(
    mayMayRecords,
    'all'
  );
  assert.equal(filtered.length, mayMayRecords.length);
  assert.equal(showYearGroups, true);
  assert.ok(groupedByYear.length >= 2);

  // Verify newest first
  const firstTime = new Date(filtered[0].date).getTime();
  const lastTime = new Date(filtered[filtered.length - 1].date).getTime();
  assert.ok(firstTime >= lastTime);
});

test('validateCareRecordInput enforces required fields and 5MB attachment limit', () => {
  assert.equal(
    validateCareRecordInput({ type: 'vaccine', name: '', date: '2026-05-10' }).valid,
    false
  );
  assert.equal(
    validateCareRecordInput({
      type: 'vaccine',
      name: 'Rabies',
      date: '2026-05-10',
      fileSize: 6 * 1024 * 1024,
      fileType: 'application/pdf',
    }).valid,
    false
  );
  assert.equal(
    validateCareRecordInput({
      type: 'vaccine',
      name: 'Rabies',
      date: '2026-05-10',
      fileSize: 1024 * 500,
      fileType: 'application/pdf',
    }).valid,
    true
  );
});
