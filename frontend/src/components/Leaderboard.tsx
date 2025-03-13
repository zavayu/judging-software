import { projectStore } from "../store/projectStore"

export default function Leaderboard() {
  const { projects } = projectStore();

  // Filter out projects that have not been judged yet
  const judgedProjects = projects.filter(project => project.scores.length > 0);

  // Calculate the average score for each judged project
  const sortedProjects = judgedProjects.map(project => {
    const totalScore = project.scores.reduce((acc, score) => {
      const criteriaScores = score.score.split(',').map(Number);
      const judgeAverageScore = criteriaScores.reduce((sum, value) => sum + value, 0) / criteriaScores.length;
      return acc + judgeAverageScore;
    }, 0);
    const averageScore = totalScore / project.scores.length;
    return { ...project, averageScore };
  }).sort((a, b) => b.averageScore - a.averageScore);

  return (
    <div className="w-[85%] h-[65vh] justify-self-center border-4 border-[#383838] rounded-badge flex flex-col p-10 text-Secondary overflow-y-scroll">
      <h1 className="text-2xl pb-3">Leaderboard</h1>
      <ul>
        {sortedProjects.map((project) => (
          <li key={project.name} className="mb-2">
            <div className="py-3 px-4 border border-gray-300 bg-[#333E63] hover:bg-[#5d70ab] rounded-2xl flex justify-between cursor-pointer ">
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