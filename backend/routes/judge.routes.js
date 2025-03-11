import express from "express";
import { fetchJudges, addJudge, deleteJudge, assignProjectToJudge } from "../controllers/judge.controller.js";

const router = express.Router();

router.get("/judges", fetchJudges);
router.post("/add-judge", addJudge);
router.delete("/delete-judge/:judgeID", deleteJudge);
router.put("/assign-project/:judgeID/:projectID", assignProjectToJudge); // Add this line

export default router;