/* tslint:disable */
/* eslint-disable */
/**
*/
export class SearchConfig {
  free(): void;
/**
* @param {number} ngram_size
* @param {number} max_distance
* @returns {SearchConfig}
*/
  static new(ngram_size: number, max_distance: number): SearchConfig;
/**
* @param {string} input
* @returns {(string)[]}
*/
  generate_ngrams(input: string): (string)[];
/**
*/
  max_distance: number;
/**
*/
  ngram_size: number;
}
/**
*/
export class SearchEngine {
  free(): void;
/**
* @param {(string)[]} data
* @param {any} config
*/
  constructor(data: (string)[], config: any);
/**
* @param {string} query
* @returns {(SearchResult)[]}
*/
  search(query: string): (SearchResult)[];
}
/**
*/
export class SearchResult {
  free(): void;
/**
* @param {string} text
* @param {number} score
*/
  constructor(text: string, score: number);
/**
*/
  readonly score: number;
/**
*/
  readonly text: string;
}

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly __wbg_searchconfig_free: (a: number) => void;
  readonly __wbg_get_searchconfig_ngram_size: (a: number) => number;
  readonly __wbg_set_searchconfig_ngram_size: (a: number, b: number) => void;
  readonly __wbg_get_searchconfig_max_distance: (a: number) => number;
  readonly __wbg_set_searchconfig_max_distance: (a: number, b: number) => void;
  readonly searchconfig_new: (a: number, b: number) => number;
  readonly searchconfig_generate_ngrams: (a: number, b: number, c: number, d: number) => void;
  readonly __wbg_searchresult_free: (a: number) => void;
  readonly searchresult_new: (a: number, b: number, c: number) => number;
  readonly searchresult_text: (a: number, b: number) => void;
  readonly searchresult_score: (a: number) => number;
  readonly __wbg_searchengine_free: (a: number) => void;
  readonly searchengine_new: (a: number, b: number, c: number) => number;
  readonly searchengine_search: (a: number, b: number, c: number, d: number) => void;
  readonly __wbindgen_malloc: (a: number, b: number) => number;
  readonly __wbindgen_realloc: (a: number, b: number, c: number, d: number) => number;
  readonly __wbindgen_add_to_stack_pointer: (a: number) => number;
  readonly __wbindgen_free: (a: number, b: number, c: number) => void;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;
/**
* Instantiates the given `module`, which can either be bytes or
* a precompiled `WebAssembly.Module`.
*
* @param {SyncInitInput} module
*
* @returns {InitOutput}
*/
export function initSync(module: SyncInitInput): InitOutput;

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {InitInput | Promise<InitInput>} module_or_path
*
* @returns {Promise<InitOutput>}
*/
export default function __wbg_init (module_or_path?: InitInput | Promise<InitInput>): Promise<InitOutput>;
