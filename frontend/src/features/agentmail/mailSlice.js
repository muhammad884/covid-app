import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AgentMailService from "./mailServices";

const initialState = {
  email: "",
};

export const sendMail = createAsyncThunk(
  "agentmail/sendMail",
  async (email, thunkAPI) => {
    try {
      const res = await AgentMailService.sendMail(email);
      return res;
    } catch (err) {
      const message = err.response.data.msg;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const sendEmailSlice = createSlice({
  name: "agentmail",
  initialState,
  reducers: {
    reset: (state) => {
      state.email = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(sendMail.fulfilled, (state, action) => {
      state.email = action.payload;
    });
  },
});

const { reducer } = sendEmailSlice;
export default reducer;
