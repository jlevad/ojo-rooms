import { createSlice } from '@reduxjs/toolkit';

const hotelSlice = createSlice({
  name: 'hotel',
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
    // logout: (state) => {
    //   state.loading = false;
    //   state.hotel = {
    //     city_name: '',
    //     country_name: '',
    //     hotel_name: '',
    //     hotel_description: '',
    //     id_hotel: '',
    //     review: '',
    //     image: '',
    //   };
    //   state.error = false;
    // },
  },
});


export const { loadStart, loadSuccess, loadFailure, hotelTop5 } =
  hotelSlice.actions;
export default hotelSlice.reducer;
