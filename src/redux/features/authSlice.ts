import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";

interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  username: string | null;
  userId: string | null;
  email: string | null;
  loading: boolean;
}

const initialState: AuthState = {
  isAuthenticated: false,
  token: null,
  username: null,
  userId: null,
  email: null,
  loading: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(
      state,
      action: PayloadAction<{
        token: string;
        username: string;
        userId: string;
      }>
    ) {
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.username = action.payload.username;
      state.userId = action.payload.userId;
      state.loading = false;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.token = null;
      state.username = null;
      state.loading = false;
    },
    getUser(state) {
      return state;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
  },
});

export const { setUser, logout, getUser, setLoading } = authSlice.actions;
export const selectIsAuthenticated = (state: RootState) =>
  state.auth.isAuthenticated;
export const selectIsAuthLoading = (state: RootState) => state.auth.loading;
export default authSlice.reducer;
