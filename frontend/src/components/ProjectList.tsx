import { useEffect } from "react";
import { projectStore } from "../store/projectStore"

export default function ProjectList() {
  const { projects, fetchProjects, selectedProject, setSelectedProject } = projectStore();

  useEffect(() => {
    fetchProjects();
  }, []);

  const readyToBeJudged = projects.filter(project => project.timesJudged === 0);
  const judgingInProgress = projects.filter(project => project.timesJudged > 0 && project.timesJudged < 4);
  const judgingCompleted = projects.filter(project => project.timesJudged >= 4);

  return (
    <div className="w-[85%] sm:h-[70vh] justify-self-center border-4 border-[#383838] rounded-badge flex flex-col sm:flex-row sm:grid-rows-3 justify-center sm:justify-between p-10 text-Secondary overflow-scroll">
      {/*Ready to be Judged:*/}
      <div className="sm:w-[30%]">
        <div className="flex flex-row justify-between">
          <h2 className="text-xl">Ready to be Judged</h2>
          <h3 className="text-xl">{projects.length}</h3>
        </div>
        <ul className="mt-4">
          {readyToBeJudged.map((project) => (
            <li key={project.name} className="mb-2">
              <div className={`py-3 px-4 border border-gray-300 bg-[#333E63] hover:bg-[#5d70ab] rounded-2xl flex justify-between cursor-pointer ${project === selectedProject ? "bg-[#5d70ab]" : ""
                }`}
                onClick={() => setSelectedProject(project)}>
                <div>
                  <h3 className="text-md font-semibold text-white">{project.name}</h3>
                  <p className="text-sm">{project.team}</p>
                </div>
                <p className="py-3 text-sm">Table {project.table}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <span className="border-r-2 border-[#383838] h-[100%]"></span>

      {/* Judging in Progress: */}
      <div className="sm:w-[30%]">
        <div className="flex flex-row justify-between">
          <h2 className="text-xl">Judging in Progress</h2>
          <h3 className="text-xl">{judgingInProgress.length}</h3>
        </div>
        <ul className="mt-4">
          {judgingInProgress.map((project) => (
            <li key={project.name} className="mb-2">
              <div className={`py-3 px-4 border border-gray-300 bg-[#333E63] hover:bg-[#5d70ab] rounded-2xl flex justify-between cursor-pointer ${project === selectedProject ? "bg-[#5d70ab]" : ""
                }`}
                onClick={() => setSelectedProject(project)}>
                <div>
                  <h3 className="text-md font-semibold text-white">{project.name}</h3>
                  <p className="text-sm">{project.team}</p>
                </div>
                <div className="text-center space-y-1">
                  <p className="text-sm">Table {project.table}</p>
                  <p className="text-xs text-[#9783CD]">Judged {project.timesJudged} times</p>
                </div>

              </div>
            </li>
          ))}
        </ul>
      </div>
      <span className="border-r-2 border-[#383838] h-[100%]"></span>

      {/* Judging Completed: */}
      <div className="sm:w-[30%]">
        <div className="flex flex-row justify-between">
          <h2 className="text-xl">Judging Completed</h2>
          <h3 className="text-xl">{judgingCompleted.length}</h3>
        </div>
        <ul className="mt-4">
          {judgingCompleted.map((project) => (
            <li key={project.name} className="mb-2">
              <div className={`py-3 px-4 border border-gray-300 bg-[#333E63] hover:bg-[#5d70ab] rounded-2xl flex justify-between cursor-pointer ${project === selectedProject ? "bg-[#5d70ab]" : ""
                }`}
                onClick={() => setSelectedProject(project)}>
                <div>
                  <h3 className="text-md font-semibold text-white">{project.name}</h3>
                  <p className="text-sm">{project.team}</p>
                </div>
                <p className="py-3 text-sm">Table {project.table}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}