import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { AxiosError } from "axios";

// API imports updated to reference userapi
import {
  loginAPI,
  registerAPI,
  profileAPI,
  logoutAPI,
} from "../../Api/userapi";

//
// Types
//

export interface User {
  _id?: string;
  accessToken?: string;
  refreshToken?: string;
  full_name?: string;
  email?: string;
  role?: string;
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

export interface RegisterPayload {
  fullName: string;
  email: string;
  password: string;
  role: string;
}

interface LoginApiResponse {
  accessToken: string;
  refreshToken?: string;
  user?: User;
}

type ProfileApiResponse = User | { user: User };

interface UserState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

const storedUser = localStorage.getItem("user");

const initialState: UserState = {
  user: storedUser ? JSON.parse(storedUser) : null,
  loading: false,
  error: null,
};

//
// LOGIN
//

export const loginUser = createAsyncThunk<
  LoginApiResponse,
  LoginPayload,
  { rejectValue: string }
>(
  "user/login",
  async (data, { dispatch, rejectWithValue }) => {
  try {
    const res = await loginAPI(data);
    const tokens = res.data;

    localStorage.setItem(
      "user",
      JSON.stringify({
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
      })
    );

    await dispatch(getProfile());
    return tokens;
  }  catch (error) {
      const err = error as AxiosError<{ message?: string }>;

      return rejectWithValue(
        err.response?.data?.message ?? "Login failed"
      );
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

export const logoutUser = createAsyncThunk(
  "user/logout",
  async () => {
    try {
      await logoutAPI();
    } catch {
      // Proceed with clearing local state even if server logout fails
    }
    return null;
  }
);

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
      localStorage.removeItem("user");
    },
  },

  extraReducers: (builder) => {
    builder

      // LOGIN

      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

     .addCase(
  loginUser.fulfilled,
  (state, action: PayloadAction<LoginApiResponse>) => {
    state.loading = false;
    state.error = null;
    const userObj = action.payload.user || {};
    state.user = {
      ...state.user,
      accessToken: action.payload.accessToken,
      refreshToken: action.payload.refreshToken,
      ...userObj,
    };
    localStorage.setItem("user", JSON.stringify(state.user));
  }
)

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

      .addCase(
        getProfile.fulfilled,
        (state, action: PayloadAction<ProfileApiResponse>) => {
          const profileData =
            "user" in action.payload && action.payload.user
              ? action.payload.user
              : (action.payload as User);

          state.user = {
            ...state.user,
            ...profileData,
          };

          localStorage.setItem("user", JSON.stringify(state.user));
        }
      )

      // LOGOUT

      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.error = null;

        localStorage.removeItem("user");
      });
  },
});

export const { clearUser } = userSlice.actions;

export default userSlice.reducer;