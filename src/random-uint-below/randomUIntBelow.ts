/*
 * randomUIntBelow(max) returns a random non-negative integer less than max (0 <= output < max).
 * `max` must be an integer from 1 to 2^53 (inclusive).
 */
const MAX_JS_PRECISE_INT = 2 ** 53;

const UPPER_HALF_MULTIPLIER = 2097152; // 2^21.
const LOWER_HALF_RIGHT_SHIFT_BITS = 11;

const arr = new Uint32Array(2);
function random53BitNumber(): number {
  // Construct a random 53-bit value from a 32-bit upper half and a 21-bit lower half.
  // Note that in theory it *could* be faster to construct only a 32-bit number when needed, but the impact on performance is negligible.
  globalThis.crypto.getRandomValues(arr);
  const upper = arr[0];
  const lower = arr[1];
  return (
    // We have to use multiplication and `Math.floor(…)` for `upper` because bit shifts and `var | 0` truncate the value to 32 bits.
    Math.floor(upper * UPPER_HALF_MULTIPLIER) +
    (lower >> LOWER_HALF_RIGHT_SHIFT_BITS)
  );
}

function validateMax(max: number): void {
  if (typeof max !== "number" || max < 0 || Math.floor(max) !== max) {
    throw new Error(
      "randomUIntBelow() not called with a positive integer value.",
    );
  }
  if (max > MAX_JS_PRECISE_INT) {
    throw new Error(
      `Called randomUIntBelow() with max === ${max}, which is larger than JavaScript can handle with integer precision.`,
    );
  }
}

// TODO: cache generated `randomUIntBelow`?
export function randomUIntBelow(max: number): number {
  validateMax(max);

  // biome-ignore lint/style/noVar: Using `var` saves perf.
  var val: number;
  // biome-ignore lint/style/noVar: Using `var` saves perf.
  var block: number;
  // biome-ignore lint/style/noVar: Using `var` saves perf.
  var blockMax: number;

  while (true) {
    val = random53BitNumber();
    block = Math.floor(val / max);
    blockMax = block * max;
    if (blockMax < MAX_JS_PRECISE_INT - max) {
      return val - blockMax;
    }
  }
}
