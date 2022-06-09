import adminModel from "../models/Admin.js";
import agentModel from "../models/Agent.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
// import transporter from "../config/emailConfig.js";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();
// @route  POST api/admin/register

// @desc   Register admin
// @access Public
// const register = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // Simple validation
//     if (!email || !password) {
//       return res.status(400).json({ msg: "Please enter all fields" });
//     }

//     // Check for existing admin
//     const existingAdmin = await adminModel.findOne({ email });
//     if (existingAdmin) {
//       return res.status(400).json({ msg: "Admin already exists" });
//     }

//     // Create admin
//     const newAdmin = new adminModel({
//       email,
//       password,
//     });

//     // Hash password
//     const salt = await bcrypt.genSalt(10);
//     newAdmin.password = await bcrypt.hash(password, salt);
//     // Save admin
//     await newAdmin.save();

//     // Return jsonwebtoken
//     const payload = {
//       admin: {
//         id: newAdmin.id,
//       },
//     };

//     jwt.sign(
//       payload,
//       process.env.JWT_SECRET_KEY,
//       {
//         expiresIn: 360000,
//       },
//       (err, token) => {
//         if (err) throw err;
//         res.json({ token });
//       }
//     );
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Server Error");
//   }
// };
// export default register;

//@ route  POST api/admin/login
//@ desc   Login admin
//@ access Public

const login = async (req, res) => {
  try {
    const { email, password, unbmer } = req.body;

    // Simple validation
    if (!email || !password) {
      return res.status(400).json({ msg: "Please enter all fields" });
    }

    // Check for existing admin
    const admin = await adminModel.findOne({ email });
    if (!admin) {
      return res.status(400).json({ msg: "Admin does not exist" });
    }

    // Validate password
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    // Return jsonwebtoken
    const payload = {
      admin: {
        _id: admin._id,
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
    res.status(500).send("Server Error");
  }
};
export default login;

// @route  GET api/admin/dashboard
// @desc   Get admin dashboard
// @access Private
const accesToDashboard = async (req, res) => {
  try {
    // get token
    const getToken = req.header("authorization");
    const token = getToken.split(" ")[1];
    // verify token
    // GET ID FROM TOKEN
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    // get admin from token
    const admin = await adminModel
      .findById(decoded.admin._id)
      .select("-password");
    // console.log(decoded.admin._id);
    if (!admin) {
      return res.status(401).json({ msg: "Admin not found" });
    }
    // return jsonwebtoken
    res.json({ msg: "Admin authorized" });
  } catch (err) {
    console.error("___" + err.message);
    res.status(500).send("Server Error");
  }
};
export { accesToDashboard };

// send email with define transporter
// @route  POST api/admin/sendemail
// @desc   Send email
// @access Private
const sendEmail = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ msg: "Please enter email" });
    }
    // get token
    const getToken = req.header("authorization");
    const token = getToken.split(" ")[1];
    // verify token
    // GET ID FROM TOKEN
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    // get admin from token
    const admin = await adminModel
      .findById(decoded.admin._id)
      .select("-password");
    // console.log(decoded.admin._id);
    if (!admin) {
      return res.status(401).json({ msg: "Admin not found" });
    }
    const link = `http://localhost:3000/covid/agent/register`;
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "madukhan3601@gmail.com",
        pass: "kebhlnnvjzoofzxn",
        expires: "1h",
      },
    });
    var mailOptions = {
      from: "madukhan3601@gmail.com",
      to: `${email}`,
      subject: "Covid-19 Agent Registration",
      text: `Click on the link to register your agent: ${link}`,
    };
    transporter.sendMail(mailOptions, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Email sent");
      }
    });
    res.json({ msg: "Email sent" });
  } catch (err) {
    console.error("___" + err.message);
    res.status(500).send("SendEmail Server Error" + err.message);
  }
};

export { sendEmail };

//@desc  Get all agents
//@route GET api/admin/agents
//@access Private
const getAgents = async (req, res) => {
  try {
    // get token
    const getToken = req.header("authorization");
    const token = getToken.split(" ")[1];
    // verify token
    // GET ID FROM TOKEN
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    // get admin from token
    const admin = await adminModel
      .findById(decoded.admin._id)
      .select("-password");
    // console.log(decoded.admin._id);
    if (!admin) {
      return res.status(401).json({ msg: "Admin not found" });
    }
    const agents = await agentModel.find();
    res.json(agents);
  } catch (err) {
    console.error("___" + err.message);
    res.status(500).send("Server Error of Showing All Agents " + err.message);
  }
};
export { getAgents };

// @desc get agent by id
// @route GET api/admin/agent/:id
// @access Private
const getAgentById = async (req, res) => {
  try {
    // get token
    const getToken = req.header("authorization");
    const token = getToken.split(" ")[1];
    // verify token
    // GET ID FROM TOKEN
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    // get admin from token
    const admin = await adminModel
      .findById(decoded.admin._id)
      .select("-password");
    // console.log(decoded.admin._id);
    if (!admin) {
      return res.status(401).json({ msg: "Admin not found" });
    }
    const agent = await agentModel.findById(req.params.id);
    res.json(agent);
  } catch (err) {
    console.error("___" + err.message);
    res.status(500).send("Server Error of Showing Agent " + err.message);
  }
};
export { getAgentById };

// @desc update agent
// @route PUT api/admin/editagent/:id
// @access Private
const updateAgent = async (req, res) => {
  try {
    // get token
    const getToken = req.body.headers.authorization;
    const token = getToken.split(" ")[1];
    // verify token
    // GET ID FROM TOKEN
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    // get admin from token
    const admin = await adminModel

      .findById(decoded.admin._id)
      .select("-password");
    // console.log(decoded.admin._id);
    if (!admin) {
      return res.status(401).json({ msg: "Admin not found" });
    }

    const agent = await agentModel.findById(req.body.data.agent.id);
    if (!agent) {
      return res.status(404).json({ msg: "Agent not found" });
    }

    agent.state = req.body.data.agent.state;
    await agent.save();
    res.json({ msg: "Agent updated" });
  } catch (err) {
    console.error("___" + err.message);
    res.status(500).send("Server Error of Updating Agent " + err.message);
  }
};

export { updateAgent };

// @desc delete agent
// @route DELETE api/admin/agent/:id
// @access Private
const deleteAgent = async (req, res) => {
  try {
    // get token
    const getToken = req.header("authorization");
    const token = getToken.split(" ")[1];
    // verify token
    // GET ID FROM TOKEN
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    // get admin from token
    const admin = await adminModel
      .findById(decoded.admin._id)
      .select("-password");
    // console.log(decoded.admin._id);
    if (!admin) {
      return res.status(401).json({ msg: "Admin not found" });
    }
    const agent = await agentModel.findById(req.params.id);
    await agent.remove();
    res.json({ msg: "Agent deleted" });
  } catch (err) {
    console.error("___" + err.message);
    res.status(500).send("Server Error of Deleting Agent " + err.message);
  }
};
export { deleteAgent };
