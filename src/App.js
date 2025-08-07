import React from 'react';
import { Routes, Route } from 'react-router-dom';  // <- sem BrowserRouter aqui
import Home from './pages/Home';
import RestaurantPage from './pages/RestaurantPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/restaurant/:id" element={<RestaurantPage />} />
    </Routes>
  );
}
