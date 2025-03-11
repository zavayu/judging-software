import express from "express";
import { fetchProjects, addProject, updateProject, deleteProject, getProjectById } from "../controllers/project.controller.js";

const router = express.Router();

router.get("/projects", fetchProjects);
router.post("/add-project", addProject);
router.put("/update-project/:id", updateProject);
router.delete("/delete-project/:projectId", deleteProject);
router.get("/:id", getProjectById);

export default router;