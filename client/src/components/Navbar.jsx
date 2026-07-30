import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="sticky top-0 z-50 glass border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center font-bold text-lg shadow-lg shadow-violet-600/20">
            A
          </div>
          <span className="font-bold text-lg tracking-tight">AuthAPI</span>
          <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-violet-500/20 text-violet-300 border border-violet-500/20">v1</span>
        </Link>

        <div className="flex items-center gap-2">
          {!isAuthenticated ? (
            <>
              <Link to="/login" className="px-4 py-2 rounded-xl text-sm text-white/70 hover:text-white hover:bg-white/5 transition">
                دخول
              </Link>
              <Link to="/register" className="px-5 py-2.5 rounded-xl text-sm bg-white text-black font-semibold hover:bg-white/90 transition">
                حساب جديد
              </Link>
            </>
          ) : (
            <>
              <span className="hidden md:block text-sm text-white/50 mr-2">
                أهلاً، <b className="text-white">{user?.firstName || user?.username}</b>
                {user?.role === 'admin' && (
                  <span className="ml-2 text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">ADMIN</span>
                )}
              </span>
              <Link to="/dashboard" className="px-4 py-2 rounded-xl text-sm text-white/70 hover:text-white hover:bg-white/5 transition">لوحتي</Link>
              <Link to="/protected" className="hidden md:block px-4 py-2 rounded-xl text-sm text-white/70 hover:text-white hover:bg-white/5 transition">Protected</Link>
              {user?.role === 'admin' && (
                <Link to="/admin" className="px-4 py-2 rounded-xl text-sm bg-amber-500/10 text-amber-300 border border-amber-500/20 hover:bg-amber-500/20 transition">Admin</Link>
              )}
              <button onClick={handleLogout} className="px-4 py-2 rounded-xl text-sm bg-white/5 hover:bg-red-500/10 hover:text-red-400 border border-white/5 transition">
                خروج
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
