import {authStore} from '../store/authStore';


export default function Navbar() {

  const {authUser, logout} = authStore();

  return (
    <div className="justify-between items-center flex flex-row px-20 py-9 text-Secondary">
      <h1 className="text-4xl font-bold">
        TIDAL Judging Portal
      </h1>
      <h2 className="text-xl flex flex-row gap-4">
        {authUser?.name}
        <button onClick={logout}>
          <img src="/logout.svg" alt="logout" className="hover:scale-[1.15]"/>
        </button>

      </h2>
    </div>
  )
}