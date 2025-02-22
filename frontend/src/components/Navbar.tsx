
export default function Navbar() {
  return (
    <div className="justify-between items-center flex flex-row px-20 py-9 text-Secondary">
      <h1 className="text-4xl font-bold">
        TIDAL Judging Portal
      </h1>
      <h2 className="text-xl flex flex-row gap-4">
        John Doe
        <button>
          <img src="/logout.svg" alt="logout" className="hover:scale-[1.15]"/>
        </button>

      </h2>
    </div>
  )
}