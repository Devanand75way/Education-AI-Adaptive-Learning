import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { api } from "../../services/api";

interface AuthState {
  accessToken: string;
  refreshToken: string;
  isAuthenticated: boolean;
  loading: boolean;
  userId: string;
}

const initialState: AuthState = {
  accessToken: localStorage.getItem("accesstoken") ?? "",
  refreshToken: localStorage.getItem("refreshtoken") ?? "",
  isAuthenticated: Boolean(localStorage.getItem("token")),
  loading: false,
  userId: "",
};
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setTokens: (state, action: PayloadAction<{ accessToken: string }>) => {
      localStorage.setItem("token", action.payload.accessToken);
      state.accessToken = action.payload.accessToken;
      state.isAuthenticated = true;
    },
    resetToken: (state) => {
      localStorage.removeItem("token");
      state.accessToken = "";
      state.isAuthenticated = false;
    },
    logout: (state) => {
      localStorage.removeItem("token");
      state.accessToken = "";
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(api.endpoints.login.matchPending, (state) => {
        state.loading = true;
      })
      .addMatcher(api.endpoints.login.matchFulfilled, (state, action) => {
        console.log(action)
        localStorage.setItem("token", action.payload.data.accessToken);
        state.accessToken = action.payload.data.accessToken;
        state.isAuthenticated = true;
        state.loading = false;
      })
      .addMatcher(api.endpoints.login.matchRejected, (state) => {
        state.accessToken = "";
        state.isAuthenticated = false;
        state.loading = false;
      })
      .addMatcher(api.endpoints.logout.matchFulfilled, (state) => {
        localStorage.removeItem("token");
        state.accessToken = "";
        state.isAuthenticated = false;
        state.loading = false;
      });
  },
});

export const { setTokens, resetToken, setLoading } = authSlice.actions;
export default authSlice.reducer;