import { benchmark } from "./benchmark";

benchmark();
benchmark({ numRuns: 1_000_000, max: 7 });
benchmark({ numRuns: 100_000, max: 2 ** 52 - 1 });
benchmark({ numRuns: 100_000, max: 2 ** 52 });
benchmark({ numRuns: 100_000, max: 2 ** 52 + 1 });
benchmark({ numRuns: 100_000, max: 3 * 2 ** 51 });
benchmark({ numRuns: 100_000, max: 2 ** 53 - 1 });
benchmark({ numRuns: 100_000, max: (2 ** 53 / 16) * 15 });
benchmark({ numRuns: 100_000, max: 2 ** 53 });
