import { configureStore} from '@reduxjs/toolkit'
import { IPosition } from '../models/position.model';

import { positionsApi, useFetchPositionsQuery } from './apis/positionsApi';
import { setupListeners } from '@reduxjs/toolkit/dist/query';

export interface IPositionsState {
  positions: IPosition[]
}
const store = configureStore({
  reducer: {
    [positionsApi.reducerPath]: positionsApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(positionsApi.middleware),

});

setupListeners(store.dispatch)
export {
  store,
  useFetchPositionsQuery
}