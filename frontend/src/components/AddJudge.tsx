import { useState } from "react";
import { judgeStore } from "../store/judgeStore";

export default function AddJudge() {
  const [name, setName] = useState("");
  const [judgeID, setJudgeID] = useState("");
  const { addJudge } = judgeStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addJudge({ name, judgeID });
    setName("");
    setJudgeID("");
  };
  
  return (
    <div className="w-[85%] h-[65vh] justify-self-center border-4 border-[#383838] rounded-badge flex flex-col p-10 text-Secondary">
      <h1 className="text-3xl font-semibold pb-10">Add Judge</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col">
          <label htmlFor="name" className="text-lg">Name</label>
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
          <label htmlFor="judgeID" className="text-lg">Judge ID</label>
          <input
            type="text"
            id="judgeID"
            value={judgeID}
            onChange={(e) => setJudgeID(e.target.value)}
            className="p-2 border border-gray-300 rounded bg-[#383838]"
            required
          />
        </div>
        <button type="submit" className="btn bg-[#65558F] hover:bg-[#a895da] text-white text-lg rounded-2xl border-white mt-4">
          Add Judge
        </button>
      </form>
    </div>
  );
}