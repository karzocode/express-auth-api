import { useEffect, useState } from 'react';
import api from '../api/axios';

export default function Protected() {
  const [data, setData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    api.get('/protected')
      .then(res => setData(res.data))
      .catch(err => setError(err.response?.data?.message || 'Error'));
  }, []);

  return (
    <div className="max-w-3xl mx-auto px-6 py-16 text-center">
      <div className="glass-strong rounded-[28px] p-10">
        <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-2xl mb-6">🔒</div>
        <h1 className="text-3xl font-bold">Protected Route</h1>
        <p className="text-white/50 mt-2">الصفحة دي مينفعش تدخلها من غير JWT Token</p>

        <div className="mt-8 text-left">
          {data ? (
            <pre className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-5 text-sm font-mono text-emerald-200">{JSON.stringify(data, null, 2)}</pre>
          ) : error ? (
            <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-5 text-sm text-red-300">{error}</div>
          ) : (
            <div className="flex justify-center py-10"><div className="w-6 h-6 rounded-full border-2 border-white/10 border-t-violet-500 animate-spin"></div></div>
          )}
        </div>

        <div className="mt-8 p-4 rounded-xl bg-black/30 border border-white/5 text-left">
          <code className="text-[11px] text-white/40 font-mono">
            fetch('http://localhost:5000/api/auth/protected', {'{'}<br/>
            &nbsp;&nbsp;headers: {'{'} Authorization: 'Bearer ' + token {'}'}<br/>
            {'}'}) 
          </code>
        </div>
      </div>
    </div>
  );
}
