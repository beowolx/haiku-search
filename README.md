# Haiku-Search

[![Build Status](https://github.com/beowolx/haiku/actions/workflows/ci.yaml/badge.svg)](https://github.com/beowolx/haiku/actions)
[![npm](https://img.shields.io/npm/v/haiku-search)](https://www.npmjs.com/package/haiku-search)

## Overview

Haiku-Search is a high-performance fuzzy search library designed for web applications. It is built using Rust and compiled to WebAssembly, providing lightning-fast search capabilities directly in the browser. This combination allows Haiku-Search to execute complex search algorithms efficiently, taking advantage of Rust's performance and safety features.

## Powered by Rust and WebAssembly

Haiku-Search leverages the power of Rust and WebAssembly to run directly in web browsers, offering significant performance improvements over traditional JavaScript search libraries. By compiling to WebAssembly, Haiku-Search provides near-native speed, making it ideal for applications requiring quick search responses on large datasets.

## Algorithms

Haiku-Search implements two primary algorithms:

- **N-gram Indexing**: This technique breaks down text into chunks (n-grams) and indexes them for quick lookup, allowing us to quickly narrow down potential matches.
- **Bitap Algorithm**: For precise matching, Haiku-Search uses the [Bitap algorithm](https://en.wikipedia.org/wiki/Bitap_algorithm), which supports a configurable number of errors. It is effective for short to medium text lengths and allows for approximate string matching.

## Installation

To install, just run:

```bash
npm install haiku-search
```

## Usage Example

Here is an example of how to use Haiku-Search without a bundler in your app:

```js
import init, {
  SearchEngine,
} from "./node_modules/haiku-search/haiku_search.js";

async function demoHaikuSearch() {
  // Initialize the WASM module, only needed if once and if not using a bundler
  await init();
  const data = ["Apple Pie", "Banana Bread", "Carrot Cake"];
  const haikuEngine = new SearchEngine(data, {
    ngram_size: 3,
    max_distance: 1,
  });

  const query = "Apple";
  const result = await haikuEngine.search(query);

  console.log("Search result:", result[0].text);
  console.log("Score result:", result[0].score);
}

demoHaikuSearch();
```

Currently, WASM modules are only supported by WebPack. So, if you want use Haiku-Search in a web application, you will have to use WebPack.

## Performance Comparison to Fuse.js

Haiku-Search is designed to be significantly faster than traditional JavaScript libraries like [Fuse.js](<[url](https://www.fusejs.io/)>). In benchmarks, Haiku-Search performs searches up to **13x faster than Fuse.js**.

![image](https://github.com/beowolx/haiku/assets/61982523/3684be93-0eb6-4138-9e81-a02ccc5e99d5)

You can see this chart live here: [Haiku-Search vs Fuse.js Benchmark Results](https://beowolx.github.io/haiku-search/index.html).

## Known Limitations

- **Unicode Support**: Haiku-Search does not currently support unicode characters, which may limit its use in applications requiring internationalization.
- **Pattern Length**: The Bitap algorithm used in Haiku-Search supports patterns up to 32 characters long due to limitations in handling bit masks.

## Roadmap

- Add unicode support
- Improve memory footprint
- Improve code documentation

## Contributing

Contributions to Haiku-Search are welcome! If you're looking to contribute, please:

- Check out the current issues on GitHub, especially those tagged as "good first issue".
- Fork the repository and make your changes.
- Write clear, commented code.
- Ensure your changes pass all existing tests and add new tests for added functionality.
- Submit a pull request with a detailed description of your changes.

For major changes, please open an issue first to discuss what you would like to change.

Thank you for your interest in improving Haiku-Search!
