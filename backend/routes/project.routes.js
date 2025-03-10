import express from "express";
import { fetchProjects, addProject, updateProject, deleteProject } from "../controllers/project.controller.js";

const router = express.Router();

router.get("/projects", fetchProjects);
router.post("/add-project", addProject);
router.put("/update-project/:id", updateProject);
router.delete("/delete-project/:projectId", deleteProject);

export default router;