import { createSlice } from '@reduxjs/toolkit';

const loadTasksFromLocalStorage = (username) => {
  const tasks = localStorage.getItem(`tasks_${username}`);
  return tasks ? JSON.parse(tasks) : [];
};

const saveTasksToLocalStorage = (username, tasks) => {
  localStorage.setItem(`tasks_${username}`, JSON.stringify(tasks));
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState: [],
  reducers: {
    setTasks: (state, action) => {
      return action.payload; // Load tasks for the logged-in user
    },
    addTask: (state, action) => {
      const updatedTasks = [...state, action.payload];
      saveTasksToLocalStorage(action.payload.username, updatedTasks);
      console.log(updatedTasks)
      return updatedTasks;
    },
    deleteTask: (state, action) => {
      const updatedTasks = state.filter((task) => task.id !== action.payload.id);
      saveTasksToLocalStorage(action.payload.username, updatedTasks);
      return updatedTasks;
    },
  },
});

export const { setTasks, addTask, deleteTask } = taskSlice.actions;
export default taskSlice.reducer;
