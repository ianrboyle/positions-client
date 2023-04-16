import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IPosition } from '../../models/position.model';


const positionsApi = createApi({
  reducerPath: 'positions',
  tagTypes: ['Positions'],
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

export const { useFetchPositionsQuery, useAddPositionMutation } = positionsApi;
export {positionsApi};




