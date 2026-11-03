import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  wrapCarouselIndex,
  getNextCarouselIndex,
  getPrevCarouselIndex,
  evaluateSwipeGesture,
  getVisibleSlideIndices,
} from './testimonialCarousel';

describe('testimonialCarousel pure logic', () => {
  it('wraps carousel indices accurately across boundaries', () => {
    assert.equal(wrapCarouselIndex(0, 6), 0);
    assert.equal(wrapCarouselIndex(5, 6), 5);
    assert.equal(wrapCarouselIndex(6, 6), 0);
    assert.equal(wrapCarouselIndex(-1, 6), 5);
    assert.equal(wrapCarouselIndex(-7, 6), 5);
    assert.equal(wrapCarouselIndex(3, 0), 0);
  });

  it('computes next and previous indices with seamless looping', () => {
    assert.equal(getNextCarouselIndex(0, 6), 1);
    assert.equal(getNextCarouselIndex(5, 6), 0);
    assert.equal(getPrevCarouselIndex(0, 6), 5);
    assert.equal(getPrevCarouselIndex(3, 6), 2);
  });

  it('evaluates horizontal swipe gestures and filters vertical scrolling', () => {
    // Strong left swipe -> next
    assert.equal(
      evaluateSwipeGesture({ deltaX: -85, deltaY: 10, durationMs: 260 }),
      'next'
    );
    // Strong right swipe -> prev
    assert.equal(
      evaluateSwipeGesture({ deltaX: 92, deltaY: -8, durationMs: 280 }),
      'prev'
    );
    // Fast flick left with moderate distance -> next
    assert.equal(
      evaluateSwipeGesture({ deltaX: -32, deltaY: 4, durationMs: 55 }),
      'next'
    );
    // Tiny drag below threshold -> none
    assert.equal(
      evaluateSwipeGesture({ deltaX: -15, deltaY: 2, durationMs: 300 }),
      'none'
    );
    // Primarily vertical scroll -> none
    assert.equal(
      evaluateSwipeGesture({ deltaX: -60, deltaY: 95, durationMs: 200 }),
      'none'
    );
  });

  it('returns wrapped visible slide indices for multi-card carousel layouts', () => {
    assert.deepEqual(getVisibleSlideIndices(0, 6, 3), [0, 1, 2]);
    assert.deepEqual(getVisibleSlideIndices(4, 6, 3), [4, 5, 0]);
    assert.deepEqual(getVisibleSlideIndices(5, 6, 3), [5, 0, 1]);
    assert.deepEqual(getVisibleSlideIndices(0, 2, 3), [0, 1]);
  });
});
