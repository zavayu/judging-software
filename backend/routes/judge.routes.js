import express from "express";
import { fetchJudges, addJudge, deleteJudge, assignProjectToJudge } from "../controllers/judge.controller.js";
import { protectRoute } from "../middlewear/auth.middlewear.js";

const router = express.Router();

router.get("/judges", protectRoute, fetchJudges);
router.post("/add-judge", protectRoute, addJudge);
router.delete("/delete-judge/:judgeID", protectRoute, deleteJudge);
router.put("/assign-project/:judgeID/:projectID", protectRoute, assignProjectToJudge); // Add this line

export default router;