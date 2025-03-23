import { projectStore } from "../store/projectStore";
import { authStore } from "../store/authStore";
import { useState, useEffect, useRef, useCallback } from "react";
import { debounce } from 'lodash';
import toast from "react-hot-toast";

interface CriteriaSliderProps {
  label: string;
  value: number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

// Reusable slider component for scoring a specific criterion
function CriteriaSlider({ label, value, onChange }: CriteriaSliderProps) {
  return (
    <div className="w-full mt-2">
      <label>{label}</label>
      <input type="range" min={0} max="10" value={value} className="range [--range-shdw:#9783CD]" step="1" onChange={onChange} />
      <div className="flex justify-between px-2.5 text-xs">
        {[...Array(11)].map((_, i) => (
          <span key={i}>|</span>
        ))}
      </div>
      <div className="flex justify-between text-xs">
        {/* {[...Array(11)].map((_, i) => (
          <span key={i}>{i}</span>
        ))} */}
        <span>Poor</span>
        <span>Average</span>
        <span>Great</span>
      </div>
    </div>
  );
}

// Debounced function to save scores, reducing the frequency of API calls
const debouncedSaveScore = debounce(async (handleSaveScore) => {
  await handleSaveScore();
}, 500);


export default function JudgeProject() {
  const { selectedProject, setSelectedProject, updateProject } = projectStore();
  const { authUser } = authStore();
  
  const [feedback, setFeedback] = useState("");
  const [criteria1, setCriteria1] = useState(0);
  const [criteria2, setCriteria2] = useState(0);
  const [criteria3, setCriteria3] = useState(0);
  const [criteria4, setCriteria4] = useState(0);
  const [criteria5, setCriteria5] = useState(0);

  const finalScore = (criteria1 + criteria2 + criteria3 + criteria4 + criteria5) / 5;
  const initialCriteriaSet = useRef(false);

  // Function to save the scores and feedback for the selected project
  const handleSaveScore = useCallback(async () => {
    // If all criteria are 0 and feedback is empty, do not save the score
    if (criteria1 === 0 && criteria2 === 0 && criteria3 === 0 && criteria4 === 0 && criteria5 === 0 && feedback === "") {
      return; 
    }
    if (!authUser || !authUser._id) {
      console.error("authUser is null");
      return;
    }

    // prepare the updated scores array
    const updatedScores = selectedProject?.scores ? [...selectedProject.scores] : [];
    const existingScoreIndex = updatedScores.findIndex(score => score.judge === authUser._id);
    const scoreString = `${criteria1},${criteria2},${criteria3},${criteria4},${criteria5}`;
    let timesJudged = selectedProject?.timesJudged || 0;

    // Update the score if it already exists, otherwise add a new score
    if (existingScoreIndex !== -1) {
      updatedScores[existingScoreIndex].score = scoreString;
      updatedScores[existingScoreIndex].feedback = feedback
    } else {
      updatedScores.push({ judge: authUser._id, score: scoreString, feedback: feedback });
      timesJudged++;
    }

    // Update the project with the new scores
    if (selectedProject) {
      const updatedProject = {
        ...selectedProject,
        scores: updatedScores,
        name: selectedProject.name || '',
        team: selectedProject.team || '',
        table: selectedProject.table || '',
        timesJudged: timesJudged,
      };

      try {
        await updateProject(selectedProject._id, updatedProject);
        //console.log("Project updated successfully: ", updatedProject.scores);
        setSelectedProject(updatedProject);
      } catch (error) {
        console.error("Failed to update project", error);
      }
    }
  }, [criteria1, criteria2, criteria3, criteria4, criteria5, feedback, authUser, selectedProject, setSelectedProject, updateProject]);

  // Effect to load the judge's existing scores and feedback when the component mounts or the selected project changes
  useEffect(() => {
    if (selectedProject && authUser) {
      const judgeScore = selectedProject.scores.find(score => score.judge === authUser._id);
      const scores = judgeScore?.score.split(',').map(Number);
      setCriteria1(scores?.[0] || 0);
      setCriteria2(scores?.[1] || 0);
      setCriteria3(scores?.[2] || 0);
      setCriteria4(scores?.[3] || 0);
      setCriteria5(scores?.[4] || 0);
      setFeedback(judgeScore?.feedback || "");
      initialCriteriaSet.current = true; // Mark that initial criteria have been set
    }
  }, [selectedProject?._id, authUser]);

  // Effect to auto-save scores and feedback whenever they change
  useEffect(() => {
    if (initialCriteriaSet.current) {
      debouncedSaveScore(handleSaveScore);
    }
  }, [criteria1, criteria2, criteria3, criteria4, criteria5, debouncedSaveScore]);

  return (
    <div className="sm:w-[85%] justify-self-center border-4 border-[#383838]  bg-[#383838] rounded-badge flex flex-col px-7 py-6 text-white">

      {/* Back button */}
      <div className="relative sm:flex gap-10">
        <button onClick={async () => {
          await handleSaveScore();
          toast.success("Score saved successfully");
          setSelectedProject(null);
        }}
        >
          <img src="/arrow_back.svg" alt="back" className="size-8 sm:size-10 hover:scale-[1.15] sm:absolute sm:top-0" />
        </button>

        {/* Project details */}
        <div className="sm:px-10 w-full">
          <div className="flex justify-between">
            <h1 className="text-xl sm:text-3xl font-semibold pb-1">{selectedProject?.name}</h1>
            <h1 className="sm:text-xl pb-1 text-Secondary">Your score: {finalScore}</h1>
          </div>
          <h1 className="sm:text-xl font-semibold pb-1">{selectedProject?.team}</h1>
          <hr className="w-full" />

          {/* Criteria sliders */}
          <div className="sm:w-[90%] justify-self-center">
            <div className="flex flex-col gap-6 mt-4">
              <CriteriaSlider label="Creativity" value={criteria1} onChange={(e) => setCriteria1(Number(e.target.value))} />
              <CriteriaSlider label="Applicability" value={criteria2} onChange={(e) => setCriteria2(Number(e.target.value))} />
              <CriteriaSlider label="Technicality" value={criteria3} onChange={(e) => setCriteria3(Number(e.target.value))} />
              <CriteriaSlider label="Interdisciplinarity" value={criteria4} onChange={(e) => setCriteria4(Number(e.target.value))} />
              <CriteriaSlider label="Presentability" value={criteria5} onChange={(e) => setCriteria5(Number(e.target.value))} />
            </div>

            {/* Feedback */}
            <div className="mt-6 w-full">
              <label>Project Feedback</label>
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                className="textarea rounded-2xl w-full mt-2 p-2 border border-[#C3C3C3] bg-transparent placeholder-[#9783CD]"
                placeholder="Enter your feedback here..."
                rows={3}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}