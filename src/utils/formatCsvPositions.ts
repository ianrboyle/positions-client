import { CsvPosition, ParsedCsvPosition } from "../models/csv.model";

function parseCsvNumbers(csvPosition: any): ParsedCsvPosition {
  const parsedCsvPosition: ParsedCsvPosition = {
    accountName:  csvPosition[""],
    accountNumber: csvPosition["Portfolio_Positions_Apr-21-2023"],
    costBasisTotal: csvPosition["_12"] === "n/a" || csvPosition["_12"] === "--" ? 0 : parseFloat(csvPosition["_12"]?.replace(/[\$,]/g, '')),
    averageCostBasis: csvPosition["_13"] === "n/a" || csvPosition["_13"] === "--" ? 0 : parseFloat(csvPosition["_13"]?.replace(/[\$,]/g, '')),
    currentValue: csvPosition["_6"] === "n/a" || csvPosition["_6"] === "--" ? 0 : parseFloat(csvPosition["_6"]?.replace(/[\$,]/g, '')),
    companyName: csvPosition["_2"],
    lastPrice: csvPosition["_4"] === "n/a" || csvPosition["_4"] === "--" ? 0 : parseFloat(csvPosition["_4"]?.replace(/[\$,]/g, '')),
    lastPriceChange: csvPosition["_5"] === "n/a" || csvPosition["_5"] === "--" ? 0 : parseFloat(csvPosition["_5"]?.replace(/[\$,]/g, '')),
    percentOfAccount: csvPosition["_11"] === "n/a" || csvPosition["_11"] === "--" ? 0 : parseFloat(csvPosition["_11"]?.replace('%', '')),
    quantity: parseFloat(csvPosition["_3"]),
    symbol: csvPosition["_1"],
    todayGainLossDollar: csvPosition["_7"] === "n/a" || csvPosition["_7"] === "--" ? 0 : parseFloat(csvPosition["_7"]?.replace(/[\$,]/g, '')),
    todayGainLossPercent: csvPosition["_8"] === "n/a" || csvPosition["_8"] === "--" ? 0 : parseFloat(csvPosition["_8"]?.replace('%', '')),
    totalGainLossDollar: csvPosition["_9"] === "n/a" || csvPosition["_9"] === "--" ? 0 : parseFloat(csvPosition["_9"]?.replace(/[\$,]/g, '')),
    totalGainLossPercent: csvPosition["_10"] === "n/a" || csvPosition["_10"] === "--" ? 0 :parseFloat(csvPosition["_10"]?.replace('%', '')),
    type: csvPosition["_14"]
  }

  return parsedCsvPosition;

}

export const parseCsvFile = (csvPositions: any[]): ParsedCsvPosition[] => {
  return csvPositions.map((cP) => {
    return parseCsvNumbers(cP);
  }).filter(cp => 
       !Number.isNaN(cp.costBasisTotal)
  )
  // return parsedCsvFile.filter(cp => 
  //    !Number.isNaN(cp.costBasis)
  // )
  // return parsedCsvFile;

}
