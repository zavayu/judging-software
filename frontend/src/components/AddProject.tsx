import { useEffect, useState } from "react";
import { projectStore } from "../store/projectStore";

export default function AddProject() {
  const { projects, addProject } = projectStore();
  const [name, setName] = useState("");
  const [team, setTeam] = useState("");
  const [table, setTable] = useState("");

  // Calculate the default table number
  useEffect(() => {
    if (projects.length > 0) {
      const maxTable = Math.max(...projects.map((project) => parseInt(project.table || "0", 10)));
      setTable((maxTable + 1).toString());
    } else {
      setTable("1"); // Default to 1 if there are no projects
    }
  }, [projects]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addProject({ name, team, table, timesJudged: 0, _id: "", scores: [] });
    setName("");
    setTeam("");
    setTable((parseInt(table || "0", 10) + 1).toString());
  };
  return (
    <div className="w-[85%] h-[65vh] justify-self-center border-4 border-[#383838] rounded-badge flex flex-col p-10 text-Secondary">
      <h1 className="text-3xl font-semibold pb-10">Add Project</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col">
          <label htmlFor="name" className="text-lg">Project Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-2 border border-gray-300 rounded bg-[#383838]"
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="team" className="text-lg">Team Name</label>
          <input
            type="text"
            id="team"
            value={team}
            onChange={(e) => setTeam(e.target.value)}
            className="p-2 border border-gray-300 rounded bg-[#383838]"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="table" className="text-lg">Table Number</label>
          <input
            type="text"
            id="table"
            value={table}
            onChange={(e) => setTable(e.target.value)}
            className="p-2 border border-gray-300 rounded bg-[#383838]"
          />
        </div>
        <button type="submit" className="btn bg-[#65558F] hover:bg-[#a895da] text-white text-lg rounded-2xl border-white mt-4">
          Add Project
        </button>
      </form>
    </div>
  );
}