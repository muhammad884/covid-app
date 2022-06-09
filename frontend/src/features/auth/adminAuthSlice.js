import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AuthServices from "./authService";

const admin = localStorage.getItem("admin");
const initialState = admin
  ? {
      token: null,
      isError: false,
      message: "",
      isAuthenticated: true,
    }
  : {
      token: null,
      isError: true,
      message: "",
      isAuthenticated: false,
    };
// @desc admin login
export const adminLogin = createAsyncThunk(
  "auth/adminLogin",
  async ({ email, password }, thunkAPI) => {
    try {
      const res = await AuthServices.adminLogin(email, password);
      return res.token;
    } catch (err) {
      const message = err.response.data.msg;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// @desc admin logout
export const adminLogout = createAsyncThunk(
  "auth/logout",
  async (admin, thunkAPI) => {
    try {
      const res = await AuthServices.adminLogout(admin);
      return res;
    } catch (err) {
      const message = err.response.data.msg;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const adminAuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.token = "";
      state.isAuthenticated = false;
      state.esError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(adminLogin.fulfilled, (state, action) => {
      state.token = action.payload;
      state.isAuthenticated = true;
      state.isError = false;
      state.message = "";
    });
    builder.addCase(adminLogin.rejected, (state, action) => {
      state.message = action.payload;
      state.token = "";
      state.isError = true;
      state.isAuthenticated = false;
    });
    builder.addCase(adminLogout.fulfilled, (state, action) => {
      state.isAuthenticated = false;
      state.token = "";
    });
    builder.addCase(adminLogout.rejected, (state, action) => {
      state.message = action.payload;
      state.isError = true;
    });
  },
});
// export default adminAuthSlice.reducer;
const { reducer } = adminAuthSlice;
export default reducer;
