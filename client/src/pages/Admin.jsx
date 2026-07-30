import { useEffect, useState } from 'react';
import api from '../api/axios';

export default function Admin() {
  const [data, setData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    api.get('/admin')
      .then(res => setData(res.data))
      .catch(err => setError(err.response?.data?.message || 'Unauthorized - Admin only'));
  }, []);

  return (
    <div className="max-w-3xl mx-auto px-6 py-16 text-center">
      <div className="glass-strong rounded-[28px] p-10 border-amber-500/20">
        <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-2xl mb-6">👑</div>
        <h1 className="text-3xl font-bold">Admin Only</h1>
        <p className="text-white/50 mt-2">checkRole(['admin']) middleware</p>

        <div className="mt-8 text-left">
          {data ? (
            <pre className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-5 text-sm font-mono text-amber-200">{JSON.stringify(data, null, 2)}</pre>
          ) : error ? (
            <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-5 text-sm text-red-300">{error}</div>
          ) : (
            <div className="flex justify-center py-10"><div className="w-6 h-6 rounded-full border-2 border-white/10 border-t-amber-500 animate-spin"></div></div>
          )}
        </div>

        <div className="mt-8 grid grid-cols-3 gap-3 text-left">
          <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5 text-center">
            <p className="text-2xl">🛡️</p>
            <p className="text-[11px] text-white/40 mt-1">verifyToken</p>
          </div>
          <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5 text-center">
            <p className="text-2xl">👮</p>
            <p className="text-[11px] text-white/40 mt-1">checkRole</p>
          </div>
          <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5 text-center">
            <p className="text-2xl">🔑</p>
            <p className="text-[11px] text-white/40 mt-1">JWT Role</p>
          </div>
        </div>
      </div>
    </div>
  );
}
