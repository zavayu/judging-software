import JudgeSidebar from "../components/JudgeSidebar"
import Navbar from "../components/Navbar"
import ProjectList from "../components/ProjectList"

export default function JudgeHome() {
  return (
    <div className="flex flex-row">
      <JudgeSidebar />
      <div className="bg-Primary w-full h-full min-h-screen">

        <Navbar />
        <ProjectList/>
      </div>
    </div>
  )
}