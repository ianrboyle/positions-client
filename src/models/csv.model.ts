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
  costBasis: number;
  costBasisPerShare: number;
  currentValue: number;
  companyName: string;
  lastPrice: number;
  lastPriceChange: number;
  percentOfAccount: number;
  quantity: number;
  symbol: string;
  todayGainLossDollar: number;
  todayGainLossPercent: number;
  totalGainLossDollar: number;
  totalGainLossPercent: number;
  type: string;
}