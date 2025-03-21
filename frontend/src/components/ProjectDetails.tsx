import { useEffect, useState } from "react";
import { judgeStore } from "../store/judgeStore";
import { projectStore } from "../store/projectStore";
import { Judge } from "../store/interfaces";
import { toast } from "react-hot-toast";

export default function ProjectDetails() {
  const { judges, fetchJudges, assignProjectToJudge } = judgeStore();
  const { selectedProject, setSelectedProject, deleteProject } = projectStore();
  const [selectedJudgeID, setSelectedJudgeID] = useState("");
  const [assignedJudges, setAssignedJudges] = useState<Judge[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<string | "">("");

  // Fetch judges on component mount
  useEffect(() => {
    fetchJudges();
  }, [fetchJudges]);

  // Update the list of assigned judges when the selected project changes
  useEffect(() => {
    if (selectedProject) {
      const assigned = judges.filter((judge) =>
        judge.assignedProjects.includes(selectedProject._id)
      );
      setAssignedJudges(assigned);
    }
  }, [selectedProject, judges]);

  // Assign the selected judge to the selected project
  const handleAssign = async () => {
    if (selectedProject && selectedJudgeID) {
      await assignProjectToJudge(selectedJudgeID, selectedProject._id);
      setSelectedJudgeID("");

      // Update the list of assigned judges
      const updatedJudge = judges.find((judge) => judge._id === selectedJudgeID);
      if (updatedJudge) {
        setAssignedJudges((prev) => [...prev, updatedJudge]);
      }
    } else {
      toast.error("Please select a judge");
    }
  };

  const handleGroupAssign = async () => {
    if (selectedProject && selectedGroup) {
      // Filter judges by the selected group
      const groupJudges = judges.filter((judge) => judge.group === selectedGroup);
  
      if (groupJudges.length === 0) {
        toast.error("No judges found in the selected group");
        return;
      }
  
      // Filter out judges who already have the project assigned
      const unassignedJudges = groupJudges.filter(
        (judge) => !judge.assignedProjects.includes(selectedProject._id)
      );
  
      if (unassignedJudges.length === 0) {
        toast.error("The selected group is already assigned to this project");
        return;
      }
  
      // Assign the project to each unassigned judge in the group
      await Promise.all(
        unassignedJudges.map(async (judge) => {
          await assignProjectToJudge(judge.judgeID, selectedProject._id);
        })
      );
  
      // Update the list of assigned judges
      setAssignedJudges((prev) => [...prev, ...unassignedJudges]);
  
      setSelectedGroup(""); // Reset the selected group after assignment
    } else {
      toast.error("Please select a group and a project");
    }
  };

  // Filter out the admin
  const filteredJudges = judges.filter((judge) => judge.judgeID !== "0");

  return (
    <div className="w-[85%] min-h-[65vh] justify-self-center border-4 border-[#383838] rounded-badge flex flex-col px-7 py-6 text-Secondary">
      <div className="relative flex gap-10">

        {/* Back button */}
        <button onClick={() => setSelectedProject(null)}>
          <img src="/arrow_back.svg" alt="back" className="size-10 hover:scale-[1.15] absolute top-0" />
        </button>

        {/* Project details */}
        <div className="px-10 w-[90%] flex justify-between">
          <div>
            <h1 className="text-xl sm:text-3xl font-semibold pb-1">{selectedProject?.name}</h1>
            <h1 className="text-2xl text-[#E4E3E3] font-semibold pt-1">{selectedProject?.team}</h1>
          </div>
          <div>
            <h1 className="sm:text-2xl text-Secondary justify-self-center">Table {selectedProject?.table}</h1>
            <h1 className="sm:text-lg text-[#9783CD]">Judged {selectedProject?.timesJudged} times</h1>
          </div>
          <div>
            {/* Delete button */}
            <button className="flex gap-2 bg-[#383838] border border-[#1f1919] px-4 py-2 rounded-lg text-white" onClick={() => {
              const modal = document.getElementById('delete_project_modal');
              if (modal) {
                (modal as HTMLDialogElement).showModal();
              }
            }}>
              <img src="/trash.svg" alt="delete" className="size-6 pt-1" />
              <p className="text-xl">Delete </p>
            </button>

            {/* Delete project confirmation modal */}
            <dialog id="delete_project_modal" className="modal text-white">
              <div className="modal-box">
                <h3 className="font-bold text-lg">Are you sure?</h3>
                <p className="py-4">Deleting this project cannot be undone!</p>
                <div className="modal-action mt-1 gap-2">
                  <form method="dialog">
                    <button className=" px-6 py-1 rounded border hover:border-[#585858]">Cancel</button>
                  </form>
                  <button
                    className="bg-red-500 hover:bg-red-600 border border-red-500 hover:border-white px-6 py-1 rounded"
                    onClick={() => {
                      selectedProject?._id && deleteProject(selectedProject._id);
                      setSelectedProject(null);
                    }}>
                    Delete
                  </button>
                </div>
              </div>
            </dialog>

          </div>
        </div>
      </div>

      <hr className="w-[90%] justify-self-center place-self-center mt-3" />


      <div className="mt-6 px-20 flex flex-row justify-between">
        <div className="w-full">
          {/* Assign judge section*/}
          <div className="min-w-fit">
            <h2 className="text-xl font-semibold">Assign to a Judge:</h2>
            <div className="space-x-3">
              <label>
                <select
                  value={selectedJudgeID}
                  onChange={(e) => setSelectedJudgeID(e.target.value)}
                  className="p-2 border rounded bg-[#383838]"
                >
                  <option value="">Select a judge</option>
                  {filteredJudges.map((judge) => (
                    <option key={judge._id} value={judge.judgeID}>
                      {judge.name}
                    </option>
                  ))}
                </select>
              </label>
              <button
                onClick={handleAssign}
                className="mt-4 p-2 bg-[#6d7fb4] text-white rounded hover:bg-[#7d95dc]"
              >
                Assign Judge
              </button>
            </div>
          </div>

          {/* List assigned judges */}
          <h2 className="text-xl font-semibold mt-3">Assigned Judges:</h2>
          <ul className="mt-5 space-y-2 w-[75%] justify-start">
            {assignedJudges.map((judge) => {
              const judgeScore = selectedProject?.scores?.find(score => score.judge === judge._id);
              return (
                <div className={"py-3 px-4 border border-gray-300 bg-[#4A3353] rounded-2xl flex justify-between"}
                  key={judge._id}
                >
                  <div className="text-left">
                    <h3 className="text-md font-semibold text-white">{judge.name}</h3>
                    <p className="text-sm">ID: {judge.judgeID}</p>
                    <p>
                      {judgeScore ? `Score: ${judgeScore.score}` : "Not yet scored"}
                    </p>
                  </div>
                </div>
              );
            })}
          </ul>
        </div>

        <div className="w-full">
          {/* Assign Group Section */}
          <div className="min-w-fit">
            <h2 className="text-xl font-semibold">Assign to a group:</h2>
            <div className="space-x-3">
              <label>
                <select
                  value={selectedGroup}
                  onChange={(e) => setSelectedGroup(e.target.value)}
                  className="p-2 border rounded bg-[#383838]"
                >
                  <option value="">Select a group</option>
                  {Array.from({ length: 10 }, (_, index) => index + 1).map((number) => (
                    <option key={number} value={number}>
                      {number}
                    </option>
                  ))}
                </select>
              </label>
              <button
                onClick={handleGroupAssign}
                className="mt-4 p-2 bg-[#6d7fb4] text-white rounded hover:bg-[#]"
              >
                Assign Group
              </button>
            </div>
          </div>

          {/** List additional scores from non-assigned judges */}
          <h2 className="text-xl font-semibold mt-3">Additional Scores:</h2>
          <ul className="mt-5 space-y-2 w-[75%] justify-end">
            {selectedProject?.scores?.map((score) => {
              const judge = judges.find((judge) => judge._id === score.judge);
              if (!judge || judge.assignedProjects.includes(selectedProject._id)) {
                return null;
              }
              return (
                <div className={"py-3 px-4 border border-gray-300 bg-[#4A3353] rounded-2xl flex justify-between"}
                  key={score.judge}
                >
                  <div className="text-left">
                    <h3 className="text-md font-semibold text-white">{judge.name}</h3>
                    <p className="text-sm">ID: {judge.judgeID}</p>
                    <p>
                      {score ? `Score: ${score.score}` : "Not yet scored"}
                    </p>
                  </div>
                </div>
              )
            })}
          </ul>
        </div>

      </div>
    </div>
  );
}