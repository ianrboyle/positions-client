export interface CsvPosition {
  accountName: string;
  accountNumber: string;
  costBasis: string;
  costBasisPerShare: string;
  currentValue: string;
  description: string;
  lastPrice: string;
  lastPriceChange: string;
  percentOfAccount: string;
  quantity: string;
  symbol: string;
  todayGainLossDollar: string;
  todayGainLossPercent: string;
  totalGainLossDollar: string;
  totalGainLossPercent: string;
  type: string;
}

export interface ParsedCsvPosition {
  accountName: string;
  accountNumber: string;
  costBasisTotal: number | string;
  averageCostBasis: number | string;
  currentValue: number | string;
  companyName: string;
  lastPrice: number | string;
  lastPriceChange: number | string;
  percentOfAccount: number | string;
  quantity: number | string;
  symbol: string;
  todayGainLossDollar: number | string;
  todayGainLossPercent: number | string;
  totalGainLossDollar: number | string;
  totalGainLossPercent: number | string;
  type: string;
}