import { CsvPosition, ParsedCsvPosition } from "../models/csv.model";

function parseCsvNumbers(csvPosition: any): ParsedCsvPosition {
  const parsedCsvPosition: ParsedCsvPosition = {
    accountName:  csvPosition["Account Name"],
    accountNumber: csvPosition["Account Number"],
    costBasis: parseFloat(csvPosition["Cost Basis"]?.replace(/[\$,]/g, '')),
    costBasisPerShare: parseFloat(csvPosition["Cost Basis Per Share"]?.replace(/[\$,]/g, '')),
    currentValue: parseFloat(csvPosition["Current Value"]?.replace(/[\$,]/g, '')),
    companyName: csvPosition["Description"],
    lastPrice: parseFloat(csvPosition["Last Price"]?.replace(/[\$,]/g, '')),
    lastPriceChange: parseFloat(csvPosition["Last Price Change"]?.replace(/[\$,]/g, '')),
    percentOfAccount: parseFloat(csvPosition["Percent Of Account"]?.replace('%', '')),
    quantity: parseFloat(csvPosition["Quantity"]),
    symbol: csvPosition["Symbol"],
    todayGainLossDollar: parseFloat(csvPosition["Today's Gain/Loss Dollar"]?.replace(/[\$,]/g, '')),
    todayGainLossPercent: parseFloat(csvPosition["Today's Gain/Loss Percent"]?.replace('%', '')),
    totalGainLossDollar: parseFloat(csvPosition["Total Gain/Loss Dollar"]?.replace(/[\$,]/g, '')),
    totalGainLossPercent: parseFloat(csvPosition["Total Gain/Loss Percent"]?.replace('%', '')),
    type: csvPosition["T`ype"]
  }

  return parsedCsvPosition;

}

export const parseCsvFile = (csvPositions: any[]): ParsedCsvPosition[] => {
  const parsedCsvFile = csvPositions.map((cP) => {
    return parseCsvNumbers(cP);
  })

  return parsedCsvFile;

}