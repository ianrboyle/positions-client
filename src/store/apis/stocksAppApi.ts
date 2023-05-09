import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IPosition, IUpdatePosition } from '../../models/position.model';
import { ISectorDto, IndustryDto, MemberDto } from '../../models/member.model';
import { ParsedCsvPosition } from '../../models/csv.model';


const stockApi = createApi({
  reducerPath: 'stockApi',
  // , 'Sectors', 'Position', 'Positions', 'Industries'
  tagTypes: ['Users'],
  baseQuery: fetchBaseQuery({ 
    baseUrl: `${process.env.REACT_APP_API_URL}`,
    prepareHeaders: (headers, { getState }) => {
      const token = localStorage.getItem('token')?.replace(/['"]+/g, '')
      if (token) {
       // include token in req header
        headers.set('authorization', `Bearer ${token}`)  
        return headers
      }
    },
  }),
  endpoints (builder) {
    return {
      fetchUser: builder.query<MemberDto, void>({
        providesTags: ['Users'],
        query: () => {
          return {  
            url: '/users',
            method: 'GET'
          }
        }
      }),
      createSector: builder.mutation({
        invalidatesTags: ['Users'],
        query: ({sectorName}: ISectorDto) => {
          return {  
            url: '/sectors',
            method: 'POST',
            body: {
              sectorName: sectorName 
            }
          }
        }
      }),
     fetchSector: builder.query<ISectorDto, string>({
        query: (id: string) => {
          return {  
            url: `/sectors/${id}`,
            method: 'GET'
          }
        }
      }), 
      createIndustry: builder.mutation({
        invalidatesTags: ['Users'],
        query: ({industryName, sectorId}: IndustryDto) => {
          return {  
            url: '/industries',
            method: 'POST',
            body: {
              industryName: industryName,
              sectorId: sectorId 
            }
          }
        }
    }),
    addPosition: builder.mutation({
      invalidatesTags: ['Users'],
      query: ({symbol, sharesOwned}: IPosition) => {
        return {  
          url: '/positions/add-position',
          method: 'POST',
          body: {
            symbol: symbol,
            sharesOwned: sharesOwned
          }
        }
      }
    }),
    addPositions: builder.mutation({
      invalidatesTags: ['Users'],
      query: (parsedCsvPositions: ParsedCsvPosition[]) => {
        return {  
          url: '/positions/add-positions',
          method: 'POST',
          body: parsedCsvPositions
        }
      }
    }),
    updatePosition: builder.mutation({
      invalidatesTags: ['Users'],
      query: ({id, newSectorId, newIndustryId, oldSectorId, oldIndustryId, sellPrice}: IUpdatePosition ) => {
        return {
          url: `/positions/update/${id}`,
          method: 'PUT',
          body: {
            newSectorId: newSectorId,
            positionId: id,
            newIndustryId: newIndustryId,
            oldSectorId: oldSectorId,
            oldIndustryId: oldIndustryId
          }
        }
        }
      }),
    fetchPositions: builder.query<IPosition[], void>({
      providesTags: ['Users'],
      query: () => {
        return {  
          url: '/positions',
          method: 'GET'
        }
      }
    })
  }
  } 
});

export const { useFetchUserQuery, useCreateSectorMutation, useCreateIndustryMutation, useFetchPositionsQuery, useAddPositionMutation, useAddPositionsMutation, useUpdatePositionMutation, useFetchSectorQuery } = stockApi;
export {stockApi};




