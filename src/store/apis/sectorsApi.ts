import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IPosition, IUpdatePosition } from '../../models/position.model';
import { ParsedCsvPosition } from '../../models/csv.model';
import SectorPie from '../../sections/@dashboard/app/SectorPie';
import { ISectorDto } from '../../models/member.model';

const pause = (duration: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, duration)
  })
}
const sectorsApi = createApi({
  reducerPath: 'sectors',
  tagTypes: ['Sectors', 'Users'],
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

      createSector: builder.mutation({
        invalidatesTags: ['Sectors'],
        query: ({sectorName}: ISectorDto) => {
          return {  
            url: '/sectors',
            method: 'POST',
            body: {
              sectorName: sectorName 
            }
          }
        }
      })
    }
  } 
});

export const { useCreateSectorMutation } = sectorsApi;
export {sectorsApi};




