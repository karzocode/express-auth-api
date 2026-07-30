import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const { user } = useAuth();
  const [protectedData, setProtectedData] = useState(null);
  const [meData, setMeData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [prot, me] = await Promise.all([
          api.get('/protected'),
          api.get('/me')
        ]);
        setProtectedData(prot.data);
        setMeData(me.data.user);
      } catch (e) {
        console.error(e);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      {/* Welcome Card */}
      <div className="glass-strong rounded-[28px] p-8 md:p-10 mb-8 relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-violet-600/30 rounded-full blur-[80px]"></div>
        <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-indigo-600/20 rounded-full blur-[80px]"></div>
        
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h1 className="text-4xl font-bold tracking-tight">أهلاً {user?.firstName} 👋</h1>
              <p className="text-white/50 mt-3">ده الـ Dashboard بتاعك، كل بياناتك من الـ API مباشرة</p>
              <div className="flex gap-2 mt-5">
                <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs">@{user?.username}</span>
                <span className="px-3 py-1 rounded-full bg-violet-500/15 border border-violet-500/20 text-xs text-violet-300">{user?.role}</span>
                <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-300">✓ Authenticated</span>
              </div>
            </div>
            <div className="flex gap-3">
              <Link to="/protected" className="px-5 py-3 rounded-xl bg-white text-black font-semibold text-sm hover:bg-white/90">جرب Protected</Link>
              {user?.role === 'admin' && <Link to="/admin" className="px-5 py-3 rounded-xl bg-amber-500 text-black font-semibold text-sm hover:bg-amber-400">Admin Panel</Link>}
            </div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* User Card */}
        <div className="glass rounded-[20px] p-6">
          <h3 className="font-semibold mb-1 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span> GET /api/auth/me
          </h3>
          <p className="text-xs text-white/40 mb-4">الـ Token شغال و البيانات جاية من MongoDB</p>
          <pre className="bg-black/30 rounded-xl p-4 text-[12px] font-mono text-white/70 overflow-auto max-h-[320px] border border-white/5">
{JSON.stringify(meData || user, null, 2)}
          </pre>
        </div>

        {/* Protected Card */}
        <div className="glass rounded-[20px] p-6">
          <h3 className="font-semibold mb-1 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-violet-400"></span> GET /api/auth/protected
          </h3>
          <p className="text-xs text-white/40 mb-4">لازم يكون معاك Bearer Token</p>
          <pre className="bg-black/30 rounded-xl p-4 text-[12px] font-mono text-white/70 overflow-auto border border-white/5">
{JSON.stringify(protectedData || { loading: true }, null, 2)}
          </pre>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5">
              <p className="text-[11px] text-white/40 uppercase tracking-widest">Email</p>
              <p className="text-sm font-medium mt-1 truncate">{user?.email}</p>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5">
              <p className="text-[11px] text-white/40 uppercase tracking-widest">Phone</p>
              <p className="text-sm font-medium mt-1">{user?.phone}</p>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5">
              <p className="text-[11px] text-white/40 uppercase tracking-widest">Age</p>
              <p className="text-sm font-medium mt-1">{user?.age}</p>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5">
              <p className="text-[11px] text-white/40 uppercase tracking-widest">Joined</p>
              <p className="text-sm font-medium mt-1">{user?.createdAt ? new Date(user.createdAt).toLocaleDateString('ar-EG') : '—'}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 glass rounded-[20px] p-6 border-dashed">
        <h4 className="text-sm font-semibold mb-3">🔧 إيه اللي اتضاف للـ Backend؟</h4>
        <ul className="text-sm text-white/50 list-disc list-inside space-y-1 font-mono text-[13px]">
          <li>cors({` origin: ["http://localhost:5173"] `})</li>
          <li>Authorization: Bearer &lt;token&gt; interceptor in axios</li>
          <li>Auto refresh /me on app load</li>
        </ul>
      </div>
    </div>
  );
}
