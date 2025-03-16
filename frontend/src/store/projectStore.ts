import { create } from "zustand";
import toast from "react-hot-toast";
import axios from "axios";
import { Project } from "./interfaces";
import { authStore } from "./authStore";

interface ProjectStore {
    projects: Project[];
    selectedProject: Project | null;
    setSelectedProject: (selectedProject: Project | null) => void;
    fetchProjects: () => Promise<void>;
    subscribeToProjects: () => void
    unsubscribeFromProjects: () => void;
    addProject: (project: Project) => Promise<void>;
    updateProject: (id: string, project: Partial<Project>) => Promise<void>;
    deleteProject: (name: string) => Promise<void>;
    getProjectById: (id: string) => Promise<Project | null>;
}

const VITE_BASE_URL = import.meta.env.VITE_BASE_URL || '';

const axiosInstance = axios.create({
  baseURL: `${VITE_BASE_URL}/api`,
  withCredentials: true
});

export const projectStore = create<ProjectStore>((set, get) => ({
    projects: [],
    selectedProject: null,

    setSelectedProject: (selectedProject: Project | null) => set({ selectedProject }),

    fetchProjects: async () => {
        try {
            const res = await axiosInstance.get("/project/projects");
            set({ projects: res.data });
        } catch (error) {
            console.error(error);
            toast.error("Failed to fetch projects");
        }
    },

    subscribeToProjects: () => {
        const socket = authStore.getState().socket;
        socket?.on("newProject", (project: Project) => {
            set((state) => ({ projects: [...state.projects, project] }));
        });
        socket?.on("deleteProject", (project: Project) => {
            const projectId = project._id;
            set((state) => ({ projects: state.projects.filter(project => project._id !== projectId) }));
        });
        socket?.on("projectAssigned", async ({ projectID }) => {
            console.log("Project assigned:", projectID);
          });
    },

    unsubscribeFromProjects: () => {
        const socket = authStore.getState().socket;
        socket?.off("newProject");
        socket?.off("deleteProject");
        socket?.off("projectAssigned");
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

    updateProject: async (id, project) => { 
        try {
            const res = await axiosInstance.put(`/project/update-project/${id}`, project);
            set({
                projects: get().projects.map(p => p._id === id ? res.data : p),
                selectedProject: res.data,
            });
            toast.success("Project updated successfully");
        } catch (error) {
            console.error(error);
            toast.error("Failed to update project");
        }
    },

    deleteProject: async (id) => {
        try {
            await axiosInstance.delete(`/project/delete-project/${id}`);
            set({ projects: get().projects.filter(project => project._id !== id) });
            toast.success("Project deleted successfully");
        } catch (error) {
            console.error(error);
            toast.error("Failed to delete project");
        }
    },

    getProjectById: async (id) => {
        try {
            const res = await axiosInstance.get(`/project/${id}`);
            return res.data;
        } catch (error) {
            console.error(error);
            toast.error("Failed to fetch project details");
            return null;
        }
    },
}));