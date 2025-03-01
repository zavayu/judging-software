import AdminSidebar from "../components/AdminSidebar"
import Navbar from "../components/Navbar"
import ProjectList from "../components/ProjectList"

export default function AdminHome() {
  return (
    <div className="flex flex-row">
      <AdminSidebar />
      <div className="bg-Primary w-full h-full min-h-screen">

        <Navbar />
        <div className="flex justify-self-center items-start w-5/6 pb-4 gap-10">
          <button className="btn w-32 bg-[#65558F] hover:bg-[#a895da] text-white rounded-2xl border-white">Add Project</button>
          <button className="btn w-32 bg-[#65558F] hover:bg-[#a895da] text-white rounded-2xl border-white">Add Judge</button>
        </div>

        <ProjectList />
      </div>
    </div>
  )
}