import { useState } from 'react';
import { authStore } from '../store/authStore';
import { projectStore } from '../store/projectStore';

interface NavbarProps {
  setShowAllProjects?: (show: boolean) => void;
}

export default function Navbar({ setShowAllProjects }: NavbarProps) {
  const { authUser, logout } = authStore();
  const [menuOpen, setMenuOpen] = useState(false);
  const { setSelectedProject } = projectStore();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="justify-between items-center flex flex-row px-6 sm:px-20 py-9 text-Secondary">
      <h1 className="text-2xl sm:text-2xl md:text-4xl font-bold">
        TIDAL Judging Portal
      </h1>
      <h2 className="hidden text-xl sm:flex flex-row gap-4">
        {authUser?.name}
        <button onClick={logout}>
          <img src="/logout.svg" alt="logout" className="hover:scale-[1.15]" />
        </button>
      </h2>
      <div className="sm:hidden relative">
        <label className="btn btn-circle swap swap-rotate">
          {/* this hidden checkbox controls the state */}
          <input type="checkbox" checked={menuOpen} onChange={toggleMenu} />

          {/* hamburger icon */}
          <svg
            className="swap-off fill-current"
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 512 512">
            <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
          </svg>

          {/* close icon */}
          <svg
            className="swap-on fill-current"
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 512 512">
            <polygon
              points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
          </svg>
        </label>
        {menuOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20">
            <button onClick={() => { setSelectedProject(null); if (setShowAllProjects) { setShowAllProjects(false); } setMenuOpen(false); }} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              Assigned Projects
            </button>
            <button onClick={() => { if (setShowAllProjects) { setShowAllProjects(true); } setMenuOpen(false); }} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              All Projects
            </button>
            <button onClick={logout} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              Sign Out
            </button>
          </div>
        )}
      </div>
    </div>
  );
}