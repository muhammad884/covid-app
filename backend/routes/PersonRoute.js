import express from "express";
const router = express.Router();
import personRegister from // getPersonById, // getPersonsByAgentUid,
"../controllers/PersonController.js";

router.post("/register", personRegister);

// router.get("/:agent_uid", getPersonsByAgentUid);

// router.get("/:id", getPersonById);

export default router;
