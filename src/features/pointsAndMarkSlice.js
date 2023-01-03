import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  classResault: [],
}
const pointsAndMarkSlice = createSlice({
  name: 'pointsAndMark',
  initialState,
  reducers: {
    addClassResault: (state, action) => {
      state.classResault = action.payload
    },
    clearPointsAndMarkArray: (state) => {
      state.classResault = []
    },
  },
})

export const { addClassResault, clearPointsAndMarkArray } =
  pointsAndMarkSlice.actions
export default pointsAndMarkSlice.reducer
