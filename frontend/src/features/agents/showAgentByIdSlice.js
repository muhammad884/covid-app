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

// @desc get agent by id
export const getAgentById = createAsyncThunk(
  "admin/getAgentById",
  async (id, thunkAPI) => {
    try {
      const res = await AgentsService.getAgentById(id);
      // console.log(res);
      return res;
    } catch (err) {
      console.log(err);
      const message = err.response.data.msg;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const showAgentByIdSlice = createSlice({
  name: "showAgentById",
  initialState,
  reducers: {
    reset: (state) => {
      state.agent = {
        id: "",
        name: "",
        email: "",
        city: "",
        state: false,
      };
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAgentById.fulfilled, (state, action) => {
      state.agent = {
        id: action.payload.id,
        name: action.payload.name,
        email: action.payload.email,
        city: action.payload.city,
        state: action.payload.state,
      };
      state.isError = false;
      state.message = "";
    });
    builder.addCase(getAgentById.rejected, (state, action) => {
      state.agent = null;
      state.isError = true;
      state.message = action.payload;
    });
  },
});
const { reducer } = showAgentByIdSlice;
export default reducer;
