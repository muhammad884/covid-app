import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import travelServices from "./travelServices";

const initialState = {
  travel: [],
  message: null,
  error: null,
};

export const getTravel = createAsyncThunk(
  "getTravel/getTravel",
  async (person_uid, thunkAPI) => {
    try {
      const res = await travelServices.getPersonTravels(person_uid);
      return res;
    } catch (err) {
      console.log(err);
      const message = err.response.data.msg;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getTravelSlice = createSlice({
  name: "getTravel",
  initialState,
  reducers: {
    reset: (state) => {
      state.travel = [];
      state.message = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getTravel.fulfilled, (state, action) => {
      state.travel = action.payload;
      state.error = null;
      state.message = "";
    });
    builder.addCase(getTravel.rejected, (state, action) => {
      state.message = null;
      state.error = action.payload;
    });
  },
});

const { actions, reducer } = getTravelSlice;
export const { reset } = actions;
export default reducer;
