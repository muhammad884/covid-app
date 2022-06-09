import mangoose from "mongoose";

const personSchema = new mangoose.Schema({
  agent_uid: String,
  uid: String,
  first_name: String,
  last_name: String,
  cnic: String,
  perm_address: {
    line_1: String,
    line_2: String,
    zip_code: Number,
    city: String,
  },
  symptoms: [],
  diagnosed_with_covid: Date | null,
  recovered: Date | null,
  date_of_death: Date | null,
});

const personModel = mangoose.model("person", personSchema);
export default personModel;
