
import { IPosition } from "./position.model";



export interface MemberDto {
    id: number;
    userName: string;
    dateOfBirth: Date;
    created: string;
    investingStyle: string;
    city: string;
    country: string;
    firstPosition: string;
    accountTotalValue: number;
    positions: IPosition[];
    sectors: ISectorDto[];
    industries: IndustryDto[];
}

export interface IndustryDto {
  id: number;
  industryName: string;
  totalValue: number;
  sectorId: number;
  positions: IPosition[];
  sectorName?: string;
  percentOfAccount: number;
}

export interface ISectorDto {
  id: number;
  sectorName: string;
  totalValue: number;
  industries: IndustryDto[];
  positions: IPosition[];
  percentOfAccount: number;
}