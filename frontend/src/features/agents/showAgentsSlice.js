import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AgentsService from "./showAgentsService";
const initialState = {
  agents: [
    {
      id: "",
      name: "",
      email: "",
      city: "",
      state: false,
    },
  ],
  isError: false,
  message: "",
  isAuthenticated: false,
};

// @desc get all agents
export const getAgents = createAsyncThunk(
  "admin/getAgents",
  async (admin, thunkAPI) => {
    try {
      const res = await AgentsService.getAgents(admin);
      return res;
    } catch (err) {
      console.log(err);
      const message = err.response.data.msg;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const showAgentsSlice = createSlice({
  name: "showAgents",
  initialState,
  reducers: {
    reset: (state) => {
      state.agents = [];
      state.isError = false;
      state.message = "";
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAgents.fulfilled, (state, action) => {
      state.agents = action.payload;
      state.isError = false;
      state.message = "";
      state.isAuthenticated = true;
    });
    builder.addCase(getAgents.rejected, (state, action) => {
      state.isError = true;
      state.message = action.payload;
      state.isAuthenticated = false;
    });
  },
});
const { reducer } = showAgentsSlice;
export default reducer;
