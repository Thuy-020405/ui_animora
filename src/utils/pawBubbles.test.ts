import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import {
  getBubbleCount,
  generateBubbleSeeds,
  calculateCursorPush,
  isPointNearBubble,
  generateBurstParticles,
} from './pawBubbles.js';

describe('pawBubbles logic tests', () => {
  test('getBubbleCount returns correct count per responsive breakpoint', () => {
    // Reduced motion override
    assert.equal(getBubbleCount(1440, true), 6);
    assert.equal(getBubbleCount(768, true), 6);
    assert.equal(getBubbleCount(375, true), 6);

    // Desktop (>1024)
    assert.equal(getBubbleCount(1440, false), 18);
    assert.equal(getBubbleCount(1025, false), 18);

    // Tablet (640 - 1024)
    assert.equal(getBubbleCount(1024, false), 12);
    assert.equal(getBubbleCount(768, false), 12);
    assert.equal(getBubbleCount(640, false), 12);

    // Mobile (<640)
    assert.equal(getBubbleCount(639, false), 8);
    assert.equal(getBubbleCount(375, false), 8);
  });

  test('generateBubbleSeeds generates proper size ranges, rise times and styles', () => {
    const seeds = generateBubbleSeeds(18);
    assert.equal(seeds.length, 18);

    seeds.forEach((seed) => {
      // Check sizes bounded between 18 and 72
      assert.ok(seed.size >= 18 && seed.size <= 72, `Size ${seed.size} should be 18-72`);
      // Check rise duration between 14 and 28
      assert.ok(seed.riseDuration >= 13 && seed.riseDuration <= 30, `Rise ${seed.riseDuration} should be ~14-28s`);
      // Check styles
      assert.ok(['dog', 'cat', 'round'].includes(seed.pawStyle));
      // Check initial X percent
      assert.ok(seed.initialXPercent >= 0 && seed.initialXPercent <= 100);
      // Check colors
      assert.ok(['pink', 'coral', 'wine'].includes(seed.colorType));
    });
  });

  test('calculateCursorPush pushes bubble away smoothly within maxDistance', () => {
    // Within 90px
    const push = calculateCursorPush(100, 100, 120, 100, 90);
    assert.ok(push.pushX < 0, 'Should push to the left since mouse is to the right');
    assert.equal(Math.round(push.pushY), 0);
    assert.ok(push.distance < 90);

    // Outside 90px
    const outsidePush = calculateCursorPush(100, 100, 250, 250, 90);
    assert.equal(outsidePush.pushX, 0);
    assert.equal(outsidePush.pushY, 0);
  });

  test('isPointNearBubble accurately detects tap/click inside bubble radius', () => {
    // Direct center click
    assert.equal(isPointNearBubble(50, 50, 50, 50, 30), true);

    // Click near rim
    assert.equal(isPointNearBubble(60, 50, 50, 50, 30), true);

    // Click far away
    assert.equal(isPointNearBubble(150, 150, 50, 50, 30), false);
  });

  test('generateBurstParticles generates 3 distinct particles', () => {
    const particles = generateBurstParticles('#FF7F6B');
    assert.equal(particles.length, 3);
    assert.equal(particles[0].color, '#FF7F6B');
    assert.ok(particles[0].dx !== 0 || particles[0].dy !== 0);
  });
});
