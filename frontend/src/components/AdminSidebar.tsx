import { useState, useEffect } from "react";
import { judgeStore } from "../store/judgeStore";
import { projectStore } from "../store/projectStore";
import CircularProgressBar from "./CircularProgressBar";

export default function AdminSidebar() {
  const { judges, fetchJudges, setSelectedJudge, selectedJudge } = judgeStore();
  const { projects, fetchProjects } = projectStore();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    fetchJudges();
    fetchProjects();
  }, [fetchJudges, fetchProjects]);

  useEffect(() => {
    if (projects.length > 0) {
      const completedProjects = projects.filter(project => project.timesJudged >= 4).length;
      setProgress((completedProjects / projects.length) * 100);
    }
  }, [projects]);

  const filteredJudges = judges
    .filter(judge => judge.judgeID !== "0")
    .sort((a, b) => {
      if (!a.group) return 1; // Place judges without a group at the end
      if (!b.group) return -1; // Place judges with a group before those without
      return a.group.localeCompare(b.group); // Sort by group alphabetically
    });

  return (
    <div className="bg-[#2D2B2E] h-screen min-h-screen w-1/4 justify-center items-center text-center pt-10 text-Secondary overflow-y-auto">
      <h1 className="text-2xl font-bold">
        Welcome, Admin!
      </h1>

      <div className="justify-self-center my-10">
        <CircularProgressBar sqSize={120} strokeWidth={7} percentage={progress} />
      </div>

      <hr className="mx-7 mt-6" />
      {/* Judges List: */}
      <div className="">
        <h2 className="text-xl font-semibold mt-3">Judges</h2>
        <ul className="mt-5">
          {filteredJudges.map((judge, index) => {
            const isNewGroup = index === 0 || judge.group !== filteredJudges[index - 1].group;

            return (
              <div key={judge.judgeID}>
                {/* Add a divider and group label when the group changes */}
                {isNewGroup && (
                  <div className="text-left px-6 mx-4 mt-4">
                    <div className="divider">{judge.group ? `Group ${judge.group}` : "No Group"}</div>
                  </div>
                )}
                <div
                  className={`text-left py-3 my-4 px-6 mx-4 bg-[#4A3353] hover:bg-[#5e436b] rounded-2xl border-white border cursor-pointer ${selectedJudge == judge ? "border-2 bg-[#9783CD] hover:bg-[#7c6ca8]" : ""
                    }`}
                  onClick={() => setSelectedJudge(judge)}
                >
                  <li className="text-md flex justify-between">
                    <div>
                      <p className="text-white font-semibold">{judge.name}</p>
                      <p className="text-sm">ID: {judge.judgeID}</p>
                    </div>
                  </li>
                </div>
              </div>
            );
          })}
        </ul>
      </div>
      <hr className="mx-7 mt-6" />

    </div>
  )
}