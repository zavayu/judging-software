import { useState, useEffect } from "react";
import { judgeStore } from "../store/judgeStore";
import { projectStore } from "../store/projectStore";
import CircularProgressBar from "./CircularProgressBar";

export default function AdminSidebar() {
  const { judges, fetchJudges, setSelectedJudge, selectedJudge } = judgeStore();
  const { projects, fetchProjects } = projectStore();
  const filteredJudges = judges.filter(judge => judge.judgeID !== "0");
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


  return (
    <div className="bg-[#2D2B2E] h-full min-h-screen w-1/4 justify-center items-center text-center pt-10 text-Secondary">
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
          {filteredJudges.map((judge) => (
            <div className={`text-left py-3 my-4 px-6 mx-4 bg-[#4A3353] hover:bg-[#5e436b] rounded-2xl border-white border cursor-pointer ${
              selectedJudge == judge ? "border-2 bg-[#9783CD] hover:bg-[#7c6ca8]" : ""
            }`} key={judge.judgeID} onClick={() => setSelectedJudge(judge)}>
              <li className="text-md">
                <p className="text-white font-semibold">{judge.name}</p>
                <p className="text-sm">ID: {judge.judgeID}</p>
              </li>
            </div>
          ))}
        </ul>
      </div>
      <hr className="mx-7 mt-6" />

    </div>
  )
}