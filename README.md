# Haiku

[![Build Status](https://github.com/beowolx/haiku/actions/workflows/ci.yaml/badge.svg)](https://github.com/beowolx/haiku/actions)

## Overview
Haiku is a high-performance fuzzy search library designed for web applications. It is built using Rust and compiled to WebAssembly, providing lightning-fast search capabilities directly in the browser. This combination allows Haiku to execute complex search algorithms efficiently, taking advantage of Rust's performance and safety features.

## Powered by Rust and WebAssembly
Haiku leverages the power of Rust and WebAssembly to run directly in web browsers, offering significant performance improvements over traditional JavaScript search libraries. By compiling to WebAssembly, Haiku provides near-native speed, making it ideal for applications requiring quick search responses on large datasets.

## Algorithms
Haiku implements two primary algorithms:
- **N-gram Indexing**: This technique breaks down text into chunks (n-grams) and indexes them for quick lookup, allowing us to quickly narrow down potential matches.
- **Bitap Algorithm**: For precise matching, Haiku uses the Bitap algorithm, which supports a configurable number of errors. It is effective for short to medium text lengths and allows for approximate string matching.

## Installation
WIP
Since Haiku is compiled to WebAssembly and not published on NPM, it can be included in your project by directly linking to the generated WebAssembly and JavaScript loader files. Here is how you can include it in your web project:
```html
<script type="module">
    import init, { SearchConfig, SearchEngine } from './path/to/haiku_pkg/haiku.js';

    async function run() {
        await init(); // Initialize the wasm module
        const config = new SearchConfig(3, 1); // Configure ngram size and max distance
        const engine = new SearchEngine(["hello world", "hi there"], config);
        console.log(engine.search("hello"));
    }

    run();
</script>
```

## Usage Example
Here’s a quick example on how to use Haiku in a web application:
```javascript
import init, { SearchConfig, SearchEngine } from './path/to/haiku_pkg/haiku.js';

async function performSearch() {
    await init();
    const config = new SearchConfig(3, 1); // ngram size and max allowed errors
    const engine = new SearchEngine(["search me", "search me not"], config);
    const results = engine.search("search");
    console.log(results);
}
performSearch();
```

## Performance Comparison to Fuse.js
Haiku is designed to be significantly faster than traditional JavaScript libraries like [Fuse.js]([url](https://www.fusejs.io/)). In benchmarks, Haiku performs searches up to **13x faster than Fuse.js**.

![image](https://github.com/beowolx/haiku/assets/61982523/3684be93-0eb6-4138-9e81-a02ccc5e99d5)


You can see this chart live here: [Haiku vs Fuse.js Benchmark Results](https://beowolx.github.io/haiku/index.html).

## Known Limitations
- **Unicode Support**: Haiku does not currently support unicode characters, which may limit its use in applications requiring internationalization.
- **Pattern Length**: The Bitap algorithm used in Haiku supports patterns up to 32 characters long due to limitations in handling bit masks.

## Roadmap
- Add unicode support
- Improve memory footprint
- Improve code documentation

## Contributing
Contributions to Haiku are welcome! If you're looking to contribute, please:
- Check out the current issues on GitHub, especially those tagged as "good first issue".
- Fork the repository and make your changes.
- Write clear, commented code.
- Ensure your changes pass all existing tests and add new tests for added functionality.
- Submit a pull request with a detailed description of your changes.

For major changes, please open an issue first to discuss what you would like to change.

Thank you for your interest in improving Haiku!
