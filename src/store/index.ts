import { configureStore} from '@reduxjs/toolkit'
import { positionReducer, addPosition, removePosition, changeSearchTerm } from './slices/positionSlice'

import {formReducer, changeSharesOwned, changeSymbol} from  './slices/positionFormSlice'

const store = configureStore({
  reducer: {
    positions: positionReducer,
    positionForm: formReducer
  }

});

export {
  store,
  changeSearchTerm,
  changeSymbol,
  changeSharesOwned,
  addPosition,
  removePosition
}