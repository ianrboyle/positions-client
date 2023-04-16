import { configureStore} from '@reduxjs/toolkit'
import { IPosition } from '../models/position.model';

import { positionsApi, useFetchPositionsQuery, useAddPositionMutation } from './apis/positionsApi';
import { userApi, useFetchUserQuery } from './apis/userApi';
import { setupListeners } from '@reduxjs/toolkit/dist/query';

export interface IPositionsState {
  positions: IPosition[]
}
const store = configureStore({
  reducer: {
    [positionsApi.reducerPath]: positionsApi.reducer,
    [userApi.reducerPath]: userApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(positionsApi.middleware).concat(userApi.middleware)

});

setupListeners(store.dispatch)
export {
  store,
  useFetchPositionsQuery,
  useFetchUserQuery,
  useAddPositionMutation
}