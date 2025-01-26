import React from 'react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import AppProject from './components/pages/Project';
import './styles/sidebar.css';
import './index.css';
// Example components for different routes

const App = () => (
  <MemoryRouter>
    <div>
      <Routes>
        <Route path="/" element={<AppProject />} />
      </Routes>
    </div>
  </MemoryRouter>
);

export default App;