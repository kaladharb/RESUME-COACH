import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';
import HistoryPage from './pages/HistoryPage';

function App() {
  return (
    <BrowserRouter>
      {/* Navbar is persistent across all routes */}
      <Navbar />
      
      {/* Main content wrapper */}
      <main className="min-h-[calc(100vh-64px)] w-full">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/history" element={<HistoryPage />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
