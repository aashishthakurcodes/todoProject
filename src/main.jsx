import React from 'react';
import ReactDOM from 'react-dom/client'; // Use 'react-dom/client' instead of 'react-dom'
import { Provider } from 'react-redux';
import App from './App';
import store from './store/store';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root')); // Create the root
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
