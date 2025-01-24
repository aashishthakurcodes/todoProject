import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTask } from '../features/taskSlice';
import { toast, ToastContainer } from 'react-toastify'

const TaskInput = () => {
  const [task, setTask] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [location, setLocation] = useState('New Delhi');
  const [loading, setLoading] = useState(false); // State for loader
  const username = useSelector((state) => state.auth.username); // Get username from Redux store
  const dispatch = useDispatch();


  

  const handleAddTask = async () => {
    if (!task.trim()) {
      toast.error('Please enter a task!');
      return;
    }

    setLoading(true); // Show loader
    try {
      // Fetch weather data
      const response = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=a4c8e9a086f54b88b5d143234231102&q=${location}`
      );
      const data = await response.json();
      const temperature = data?.current?.temp_c;
      const text = data?.current?.condition?.text;
      const icon = data?.current?.condition?.icon;
      const date = data?.forecast?.forecastday[0]?.date;

      // Dispatch the task with weather data
      dispatch(
        addTask({
          id: Date.now(),
          task,
          priority,
          username,
          location,
          temperature,
          text,
          icon,
          date
        })
      );

      // Clear input fields
      setTask('');
    } catch (error) {
      console.error('Error fetching weather data:', error);
      toast.error('Failed to fetch weather data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center bg-gray-100 p-6">
      <ToastContainer />
      <div className="bg-white p-4 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Add a New Task</h2>
        <div className="space-y-4">
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Enter a task"
            className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />

          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          >
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
          <label className='p-2 text-gray-400'>Choose Location
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            >
              <option value="New Delhi">New Delhi</option>
              <option value="Punjab">Punjab</option>
              <option value="Hyderabad">Hyderabad</option>
              <option value="Bangalore">Bangalore</option>
            </select>
          </label>
          <button
            onClick={handleAddTask}
            className="w-full py-3  bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 cursor-pointer"
            disabled={loading} // Disable button while loading
          >
            {loading ? (
              <div className="flex justify-center items-center space-x-2">
                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-white"></div>
                <span>Adding Task...</span>
              </div>
            ) : (
              'Add Task'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskInput;
