import { authStore } from "../store/authStore"

export default function JudgeSidebar() {
  const { authUser } = authStore();
  return (
    <div className="bg-[#2D2B2E] h-full min-h-screen w-1/5 justify-center items-center text-center pt-10 text-Secondary">
      <h1 className="text-2xl font-bold">
        Welcome, {authUser?.name}!
      </h1>
    </div>
  )
}