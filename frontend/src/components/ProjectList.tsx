import { useEffect } from "react";
import { projectStore } from "../store/projectStore"

export default function ProjectList() {
  const { projects, fetchProjects } = projectStore();

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="w-[85%] h-[70vh] justify-self-center border-4 border-[#383838] rounded-badge flex flex-row grid-rows-3 justify-between p-10 text-Secondary">
      {/*Ready to be Judged:*/}
      <div className="w-[30%]">
        <div className="flex flex-row justify-between">
          <h2 className="text-xl">Ready to be Judged</h2>
          <h3 className="text-xl">{projects.length}</h3>
        </div>
        <ul className="mt-4">
          {projects.map((project) => (
            <li key={project.name} className="mb-2">
              <div className="py-3 px-4 border border-gray-300 bg-[#333E63] rounded-2xl flex justify-between">
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
      <span className="border-r-2 border-[#383838]"></span>

      {/*Judging in Progress:*/}
      <div className="w-[30%]">
        <div className="flex flex-row justify-between">
          <h2 className="text-xl">
            Judging in Progress
          </h2>
          <h3 className="text-xl">
            10
          </h3>
        </div>
      </div>
      <span className="border-r-2 border-[#383838]"></span>

      {/*Judging Completed:*/}
      <div className="w-[30%]">
        <div className="flex flex-row justify-between">
          <h2 className="text-xl">
            Judging Completed
          </h2>
          <h3 className="text-xl">
            10
          </h3>
        </div>
      </div>
    </div>
  )
}