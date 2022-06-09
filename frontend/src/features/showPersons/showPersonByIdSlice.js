import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import personsServices from "./showPersonsServices";

const initialState = {
  person: {},
  error: false,
  message: "",
};

// @desc get person by id
export const getPersonById = createAsyncThunk(
  "showPersons/getPersonById",
  async (id, thunkAPI) => {
    try {
      const res = await personsServices.getPersonById(id);
      return res;
    } catch (err) {
      const message = err.response.data.msg;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const showPersonSlice = createSlice({
  name: "showPerson",
  initialState,
  reducers: {
    reset: (state) => {
      state.person = {};
      state.error = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getPersonById.fulfilled, (state, action) => {
      state.person = action.payload;
      state.error = false;
      state.message = "";
    });
    builder.addCase(getPersonById.rejected, (state, action) => {
      state.error = true;
      state.message = action.payload;
    });
  },
});

const { actions, reducer } = showPersonSlice;
export const { reset } = actions;
export default reducer;
