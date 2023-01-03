import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  taskLevels: {},
}

const levelsDataSlice = createSlice({
  name: 'levels',
  initialState,
  reducers: {
    addTasksLevels: (state, action) => {
      state.taskLevels = action.payload
    },
  },
})

export const { addTasksLevels } = levelsDataSlice.actions
export default levelsDataSlice.reducer
