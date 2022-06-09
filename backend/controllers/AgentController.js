import agentModel from "../models/Agent.js";
import personModel from "../models/Person.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// @route  POST api/agent/register
// @desc   Register agent
// @access Public
const register = async (req, res) => {
  try {
    const { name, email, password, city } = req.body;

    // Simple validation
    if (!name && !email && !password && !city) {
      return res.status(400).json({ msg: "Please enter all fields" });
    }

    // Check for existing agent
    const existingAgent = await agentModel.findOne({ email });
    if (existingAgent) {
      return res.status(400).json({ msg: "Agent already exists" });
    }

    // Create agent
    const newAgent = new agentModel({
      name,
      email,
      password,
      city,
      activated: false,
    });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    newAgent.password = await bcrypt.hash(password, salt);
    // Save agent
    await newAgent.save();

    // Return jsonwebtoken
    // const payload = {
    //   agent: {
    //     id: newAgent.id,
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
    res.json(newAgent);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Add Agent Server Error");
  }
};
export default register;

// @route  POST api/agent/login
// @desc   Login agent
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Simple validation
    if (!email && !password) {
      return res.status(400).json({ msg: "Please enter all fields" });
    }

    // Check for existing agent
    const existingAgent = await agentModel.findOne({ email });
    if (!existingAgent) {
      return res.status(400).json({ msg: "Agent does not exist" });
    }
    if (!existingAgent.state) {
      return res.status(400).json({ msg: "Agent is not activated" });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, existingAgent.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    // Return jsonwebtoken
    const payload = {
      agent: {
        id: existingAgent.id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: 360000,
      },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error agent");
  }
};
export { login };

// @desc agent acces to Dashboard
// @route GET api/agent/dashboard
const dashboard = async (req, res) => {
  try {
    const getToken = req.header("authorization");
    const token = getToken.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const agent = await agentModel.findById(decoded.agent.id);
    // res.json(agent);
    res.json({
      agent: agent,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error agent");
  }
};
export { dashboard };

// @desc get all persons by agent_id
// @route GET api/agent/persons
// const getPersons = async (req, res) => {
//   try {
//     const getToken = req.header("authorization");
//     const token = getToken.split(" ")[1];
//     const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
//     const agent = await agentModel.findById(decoded.agent.id);
//     const persons = await agentModel.find({ agent: agent._id });
//     res.json(persons);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Server Error show agent persons");
//   }
// };
// export { getPersons };

// @desc get all persons to agent by agent_uid
const getPersonsByAgentUid = async (req, res) => {
  try {
    const { authorization } = req.headers;
    const token = authorization.split(" ")[1];
    const decoded_token = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const agent = await agentModel.findById(decoded_token.agent.id);
    const agent_uid = agent._id;
    const persons = await personModel.find({ agent_uid });
    res.json(persons);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Token Server Error in get persons by agent_uid");
  }
};
export { getPersonsByAgentUid };

// get a peson by id
const getPersonById = async (req, res) => {
  try {
    const { authorization } = req.headers;
    const token = authorization.split(" ")[1];
    const decoded_token = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const agent = await agentModel.findById(decoded_token.agent.id);
    const agent_uid = agent._id;
    const person = await personModel.findOne({ _id: req.params.id, agent_uid });
    res.json(person);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("__Token Server Error in get person by id");
  }
};
export { getPersonById };

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
