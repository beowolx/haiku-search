//! Test suite for the Web and headless browsers.

#![cfg(target_arch = "wasm32")]

extern crate wasm_bindgen_test;
use haiku_search::SearchConfig;
use haiku_search::SearchEngine;
use serde_wasm_bindgen;
use wasm_bindgen_test::*;

wasm_bindgen_test_configure!(run_in_browser);

#[wasm_bindgen_test]
fn test_bitap_exact_match() {
  let config = SearchConfig::new(3, 0);
  let engine = SearchEngine::new(
    vec!["hello".to_string(), "hallo".to_string()],
    serde_wasm_bindgen::to_value(&config).unwrap(),
  );
  let results = engine.search("hello");
  assert!(results.iter().any(|result| result.text() == "hello"
    && (result.score() - 1.0).abs() < f32::EPSILON));
}

#[wasm_bindgen_test]
fn test_bitap_with_errors() {
  let config = SearchConfig::new(3, 1);
  let engine = SearchEngine::new(
    vec!["Brian Doe".to_string(), "Brain Dose".to_string()],
    serde_wasm_bindgen::to_value(&config).unwrap(),
  );
  let results = engine.search("Brian");
  assert!(results
    .iter()
    .any(|result| result.text() == "Brian Doe" && result.score() >= 0.8));
}

#[wasm_bindgen_test]
fn test_bitap_no_match() {
  let config = SearchConfig::new(3, 0);
  let engine = SearchEngine::new(
    vec!["world".to_string()],
    serde_wasm_bindgen::to_value(&config).unwrap(),
  );
  let results = engine.search("word");
  assert!(results.is_empty());
}
