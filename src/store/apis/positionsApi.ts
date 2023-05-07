import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IPosition, IUpdatePosition } from '../../models/position.model';
import { ParsedCsvPosition } from '../../models/csv.model';
import SectorPie from '../../sections/@dashboard/app/SectorPie';

const pause = (duration: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, duration)
  })
}
const positionsApi = createApi({
  reducerPath: 'positions',
  tagTypes: ['Positions', 'Users'],
  baseQuery: fetchBaseQuery({ 
    baseUrl: `${process.env.REACT_APP_API_URL}`,
    //REMOVE FOR PROD
    fetchFn: async (...args) => {
      await pause(1000)
      return fetch(...args)
    },
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

      addPosition: builder.mutation({
        invalidatesTags: ['Positions'],
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
        invalidatesTags: ['Positions'],
        query: (parsedCsvPositions: ParsedCsvPosition[]) => {
          return {  
            url: '/positions/add-positions',
            method: 'POST',
            body: parsedCsvPositions
          }
        }
      }),
      updatePosition: builder.mutation({
        invalidatesTags: ['Positions', 'Users'],
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
        providesTags: ['Positions'],
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

export const { useFetchPositionsQuery, useAddPositionMutation, useAddPositionsMutation, useUpdatePositionMutation } = positionsApi;
export {positionsApi};




