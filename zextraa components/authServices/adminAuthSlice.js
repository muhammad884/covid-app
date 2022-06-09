// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import authServices from "./AuthServices";

// const initialState = {
//   token: "",
//   isAuthenticated: false,
//   isLoading: false,
//   error: "",
// };

// // @desc admin login
// export const adminLogin = createAsyncThunk(
//   "admin/login",
//   async (data, thunkAPI) => {
//     try {
//       const res = await authServices.adminLogin(data);
//       return res.data;
//     } catch (err) {
//       console.log(err);
//       const message =
//         (err.response && err.response.data && err.response.data.message) ||
//         err.message ||
//         err.toString();
//       thunkAPI.rejectWithValue(message);
//     }
//   }
// );

// // @desc admin logout
// export const adminLogout = createAsyncThunk(
//   "admin/logout",
//   async (data, thunkAPI) => {
//     try {
//       const res = await authServices.logout(data);
//       return res.data;
//     } catch (err) {
//       const message =
//         (err.response && err.response.data && err.response.data.msg) ||
//         err.msg ||
//         err.toString();
//       thunkAPI.rejectWithValue(message);
//     }
//   }
// );

// export const adminAuthSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     setAdmin: (state, action) => {
//       state.admin = action.payload;
//     },
//   },
//   extraReducers: (builder) => {
//     builder.addCase(adminLogin.pending, (state, action) => {
//       state.admin.loading = true;
//       state.admin.error = null;
//     });
//     builder.addCase(adminLogin.fulfilled, (state, action) => {
//       state.admin.loading = false;
//       state.admin.isAuthenticated = true;
//       state.admin.token = action.payload.token;
//       state.admin.message = action.payload.message;
//     });
//     builder.addCase(adminLogin.rejected, (state, action) => {
//       // state.admin.loading = false;
//       // state.admin.error = action.payload;
//     });
//     builder.addCase(adminLogout.pending, (state, action) => {
//       state.admin.loading = true;
//       state.admin.error = null;
//     });
//     builder.addCase(adminLogout.fulfilled, (state, action) => {
//       state.admin.loading = false;
//       state.admin.isAuthenticated = false;
//       state.admin.token = "";
//       state.admin.message = action.payload.message;
//     });
//     builder.addCase(adminLogout.rejected, (state, action) => {
//       state.admin.loading = false;
//       state.admin.error = action.payload;
//     });
//   },
// });

// export default adminAuthSlice.reducer;
