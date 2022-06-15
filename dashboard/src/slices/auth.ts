import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "../api";
import { Auth, IUser } from "../interfaces";
import { AppDispatch, RootState } from "../store";

interface AuthState {
  auth: null | Auth;
}
const initialState: AuthState = {
  auth: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    onLogin: (state, action: PayloadAction<any>) => {
      state.auth = action.payload;
    },
    onUserUpdate: (state, action: PayloadAction<IUser>) => {
      (state.auth as Auth).user = action.payload;
    },
  },
});
const { onLogin, onUserUpdate } = authSlice.actions;

export const login =
  (loginProps: { email: string; password: string }) =>
  async (dispatch: AppDispatch) => {
    const {
      data: { data },
    } = await axios.post("/public/login", loginProps);
    dispatch(onLogin(data));
    localStorage.setItem("token", data.token);
  };

export const logout = () => async (dispatch: AppDispatch) => {
  localStorage.removeItem("token");
  window.location.href = "/";
};

export const updateUser = (data: IUser) => async (dispatch: AppDispatch) => {
  dispatch(onUserUpdate(data));
};

export const init = () => async (dispatch: AppDispatch) => {
  try {
    const {
      data: { data },
    } = await axios.get("/user/login-response");
    dispatch(onLogin(data));
  } catch (error: any) {
    /**
     * If error message is sent from server
     */
    if (error.response.data) dispatch(logout());
  }
};

export const selectAuth = (state: RootState) => state.auth.auth;
export const selectUser = (state: RootState) => state.auth.auth?.user as IUser;

export default authSlice.reducer;
