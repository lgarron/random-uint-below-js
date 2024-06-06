import { randomUIntBelow } from "../random-uint-below";

export function benchmark() {
  const start = performance.now();
  let total = 0;
  const NUM_RUNS = 10_000_000;
  const MAX = 1337;
  console.log(`Starting benchmark with ${NUM_RUNS} runs and max ${MAX}`);
  for (let i = 0; i < NUM_RUNS; i++) {
    total += randomUIntBelow(MAX);
  }
  console.log(
    `Finished ${NUM_RUNS} runs for max ${MAX} in: ${performance.now() - start}ms`,
  );
  console.log(
    `Mean of generated values (should be ≈${(MAX - 1) / 2}): ${total / NUM_RUNS}`,
  );
}
