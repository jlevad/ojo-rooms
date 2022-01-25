import { createSlice } from '@reduxjs/toolkit';

const top5Slice = createSlice({
  name: 'top5',
  initialState: {
    hotelTop5: [],
    loading: false,
    error: false,
  },
  reducers: {
    loadStart: (state) => {
      state.loading = true;
    },
    loadSuccess: (state, action) => {
      state.loading = false;
      state.error = false;
      state.hotelTop5 = action.payload;
    },
    loadFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});


export const { loadStart, loadSuccess, loadFailure, hotelTop5 } =
  top5Slice.actions;
export default top5Slice.reducer;
