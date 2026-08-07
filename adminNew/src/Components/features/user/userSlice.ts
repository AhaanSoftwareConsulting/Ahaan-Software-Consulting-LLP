import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { AxiosError } from "axios";

import {
  loginAPI,
  registerAPI,
  profileAPI,
  logoutAPI,
} from "../../Api/api";

//
// Types
//

export interface User {
  _id?: string;
  token?: string;
  name: string;
  email: string;
  role: string;
  designation?: string;
  status?: string;
  profilePicture?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface LoginPayload {
  email: string;
  password: string;
}

type RegisterPayload = FormData;

interface LoginResponse {
  token: string;
  user: User;
}

interface ProfileResponse {
  user: User;
}

interface UserState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

const storedUser = localStorage.getItem("user");

const initialState: UserState = {
  user: storedUser
    ? JSON.parse(storedUser)
    : null,
  loading: false,
  error: null,
};

//
// LOGIN
//

export const loginUser = createAsyncThunk<
  LoginResponse,
  LoginPayload,
  { rejectValue: string }
>(
  "user/login",
  async (data, { rejectWithValue }) => {
    try {
      const res = await loginAPI(data);
      return res.data;
    } catch (error) {
      const err = error as AxiosError<any>;

      return rejectWithValue(
        err.response?.data?.message ??
          "Login failed"
      );
    }
  }
);

//
// REGISTER
//

export const registerUser = createAsyncThunk<
  unknown,
  RegisterPayload,
  { rejectValue: string }
>(
  "user/register",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await registerAPI(formData);

      return res.data;
    } catch (error) {
      const err = error as AxiosError<any>;

      return rejectWithValue(
        err.response?.data?.message ??
          "Registration failed"
      );
    }
  }
);

//
// PROFILE
//

export const getProfile = createAsyncThunk<
  ProfileResponse,
  void,
  { rejectValue: string }
>(
  "user/profile",
  async (_, { rejectWithValue }) => {
    try {
      const res = await profileAPI();

      return res.data;
    } catch {
      return rejectWithValue(
        "Unauthorized"
      );
    }
  }
);

//
// LOGOUT
//

export const logoutUser =
  createAsyncThunk(
    "user/logout",
    async () => {
      await logoutAPI();

      return null;
    }
  );

//
// Slice
//

const userSlice = createSlice({
  name: "user",

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder

      // LOGIN

      .addCase(
        loginUser.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        loginUser.fulfilled,
        (
          state,
          action: PayloadAction<LoginResponse>
        ) => {
          state.loading = false;
          state.error = null;

          state.user = {
            token: action.payload.token,
            ...action.payload.user,
          };

          localStorage.setItem(
            "user",
            JSON.stringify(state.user)
          );
        }
      )

      .addCase(
        loginUser.rejected,
        (state, action) => {
          state.loading = false;
          state.error =
            action.payload ?? "Login failed";
        }
      )

      // REGISTER

      .addCase(
        registerUser.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        registerUser.fulfilled,
        (state) => {
          state.loading = false;
          state.error = null;
        }
      )

      .addCase(
        registerUser.rejected,
        (state, action) => {
          state.loading = false;
          state.error =
            action.payload ??
            "Registration failed";
        }
      )

      // PROFILE

      .addCase(
        getProfile.fulfilled,
        (
          state,
          action: PayloadAction<ProfileResponse>
        ) => {
          state.user = action.payload.user;
        }
      )

      // LOGOUT

      .addCase(
        logoutUser.fulfilled,
        (state) => {
          state.user = null;
          state.error = null;

          localStorage.removeItem(
            "user"
          );
        }
      );
  },
});

export default userSlice.reducer;