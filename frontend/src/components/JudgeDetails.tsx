import { useEffect, useState } from "react";
import { judgeStore } from "../store/judgeStore";
import { projectStore } from "../store/projectStore";
import { Project } from "../store/interfaces";

export default function JudgeDetails() {
  const { selectedJudge, setSelectedJudge, assignProjectToJudge } = judgeStore();
  const { projects, selectedProject, setSelectedProject, getProjectById } = projectStore();
  const [selectedProjectID, setSelectedProjectID] = useState("");
  const [assignedProjects, setAssignedProjects] = useState<(Project | null)[]>([]);
  const [avgScore, setAvgScore] = useState(0);

  const handleAssign = async () => {
    if (selectedJudge && selectedProjectID) {
      await assignProjectToJudge(selectedJudge.judgeID, selectedProjectID);
      setSelectedProjectID(""); // Reset the selected project ID after assignment
    } else {
      alert("Please select a project");
    }
  };

  useEffect(() => {
      if (selectedJudge?.assignedProjects) {
        const fetchProjects = async () => {
          const projectDetails = await Promise.all(
            selectedJudge.assignedProjects.map((projectId) => getProjectById(projectId))
          );
          setAssignedProjects(projectDetails);
  
          const totalScore = projectDetails.reduce((acc, project) => {
            const judgeScores = project?.scores.find(score => score.judge === selectedJudge._id)?.score;
            if (judgeScores) {
              const scoresArray = judgeScores.split(',').map(Number);
              const projectAvgScore = scoresArray.reduce((sum, score) => sum + score, 0) / scoresArray.length;
              return acc + projectAvgScore;
            }
            return acc;
          }, 0);
  
          const average = totalScore / projectDetails.length;
          setAvgScore(average);
        };
  
        fetchProjects();
      }
    }, [selectedJudge, getProjectById]);

  return (
    <div className="w-[85%] h-[65vh] justify-self-center border-4 border-[#383838] rounded-badge flex flex-col px-7 py-6 text-Secondary">
      <div className="relative flex gap-10">
        <button onClick={() => setSelectedJudge(null)}>
          <img src="/arrow_back.svg" alt="back" className="size-10 hover:scale-[1.15] absolute top-0" />
        </button>
        <div className="px-10">
          <h1 className="text-3xl text-white font-semibold">{selectedJudge?.name}</h1>
          <h1 className="text-2xl text-[#E4E3E3] font-semibold pt-1">ID: {selectedJudge?.judgeID}</h1>
        </div>
      </div>
      <hr className="w-[90%] justify-self-center place-self-center mt-3" />
      <div className="mt-6 px-20">
        <h2 className="text-xl font-semibold">Assign Project:</h2>
        <div className="space-x-3">
          <label>
            <select
              value={selectedProjectID}
              onChange={(e) => setSelectedProjectID(e.target.value)}
              className="p-2 border rounded bg-[#383838]"
            >
              <option value="">Select a project</option>
              {projects.map((project) => (
                <option key={project._id} value={project._id}>
                  {project.name}
                </option>
              ))}
            </select>
          </label>
          <button
            onClick={handleAssign}
            className="mt-4 p-2 bg-[#6d7fb4] text-white rounded hover:bg-[#]"
          >
            Assign Project
          </button>
        </div>
        

        <h2 className="text-xl font-semibold mt-3">Assigned Projects:</h2>
        <ul className="mt-5 space-y-2 max-w-[50%] justify-start">
          {assignedProjects.map((project) => (
            <div className={"py-3 px-4 border border-gray-300 bg-[#333E63] rounded-2xl flex justify-between"}
              key={project?._id}
            >
              <div className="text-left">
                <h3 className="text-md font-semibold text-white">{project?.name}</h3>
                <p className="text-sm">{project?.team}</p>
              </div>
              <p className="py-3 text-sm">Table {project?.table}</p>
            </div>
          ))}
        </ul>
        
      </div>
    </div>
  );
}