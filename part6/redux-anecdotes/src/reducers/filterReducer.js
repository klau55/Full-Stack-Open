import { createSlice } from '@reduxjs/toolkit'

const filterSlice = createSlice({
  name: 'filter',
  initialState: "",
  reducers: {
    change(state, action) {
      const filter = action.payload
      return filter
    }
  }
})

export const { change } = filterSlice.actions
export default filterSlice.reducer
