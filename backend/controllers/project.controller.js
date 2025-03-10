import Project from "../models/project.model.js";

// Fetch all projects
export const fetchProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.status(200).json(projects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    res.status(500).json({ message: "Failed to fetch projects" });
  }
};

// Add a new project
export const addProject = async (req, res) => {
  try {
    const { name, team, table } = req.body;
    const newProject = new Project({ name, team, table });
    await newProject.save();
    res.status(201).json(newProject);
  } catch (error) {
    console.error("Error adding project:", error);
    res.status(500).json({ message: "Failed to add project" });
  }
};

// Update a project
export const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, team, table, scores, timesJudged } = req.body;

    //console.log(`Updating project with ID: ${id}`);
    const updatedProject = await Project.findByIdAndUpdate(
      id,
      { name, team, table, scores, timesJudged },
      { new: true }
    );
    if (!updatedProject) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.status(200).json(updatedProject);
  } catch (error) {
    console.log("Error updating project:", error);
    res.status(500).json({ message: "Failed to update project" });
  }
};

// Delete a project
export const deleteProject = async (req, res) => {
  try {
    const { name } = req.params;
    const deletedProject = await Project.findOneAndDelete({ name });
    if (!deletedProject) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.status(200).json({ message: "Project deleted successfully" });
  } catch (error) {
    console.error("Error deleting project:", error);
    res.status(500).json({ message: "Failed to delete project" });
  }
};