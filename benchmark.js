import init, { SearchConfig, SearchEngine } from './pkg/haiku.js';

const data = [
  "Apple Pie", "Banana Bread", "Carrot Cake", "Doughnut", "Eclair",
  "Fudge Brownie", "Gingerbread", "Honeycomb", "Ice Cream", "Jelly",
  "Kiwi Fruit", "Lemon Tart", "Mango Sorbet", "Nougat", "Orange Peel",
  "Pancake", "Quince Jelly", "Raspberry Pie", "Strawberry Shortcake", "Tiramisu",
  "Ugli Fruit", "Vanilla Bean", "Watermelon Sugar", "Xigua", "Yogurt",
  "Zucchini Bread", "Almond Joy", "Boston Cream", "Cupcake", "Date Fruit",
  "English Muffin", "Fig Roll", "Grapefruit", "Hazelnut", "Irish Cream",
  "Juniper Berries", "Kumquat", "Lime Zest", "Maple Syrup", "Nutella",
  "Olive Oil", "Pistachio", "Quark", "Red Velvet", "Sesame Seed",
  "Toffee", "Udon Noodles", "Veggie Burger", "Walnut", "Xanthan Gum",
  "Yellow Cake", "Zebra Cake", "Artichoke", "Broccoli", "Cucumber",
  "Dragon Fruit", "Endive", "Fig", "Guava", "Horseradish",
  "Iceberg Lettuce", "Jackfruit", "Kale", "Lettuce", "Mushroom",
  "Nectarine", "Oatmeal", "Papaya", "Quinoa", "Radish",
  "Spinach", "Tomato", "Ube", "Vinegar", "Watercress",
  "Xacuti", "Yam", "Ziti", "Apricot", "Bilberry",
  "Cantaloupe", "Date", "Elderberry", "Feijoa", "Gooseberry",
  "Honeydew", "Ita Palm", "Jujube", "Kiwano", "Lychee",
  "Mandarin", "Nashi Pear", "Olive", "Peach", "Quince",
  "Rhubarb", "Squash", "Truffle", "Ulluco", "Voavanga",
  "Wasabi", "Ximenia", "Yuzu", "Zest", "Blueberry"
];
const queries = ["Apple", "Banana", "Carrot", "Pie", "Bread", "Cake"];

let haikuEngine;
let results = [];

async function setupHaiku() {
  await init();
  haikuEngine = new SearchEngine(data, { ngram_size: 3, max_distance: 1 });
}

function setupFuse() {
  const fuse = new Fuse(data.map(item => ({ title: item })), {
    includeScore: true,
    keys: ['title'],
    threshold: 0.1,
    useExtendedSearch: true
  });
  return fuse;
}

async function warmUp(engine, queries, iterations) {
  for (let i = 0; i < iterations; i++) {
    await Promise.all(queries.map(query => engine.search(query)));
  }
}

async function performSearches(engine, libraryName, queries, iterations) {
  const startTime = performance.now();
  for (let i = 0; i < iterations; i++) {
    const shuffledQueries = shuffle(queries);
    await Promise.all(shuffledQueries.map(query => engine.search(query)));
  }
  const endTime = performance.now();
  const executionTime = (endTime - startTime).toFixed(2);
  results.push({ libraryName, executionTime });
  if (results.length === 2) {
    drawChart();
  }
}

function shuffle(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function drawChart() {
  const ctx = document.getElementById('benchmarkChart').getContext('2d');
  const chart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: results.map(result => result.libraryName),
      datasets: [{
        label: 'Execution Time (ms)',
        data: results.map(result => result.executionTime),
        backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)'],
        borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

setupHaiku().then(() => {
  warmUp(haikuEngine, queries, 100).then(() => {
    performSearches(haikuEngine, "Haiku", queries, 10000);
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const fuse = setupFuse();
  warmUp(fuse, queries, 100).then(() => {
    performSearches(fuse, "Fuse.js", queries, 10000);
  });
});

