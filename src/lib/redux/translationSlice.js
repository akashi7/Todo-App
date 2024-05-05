import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  name: 'translation',
  initialState: { payload: '', darkMode: false },
  reducers: {
    getTranslation: (state, { payload }) => {
      state.payload = payload
    },
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode
      localStorage.setItem('state', state.darkMode)
    },
    toggleInBetween: (state, { payload }) => {
      state.darkMode = payload
      localStorage.setItem('state', state.darkMode)
    },
  },
})

export const { getTranslation, toggleDarkMode, toggleInBetween } = slice.actions
export default slice.reducer
