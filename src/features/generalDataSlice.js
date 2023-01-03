import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  generalData: {},
}

const generalDataSlice = createSlice({
  name: 'generalData',
  initialState,
  reducers: {
    addGeneralData: (state, action) => {
      state.generalData = action.payload
    },
  },
})
export const { addGeneralData } = generalDataSlice.actions
export default generalDataSlice.reducer
