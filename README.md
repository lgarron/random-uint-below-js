# `random-uint-below.js`

## Usage

`randomUIntBelow(max)` returns a uniform random non-negative integer less than max `(0 <= output < max)`. `max` must be at most `2^53`.

```ts
import {randomUIntBelow} from "random-uint-below"


console.log(randomUIntBelow(6)); // Generates a uniform random value from [0, 1, 2, 3, 4, 5]
```

Since one of the most common use cases for this is to select a random element from an array, we also provide a convenience:

```ts
import {randomChoice} from "random-uint-below"

console.log(randomChoice(["vanilla", "strawberry", "peppermint"]))
```

## Requirements

`random-uint-below.js` requires `crypto.getRandomValues`, which is available in:

- All major browsers since 2014: <https://caniuse.com/getrandomvalues>
- `bun` and `deno`
- `node` without a flag since `v19`: <https://nodejs.org/api/webcrypto.html#cryptogetrandomvaluestypedarray>

Builds are only published in ESM (with ES2020 compatibility).

## Global

We no longer publish a build that modifies the global variable. You can create such a build yourself using:

```sh
# bash
cd "$(mktemp -d)" && npm init -y && npm install esbuild random-uint-below
echo 'import { randomUIntBelow } from "random-uint-below"; globalThis.randomUIntBelow = randomUIntBelow' | \
  npx esbuild --target=es6 --bundle --minify --outfile=randomUintBelow.global.js
```

## License

This work is dedicated to the public domain using the [Unlicense](https://unlicense.org/).
