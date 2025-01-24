import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTask } from '../features/taskSlice';
import { toast,ToastContainer } from 'react-toastify';

const TaskList = () => {
  const tasks = useSelector((state) => state.tasks);
  const username = useSelector((state) => state.auth.username); // Get the logged-in username
  const dispatch = useDispatch();

  // Filter tasks by username (only show tasks belonging to the logged-in user)
  const userTasks = tasks.filter((task) => task.username === username);

  if (userTasks.length === 0) {
    return (
      <p className="text-center text-gray-200 text-xl mt-8">
        No tasks available. Add some tasks!
      </p>
    );
  }

  return (
    <div className="mt-8 px-2 ">
      <ToastContainer/>
      <h2 className="text-3xl font-bold text-center mb-8 text-white">
        Your Tasks
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6" >
        {userTasks.map((task) => (
          <div
            key={task.id}
            className="bg-gradient-to-b from-blue-100 to-white p-4 rounded-lg shadow-lg flex flex-col items-center justify-between transform transition hover:scale-105"
          >
            {/* Weather Icon and Details */}
            {task.icon && (
              <div className=" flex justify-center p-2 items-center w-full border border-black backdrop-blur-sm bg-black/80 text-white rounded-bl-full rounded-br-full ">
                <img
                  src={task.icon}
                  alt="Weather Icon"
                  className="h-20 w-20 "
                />
                <div>
                <p className="text-white font-medium text-xl">
                  {task.text || "N/A"}
                </p>
                <p>
                  <span className="font-semibold text-white text-2xl">{" "}
                  {task.temperature}°C</span>
                </p>
                <p>
                  <span className="font-semibold text-white text-sm ">{" "}
                  {task.date}</span>
                </p>
                </div>
              </div>
            )}


            {/* Task Details */}
            <h3 className="text-3xl font-bold mb-2 text-gray-800 text-center">
              {task.task}
            </h3>
            <p className="text-lg text-gray-600 mb-2">
              <span className="font-semibold">Priority:</span> {task.priority}
            </p>
            <p className="text-sm text-gray-600 mb-2">
              <span className="font-semibold">Location:</span> {task.location}
            </p>

           
            {/* Delete Button */}
            <button
              className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-md shadow hover:bg-red-600 transition-all duration-200 mt-4 w-full cursor-pointer"
              onClick={() => {
                // console.log(`Deleting task: ${task.task}`); 
                dispatch(deleteTask({ id: task.id, username }));
                toast.success(`Task "${task.task}" deleted successfully!`, {
                  position: "top-right",
                  autoClose: 3000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "colored",
                });
              }}
            >Delete Task
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList;
