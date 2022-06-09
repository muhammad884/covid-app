import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import addPeresonServices from "./addPersonServices";

const agent = localStorage.getItem("agent");
const initialState = {
  person: {
    first_name: "",
    last_name: "",
    cnic: "",
    perm_address: {
      line_1: "",
      line_2: "",
      zip_code: "",
      city: "",
    },
    symptoms: [],
    diagnosed_with_covid: "",
    recovered: "",
    date_of_death: "",
    agent_uid: agent,
  },
  message: null,
  error: null,
};

export const addPerson = createAsyncThunk(
  "addPerson/addPerson",
  async (person, thunkAPI) => {
    try {
      const res = await addPeresonServices.addPerson(person);
      return res;
    } catch (err) {
      console.log(err);
      const message = err.response.data.msg;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const addPersonSlice = createSlice({
  name: "addPerson",
  initialState,
  reducers: {
    reset: (state) => {
      state.person = {
        first_name: "",
        last_name: "",
        cnic: "",
        perm_address: {
          line_1: "",
          line_2: "",
          zip_code: "",
          city: "",
        },
        symptoms: [],
        diagnosed_with_covid: "",
        recovered: "",
        date_of_death: "",
        agent_uid: agent,
      };
      state.message = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addPerson.fulfilled, (state, action) => {
      state.message = "Person added successfully";
      state.error = null;
    });
    builder.addCase(addPerson.rejected, (state, action) => {
      state.error = action.payload;
      state.message = null;
    });
  },
});

const { reducer } = addPersonSlice;
export default reducer;
