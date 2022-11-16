/*
 * randomUIntBelow(max) returns a random non-negative integer less than max (0 <= output < max).
 * `max` must be at most 2^53.
 */

const MAX_JS_PRECISE_INT = 9007199254740992;

const UPPER_HALF_MULTIPLIER = 2097152; // 2^21. We have to use multiplication because bit shifts truncate to 32 bits.
const LOWER_HALF_DIVIDER = 2048;

// TODO(2023): Remove this wrapper once `crypto.getRandomValues` is available in a `node` LTS version without a flag.
function crypto(): typeof globalThis.crypto {
  const { crypto } = globalThis;
  if (!crypto) {
    const { node: nodeVersion } = globalThis.process?.versions;
    if (nodeVersion && parseInt(nodeVersion.split(".")[0]) < 19) {
      throw new Error("`cubing.js` requires `node` 19 or above.");
    }
  }
  return crypto;
}

function random53BitNumber(): number {
  // Construct a random 53-bit value from a 32-bit upper half and a 21-bit lower half.
  const arr = new Uint32Array(2);
  crypto().getRandomValues(arr);
  const upper = arr[0];
  const lower = arr[1];
  return (
    Math.floor(upper * UPPER_HALF_MULTIPLIER) +
    Math.floor(lower / LOWER_HALF_DIVIDER)
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

  let val = random53BitNumber();
  const maxUniformSamplingRange = Math.floor(MAX_JS_PRECISE_INT / max) * max;

  // Rejection sampling:
  while (val >= maxUniformSamplingRange) {
    // val % max would produce a biased result. This bias can be very bad if `max` is on the order of MAX_JS_PRECISE_INT. We have to try again, so just call ourselves recursively.
    // For some values of `max` just above 9007199254740992 / 2, this happens about once on average. For other values of `max`, it's less than that (and for small values of `max` it's extremely unlikely).
    // TODO: Use more bits of accuracy instead of rejection sampling to avoid DoS.
    return (val = random53BitNumber());
  }
  return val % max;
}
