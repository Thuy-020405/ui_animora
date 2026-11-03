import test from 'node:test';
import assert from 'node:assert/strict';
import { computeServiceCardScrollFocus } from './serviceCardScrollEffect';

test('returns full clarity when services track is in or below the main viewport focus zone', () => {
  const res = computeServiceCardScrollFocus(400, 460, 900, 0);
  assert.equal(res.progress, 0);
  assert.equal(res.scale, 1);
  assert.equal(res.opacity, 1);
  assert.equal(res.blurPx, 0);
  assert.equal(res.translateY, 0);
});

test('gently scales down, blurs, and fades as user scrolls down past the services track', () => {
  const mid = computeServiceCardScrollFocus(60, 460, 900, 0);
  assert.ok(mid.progress > 0 && mid.progress < 1);
  assert.ok(mid.scale < 1 && mid.scale > 0.91);
  assert.ok(mid.opacity < 1 && mid.opacity > 0.52);
  assert.ok(mid.blurPx > 0 && mid.blurPx < 4.2);

  const full = computeServiceCardScrollFocus(-300, 460, 900, 0);
  assert.equal(full.progress, 1);
  assert.equal(full.scale, 0.91);
  assert.equal(full.opacity, 0.52);
  assert.equal(full.blurPx, 4.2);
  assert.equal(full.translateY, 14);
});

test('handles invalid or zero dimensions gracefully', () => {
  const res = computeServiceCardScrollFocus(100, 0, 0, 1);
  assert.equal(res.scale, 1);
  assert.equal(res.opacity, 1);
  assert.equal(res.blurPx, 0);
});
