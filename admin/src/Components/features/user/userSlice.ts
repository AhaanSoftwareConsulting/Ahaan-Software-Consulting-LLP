import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import axios from "axios";
import type { AxiosError } from "axios";
import { setAccessToken } from "../../app/tokenStore";
// API imports updated to reference userapi
import {
  
  loginAPI,
  registerAPI,
  profileAPI,
  logoutAPI,
  BASE_URL
} from "../../Api/userapi";
import { refreshAccessToken } from "../../Api/refreshClient";

//
// Types
//

export interface User {
  _id?: string;
  full_name?: string;
  email?: string;
  role?: string;
  designation?: string;
  status?: string;
  profilePicture?: string;
  createdAt?: string;
  updatedAt?: string;
  // accessToken/refreshToken REMOVED from here
}

interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  fullName: string;
  email: string;
  password: string;
  role: string;
}

interface LoginApiResponse {
  access_token: string; // matches your backend's snake_case
  user?: User;
}

type ProfileApiResponse = User | { user: User };

interface UserState {
  user: User | null;
  loading: boolean;
  error: string | null;
  initialized: boolean; // NEW — tracks whether bootstrap check has finished
}

const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
  initialized: false,
};

// src/Components/features/user/userSlice.ts

export const loginUser = createAsyncThunk<LoginApiResponse, LoginPayload, { rejectValue: string }>(
  "user/login",
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const res = await loginAPI(data);
      // Fix: Check both camelCase and snake_case
      const token = res.data.accessToken || res.data.access_token;
      setAccessToken(token); 
      await dispatch(getProfile());
      return res.data;
    } catch (error) {
      const err = error as AxiosError<{ message?: string }>;
      return rejectWithValue(err.response?.data?.message ?? "Login failed");
    }
  }
);


export const bootstrapSession = createAsyncThunk(
  "user/bootstrap",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      await refreshAccessToken();
      await dispatch(getProfile()).unwrap();
      return true;
    } catch {
      setAccessToken(null);
      return rejectWithValue("No valid session");
    }
  }
);

//
// REGISTER (Now accepts JSON object)
//

export const registerUser = createAsyncThunk<
  unknown,
  RegisterPayload,
  { rejectValue: string }
>(
  "user/register",
  async (data, { rejectWithValue }) => {
    try {
      const res = await registerAPI(data);

      return res.data;
    } catch (error) {
      const err = error as AxiosError<{ message?: string }>;

      return rejectWithValue(
        err.response?.data?.message ?? "Registration failed"
      );
    }
  }
);

//
// PROFILE
//

export const getProfile = createAsyncThunk<
  ProfileApiResponse,
  void,
  { rejectValue: string }
>(
  "user/profile",
  async (_, { rejectWithValue }) => {
    try {
      const res = await profileAPI();

      return res.data;
    } catch {
      return rejectWithValue("Unauthorized");
    }
  }
);

//
// LOGOUT
//
export const logoutUser = createAsyncThunk("user/logout", async () => {
  try {
    await logoutAPI();
  } catch {}
  setAccessToken(null);
  return null;
});

//
// Slice
//

const userSlice = createSlice({
  name: "user",
  initialState,
 reducers: {
    clearUser: (state) => {
      state.user = null;
      state.error = null;
      setAccessToken(null);
    },
  },

  extraReducers: (builder) => {
    builder

     .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = { ...state.user, ...(action.payload.user || {}) };
    
      })
      .addCase(loginUser.pending, (state) => {
  state.loading = true;
  state.error = null;
})
       .addCase(bootstrapSession.fulfilled, (state) => {
        state.initialized = true;
      })
      .addCase(bootstrapSession.rejected, (state) => {
        state.user = null;
        state.initialized = true;
      })

      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Login failed";
      })

      // REGISTER

      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })

      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Registration failed";
      })

      // PROFILE

      .addCase(getProfile.fulfilled, (state, action) => {
        const profileData = "user" in action.payload && action.payload.user ? action.payload.user : action.payload;
        state.user = { ...state.user, ...profileData };
        // no localStorage.setItem
      })
      .addCase(getProfile.rejected, (state) => {
        state.user = null;
      })

      // LOGOUT

      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.error = null;
      
      });
  },
});

export const { clearUser } = userSlice.actions;

export default userSlice.reducer;