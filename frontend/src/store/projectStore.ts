import { create } from "zustand";
import toast from "react-hot-toast";
import axios from "axios";

interface Project {
    name: string;
    team: string;
    table: string;
}

interface ProjectStore {
    projects: Project[];
    fetchProjects: () => Promise<void>;
    addProject: (project: Project) => Promise<void>;
    deleteProject: (name: string) => Promise<void>;
}

const axiosInstance = axios.create({
    baseURL: "http://localhost:5000/api",
    withCredentials: true,
  });

export const projectStore = create<ProjectStore>((set, get) => ({
    projects: [],

    fetchProjects: async () => {
        try {
            const res = await axiosInstance.get("/project/projects");
            set({ projects: res.data });
        } catch (error) {
            console.error(error);
            toast.error("Failed to fetch projects");
        }
    },

    addProject: async (project) => {
        try {
            const res = await axiosInstance.post("/project/add-project", project);
            set({ projects: [...get().projects, res.data] });
            toast.success("Project added successfully");
        } catch (error) {
            console.error(error);
            toast.error("Failed to add project");
        }
    },

    deleteProject: async (name) => {
        try {
            await axiosInstance.delete(`/project/delete-project/${name}`);
            set({ projects: get().projects.filter(project => project.name !== name) });
            toast.success("Project deleted successfully");
        } catch (error) {
            console.error(error);
            toast.error("Failed to delete project");
        }
    }
}));