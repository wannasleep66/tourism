import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TourismPicker from './components/tourismPicker/TourismPicker';
import ManagerDashboard from './components/manager/ManagerDashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TourismPicker />} />
        <Route path="/manager" element={<ManagerDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;