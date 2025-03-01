import express from "express";
import { fetchProjects, addProject, deleteProject } from "../controllers/project.controller.js";

const router = express.Router();

router.get("/projects", fetchProjects);
router.post("/add-project", addProject);
router.delete("/delete-project/:projectId", deleteProject);

export default router;