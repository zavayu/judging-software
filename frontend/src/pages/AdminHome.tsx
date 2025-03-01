import AdminSidebar from "../components/AdminSidebar"
import Navbar from "../components/Navbar"
import ProjectList from "../components/ProjectList"
import { useState } from "react"
import AddJudge from "../components/AddJudge";
import AddProject from "../components/AddProject";

export default function AdminHome() {
  const [addingJudge, setAddingJudge] = useState(false);
  const [addingProject, setAddingProject] = useState(false);

  return (
    <div className="flex flex-row">
      <AdminSidebar />
      <div className="bg-Primary w-full h-full min-h-screen">

        <Navbar />
        <div className="flex justify-self-center items-start w-5/6 pb-4 gap-10">

          <button onClick={() => {
            setAddingProject(!addingProject);
            setAddingJudge(false);
          }}
            className="btn bg-[#65558F] hover:bg-[#a895da] text-white text-lg rounded-2xl border-white"
          >
            <img src="/add.svg" alt="Add Project" />Add Project
          </button>

          <button onClick={() => {
            setAddingJudge(!addingJudge);
            setAddingProject(false);
          }}
            className="btn bg-[#65558F] hover:bg-[#a895da] text-white text-lg rounded-2xl border-white"
          >
            <img src="/add.svg" alt="Add Judge" />Add Judge
          </button>

        </div>

        {!addingJudge && !addingProject ? <ProjectList /> : null}
        {addingJudge ? <AddJudge/> : null}
        {addingProject ? <AddProject/> : null}
      </div>
    </div>
  )
}