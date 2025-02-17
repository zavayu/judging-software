import { Navigate, Routes, Route } from "react-router-dom"
import LoginPage from "./pages/LoginPage"
import AdminLogin from "./pages/AdminLogin"
import JudgeHome from "./pages/JudgeHome"
import AdminHome from "./pages/AdminHome"


function App() {

  return (
    <div>
      <Routes>
        <Route path="/" element={<JudgeHome/>} />
        <Route path="/admin" element={<AdminHome/>} />
        <Route path="/login-admin" element={<AdminLogin/>} />
        <Route path="/login" element={<LoginPage/>} />
      </Routes>
    </div>
  )
}

export default App
