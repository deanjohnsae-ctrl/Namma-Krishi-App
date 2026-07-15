export const categories = ["ಹಣ್ಣುಗಳು", "ತರಕಾರಿಗಳು", "ಧಾನ್ಯಗಳು", "ಹೂವುಗಳು", "ಮಸಾಲೆ"];

const fruits = ["ಸೇಬು", "ಬಾಳೆ", "ಮಾವು", "ದ್ರಾಕ್ಷಿ", "ಕಿತ್ತಳೆ", "ಪಪ್ಪಾಯ", "ಅನಾನಸ್", "ಸಪೋಟ", "ದಾಳಿಂಬೆ", "ನಿಂಬೆ", "ಪೇರಲ", "ಹಲಸು", "ರಸಬೆರ್ರಿ", "ಸ್ಟ್ರಾಬೆರಿ", "ಕಲ್ಲಂಗಡಿ", "ನೆಲ್ಲಿಕಾಯಿ", "ಖರ್ಜೂರ", "ಸೀತಾಫಲ", "ರಂಬುಟಾನ್", "ಡ್ರ್ಯಾಗನ್ ಹಣ್ಣು", "ಜಾಂಬು ನೇರಳೆ", "ಬೋರ", "ಕಮಲಾಕ್ಷಿ", "ಫಾಲ್ಸಾ", "ಕರಿಂಜ", "ಬೆಟ್ಟದ ನೆಲ್ಲಿ", "ತೆಂಗಿನ ಕಾಯಿ", "ಅಡಿಕೆ", "ಕಬ್ಬು", "ಹುಣಸೆ ಹಣ್ಣು", "ಚಕ್ಕೋತ"];
const vegetables = ["ಟೊಮೇಟೊ", "ಈರುಳ್ಳಿ", "ಆಲೂಗಡ್ಡೆ", "ಬದನೆಕಾಯಿ", "ಹೂಕೋಸು", "ಎಲೆಕೋಸು", "ಸೌತೆಕಾಯಿ", "ಕ್ಯಾರೆಟ್", "ಬೀನ್ಸ್", "ಪಾಲಕ್", "ಬೆಂಡೆಕಾಯಿ", "ಹಸಿಮೆಣಸು", "ಕುಂಬಳಕಾಯಿ", "ಬಟಾಣಿ", "ಮೂಲಂಗಿ", "ಬೀಟ್ರೂಟ್", "ಅವರೆಕಾಯಿ"];
const grains = ["ಅಕ್ಕಿ", "ಗೋಧಿ", "ಜೋಳ", "ರಾಗಿ", "ಸಜ್ಜೆ", "ತೊಗರಿ ಬೇಳೆ", "ಹೆಸರು ಬೇಳೆ", "ಉದ್ದಿನ ಬೇಳೆ", "ಕಡಲೆ ಬೇಳೆ", "ಮೆಂತ್ಯ", "ಸಾಸಿವೆ", "ಅವರೆ", "ಹುರುಳಿ", "ಚಾವಳಿ", "ನವಣೆ", "ಬಾರ್ಲಿ", "ಮೆಕ್ಕೆ ಜೋಳ"];
const flowers = ["ಗುಲಾಬಿ", "ಮಲ್ಲಿಗೆ", "ಸಂಪಿಗೆ", "ಕನಕಾಂಬರ", "ದಾಸವಾಳ", "ಜಾಜಿ", "ಕನ್ನಡೆ ಹೂ", "ತಾವರೆ", "ಚೆಂಡು ಹೂ", "ಕಾಕಡ", "ಸೇವಂತಿಗೆ", "ಕುಂಕುಮ", "ಪಾರಿಜಾತ", "ನಂದಿಬತ್ತಲು", "ಅಬ್ಬಲಿಗೆ", "ಹೊನ್ನೆ ಹೂ", "ರಂಜಾನ್ ಹೂ"];
const spices = ["ಕಾಳು ಮೆಣಸು", "ಶುಂಠಿ", "ಅರಿಶಿನ", "ದಾಲ್ಚಿನ್ನಿ", "ಏಲಕ್ಕಿ", "ಲವಂಗ", "ಜೀರಿಗೆ", "ಸೌಂಫ್", "ಮೆಂತ್ಯ", "ಕೊತ್ತಂಬರಿ", "ಬಾಯ್ಲಖಾದ", "ಮರ ಮೆಣಸು", "ಸಂಬಾರ", "ಜಾಜಿಕಾಯಿ", "ಪುಟ್ಪುಟ್", "ಒಣ ಮೆಣಸು", "ಬೆಳ್ಳುಳ್ಳಿ"];

