import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: {
      username: '',
      firstName: '',
      lastName: '',
      email: '',
      gender: '',
    },
    loading: false,
    error: false,
  },
  reducers: {
    loginStart: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.error = false;
      state.user = action.payload;
    },
    loginFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
    logout: (state) => {
      state.loading = false;
      state.user = {
        username: '',
        firstName: '',
        lastName: '',
        email: '',
        gender: '',
      };
      state.error = false;
    },
    updateUser: (state, action) => {
      state.user = action.payload;
    },
  },
});


export const { loginStart, loginSuccess, loginFailure, logout, updateUser } =
  userSlice.actions;
export default userSlice.reducer;
