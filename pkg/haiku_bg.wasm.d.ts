/* tslint:disable */
/* eslint-disable */
export const memory: WebAssembly.Memory;
export function __wbg_searchconfig_free(a: number): void;
export function __wbg_get_searchconfig_ngram_size(a: number): number;
export function __wbg_set_searchconfig_ngram_size(a: number, b: number): void;
export function __wbg_get_searchconfig_max_distance(a: number): number;
export function __wbg_set_searchconfig_max_distance(a: number, b: number): void;
export function searchconfig_new(a: number, b: number): number;
export function searchconfig_generate_ngrams(a: number, b: number, c: number, d: number): void;
export function __wbg_searchresult_free(a: number): void;
export function searchresult_new(a: number, b: number, c: number): number;
export function searchresult_text(a: number, b: number): void;
export function searchresult_score(a: number): number;
export function __wbg_searchengine_free(a: number): void;
export function searchengine_new(a: number, b: number, c: number): number;
export function searchengine_search(a: number, b: number, c: number, d: number): void;
export function __wbindgen_malloc(a: number, b: number): number;
export function __wbindgen_realloc(a: number, b: number, c: number, d: number): number;
export function __wbindgen_add_to_stack_pointer(a: number): number;
export function __wbindgen_free(a: number, b: number, c: number): void;
