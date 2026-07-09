import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type AuthState = {
  token: string | null;
  user: { id: string; email: string; full_name?: string | null } | null;
  loading: boolean;
  error: string | null;
};

const initialState: AuthState = {
  token: null,
  user: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setAuthError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setAuthUser: (state, action: PayloadAction<{ token: string; user: AuthState['user'] }>) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.loading = false;
      state.error = null;
    },
    clearAuthUser: (state) => {
      state.token = null;
      state.user = null;
      state.loading = false;
      state.error = null;
    },
  },
});

export const { setAuthLoading, setAuthError, setAuthUser, clearAuthUser } = authSlice.actions;
export default authSlice.reducer;
