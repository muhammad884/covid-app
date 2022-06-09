import express from "express";
const router = express.Router();
import login, {
  accesToDashboard,
  sendEmail,
  getAgents,
  getAgentById,
  updateAgent,
  deleteAgent,
} from "../controllers/AdminController.js";

// @desc    Login admin
router.post("/login", login);

// // @desc Get admin dashboard
router.get("/dashboard", accesToDashboard);

// @desc admin access only
// router.get("/dashboard", checkAdmin, (req, res) => {
//   res.json({ msg: "Admin authorized" });
// });

// @desc   Send email
router.post("/sendemail", sendEmail);

// @desc    Logout admin
// router.get("/logout", (req, res) => {
//   res.send("logout");
// });\

// @desc Get all agents
router.get("/showAgents", getAgents);

// @desc Get agent by id
router.get("/showAgents/:id", getAgentById);

// @desc Update agent
router.put("/editagent/:id", updateAgent);

// @desc Delete agent
router.delete("/deleteagent/:id", deleteAgent);

export default router;
