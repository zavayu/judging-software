import { authStore } from "../store/authStore"

export default function JudgeSidebar() {
  const { authUser } = authStore();
  return (
    <div className="bg-[#2D2B2E] h-full min-h-screen w-1/4 justify-center items-center text-center pt-10 text-Secondary">
      <h1 className="text-2xl font-bold">
        Welcome, {authUser?.name}!
      </h1>
      <hr className="mx-7 mt-6"/>
      {/* Judges List: */} 
      <div className="">
        <h2 className="text-xl font-semibold mt-3">Your Assigned Projects</h2>
        <ul className="mt-5">
          {authUser?.assignedProjects?.map((project) => (
            <div className="text-left py-3 my-4 px-6 mx-4 bg-[#4A3353] rounded-2xl border-white border" key={project.name}>
              <li className="text-md">
                <p className="text-white font-semibold">{project.team}</p>
                <p className="text-sm">ID: {project.table}</p>
              </li>
            </div>
          ))}
        </ul>
      </div>
      <hr className="mx-7 mt-6"/>
      <h2>Your Average Score:</h2>
    </div>
  )
}