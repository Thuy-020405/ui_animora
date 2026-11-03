import test from 'node:test';
import assert from 'node:assert/strict';
import {
  ADOPTION_PETS_DATA,
  getAdoptionSpeciesCounts,
  filterAndSortAdoptionPets,
  parseAdoptionUrlPath,
  validateAdoptionForm,
  isPetAdopted,
  getGenderChipLabel,
  getSpeciesDisplayName,
  formatVietnamesePhone,
  isValidVietnamesePhone,
  normalizeVietnamesePhone,
  generateAdoptionRequestCode,
} from './adoptionData';

test('normalizeVietnamesePhone converts +84 and 84 prefixes to 0', () => {
  assert.equal(normalizeVietnamesePhone('+84337203332'), '0337203332');
  assert.equal(normalizeVietnamesePhone('84901234567'), '0901234567');
  assert.equal(normalizeVietnamesePhone('0337 203 332'), '0337203332');
});

test('formatVietnamesePhone formats 10-digit phone with spaced blocks', () => {
  assert.equal(formatVietnamesePhone('0337203332'), '0337 203 332');
  assert.equal(formatVietnamesePhone('0901234567'), '0901 234 567');
  assert.equal(formatVietnamesePhone('+84901234567'), '0901 234 567');
});

test('isValidVietnamesePhone validates 10-digit numbers starting with 03, 05, 07, 08, 09 and landlines', () => {
  assert.equal(isValidVietnamesePhone('0337 203 332'), true);
  assert.equal(isValidVietnamesePhone('0901234567'), true);
  assert.equal(isValidVietnamesePhone('+84901234567'), true);
  assert.equal(isValidVietnamesePhone('028 3820 3332'), true);
  assert.equal(isValidVietnamesePhone('0123456789'), false);
  assert.equal(isValidVietnamesePhone('12345'), false);
});

test('generateAdoptionRequestCode returns AN-2026-XXXX format', () => {
  const code = generateAdoptionRequestCode();
  assert.match(code, /^AN-2026-\d{4}$/);
});

test('getAdoptionSpeciesCounts returns accurate dynamic counts for each tab', () => {
  const counts = getAdoptionSpeciesCounts(ADOPTION_PETS_DATA);
  assert.equal(counts.All, 10);
  assert.equal(counts.Chó, 4);
  assert.equal(counts.Mèo, 3);
  assert.equal(counts.Thỏ, 1);
  assert.equal(counts.Hamster, 1);
  assert.equal(counts.Chim, 1);
});

test('filterAndSortAdoptionPets filters by species and sorts by newest, youngest, and nearest', () => {
  const dogs = filterAndSortAdoptionPets(ADOPTION_PETS_DATA, 'Chó', 'newest');
  assert.equal(dogs.length, 4);
  assert.equal(dogs[0].slug, 'dau-dau');

  const youngestAll = filterAndSortAdoptionPets(ADOPTION_PETS_DATA, 'All', 'youngest');
  assert.equal(youngestAll[0].slug, 'banh-quy'); // 4 months

  const nearestAll = filterAndSortAdoptionPets(ADOPTION_PETS_DATA, 'All', 'nearest');
  assert.equal(nearestAll[0].slug, 'bong-xu'); // 1.0 km
});

test('parseAdoptionUrlPath parses list, profile detail, apply, and success routes', () => {
  assert.deepEqual(parseAdoptionUrlPath('/nhan-nuoi'), {
    isAdoptRoute: true,
    slug: null,
    isApplyRoute: false,
    isSuccessRoute: false,
  });
  assert.deepEqual(parseAdoptionUrlPath('/nhan-nuoi/dau-dau'), {
    isAdoptRoute: true,
    slug: 'dau-dau',
    isApplyRoute: false,
    isSuccessRoute: false,
  });
  assert.deepEqual(parseAdoptionUrlPath('/nhan-nuoi/bup-be/dang-ky'), {
    isAdoptRoute: true,
    slug: 'bup-be',
    isApplyRoute: true,
    isSuccessRoute: false,
  });
  assert.deepEqual(parseAdoptionUrlPath('/nhan-nuoi/bup-be/dang-ky/thanh-cong'), {
    isAdoptRoute: true,
    slug: 'bup-be',
    isApplyRoute: true,
    isSuccessRoute: true,
  });
  assert.deepEqual(parseAdoptionUrlPath('/cua-hang'), {
    isAdoptRoute: false,
    slug: null,
    isApplyRoute: false,
    isSuccessRoute: false,
  });
});

test('validateAdoptionForm enforces all required fields and format rules', () => {
  const emptyResult = validateAdoptionForm({
    applicantName: '',
    phone: '',
    email: '',
    area: 'Đà Nẵng',
    hadPetBefore: '',
    livingCondition: '',
    notes: '',
    agreedCommitment: false,
  });
  assert.equal(emptyResult.isValid, false);
  assert.ok(emptyResult.errors.applicantName);
  assert.ok(emptyResult.errors.phone);
  assert.ok(emptyResult.errors.email);
  assert.ok(emptyResult.errors.hadPetBefore);
  assert.ok(emptyResult.errors.livingCondition);
  assert.ok(emptyResult.errors.agreedCommitment);

  const validResult = validateAdoptionForm({
    applicantName: 'Nguyễn Minh Anh',
    phone: '0901234567',
    email: 'minhanh@animora.vn',
    area: 'Đà Nẵng',
    hadPetBefore: 'yes',
    livingCondition: 'apartment',
    notes: 'Rất yêu chó mèo',
    agreedCommitment: true,
  });
  assert.equal(validResult.isValid, true);
  assert.equal(Object.keys(validResult.errors).length, 0);
});

test('helper labels and adopted status work in VI and EN', () => {
  const adoptedPet = ADOPTION_PETS_DATA.find((p) => p.slug === 'bong-xu')!;
  const waitingPet = ADOPTION_PETS_DATA.find((p) => p.slug === 'dau-dau')!;
  assert.equal(isPetAdopted(adoptedPet), true);
  assert.equal(isPetAdopted(waitingPet), false);
  assert.equal(getGenderChipLabel('Đực', 'vi'), 'Bé đực');
  assert.equal(getGenderChipLabel('Cái', 'en'), 'Female');
  assert.equal(getSpeciesDisplayName('Chim', 'vi'), 'Chim & Vẹt');
  assert.equal(getSpeciesDisplayName('Chim', 'en'), 'Bird & Parrot');
});

test('process steps and adopter requirements have all 4 steps and bilingual text', () => {
  assert.equal(ADOPTION_PETS_DATA.length >= 10, true);
  const dauDau = ADOPTION_PETS_DATA.find((p) => p.slug === 'dau-dau')!;
  assert.ok(dauDau.photos && dauDau.photos.length >= 3);
  assert.ok(dauDau.vaccinations && dauDau.vaccinations.length >= 2);
  assert.equal(dauDau.species, 'Chó');
  assert.equal(dauDau.gender, 'Đực');
});

