import JudgeSidebar from "../components/JudgeSidebar"
import Navbar from "../components/Navbar"
import ProjectList from "../components/ProjectList"
import { projectStore } from "../store/projectStore"
import JudgeProject from "../components/JudgeProject"
import { useState } from "react"

export default function JudgeHome() {
  const { selectedProject, setSelectedProject } = projectStore();
  const [ showAllProjects, setShowAllProjects ] = useState(false);
  return (
    <>
      <div className="flex-row hidden sm:flex">
        <JudgeSidebar />
        <div className="bg-Primary w-full h-full min-h-screen">

          <Navbar />
          {selectedProject ? <JudgeProject /> : <ProjectList />}
        </div>
      </div>
      <div className="bg-Primary sm:hidden">
        <Navbar setShowAllProjects={setShowAllProjects}/>
        {selectedProject ? <JudgeProject /> : (showAllProjects ? <ProjectList /> : <JudgeSidebar />)}
      </div>
    </>

  )
}