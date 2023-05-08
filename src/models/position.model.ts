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
  sectorId: number,
  currentTotalValue: number,
  sectorName?: string,
  industryName?: string
}

export interface IUpdatePosition {
  id?: number,
  sharesAdded?: number,
  sharesSold?: number,
  purchasePrice?: number,
  sellPrice?: number,
  newSectorId?: number,
  newIndustryId?: number,
  oldIndustryId?: number,
  oldSectorId?: number


}