import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AgentRegisterService from "./agentRegisterServices";

const initialState = {
  agent: {
    name: "",
    email: "",
    password: "",
    city: "",
  },
  isError: false,
  message: "",
  isAuthenticated: false,
};

export const registerAgent = createAsyncThunk(
  "agent/register",
  async (agent, thunkAPI) => {
    try {
      const res = await AgentRegisterService.registerAgent(agent);
      return res;
    } catch (err) {
      console.log(err);
      const message = err.response.data.msg;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const agentRegisterSlice = createSlice({
  name: "agentRegister",
  initialState,
  reducers: {
    reset: (state) => {
      state.agent = {
        name: "",
        email: "",
        password: "",
        city: "",
      };
      state.isError = false;
      state.message = "";
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerAgent.fulfilled, (state, action) => {
      state.isError = false;
      state.message = "";
      state.isAuthenticated = true;
    });
    builder.addCase(registerAgent.rejected, (state, action) => {
      state.isError = true;
      state.message = action.payload;
      state.isAuthenticated = false;
    });
  },
});

const { reducer } = agentRegisterSlice;
export default reducer;
