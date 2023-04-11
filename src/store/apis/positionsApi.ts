import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


const positionsApi = createApi({
  reducerPath: 'positions',
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
      fetchPositions: builder.query({
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

export const { useFetchPositionsQuery } = positionsApi;
export {positionsApi};




