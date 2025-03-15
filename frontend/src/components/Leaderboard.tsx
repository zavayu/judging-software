import { projectStore } from "../store/projectStore"
//import { judgeStore } from "../store/judgeStore"

export default function Leaderboard() {
  const { projects, setSelectedProject } = projectStore();
  //const { judges } = judgeStore();

  // Filter out projects that have not been judged yet
  const judgedProjects = projects.filter(project => project.scores.length > 0);


  // TODO: Normalize each metric for each judge before normalizing the total score


  // Calculate the mean and standard deviation for each judge
  const judgeScores: { [judgeId: string]: number[][] } = {};
  judgedProjects.forEach(project => {
    project.scores.forEach(score => {
      const judgeId = score.judge;
      const criteriaScores = score.score.split(',').map(Number);
      if (!judgeScores[judgeId]) judgeScores[judgeId] = [];
      judgeScores[judgeId].push(criteriaScores);
    });
  });

  const judgeStats = Object.keys(judgeScores).map(judgeId => {
    const scores = judgeScores[judgeId].flat();
    const mean = scores.reduce((sum, value) => sum + value, 0) / scores.length;
    const variance = scores.reduce((sum, value) => sum + Math.pow(value - mean, 2), 0) / scores.length;
    const stdDev = Math.sqrt(variance);
    // const judge = judges.find(judge => judge._id === judgeId);
    // if (judge) {
    //   console.log(`${judge.name}: Mean = ${mean}, StdDev = ${stdDev}`);
    // }
    
    return { judgeId, mean, stdDev };
  });

  // Normalize the scores and calculate the average score for each judged project
  const sortedProjects = judgedProjects.map(project => {
    const totalScore = project.scores.reduce((acc, score) => {
      const judgeId = score.judge;
      const criteriaScores = score.score.split(',').map(Number);
      const judgeStat = judgeStats.find(stat => stat.judgeId === judgeId);
      const judgeAverageScore = criteriaScores.reduce((sum, value) => {
        const normalizedScore = judgeStat && judgeStat.stdDev === 0 ? 0 : (value - (judgeStat ? judgeStat.mean : 0)) / (judgeStat ? judgeStat.stdDev : 1); // Avoid division by zero
        return sum + parseFloat(normalizedScore.toFixed(10)); // Round to avoid floating-point precision issues
      }, 0) / criteriaScores.length;
      return acc + judgeAverageScore;
    }, 0);
    const averageScore = totalScore / project.scores.length;
    return { ...project, averageScore };
  }).sort((a, b) => b.averageScore - a.averageScore);

  return (
    <div className="w-[85%] h-[70vh] justify-self-center border-4 border-[#383838] rounded-badge flex flex-col p-10 text-Secondary overflow-y-scroll">
      <h1 className="text-2xl pb-3">Leaderboard</h1>
      <ul>
        {sortedProjects.map((project) => (
          <li key={project.name} className="mb-2">
            <div className="py-3 px-4 border border-gray-300 bg-[#333E63] hover:bg-[#5d70ab] rounded-2xl flex justify-between cursor-pointer " onClick={() => setSelectedProject(project)}>
              <div>
                <h3 className="text-md font-semibold text-white">{project.name}</h3>
                <p className="text-sm">{project.team}</p>
              </div>
              <p className="py-3 text-sm">Average Score: {project.averageScore.toFixed(2)}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}