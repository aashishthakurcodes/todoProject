import { createSlice } from '@reduxjs/toolkit';

// Load the authentication state from localStorage
const loadAuthState = () => {
  const authState = localStorage.getItem('authState');
  return authState ? JSON.parse(authState) : { isAuthenticated: false, username: '' };
};

const authSlice = createSlice({
  name: 'auth',
  initialState: loadAuthState(), // Load auth state from localStorage initially
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.username = action.payload; // Set the username when logged in
      localStorage.setItem('authState', JSON.stringify(state)); // Save to localStorage
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.username = ''; // Clear username on logout
      localStorage.removeItem('authState'); // Remove authState from localStorage
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
