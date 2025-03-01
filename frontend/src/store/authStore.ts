import { create } from "zustand";
import toast from "react-hot-toast";
import { io, Socket } from "socket.io-client";
import axios from "axios";

interface AuthUser {
  name: string;
  judgeID: string;
  role: string;
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

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true
});

const BASE_URL = "http://localhost:5000";

export const authStore = create<AuthStore>((set, get) => ({
  authUser: null,
  socket: null,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });
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
      console.log("Login data", data);
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data });
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
    const socket = io(BASE_URL);
    set({ socket });
  },

  disconnectSocket: () => {
    const { socket } = get();
    if (socket) {
      socket.disconnect();
      set({ socket: null });
    }
  },
}));