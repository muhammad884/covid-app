import express from "express";
const router = express.Router();
import registerTravel from "../controllers/PersonTravellController.js";
import { getPersonTravelByPersonUid } from "../controllers/PersonTravellController.js";

router.post("/:person_uid", registerTravel);
router.get("/:person_uid", getPersonTravelByPersonUid);

export default router;
