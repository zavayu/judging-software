import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { authStore } from '../store/authStore';

export default function LoginPage() {
  const {login} = authStore();
  const [formData, setFormData] = useState({
    name: "",
    judgeID: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await login(formData);
      // Redirect or update UI after successful login
    } catch (error) {
      console.error("Login failed", error);
      // Handle login error
    }
  };

  return (
    <div className="w-full h-full min-h-screen bg-Primary flex flex-col justify-center items-center pt-10">
      <div className="text-center pb-16 sm:pb-10">
        <h1 className="text-5xl font-bold text-white">
          TIDALHACK
        </h1>
        <h2 className="text-4xl font-semibold text-Secondary">
          Judges Portal
        </h2>
      </div>
      {/*Sign in Form:*/} 
      <div className="card card-normal bg-white text-black w-72 sm:w-96 shadow-2xl mb-32 justify-self-center">
        <div className="card-body">
          <form onSubmit={handleSubmit} className="gap-6">

            {/*Name Field:*/}
            <div className="form-control mt-1">
              <label className="label">
                <span className="font-normal">Your Name</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  className={'input input-bordered border-2 border-[#D9D9D9] w-full bg-inherit'}
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
            </div>

            {/*JudgeId Field:*/}
            <div className="form-control mt-1">
              <label className="label">
                <span className="font-normal">Your Judge ID</span>
              </label>
              <div className="relative">
                <input
                  className={'input input-bordered border-2 border-[#D9D9D9] w-full bg-inherit'}
                  placeholder="1234"
                  value={formData.judgeID}
                  onChange={(e) => setFormData({ ...formData, judgeID: e.target.value })}
                />
              </div>
            </div>

            <button type="submit" className="btn text-white font-normal w-full mt-4 mb-2">Sign in</button>

            <div className="text-center">
              <p className="text-base-content/60 text-sm sm:text-base">
                <Link to="/login-admin" className="link text-[#1E1E1E]">
                  Admin Login
                </Link>
              </p>
            </div>
            
          </form>
        </div>
      </div>
    </div>
  )
}