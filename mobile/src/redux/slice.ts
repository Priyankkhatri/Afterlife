import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type AuthState = {
  isAuthenticated: boolean;
  userName: string;
};

const initialState: AuthState = {
  isAuthenticated: false,
  userName: 'Guest',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<string>) => {
      state.isAuthenticated = true;
      state.userName = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.userName = 'Guest';
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
