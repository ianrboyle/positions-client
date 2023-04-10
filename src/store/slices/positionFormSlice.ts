import { createSlice } from '@reduxjs/toolkit'

const positionFormSlice = createSlice({
  name: 'positionForm',
  initialState: {
    symbol: '',
    sharesOwned: 0
  },
  reducers: {
    changeSymbol(state, action) {
      state.symbol = action.payload
    },
    changeSharesOwned(state, action) {
      state.sharesOwned = action.payload
    }
  }
});

export const { changeSymbol, changeSharesOwned} = positionFormSlice.actions;
export const formReducer = positionFormSlice.reducer;