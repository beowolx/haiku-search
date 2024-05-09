use serde::{Deserialize, Serialize};
use std::collections::HashMap;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
#[derive(Serialize, Deserialize)]
pub struct SearchConfig {
  pub ngram_size: usize,
  pub max_distance: usize,
}

#[wasm_bindgen]
impl SearchConfig {
  pub fn new(ngram_size: usize, max_distance: usize) -> SearchConfig {
    SearchConfig {
      ngram_size,
      max_distance,
    }
  }
  pub fn generate_ngrams(&self, input: &str) -> Vec<String> {
    let mut ngrams = Vec::new();
    if self.ngram_size > 0 && input.len() >= self.ngram_size {
      for i in 0..=input.len() - self.ngram_size {
        ngrams.push(input[i..i + self.ngram_size].to_string());
      }
    }
    ngrams
  }
}

#[wasm_bindgen]
pub struct SearchResult {
  text: String,
  score: f32,
}

#[wasm_bindgen]
impl SearchResult {
  #[wasm_bindgen(constructor)]
  pub fn new(text: String, score: f32) -> SearchResult {
    SearchResult { text, score }
  }

  #[wasm_bindgen(getter)]
  pub fn text(&self) -> String {
    self.text.clone()
  }

  #[wasm_bindgen(getter)]
  pub fn score(&self) -> f32 {
    self.score
  }
}

#[wasm_bindgen]
pub struct SearchEngine {
  index: HashMap<String, Vec<usize>>,
  documents: Vec<String>,
  config: SearchConfig,
}

#[wasm_bindgen]
impl SearchEngine {
  #[wasm_bindgen(constructor)]
  pub fn new(data: Vec<String>, config: JsValue) -> SearchEngine {
    let config: SearchConfig = serde_wasm_bindgen::from_value(config).unwrap();
    let mut engine = SearchEngine {
      index: HashMap::new(),
      documents: data,
      config,
    };
    engine.index_documents();
    engine
  }

  fn index_documents(&mut self) {
    for (id, text) in self.documents.iter().enumerate() {
      let ngrams = self.config.generate_ngrams(text);
      for ngram in ngrams {
        self.index.entry(ngram).or_insert_with(Vec::new).push(id);
      }
    }
  }

  #[wasm_bindgen]
  pub fn search(&self, query: &str) -> Vec<SearchResult> {
    let ngrams = self.config.generate_ngrams(query);
    let mut candidates = HashMap::new();

    let mut pattern_mask = [0; 256];
    for (i, ch) in query.chars().enumerate() {
      pattern_mask[ch as usize] |= 1 << i;
    }

    for ngram in ngrams {
      if let Some(docs) = self.index.get(&ngram) {
        for &id in docs {
          *candidates.entry(id).or_insert(0) += 1;
        }
      }
    }

    candidates
      .into_iter()
      .filter_map(|(id, _)| {
        self.bitap_search(&self.documents[id], query, &pattern_mask)
      })
      .collect()
  }

  fn bitap_search(
    &self,
    text: &str,
    pattern: &str,
    pattern_mask: &[usize; 256],
  ) -> Option<SearchResult> {
    if pattern.is_empty() || pattern.len() > 32 {
      return None;
    }

    let text_len = text.len();
    let pattern_len = pattern.len();
    let max_mismatches = self.config.max_distance as usize;

    for i in 0..=text_len.saturating_sub(pattern_len) {
      let mut mismatches = 0;
      let mut r = 0;

      for (j, character) in text[i..i + pattern_len].chars().enumerate() {
        r = ((r << 1) | 1) & pattern_mask[character as usize];

        if r & (1 << j) == 0 {
          mismatches += 1;
        }
      }

      if mismatches <= max_mismatches {
        let score = 1.0 - mismatches as f32 / pattern_len as f32;
        return Some(SearchResult::new(text.to_string(), score));
      }
    }

    None
  }
}
