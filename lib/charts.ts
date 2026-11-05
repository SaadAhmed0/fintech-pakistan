// Every chart on the site, with its source. Add a figure here, then place it with
// `chart:` in frontmatter (the story's main figure) or <div data-chart="key"></div> in a post.
export type ChartRow = { label: string; value: number; display: string };
export type Chart = { type: "bars" | "columns"; title: string; subtitle: string; rows: ChartRow[]; source: string };

export const CHARTS: Record<string, Chart> = {
  "remittance-sources": {
    type: "bars",
    title: "Where September's money came from",
    subtitle: "Workers' remittances, US$ million, September 2026",
    source: "State Bank of Pakistan data via Business Recorder",
    rows: [
      { label: "Saudi Arabia", value: 899.13, display: "$899M" },
      { label: "UAE", value: 748.53, display: "$749M" },
      { label: "United Kingdom", value: 515.15, display: "$515M" },
      { label: "European Union", value: 447.71, display: "$448M" },
      { label: "United States", value: 305.87, display: "$306M" },
    ],
  },
  "remittance-growth": {
    type: "columns",
    title: "Growth slowed, then picked up",
    subtitle: "Workers' remittances, % change on the year before",
    source: "State Bank of Pakistan data via Outlook Business and Business Recorder",
    rows: [
      { label: "FY24", value: 10.7, display: "10.7%" },
      { label: "FY25", value: 26.6, display: "26.6%" },
      { label: "FY26", value: 8.6, display: "8.6%" },
      { label: "Q1 FY27", value: 14.74, display: "14.7%" },
    ],
  },
  "raast-merchant": {
    type: "columns",
    title: "Shops are starting to use Raast",
    subtitle: "Person-to-merchant payments on Raast, million per quarter",
    source: "State Bank of Pakistan data via The Nation and Pakera. Q4 is provisional",
    rows: [
      { label: "Q2 FY26", value: 36.3, display: "36.3M" },
      { label: "Q3 FY26", value: 55.9, display: "55.9M" },
      { label: "Q4 FY26", value: 86.0, display: "86.0M" },
    ],
  },
  "pvara-capital": {
    type: "bars",
    title: "What each PVARA licence costs to hold",
    subtitle: "Minimum paid-up capital, PKR million",
    source: "PVARA, Frequently asked questions",
    rows: [
      { label: "Exchange", value: 500, display: "500" },
      { label: "Lending and borrowing", value: 500, display: "500" },
      { label: "Derivatives", value: 500, display: "500" },
      { label: "Mining-related", value: 500, display: "500" },
      { label: "Fiat-referenced tokens", value: 300, display: "300" },
      { label: "Asset-referenced tokens", value: 300, display: "300" },
      { label: "Custody", value: 200, display: "200" },
      { label: "Asset management", value: 200, display: "200" },
      { label: "Transfer and settlement", value: 200, display: "200" },
      { label: "Broker-dealer", value: 75, display: "75" },
      { label: "Advisory", value: 15, display: "15" },
    ],
  },
  "pvara-capital-short": {
    type: "bars",
    title: "The price of a licence",
    subtitle: "Minimum paid-up capital, PKR million, selected categories",
    source: "PVARA, Frequently asked questions",
    rows: [
      { label: "Exchange", value: 500, display: "500" },
      { label: "Fiat-referenced tokens", value: 300, display: "300" },
      { label: "Custody", value: 200, display: "200" },
      { label: "Broker-dealer", value: 75, display: "75" },
      { label: "Advisory", value: 15, display: "15" },
    ],
  },
};
