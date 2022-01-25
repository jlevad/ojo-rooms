import { createSlice } from '@reduxjs/toolkit';

const hotelsSlice = createSlice({
  name: 'hotels',
  initialState: {
    hotels: [],
    loadingHotels: false,
    error: false,
  },
  reducers: {
    loadHotelsStart: (state) => {
      state.loadingHotels = true;
    },
    loadHotelsSuccess: (state, action) => {
      state.loadingHotels = false;
      state.error = false;
      state.hotels = action.payload;
    },
    loadHotelsFailure: (state) => {
      state.loadingHotels = false;
      state.error = true;
    },
  },
});


export const { loadHotelsStart, loadHotelsSuccess, loadHotelsFailure, hotels } =
  hotelsSlice.actions;
export default hotelsSlice.reducer;
