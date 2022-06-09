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

export const deleteAgent = createAsyncThunk(
  "admin/deleteAgent",
  async (id, thunkAPI) => {
    try {
      const res = await AgentsService.deleteAgent(id);
      console.log(res);
      return res;
    } catch (err) {
      console.log(err);
      const message = err.response.data.msg;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteAgentSlice = createSlice({
  name: "deleteAgent",
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
    builder.addCase(deleteAgent.fulfilled, (state, action) => {
      state.agent = {
        state: action.payload.state,
      };
      state.isError = false;
      state.message = "";
    });
    builder.addCase(deleteAgent.rejected, (state, action) => {
      state.isError = true;
      state.message = action.payload;
    });
  },
});

const { reducer } = deleteAgentSlice;
export default reducer;
