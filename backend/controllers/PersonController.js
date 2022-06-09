import personModel from "../models/Person.js";
import agentModel from "../models/Agent.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const personRegister = async (req, res) => {
  try {
    const { authorization } = req.headers;
    const token = authorization.split(" ")[1];
    const decoded_token = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const agent = await agentModel.findById(decoded_token.agent.id);
    const agent_uid = agent._id;

    const {
      // agent_uid,
      uid,
      first_name,
      last_name,
      cnic,
      perm_address,
      symptoms,
      diagnosed_with_covid,
      recovered,
      date_of_death,
    } = req.body;

    // @desc validat empty fields
    if (
      !first_name ||
      !last_name ||
      !cnic ||
      !perm_address ||
      !symptoms ||
      !diagnosed_with_covid ||
      !recovered
    ) {
      return res.status(400).json({
        msg: "Please fill all the fields",
      });
    }
    // Check for existing person
    const existingPerson = await personModel.findOne({ cnic });
    if (existingPerson) {
      return res.status(400).json({ msg: "Person already exists" });
    }

    // Create person
    const newPerson = new personModel({
      agent_uid,
      uid,
      first_name,
      last_name,
      cnic,
      perm_address,
      symptoms,
      diagnosed_with_covid,
      recovered,
      date_of_death,
    });

    // Hash password
    // const salt = await bcrypt.genSalt(10);
    // newPerson.password = await bcrypt.hash(password, salt);
    // Save person
    await newPerson.save();

    // Return jsonwebtoken
    // const payload = {
    //   person: {
    //     id: newPerson.id,
    //   },
    // };

    // jwt.sign(
    //   payload,
    //   process.env.JWT_SECRET_KEY,
    //   {
    //     expiresIn: 360000,
    //   },
    //   (err, token) => {
    //     if (err) throw err;
    //     res.json({ token });
    //   }
    // );
    res.json(newPerson);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error register person");
  }
};
export default personRegister;

// @desc get all persons to agent by agent_uid
// const getPersonsByAgentUid = async (req, res) => {
//   try {
//     const { authorization } = req.headers;
//     const token = authorization.split(" ")[1];
//     const decoded_token = jwt.verify(token, process.env.JWT_SECRET_KEY);
//     const agent = await agentModel.findById(decoded_token.agent.id);
//     const agent_uid = agent._id;
//     const persons = await personModel.find({ agent_uid });
//     res.json(persons);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Token Server Error in get persons by agent_uid");
//   }
// };
// export { getPersonsByAgentUid };

// // @desc get person by id
// const getPersonById = async (req, res) => {
//   try {
//     // const { authorization } = req.headers;
//     // const token = authorization.split(" ")[1];
//     const getToken = req.body.headers.authorization;
//     const token = getToken.split(" ")[1];
//     const decoded_token = jwt.verify(token, process.env.JWT_SECRET_KEY);
//     const agent = await agentModel.findById(decoded_token.agent.id);
//     const agent_uid = agent._id;
//     const { id } = req.params;
//     console.log(id);
//     console.log(agent_uid);
//     const person = await personModel.findOne({ _id: id, agent_uid });
//     res.json(person);
//   } catch (err) {
//     console.log(id);
//     console.log(agent_uid);
//     console.log(err);
//     console.error(err.message);
//     res.status(500).send("Token Server Error in get person by id");
//   }
// };
// export { getPersonById };

// const getPersonById = async (req, res) => {
//   try {
//     const { authorization } = req.headers;
//     const token = authorization.split(" ")[1];
//     const decoded_token = jwt.verify(token, process.env.JWT_SECRET_KEY);
//     const agent = await agentModel.findById(decoded_token.agent.id);
//     const agent_uid = agent._id;
//     const person = await personModel.findOne({ _id: id, agent_uid });
//     res.json(person);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Token Server Error in get person by id");
//   }
// };
// export { getPersonById };
