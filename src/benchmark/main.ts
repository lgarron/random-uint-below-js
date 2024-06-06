import { benchmark } from "./benchmark";

benchmark();
benchmark({ numRuns: 1_000_000, max: 2 ** 52 });
benchmark({ numRuns: 1_000_000, max: 7 });
benchmark({ numRuns: 1_000_000, max: 3 * 2 ** 51 });
