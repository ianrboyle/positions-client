import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IPosition } from '../../models/position.model';
import { MemberDto } from '../../models/member.model';


const userApi = createApi({
  reducerPath: 'user',
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
        query: () => {
          return {  
            url: '/users',
            method: 'GET'
          }
        }
      })
    }
  } 
});

export const { useFetchUserQuery } = userApi;
export {userApi};




