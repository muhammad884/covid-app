import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AuthServices from "./authService";

const agent = localStorage.getItem("agent");
const initialState = agent
  ? {
      token: null,
      isError: false,
      message: "",
      isAgentAuthenticated: true,
    }
  : {
      token: null,
      isError: true,
      message: "",
      isAgentAuthenticated: false,
    };

// @desc agent login
export const agentLogin = createAsyncThunk(
  "auth/agentLogin",
  async ({ email, password }, thunkAPI) => {
    try {
      const res = await AuthServices.agentLogin(email, password);
      return res.token;
    } catch (err) {
      const message = err.response.data.msg;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// @desc agent logout
export const agentLogout = createAsyncThunk(
  "auth/logout",
  async (agent, thunkAPI) => {
    try {
      const res = await AuthServices.agentLogout(agent);
      return res;
    } catch (err) {
      const message = err.response.data.msg;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const agentAuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.token = "";
      state.isAgentAuthenticated = false;
      state.esError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(agentLogin.fulfilled, (state, action) => {
      state.token = action.payload;
      state.isAgentAuthenticated = true;
    });

    builder.addCase(agentLogin.rejected, (state, action) => {
      state.isAgentAuthenticated = false;
      state.isError = true;
      state.message = action.payload;
    });

    builder.addCase(agentLogout.fulfilled, (state, action) => {
      state.token = null;
      state.isAgentAuthenticated = false;
    });

    builder.addCase(agentLogout.rejected, (state, action) => {
      state.isAgentAuthenticated = false;
      state.isError = true;
      state.message = action.payload;
    });
  },
});

const { reducer } = agentAuthSlice;
export default reducer;
