export interface IPosition {
  symbol: string,
  sharesOwned: number,
  id: number,
  companyName: string,
  currentPrice: number,
  industryId: number,
  purchasePrice: number,
  totalCostBasis: number,
  averageCostBasis: number,
  sectorId: number
}

export interface IUpdatePosition {
  symbol: string,
  id: number,
  sharesAdded?: number,
  sharesSold?: number,
  purchasePrice?: number,
  sellPrice?: number

}