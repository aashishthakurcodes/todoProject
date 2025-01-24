import React, { useState } from "react";
import { Toaster, toast } from 'react-hot-toast';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../features/authSlice";

const Login = () => {
  const [username, setUsername] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username.trim()) {
      dispatch(login(username)); 
      toast.success("Welcome!", { duration: 1000 });
      setTimeout(() => {
        navigate('/'); 
      }, 1000);
    } else {
      toast.error("Please enter a username!", {
        position: "top-right",
        style: {
          border: '1px solid #f44336',
          padding: '16px',
          color: 'white',
          backgroundColor: '#f44336',
        },
        icon: '⚠️', 
      });
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center px-4 sm:px-8 md:px-16 lg:px-24"
      style={{
        backgroundImage: `url('https://static.vecteezy.com/system/resources/previews/009/362/398/original/blue-dynamic-shape-abstract-background-suitable-for-web-and-mobile-app-backgrounds-eps-10-vector.jpg')`,
      }}
    >
      <Toaster />
      {/* Content Section */}
      <div className="w-full max-w-lg p-8 border-4 border-white bg-transparent rounded-2xl shadow-lg backdrop-blur-sm bg-white/30">
        <div className="text-center">
          <h1 className="text-3xl font-semibold text-gray-900 sm:text-5xl">
            Welcome to <span className="text-white">Doingly</span>
          </h1>
          <p className="mt-4 text-sm font-medium text-gray-500 sm:text-lg">
            Become your most productive self! Start your journey now.
          </p>

          <div className="mt-10 flex flex-col gap-4">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 shadow-sm bg-white text-black"
            />
            <button
              onClick={handleLogin}
              className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-50 transition-all duration-300 cursor-pointer"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
