import JudgeSidebar from "../components/JudgeSidebar"
import Navbar from "../components/Navbar"
import ProjectList from "../components/ProjectList"
import { projectStore } from "../store/projectStore"
import JudgeProject from "../components/JudgeProject"

export default function JudgeHome() {
  const { selectedProject, setSelectedProject } = projectStore();
  return (
    <div className="flex flex-row">
      <JudgeSidebar />
      <div className="bg-Primary w-full h-full min-h-screen">

        <Navbar />
        {selectedProject ? <JudgeProject/> : <ProjectList />}
      </div>
    </div>
  )
}