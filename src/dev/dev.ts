import { benchmark } from "../benchmark/benchmark";
import { randomUIntBelow } from "../random-uint-below";

console.log("Random uint below 100:", randomUIntBelow(100));

// biome-ignore lint/style/noNonNullAssertion: Code should fail if the elemn is not present.
document.querySelector("#benchmark")!.addEventListener("click", () => {
  benchmark();
});
