export interface Judge {
  _id: string;
  judgeID: string;
  name: string;
  assignedProjects: string[];
}

export interface Score {
  judge: string;
  score: string;
}

export interface Project {
    _id: string;
    name: string;
    team: string;
    table: string;
    scores: Score[];
    timesJudged: number;
  }