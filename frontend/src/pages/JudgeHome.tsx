import JudgeSidebar from "../components/JudgeSidebar"
import Navbar from "../components/Navbar"
import ProjectList from "../components/ProjectList"
import { projectStore } from "../store/projectStore"
import JudgeProject from "../components/JudgeProject"
import { useEffect, useState } from "react"

export default function JudgeHome() {
  useEffect(() => {
    document.body.style.backgroundColor = "#2B262F";
  }, []);
  const { selectedProject } = projectStore();
  const [showAllProjects, setShowAllProjects] = useState(false);
  return (
    <>
      {/* Desktop View*/}
      <div className="flex-row hidden sm:flex h-screen max-h-screen">
        <JudgeSidebar />
        <div className="bg-Primary w-full overflow-y-scroll">
          <Navbar />
          {selectedProject ? <JudgeProject /> : <ProjectList />}
        </div>
      </div>
      {/* Mobile View*/}
      <div className="bg-Primary sm:hidden px-7">
        <Navbar setShowAllProjects={setShowAllProjects} />
        {selectedProject ? <JudgeProject /> : (showAllProjects ? <ProjectList /> : <JudgeSidebar />)}
      </div>
    </>

  )
}