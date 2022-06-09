import personTravelModel from "../models/PersonTravel.js";
import personModel from "../models/Person.js";
import agentModel from "../models/Agent.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// @route  POST api/person/travel
// @desc   Register person travel
// @access Public
const registerTravel = async (req, res) => {
  try {
    // @desc get person_uid from request
    // const { person_uid } = req.params;
    // @desc get agent_uid from token
    const { authorization } = req.headers;
    const token = authorization.split(" ")[1];
    const decoded_token = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const agent_uid = decoded_token.agent.id;
    // console.log(agent_uid);
    const {
      person_uid,
      traveling_from_city,
      traveling_to_city,
      traveling_from_date,
      traveling_to_date,
    } = req.body;

    // Simple validation
    if (
      !person_uid ||
      !agent_uid ||
      !traveling_from_city ||
      !traveling_to_city ||
      !traveling_from_date ||
      !traveling_to_date
    ) {
      return res.status(400).json({ msg: "Please enter all fields" });
    }

    // Check for existing person
    const existingPersonTravel = await personTravelModel.findOne({
      _id: person_uid,
    });
    if (existingPersonTravel) {
      return res.status(400).json({ msg: "Person already exists" });
    }

    // Create person travel
    const newPersonTravel = new personTravelModel({
      person_uid,
      agent_uid,
      traveling_from_city,
      traveling_to_city,
      traveling_from_date,
      traveling_to_date,
    });

    // Save person travel
    await newPersonTravel.save();
    res.json(newPersonTravel);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error in registerTravel");
  }
};

export default registerTravel;

// @desc show person travel by person_uid
const getPersonTravelByPersonUid = async (req, res) => {
  try {
    const { person_uid } = req.params;
    const personTravel = await personTravelModel.find({ person_uid });
    res.json(personTravel);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error in getPersonTravelByPersonUid");
  }
};

export { getPersonTravelByPersonUid };
