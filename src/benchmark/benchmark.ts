import { randomUIntBelow } from "../random-uint-below";

const DEFAULT_NUM_RUNS = 1_000_000;
const DEFAULT_MAX = 1337;

export function benchmark(options?: { numRuns?: number; max?: number }) {
  const start = performance.now();
  let total = 0;
  const numRuns = options?.numRuns ?? DEFAULT_NUM_RUNS;
  const max = options?.max ?? DEFAULT_MAX;
  console.log();
  console.log(`Starting benchmark with ${numRuns} runs and max ${max}`);
  for (let i = 0; i < numRuns; i++) {
    total += randomUIntBelow(max);
  }
  console.log(
    `Finished ${numRuns} runs for max ${max} in: ${Math.floor((performance.now() - start) * 1000) / 1000}ms`,
  );
  console.log(
    `Mean of generated values (should be ≈${(max - 1) / 2}): ${total / numRuns}`,
  );
}
