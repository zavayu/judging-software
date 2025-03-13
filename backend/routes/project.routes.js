import express from "express";
import { fetchProjects, addProject, updateProject, deleteProject, getProjectById } from "../controllers/project.controller.js";
import { protectRoute } from "../middlewear/auth.middlewear.js";

const router = express.Router();

router.get("/projects", protectRoute, fetchProjects);
router.post("/add-project", protectRoute, addProject);
router.put("/update-project/:id", protectRoute, updateProject);
router.delete("/delete-project/:projectId", protectRoute, deleteProject);
router.get("/:id", protectRoute, getProjectById);

export default router;