import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../features/authSlice';
import TaskInput from '../components/TaskInput';
import TaskList from '../components/TaskList';
import { keyframes } from '@emotion/react';
import { Toaster, toast } from 'react-hot-toast';

const slideIn = keyframes`
  0% { transform: translateX(100%); opacity: 0; }
  100% { transform: translateX(0); opacity: 1; }
`;

const Home = () => {
  const dispatch = useDispatch();
  const username = useSelector((state) => state.auth.username);

  // Function to get greeting based on the current time
  const getGreetingMessage = () => {
    const hour = new Date().getHours();
    if (hour < 12) {
      return `Good Morning, ${username} 🌅`;
    } else if (hour < 18) {
      return `Good Afternoon, ${username} 🌞`;
    } else {
      return `Good Evening, ${username} 🌙`;
    }
  };

  // Logout Function with Notification
  const handleLogout = () => {
    dispatch(logout()); // Dispatch logout action
    toast.success('You have logged out successfully!', {
      position: 'top-right',
      duration: 8000,
      style: {
        border: '1px solid #4caf50',
        padding: '16px',
        color: 'white',
        backgroundColor: '#4caf50',
      },
      icon: '👋',
    });
  };

  return (
    <div
      className="min-h-screen custom-purple p-5"
      style={{
        backgroundImage: `url("https://static.vecteezy.com/system/resources/previews/006/852/804/non_2x/abstract-blue-background-simple-design-for-your-website-free-vector.jpg")`,
      }}
    >
      <Toaster /> {/* Toast notification container */}
      <div
        className="bg-gray-800 rounded-3xl shadow-xl max-w-2xl mx-auto animate__animated animate__fadeInRight border-2 border-white"
        style={{ animation: `${slideIn} 1s ease-out` }}
      >
        <h5 className="text-3xl p-2 font-semibold text-center text-white">
          {getGreetingMessage()}
        </h5>

        {/* Logout Button */}
        <div className="flex justify-center mb-4">
          <button
            onClick={handleLogout}
            className="bg-blue-600 text-white py-2 px-6 rounded-lg shadow-lg cursor-pointer hover:bg-blue-700 focus:outline-none focus:ring-2"
          >
            Logout
          </button>
        </div>

        {/* Task Input Component */}
        <div className="mb-6">
          <TaskInput />
        </div>
      </div>

      {/* Task List Component */}
      <div className="">
        <TaskList />
      </div>
    </div>
  );
};

export default Home;
