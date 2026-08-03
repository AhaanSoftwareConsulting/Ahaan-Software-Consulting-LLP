import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginAPI, registerAPI, profileAPI, logoutAPI } from "../../Api/api";

// LOGIN
export const loginUser = createAsyncThunk(
  "user/login",
  async (data, { rejectWithValue }) => {
    try {
      const res = await loginAPI(data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  },
);

// REGISTER
export const registerUser = createAsyncThunk(
  "user/register",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await registerAPI(formData);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  },
);

// GET PROFILE
export const getProfile = createAsyncThunk(
  "user/profile",
  async (_, { rejectWithValue }) => {
    try {
      const res = await profileAPI();
      return res.data;
    } catch (err) {
      return rejectWithValue("Unauthorized");
    }
  },
);

// LOGOUT
export const logoutUser = createAsyncThunk("user/logout", async () => {
  await logoutAPI();
  return null;
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: JSON.parse(localStorage.getItem("user")) || null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      // ================= LOGIN =================
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;

        state.user = {
          token: action.payload.token,
          ...action.payload.user,
        };

        localStorage.setItem("user", JSON.stringify(state.user));
      })

      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ================= REGISTER =================
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
        state.error = null;

        // ❌ Register এর পরে user login হবে না
        // তাই localStorage বা state.user update করা হবে না
      })

      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ================= PROFILE =================
      .addCase(getProfile.fulfilled, (state, action) => {
        state.user = action.payload.user;
      })

      // ================= LOGOUT =================
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.error = null;
        localStorage.removeItem("user");
      });
  },
});

export default userSlice.reducer;
