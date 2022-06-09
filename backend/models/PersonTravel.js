import mongoose from "mongoose";

const personTravelSchema = new mongoose.Schema({
  uid: String,
  person_uid: String,
  agent_uid: String,
  traveling_from_city: String,
  traveling_to_city: String,
  traveling_from_date: Date | null,
  traveling_to_date: Date | null,
});

const personTravelModel = mongoose.model("person_travel", personTravelSchema);
export default personTravelModel;
