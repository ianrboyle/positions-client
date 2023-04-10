import { createSlice } from '@reduxjs/toolkit'
import { IPosition } from '../../models/position.model';


const positionSlice = createSlice({
  name: 'positions',
  initialState: {
    searchTerm: '',
    positions: []
  },
  reducers: {
    changeSearchTerm(state, action) {
      state.searchTerm = action.payload
    },
    addPosition(state: any, action){
      if (state.positions === undefined){
        state.positions  = []
      }
      state.positions?.push({
        symbol: action.payload?.symbol,
        sharesOwned: action.payload?.sharesOwned,
        id: new Date().toISOString()
      });
    },
    removePosition(state: any, action) {
      const updatedPosiitions = state.positions.filter((p: IPosition) => {
        return p.id !== action.payload
      })
      state.positions = updatedPosiitions;
    }
  }
})

export const { changeSearchTerm, addPosition, removePosition} = positionSlice.actions;
export const positionReducer = positionSlice.reducer;