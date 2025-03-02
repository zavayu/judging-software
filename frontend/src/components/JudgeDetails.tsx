import { judgeStore } from "../store/judgeStore";

export default function AddJudge() {
  const { selectedJudge, setSelectedJudge } = judgeStore();


  return (
    <div className="w-[85%] h-[65vh] justify-self-center border-4 border-[#383838] rounded-badge flex flex-col px-7 py-6 text-Secondary">

      <div className="relative flex gap-10">
        <button onClick={() => setSelectedJudge(null)}>
          <img src="/arrow_back.svg" alt="back" className="size-10 hover:scale-[1.15] absolute top-0" />
        </button>
        <div className="px-10">
          <h1 className="text-3xl font-semibold pb-1">{selectedJudge?.name}</h1>
          <h1 className="text-xl font-semibold pb-1">ID: {selectedJudge?.judgeID}</h1>
        </div>

      </div>





    </div>
  );
}