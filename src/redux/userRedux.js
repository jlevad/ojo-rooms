import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: {
      id_user: '',
      firstname: '',
      lastname: '',
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
      delete action?.payload?.password;
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
        id_user: '',
        firstname: '',
        lastname: '',
        email: '',
        gender: '',
      };
      state.error = false;
    },
  },
});


export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
} = userSlice.actions;
export default userSlice.reducer;
