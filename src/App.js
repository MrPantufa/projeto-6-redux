// src/App.js
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import RestaurantPage from './pages/RestaurantPage';
import DeliveryPage from './pages/DeliveryPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/restaurant/:id" element={<RestaurantPage />} />
      <Route path="/entrega" element={<DeliveryPage />} />
    </Routes>
  );
}
