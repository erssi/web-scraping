import { createSlice } from '@reduxjs/toolkit';

import { Auth } from './types';

const initialState: Partial<Auth> = {
  token: localStorage.getItem('accessToken'),
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken(state, action: any) {
      const payload = action.payload;
      state.token = payload;
    },
    setUserData(state, action) {
      const payload = action.payload;
      if (payload) {
        state.user = { ...state.user, ...payload };
      }
    },
    onLogout(state: any) {
      state.user = null;
    },
  },
});

export const { setToken, setUserData, onLogout } = authSlice.actions;
export default authSlice.reducer;
