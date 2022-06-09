import Express from "express";
const router = Express.Router();
import register, {
  login,
  dashboard,
  getPersonsByAgentUid,
  getPersonById,
} from "../controllers/AgentController.js";

router.post("/register", register);

router.post("/login", login);

router.get("/dashboard", dashboard);

// router.get("/persons", getPersons);

router.get("/:persons", getPersonsByAgentUid);

router.get("/person/:id", getPersonById);

export default router;
