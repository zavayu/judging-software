import { Navigate, Routes, Route } from "react-router-dom"
import LoginPage from "./pages/LoginPage"
import AdminLogin from "./pages/AdminLogin"
import JudgeHome from "./pages/JudgeHome"
import AdminHome from "./pages/AdminHome"
import { authStore } from './store/authStore';
import { useEffect } from "react";
import { Toaster } from "react-hot-toast"; 

function App() {
  const { authUser, checkAuth } = authStore();

  useEffect(() => {
    checkAuth()
  }, []);

  return (
    <div>
      <Routes>
        <Route path="/" element={authUser?.role == "judge" ? <JudgeHome/> : <Navigate to="/login"/>} />
        <Route path="/admin" element={authUser?.role == "admin" ? <AdminHome/> : <Navigate to="/login-admin"/>} />
        <Route path="/login-admin" element={!authUser ? <AdminLogin/> : <Navigate to="/admin"/>} />
        <Route path="/login" element={!authUser ? <LoginPage/> : <Navigate to="/"/>} />
      </Routes>
      <Toaster/>
    </div>
  )
}

export default App
