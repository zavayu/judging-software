import express from "express";
import { fetchJudges, addJudge, deleteJudge, assignProjectToJudge, updateJudge } from "../controllers/judge.controller.js";
import { protectRoute } from "../middlewear/auth.middlewear.js";

const router = express.Router();

router.get("/judges", protectRoute, fetchJudges);
router.post("/add-judge", protectRoute, addJudge);
router.delete("/delete-judge/:judgeID", protectRoute, deleteJudge);
router.put("/assign-project/:judgeID/:projectID", protectRoute, assignProjectToJudge);
router.put("/update-judge/:judgeID", protectRoute, updateJudge);

export default router;