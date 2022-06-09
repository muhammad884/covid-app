import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import travelServices from "./travelServices";

const initialState = {
  travel: {
    person_uid: "",
    traveling_from_city: "",
    traveling_to_city: "",
    traveling_from_date: "",
    traveling_to_date: "",
  },
  message: null,
  error: null,
};

export const addTravel = createAsyncThunk(
  "addTravel/addTravel",
  async (travel, thunkAPI) => {
    try {
      const res = await travelServices.addTravel(travel);
      return res;
    } catch (err) {
      console.log(err);
      const message = err.response.data.msg;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const addTravelSlice = createSlice({
  name: "addTravel",
  initialState,
  reducers: {
    reset: (state) => {
      state.travel = {
        person_uid: "",
        traveling_from_city: "",
        traveling_to_city: "",
        traveling_from_date: "",
        traveling_to_date: "",
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addTravel.fulfilled, (state, action) => {
      state.error = null;
      state.message = "Travel added successfully";
    });
    builder.addCase(addTravel.rejected, (state, action) => {
      state.message = null;
      state.error = action.payload;
    });
  },
});

const { actions, reducer } = addTravelSlice;
export const { reset } = actions;
export default reducer;
