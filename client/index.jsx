import React from 'react';
import ReactDOM from 'react-dom/client';  // Correct import for React 18+
import App from './App';
import './index.css';

const root = document.getElementById('root');
const rootElement = ReactDOM.createRoot(root);  // Use the correct method
rootElement.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
