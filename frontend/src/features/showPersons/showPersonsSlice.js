import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import personsServices from "./showPersonsServices";

const initialState = {
  persons: [],
  error: false,
  message: "",
};

// @desc get all persons of current agent
export const getPersons = createAsyncThunk(
  "showPersons/getPersons",
  async (agent, thunkAPI) => {
    try {
      const res = await personsServices.getPersons(agent);
      return res;
    } catch (err) {
      const message = err.response.data.msg;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const showPersonsSlice = createSlice({
  name: "showPersons",
  initialState,
  reducers: {
    reset: (state) => {
      state.persons = [];
      state.error = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getPersons.fulfilled, (state, action) => {
      state.persons = action.payload;
      state.error = false;
      state.message = "";
    });
    builder.addCase(getPersons.rejected, (state, action) => {
      state.error = true;
      state.message = action.payload;
    });
  },
});

const { actions, reducer } = showPersonsSlice;
export const { reset } = actions;
export default reducer;
