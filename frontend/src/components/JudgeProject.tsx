//import { judgeStore } from "../store/judgeStore";
import { projectStore } from "../store/projectStore";
import { authStore } from "../store/authStore";
import { useState, useEffect, useRef } from "react";

interface CriteriaSliderProps {
  label: string;
  value: number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

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

export default function JudgeProject() {
  const { selectedProject, setSelectedProject, updateProject } = projectStore();
  const { authUser } = authStore();
  const [feedback, setFeedback] = useState("");
  const [criteria1, setCriteria1] = useState(0);
  const [criteria2, setCriteria2] = useState(0);
  const [criteria3, setCriteria3] = useState(0);
  const [criteria4, setCriteria4] = useState(0);
  const finalScore = (criteria1 + criteria2 + criteria3 + criteria4) / 4;
  const initialCriteriaSet = useRef(false);

  useEffect(() => {
    if (selectedProject && authUser) {
      const judgeScore = selectedProject.scores.find(score => score.judge === authUser._id);
      if (judgeScore) {
        const scores = judgeScore.score.split(',').map(Number);
        setCriteria1(scores[0] || 0);
        setCriteria2(scores[1] || 0);
        setCriteria3(scores[2] || 0);
        setCriteria4(scores[3] || 0);
      }
      initialCriteriaSet.current = true;
    }
  }, [selectedProject, authUser]);

  useEffect(() => {
    if (initialCriteriaSet.current) {
      const intervalId = setInterval(() => {
        handleSaveScore();
      }, 1500); // 1.5 seconds

      return () => clearInterval(intervalId); // Clear interval on component unmount
    }
  }, [criteria1, criteria2, criteria3, criteria4]);

  const handleSaveScore = async () => {
    if (criteria1 === 0 && criteria2 === 0 && criteria3 === 0 && criteria4 === 0) {
      return; // Don't save score if all criteria are 0
    }
    const finalScore = (criteria1 + criteria2 + criteria3 + criteria4) / 4;
    if (!authUser) {
      console.error("authUser is null");
      return;
    }
    const updatedScores = selectedProject?.scores ? [...selectedProject.scores] : [];
    const existingScoreIndex = updatedScores.findIndex(score => score.judge === authUser._id);
    const scoreString = `${criteria1},${criteria2},${criteria3},${criteria4}`;
    let timesJudged = selectedProject?.timesJudged || 0;

    if (existingScoreIndex !== -1) {
      updatedScores[existingScoreIndex].score = scoreString;
    } else {
      updatedScores.push({ judge: authUser._id, score: scoreString });
      timesJudged++;
    }

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
        setSelectedProject(updatedProject);
      } catch (error) {
        console.error("Failed to update project", error);
      }
    }
  };

  return (
    <div className="sm:w-[85%] h-[85vh] justify-self-center border-4 border-[#383838]  bg-[#383838] rounded-badge flex flex-col px-7 py-6 text-white">

      <div className="relative sm:flex gap-10">
        <button onClick={() => setSelectedProject(null)}>
          <img src="/arrow_back.svg" alt="back" className="size-10 hover:scale-[1.15] sm:absolute sm:top-0" />
        </button>
        <div className="sm:px-10 w-full">
          <div className="flex justify-between">
            <h1 className="text-xl sm:text-3xl font-semibold pb-1">{selectedProject?.name}</h1>
            <h1 className="sm:text-xl pb-1 text-Secondary">Your score: {finalScore}</h1>
          </div>
          <h1 className="sm:text-xl font-semibold pb-1">{selectedProject?.team}</h1>
          <hr className="w-full" />
          {/* TODO: Add sliders to judge a project based on 4 criteria. Store the result as a score for selectedProject.*/}
          <div className="w-[90%] justify-self-center">

            <div className="flex flex-col gap-6 mt-4">
              <CriteriaSlider label="Criteria 1" value={criteria1} onChange={(e) => setCriteria1(Number(e.target.value))} />
              <CriteriaSlider label="Criteria 2" value={criteria2} onChange={(e) => setCriteria2(Number(e.target.value))} />
              <CriteriaSlider label="Criteria 3" value={criteria3} onChange={(e) => setCriteria3(Number(e.target.value))} />
              <CriteriaSlider label="Criteria 4" value={criteria4} onChange={(e) => setCriteria4(Number(e.target.value))} />
            </div>
            <div className="mt-6 w-full">
              <label>Project Feedback</label>
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                className="textarea rounded-2xl w-full mt-2 p-2 border border-[#C3C3C3] bg-transparent placeholder-[#9783CD]"
                placeholder="Enter your feedback here..."
                rows={4}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}