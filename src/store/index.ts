import { configureStore} from '@reduxjs/toolkit'
import { IPosition } from '../models/position.model';

// import { positionsApi, useFetchPositionsQuery, useAddPositionMutation, useAddPositionsMutation, useUpdatePositionMutation } from './apis/positionsApi';
// import { userApi, useFetchUserQuery } from './apis/userApi';
// import { sectorsApi, useCreateSectorMutation, useCreateIndustryMutation } from './apis/sectorsApi';
import { stockApi, useCreateSectorMutation, useCreateIndustryMutation, useFetchPositionsQuery, useAddPositionMutation, useAddPositionsMutation, useUpdatePositionMutation, useFetchUserQuery, useFetchSectorQuery, useFetchIndustryQuery } from './apis/stocksAppApi';
import { setupListeners } from '@reduxjs/toolkit/dist/query';

export interface IPositionsState {
  positions: IPosition[]
}
const store = configureStore({
  reducer: {
    // [positionsApi.reducerPath]: positionsApi.reducer,
    // [userApi.reducerPath]: userApi.reducer,
    // [sectorsApi.reducerPath]: sectorsApi.reducer
    [stockApi.reducerPath]: stockApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(stockApi.middleware)
    // .concat(userApi.middleware).concat(sectorsApi.middleware)

});

setupListeners(store.dispatch)
export {
  store,
  useFetchPositionsQuery,
  useFetchUserQuery,
  useAddPositionMutation,
  useAddPositionsMutation,
  useUpdatePositionMutation,
  useCreateSectorMutation, 
  useCreateIndustryMutation,
  useFetchSectorQuery, 
  useFetchIndustryQuery
}