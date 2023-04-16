
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
    positions: IPosition[];
    sectors: SectorDto[];
    industries: IndustryDto[];
}

export interface IndustryDto {
  id: number;
  industryName: string;
  totalValue: number;
  sectorId: number;
  positions: IPosition[];
}

export interface SectorDto {
  id: number;
  sectorName: string;
  totalValue: number;
  industries: IndustryDto[];
  positions: IPosition[];
}