// Each state has: abbreviation, grid row, grid column, and color tier
// Tiers based on the image:
//   1 = darkest green  (#2d7d5f)
//   2 = dark green     (#3a9b78)
//   3 = medium green   (#5bbe96)
//   4 = light green    (#8fd4b4)
//   5 = lightest green (#c8e9d8)

const stateData = [
  // Row 0
  { abbr: "ME", row: 0, col: 10, tier: 3 },

  // Row 1
  { abbr: "AK", row: 1, col: 1, tier: 4 },
  { abbr: "WI", row: 1, col: 6, tier: 3 },
  { abbr: "VT", row: 1, col: 9, tier: 4 },
  { abbr: "NH", row: 1, col: 10, tier: 4 },

  // Row 2
  { abbr: "WA", row: 2, col: 2, tier: 3 },
  { abbr: "ID", row: 2, col: 3, tier: 4 },
  { abbr: "MT", row: 2, col: 4, tier: 4 },
  { abbr: "ND", row: 2, col: 5, tier: 4 },
  { abbr: "MN", row: 2, col: 6, tier: 4 },
  { abbr: "IL", row: 2, col: 7, tier: 2 },
  { abbr: "MI", row: 2, col: 8, tier: 4 },
  { abbr: "NY", row: 2, col: 9, tier: 2 },
  { abbr: "MA", row: 2, col: 10, tier: 3 },

  // Row 3
  { abbr: "OR", row: 3, col: 2, tier: 4 },
  { abbr: "NV", row: 3, col: 3, tier: 4 },
  { abbr: "WY", row: 3, col: 4, tier: 3 },
  { abbr: "SD", row: 3, col: 5, tier: 4 },
  { abbr: "IA", row: 3, col: 6, tier: 5 },
  { abbr: "IN", row: 3, col: 7, tier: 4 },
  { abbr: "OH", row: 3, col: 8, tier: 3 },
  { abbr: "PA", row: 3, col: 9, tier: 4 },
  { abbr: "NJ", row: 3, col: 10, tier: 2 },
  { abbr: "CT", row: 3, col: 11, tier: 3 },
  { abbr: "RI", row: 3, col: 12, tier: 4 },

  // Row 4
  { abbr: "CA", row: 4, col: 2, tier: 3 },
  { abbr: "UT", row: 4, col: 3, tier: 4 },
  { abbr: "CO", row: 4, col: 4, tier: 3 },
  { abbr: "NE", row: 4, col: 5, tier: 4 },
  { abbr: "MO", row: 4, col: 6, tier: 5 },
  { abbr: "KY", row: 4, col: 7, tier: 4 },
  { abbr: "WV", row: 4, col: 8, tier: 4 },
  { abbr: "VA", row: 4, col: 9, tier: 3 },
  { abbr: "DC", row: 4, col: 10, tier: 1 },
  { abbr: "MD", row: 4, col: 11, tier: 3 },
  { abbr: "DE", row: 4, col: 12, tier: 5 },

  // Row 5
  { abbr: "AZ", row: 5, col: 3, tier: 4 },
  { abbr: "NM", row: 5, col: 4, tier: 4 },
  { abbr: "KS", row: 5, col: 5, tier: 4 },
  { abbr: "AR", row: 5, col: 6, tier: 4 },
  { abbr: "TN", row: 5, col: 7, tier: 4 },
  { abbr: "NC", row: 5, col: 8, tier: 2 },
  { abbr: "SC", row: 5, col: 9, tier: 4 },

  // Row 6
  { abbr: "OK", row: 6, col: 4, tier: 4 },
  { abbr: "LA", row: 6, col: 5, tier: 4 },
  { abbr: "MS", row: 6, col: 6, tier: 4 },
  { abbr: "AL", row: 6, col: 7, tier: 4 },
  { abbr: "GA", row: 6, col: 8, tier: 2 },

  // Row 7
  { abbr: "HI", row: 7, col: 1, tier: 1 },
  { abbr: "TX", row: 7, col: 4, tier: 2 },
  { abbr: "FL", row: 7, col: 9, tier: 2 },
];

// Color palette matching the image
const tierColors = {
  1: "#1a6b50",  // darkest
  2: "#2d8e6b",  // dark
  3: "#4daa88",  // medium
  4: "#8cceb3",  // light
  5: "#c3e6d5",  // lightest
};

export { stateData, tierColors };
