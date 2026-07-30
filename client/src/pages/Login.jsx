import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await login(identifier, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4">
      <div className="w-full max-w-[440px]">
        <div className="text-center mb-8">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center text-2xl font-bold shadow-xl shadow-violet-600/20 mb-4">A</div>
          <h1 className="text-3xl font-bold tracking-tight">مرحباً بعودتك</h1>
          <p className="text-white/50 mt-2 text-sm">سجل دخولك بـ Email أو Username</p>
        </div>

        <div className="glass-strong rounded-[24px] p-8 shadow-2xl">
          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 text-sm">{error}</div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-xs text-white/60 mb-1.5 block">Email أو Username</label>
              <input
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                required
                className="input-field"
                placeholder="kariem@example.com أو kariemtamer"
              />
            </div>
            <div>
              <label className="text-xs text-white/60 mb-1.5 block">الباسورد</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="input-field"
                placeholder="••••••••"
              />
            </div>

            <button type="submit" disabled={loading} className="btn-primary disabled:opacity-50 mt-2">
              {loading ? 'جاري الدخول...' : 'تسجيل الدخول'}
            </button>
          </form>

          <div className="mt-8 p-4 rounded-xl bg-violet-500/10 border border-violet-500/15">
            <p className="text-[11px] text-violet-300/80 font-mono leading-relaxed">
              POST /api/auth/login<br/>
              {'{'} identifier, password {'}'}
            </p>
          </div>

          <p className="text-center text-sm text-white/40 mt-6">
            معندكش حساب؟ <Link to="/register" className="text-violet-400 hover:text-violet-300 font-medium">إنشاء حساب</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
