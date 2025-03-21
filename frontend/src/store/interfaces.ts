export interface Judge {
  _id: string;
  judgeID: string;
  name: string;
  assignedProjects: string[];
  group: string;
}

export interface Score {
  judge: string;
  score: string;
  feedback: string;
}

export interface Project {
    _id: string;
    name: string;
    team: string;
    table: string;
    scores: Score[];
    timesJudged: number;
  }