import { create } from "zustand";
import toast from "react-hot-toast";
import { io, Socket } from "socket.io-client";
import axios from "axios";

interface AuthUser {
  _id: string;
  name: string;
  judgeID: string;
  role: string;
  assignedProjects: string[];
}

interface LoginData {
    judgeID: string;
    name?: string;
    password?: string;
  }

interface AuthStore {
  authUser: AuthUser | null;
  socket: Socket | null;
  checkAuth: () => Promise<void>;
  register: (data: Record<string, any>) => Promise<void>;
  login: (data: LoginData) => Promise<void>;
  logout: () => Promise<void>;
  connectSocket: () => void;
  disconnectSocket: () => void;
}

const VITE_BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:5000";

const axiosInstance = axios.create({
  baseURL: `${VITE_BASE_URL}/api`,
  withCredentials: true
});

export const authStore = create<AuthStore>((set, get) => ({
  authUser: null,
  socket: null,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });
      console.log("Auth user", res.data);
      get().connectSocket();
    } catch (error) {
      console.error(error);
      set({ authUser: null });
    }
  },

  register: async (data) => {
    try {
      const res = await axiosInstance.post("/auth/register", data);
      set({ authUser: res.data });
      get().connectSocket();
    } catch (error) {
      console.error(error);
      toast.error("Registration failed");
    }
  },

  login: async (data) => {
    try {
      console.log("Logging in", data, import.meta.env.VITE_BASE_URL);
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data });
      console.log("Logged in", res.data);
      toast.success("Logged in successfully");
      get().connectSocket();
    } catch (error) {
      console.error(error);
      toast.error("Login failed");
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logged out successfully");
      get().disconnectSocket();
    } catch (error) {
      console.error(error);
      toast.error("Logout failed");
    }
  },

  connectSocket: () => {
    const { authUser } = get();
    if (!authUser || get().socket?.connected) return;
    const socket = io(VITE_BASE_URL, {
      query: {
        userId: get().authUser?._id,
      },
    });
    socket.connect();
    set({ socket });

    socket.on("projectAssigned", async ({ projectID }) => {
      console.log("Project assigned:", projectID);
      set({ authUser: { ...authUser, assignedProjects: [...authUser.assignedProjects, projectID] } });
    });
  },

  disconnectSocket: () => {
    const { socket } = get();
    if (socket) {
      socket.disconnect();
      set({ socket: null });
    }
  },
}));