import Judge from "../models/judge.model.js";

// Fetch all judges
export const fetchJudges = async (req, res) => {
  try {
    const judges = await Judge.find();
    res.status(200).json(judges);
  } catch (error) {
    console.error("Error fetching judges:", error);
    res.status(500).json({ message: "Failed to fetch judges" });
  }
};

// Add a new judge
export const addJudge = async (req, res) => {
  try {
    const { name, judgeID } = req.body;
    const newJudge = new Judge({ name, judgeID });
    await newJudge.save();
    res.status(201).json(newJudge);
  } catch (error) {
    console.error("Error adding judge:", error);
    res.status(500).json({ message: "Failed to add judge" });
  }
};

// Delete a judge
export const deleteJudge = async (req, res) => {
  try {
    const { judgeID } = req.params;
    const deletedJudge = await Judge.findOneAndDelete({ judgeID });
    if (!deletedJudge) {
      return res.status(404).json({ message: "Judge not found" });
    }
    res.status(200).json({ message: "Judge deleted successfully" });
  } catch (error) {
    console.error("Error deleting judge:", error);
    res.status(500).json({ message: "Failed to delete judge" });
  }
};

// Assign a project to a judge
export const assignProjectToJudge = async (req, res) => {
  try {
    const { judgeID, projectID } = req.params;
    const judge = await Judge.findOne({ judgeID });
    if (!judge) {
      return res.status(404).json({ message: "Judge not found" });
    }
    if (!judge.assignedProjects.includes(projectID)) {
      judge.assignedProjects.push(projectID);
      await judge.save();
    }
    res.status(200).json(judge);
  } catch (error) {
    console.error("Error assigning project to judge:", error);
    res.status(500).json({ message: "Failed to assign project to judge" });
  }
};