import express from "express";
import { fetchJudges, addJudge, deleteJudge } from "../controllers/judge.controller.js";

const router = express.Router();

router.get("/judges", fetchJudges);
router.post("/add-judge", addJudge);
router.delete("/delete-judge/:judgeID", deleteJudge);

export default router;