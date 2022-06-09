import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AgentsService from "./showAgentsService";

const initialState = {
  agent: {
    id: "",
    name: "",
    email: "",
    city: "",
    state: false,
  },
  isError: false,
  message: "",
};

// @desc update agent by id
export const updateAgent = createAsyncThunk(
  "admin/updateAgent",
  async (data, thunkAPI) => {
    try {
      const res = await AgentsService.updateAgent(data);

      return res;
    } catch (err) {
      console.log(err);
      const message = err.response.data.msg;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateAgentSlice = createSlice({
  name: "updateAgent",
  initialState,
  reducers: {
    reset: (state) => {
      state.agent = {
        state: false,
      };
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(updateAgent.fulfilled, (state, action) => {
      state.agent = {
        state: action.payload.state,
      };
      state.isError = false;
      state.message = action.payload.msg;
    });

    builder.addCase(updateAgent.rejected, (state, action) => {
      state.isError = true;
      state.message = action.payload;
    });
  },
});

const { reducer } = updateAgentSlice;
export default reducer;
