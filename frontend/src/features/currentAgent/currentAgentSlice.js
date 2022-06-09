import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import CurrentAgentServices from "./currentAgentServices";

const agent = localStorage.getItem("agent");
const initialState = {
  agent: {
    id: "",
    name: "",
    email: "",
    city: "",
  },
  message: null,
  error: null,
};

// @desc get current agent
export const getCurrentAgent = createAsyncThunk(
  "currentAgent/getCurrentAgent",
  async (agent, thunkAPI) => {
    try {
      const res = await CurrentAgentServices.getCurrentAgent(agent);
      return res.agent;
    } catch (err) {
      const message = err.response.data.msg;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const currentAgentSlice = createSlice({
  name: "currentAgent",
  initialState,
  reducers: {
    reset: (state) => {
      state.agent = {
        id: agent.id,
        name: agent.name,
        email: agent.email,
        city: agent.city,
      };
      state.isAgentAuthenticated = false;
      state.error = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCurrentAgent.fulfilled, (state, action) => {
      state.agent = {
        id: action.payload.id,
        name: action.payload.name,
        email: action.payload.email,
        city: action.payload.city,
      };
      state.isAgentAuthenticated = true;
      state.error = false;
    });
    builder.addCase(getCurrentAgent.rejected, (state, action) => {
      state.agent = {};
      state.error = true;
      state.message = action.payload;
    });
  },
});

const { reducer } = currentAgentSlice;
export default reducer;
