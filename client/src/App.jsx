import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Protected from './pages/Protected.jsx';
import Admin from './pages/Admin.jsx';

function App() {
  return (
    <div className="min-h-screen bg-[#08080a]">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/protected" element={<ProtectedRoute><Protected /></ProtectedRoute>} />
        <Route path="/admin" element={<ProtectedRoute adminOnly><Admin /></ProtectedRoute>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <footer className="mt-20 border-t border-white/5 py-8 text-center text-[11px] text-white/20">
        Built with ❤️ — Express Auth API + React • Kariem Tamer
      </footer>
    </div>
  );
}

export default App;
