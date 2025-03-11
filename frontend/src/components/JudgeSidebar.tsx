import { authStore } from "../store/authStore";
import { projectStore } from "../store/projectStore";
import { useEffect, useState } from "react";
import { Project } from "../store/interfaces"; 
import CircularProgressBar from "./CircularProgressBar";

export default function JudgeSidebar() {
  const { authUser } = authStore();
  const { getProjectById, selectedProject, setSelectedProject } = projectStore();
  const [avgScore, setAvgScore] = useState(0);
  const [projects, setProjects] = useState<(Project | null)[]>([]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const fetchProjects = async () => {
      console.log("LOADING!", authUser, authUser?.assignedProjects);
      if (authUser?.assignedProjects) {
        const projectDetails = await Promise.all(
          authUser.assignedProjects.map((projectId) => getProjectById(projectId))
        );
        setProjects(projectDetails);

        const totalScore = projectDetails.reduce((acc, project) => {
          const judgeScores = project?.scores.find(score => score.judge === authUser._id)?.score;
          if (judgeScores) {
            const scoresArray = judgeScores.split(',').map(Number);
            const projectAvgScore = scoresArray.reduce((sum, score) => sum + score, 0) / scoresArray.length;
            return acc + projectAvgScore;
          }
          return acc;
        }, 0);

        const average = totalScore / projectDetails.length;
        setAvgScore(average);
      }
    };

    fetchProjects();
  }, [authUser, getProjectById, authUser?.assignedProjects]);

  return (
    <div className="bg-Primary sm:bg-[#2D2B2E] h-full min-h-screen sm:w-1/4 justify-center items-center text-center pt-10 text-Secondary">
      <h1 className="text-xl sm:text-2xl font-bold">
        Welcome, {authUser?.name}!
      </h1>
      <div className="justify-self-center my-10">
        <CircularProgressBar sqSize={120} strokeWidth={7} percentage={progress} />
      </div>

      <hr className="mx-7 mt-6" />
      {/* Judges List: */}
      <div className="">
        <h2 className="text-xl font-semibold mt-3">Your Assigned Projects</h2>
        <ul className="mt-5 px-6 space-y-2">
          {projects.map((project) => (
            <div className={`py-3 px-4 border border-gray-300 bg-[#4A3353] hover:bg-[#5b4165] rounded-2xl flex justify-between cursor-pointer ${project === selectedProject ? "bg-[#5b4165]" : ""
              }`}
              onClick={() => setSelectedProject(project)}
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
      <hr className="mx-7 mt-6" />
      <h2>Your Average Score: {avgScore.toFixed(2)}</h2>
    </div>
  );
}