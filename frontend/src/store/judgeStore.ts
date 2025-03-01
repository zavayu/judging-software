import { create } from "zustand";
import toast from "react-hot-toast";
import axios from "axios";

interface Judge {
    judgeID: string;
    name: string;
}

interface JudgeStore {
    judges: Judge[];
    fetchJudges: () => Promise<void>;
    addJudge: (judge: Judge) => Promise<void>;
    deleteJudge: (judgeID: string) => Promise<void>;
}

const axiosInstance = axios.create({
    baseURL: "http://localhost:5000/api",
    withCredentials: true
});

export const judgeStore = create<JudgeStore>((set, get) => ({
    judges: [],

    fetchJudges: async () => {
        try {
            const res = await axiosInstance.get("/judge/judges");
            set({ judges: res.data });
        } catch (error) {
            console.error(error);
            toast.error("Failed to fetch judges");
        }
    },

    addJudge: async (judge) => {
        try {
            const res = await axiosInstance.post("/judge/add-judge", judge);
            set({ judges: [...get().judges, res.data] });
            toast.success("Judge added successfully");
        } catch (error) {
            console.error(error);
            toast.error("Failed to add judge");
        }
    },

    deleteJudge: async (judgeID) => {
        try {
            await axiosInstance.delete(`/judge/delete-judge/${judgeID}`);
            set({ judges: get().judges.filter(judge => judge.judgeID !== judgeID) });
            toast.success("Judge deleted successfully");
        } catch (error) {
            console.error(error);
            toast.error("Failed to delete judge");
        }
    }
}));