import { useEffect } from "react";
import { judgeStore } from "../store/judgeStore";

export default function AdminSidebar() {
  const { judges, fetchJudges } = judgeStore();

  useEffect(() => {
    fetchJudges();
  }, [fetchJudges]);
  
  const filteredJudges = judges.filter(judge => judge.judgeID !== "0");

  return (
    <div className="bg-[#2D2B2E] h-full min-h-screen w-1/4 justify-center items-center text-center pt-10 text-Secondary">
      <h1 className="text-2xl font-bold">
        Welcome, Admin!
      </h1>

      <hr className="mx-7 mt-6"/>
      {/* Judges List: */} 
      <div className="">
        <h2 className="text-xl font-semibold mt-3">Judges</h2>
        <ul className="mt-5">
          {filteredJudges.map((judge) => (
            <div className="text-left py-3 my-4 px-6 mx-4 bg-[#4A3353] rounded-2xl border-white border" key={judge.judgeID}>
              <li className="text-md">
                <p className="text-white font-semibold">{judge.name}</p>
                <p className="text-sm">ID: {judge.judgeID}</p>
              </li>
            </div>
          ))}
        </ul>
      </div>
      <hr className="mx-7 mt-6"/>

    </div>
  )
}