export const commoditiesByCategory = {
  ಹಣ್ಣುಗಳು: fruits,
  ತರಕಾರಿಗಳು: vegetables,
  ಧಾನ್ಯಗಳು: grains,
  ಹೂವುಗಳು: flowers,
  ಮಸಾಲೆ: spices,
};

export const commodities = Array.from({ length: 9 }, (_, index) => ({
  id: `commodity-${index + 1}`,
  name: "ಸೇಬು",
}));

export const searchResults = [
  { title: "ಸೇಬು", kind: "Commodity", accent: "green" },
  { title: "ಬಿನ್ನಿ ಮಿಲ್ (ಹಣ್ಣು ಮತ್ತು ತರಕಾರಿ)", kind: "Market", accent: "gold" },
  { title: "ಕಾಶ್ಮೀರಿ", kind: "Variety", accent: "blue" },
  { title: "ಕುಲುಮನಾಲಿ", kind: "Variety", accent: "blue" },
];

export const marketOptions = [
  "ಬಿನ್ನಿ ಮಿಲ್ (ಹಣ್ಣು ಮತ್ತು ತರಕಾರಿ)",
  "ದಾವಣಗೆರೆ",
  "ಹೊಸ್ಕೋಟೆ",
  "ಕಲಬುರಗಿ",
  "ಮೈಸೂರು",
];

export const varietyOptions = ["ಕಾಶ್ಮೀರಿ", "ಕುಲುಮನಾಲಿ", "ರಾಯಲ್", "ಶಿಮ್ಲಾ"];

const stats = [
  {
    label: "ಗರಿಷ್ಠ ಬೆಲೆ (ರೂ.)",
    value: "₹11,000",
    delta: "-7,000",
    tone: "blue",
    deltaTone: "down",
  },
  {
    label: "ಗರಿಷ್ಠ ಬೆಲೆ (ರೂ.)",
    value: "₹11,000",
    delta: "-7,000",
    tone: "gold",
    deltaTone: "down",
  },
  {
    label: "ಗರಿಷ್ಠ ಬೆಲೆ (ರೂ.)",
    value: "₹11,000",
    delta: "-7,000",
    tone: "red",
    deltaTone: "up",
  },
];

export const priceCards = [
  {
    id: "card-1",
    commodity: "ಸೇಬು",
    market: "ಬಿನ್ನಿ ಮಿಲ್ (ಹಣ್ಣು ಮತ್ತು ತರಕಾರಿ)",
    marketLabel: "ಬಿನ್ನಿ ಮಿಲ್ (ಹಣ್ಣು ಮತ್ತು ತರಕಾರಿ)",
    variety: "ಕಾಶ್ಮೀರಿ",
    grade: "ಸರಾಸರಿ",
    arrival: "592",
    unit: "ಕ್ವಿಂಟಲ್",
    updatedAt: "03-06-2026",
    previousUpdate: "27-05-2026",
    stats,
  },
  {
    id: "card-2",
    commodity: "ಸೇಬು",
    market: "ದಾವಣಗೆರೆ",
    marketLabel: "ದಾವಣಗೆರೆ ಮಾರುಕಟ್ಟೆ",
    variety: "ಕುಲುಮನಾಲಿ",
    grade: "ಸರಾಸರಿ",
    arrival: "420",
    unit: "ಕ್ವಿಂಟಲ್",
    updatedAt: "02-06-2026",
    previousUpdate: "26-05-2026",
    stats,
  },
  {
    id: "card-3",
    commodity: "ಸೇಬು",
    market: "ಹೊಸ್ಕೋಟೆ",
    marketLabel: "ಹೊಸ್ಕೋಟೆ ಮಾರುಕಟ್ಟೆ",
    variety: "ರಾಯಲ್",
    grade: "ಉತ್ತಮ",
    arrival: "310",
    unit: "ಕ್ವಿಂಟಲ್",
    updatedAt: "03-06-2026",
    previousUpdate: "25-05-2026",
    stats,
  },
];

export const assets = {
  logo: "/assets/logo.svg",
  search: "/assets/search.svg",
  back: "/assets/back.svg",
  filter: "/assets/filter.svg",
  close: "/assets/close.svg",
  heroBg: "/assets/hero-bg.png",
  heroBgMobile: "/assets/hero-bg-mobile.png",
  heroLandscape: "/assets/hero-landscape.png",
  heroFarmer: "/assets/hero-farmer.png",
  commodityThumb: "/assets/commodity-thumb.png",
  marketThumb: "/assets/market-thumb.png",
  graph: "/assets/graph.png",
  category: "/assets/category.png",
  suggestionCommodity: "/assets/suggestion-commodity.svg",
  suggestionMarket: "/assets/suggestion-market.svg",
  suggestionVariety: "/assets/suggestion-variety.svg",
};
