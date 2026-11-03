import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  estimateServiceCost,
  calculateAdoptionMatchScore,
  filterAndSortProducts,
  calculateDailyPetNutrition,
  parsePetWeightKg,
  getLanguageToggleMeta,
  evaluatePasswordStrength,
  validateLoginInput,
  validateRegisterInput,
} from './petLogic';
import { AdoptionPet, Product } from '../types';

describe('petLogic pure utilities', () => {
  it('estimates service cost accurately across species, weights, boarding nights, and add-ons', () => {
    const basicSpa = estimateServiceCost({
      serviceId: 'spa',
      species: 'Mèo',
      weightKg: 4,
      addOns: [],
    });
    assert.equal(basicSpa.basePrice, 490000);
    assert.equal(basicSpa.addOnTotal, 0);
    assert.equal(basicSpa.totalPrice, 490000);
    assert.equal(basicSpa.estimatedDurationMins, 75);

    const largeDogSpaWithAddons = estimateServiceCost({
      serviceId: 'spa',
      species: 'Chó',
      weightKg: 24,
      addOns: ['herbal_bath', 'home_pickup'],
    });
    assert.equal(largeDogSpaWithAddons.weightMultiplier, 1.35);
    assert.equal(largeDogSpaWithAddons.addOnTotal, 220000);
    assert.ok(largeDogSpaWithAddons.totalPrice > basicSpa.totalPrice);
    assert.equal(largeDogSpaWithAddons.estimatedDurationMins, 75 + 20 + 15);

    const boardingThreeNights = estimateServiceCost({
      serviceId: 'boarding',
      species: 'Thỏ',
      weightKg: 1.8,
      addOns: [],
      nights: 3,
    });
    assert.equal(boardingThreeNights.basePrice, 390000 * 3);
  });

  it('scores adoption compatibility based on species, living space, and lifestyle', () => {
    const samplePet: AdoptionPet = {
      id: 'adopt-test',
      slug: 'bup-be',
      name: 'Búp Bê',
      species: 'Mèo',
      breed: 'Mèo Anh Lông Ngắn',
      age: '1 tuổi',
      gender: 'Cái',
      personality: 'Ngoan ngoãn',
      photo: '/src/assets/images/about_fluffy_cat_1793177483392.jpg',
      status: 'available',
      tags: ['Thân thiện', 'Đã tiêm 3 mũi'],
      story: 'Rất ngoan',
    };

    const highMatch = calculateAdoptionMatchScore(samplePet, {
      preferredSpecies: 'Mèo',
      livingSpace: 'apartment',
      dailyTime: 'compact',
      experience: 'first_time',
    });

    const mismatchSpecies = calculateAdoptionMatchScore(samplePet, {
      preferredSpecies: 'Chó',
      livingSpace: 'apartment',
      dailyTime: 'compact',
      experience: 'first_time',
    });

    assert.ok(highMatch.score >= 90);
    assert.ok(highMatch.score > mismatchSpecies.score);
    assert.ok(highMatch.matchReasonsVi.length > 0);
  });

  it('filters and sorts shop products by category, search query, and sort order', () => {
    const products: Product[] = [
      {
        id: 'p1',
        name: 'Hạt Hữu Cơ Cao Cấp',
        price: 320000,
        category: 'food',
        image: '/img1.jpg',
        description: 'Thức ăn cho chó mèo',
        rating: 4.8,
      },
      {
        id: 'p2',
        name: 'Sữa Tắm Thảo Mộc',
        price: 185000,
        category: 'care',
        image: '/img2.jpg',
        description: 'Chăm sóc lông dịu nhẹ',
        rating: 5.0,
      },
      {
        id: 'p3',
        name: 'Cỏ Timothy Sấy Khô',
        price: 150000,
        category: 'food',
        image: '/img3.jpg',
        description: 'Cho thỏ và hamster',
        rating: 4.9,
      },
    ];

    const foodAsc = filterAndSortProducts(products, {
      category: 'food',
      searchQuery: '',
      sortBy: 'price-asc',
    });
    assert.equal(foodAsc.length, 2);
    assert.equal(foodAsc[0].id, 'p3');
    assert.equal(foodAsc[1].id, 'p1');

    const searchTim = filterAndSortProducts(products, {
      category: 'all',
      searchQuery: 'timothy',
      sortBy: 'popular',
    });
    assert.equal(searchTim.length, 1);
    assert.equal(searchTim[0].id, 'p3');
  });

  it('parses pet weight strings and calculates daily calories and water intake', () => {
    assert.equal(parsePetWeightKg('3.8 kg'), 3.8);
    assert.equal(parsePetWeightKg('24,5 kg'), 24.5);

    const catNutrition = calculateDailyPetNutrition({
      species: 'Mèo',
      weightStr: '4.0 kg',
      activityLevel: 'normal',
    });
    assert.equal(catNutrition.weightKg, 4.0);
    assert.ok(catNutrition.dailyCaloriesKcal > 150 && catNutrition.dailyCaloriesKcal < 400);
    assert.ok(catNutrition.dailyWaterMl >= 200);
    assert.equal(catNutrition.recommendedMealsPerDay, 3);
  });

  it('returns clear current language label and action tooltip metadata for VI and EN', () => {
    const viMeta = getLanguageToggleMeta('vi');
    assert.equal(viMeta.currentCode, 'VI');
    assert.equal(viMeta.targetCode, 'EN');
    assert.ok(viMeta.shortLabel.includes('VI'));
    assert.ok(viMeta.tooltipStatus.includes('Tiếng Việt'));
    assert.ok(viMeta.tooltipAction.includes('English'));

    const enMeta = getLanguageToggleMeta('en');
    assert.equal(enMeta.currentCode, 'EN');
    assert.equal(enMeta.targetCode, 'VI');
    assert.ok(enMeta.shortLabel.includes('EN'));
    assert.ok(enMeta.tooltipStatus.includes('English'));
    assert.ok(enMeta.tooltipAction.includes('Tiếng Việt'));
  });

  it('validates login credentials, registration inputs, and password strength', () => {
    // Login validation
    assert.equal(validateLoginInput('owner@animora.vn', '123456').isValid, true);
    assert.equal(validateLoginInput('0901234567', '123456').isValid, true);
    assert.equal(validateLoginInput('invalid-email', '123456').isValid, false);
    assert.equal(validateLoginInput('owner@animora.vn', '123').isValid, false);

    // Password strength
    assert.equal(evaluatePasswordStrength('12345').level, 'weak');
    assert.equal(evaluatePasswordStrength('Animora2026!').level, 'strong');

    // Registration validation
    const validReg = validateRegisterInput({
      fullName: 'Nguyễn Minh Anh',
      email: 'minhanh@animora.vn',
      phone: '0901234567',
      password: 'Password123',
      confirmPassword: 'Password123',
      agreedTerms: true,
    });
    assert.equal(validReg.isValid, true);

    const mismatchPass = validateRegisterInput({
      fullName: 'Nguyễn Minh Anh',
      email: 'minhanh@animora.vn',
      phone: '0901234567',
      password: 'Password123',
      confirmPassword: 'Password999',
      agreedTerms: true,
    });
    assert.equal(mismatchPass.isValid, false);
    assert.equal(mismatchPass.field, 'confirmPassword');
  });
});


