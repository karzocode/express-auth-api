import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const navigate = useNavigate();
  const { register, loading } = useAuth();
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    phone: '',
    age: '',
    password: '',
    role: 'user'
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      await register({ ...form, age: Number(form.age) });
      setSuccess('تم إنشاء الحساب بنجاح! سيتم تحويلك لتسجيل الدخول...');
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      setError(err);
    }
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-[520px]">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center text-2xl font-bold shadow-xl shadow-violet-600/20 mb-4">A</div>
          <h1 className="text-3xl font-bold tracking-tight">إنشاء حساب جديد</h1>
          <p className="text-white/50 mt-2 text-sm">املأ البيانات عشان تبدأ تستخدم الـ API</p>
        </div>

        <div className="glass-strong rounded-[24px] p-8 shadow-2xl">
          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 text-sm">{error}</div>
          )}
          {success && (
            <div className="mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-sm">{success}</div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-white/60 mb-1.5 block">الاسم الأول *</label>
                <input name="firstName" value={form.firstName} onChange={handleChange} required className="input-field" placeholder="كريم" />
              </div>
              <div>
                <label className="text-xs text-white/60 mb-1.5 block">الاسم الأخير *</label>
                <input name="lastName" value={form.lastName} onChange={handleChange} required className="input-field" placeholder="تامر" />
              </div>
            </div>

            <div>
              <label className="text-xs text-white/60 mb-1.5 block">اسم المستخدم *</label>
              <input name="username" value={form.username} onChange={handleChange} required className="input-field" placeholder="kariemtamer" />
            </div>

            <div>
              <label className="text-xs text-white/60 mb-1.5 block">الإيميل *</label>
              <input name="email" type="email" value={form.email} onChange={handleChange} required className="input-field" placeholder="kareem@example.com" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-white/60 mb-1.5 block">الموبايل *</label>
                <input name="phone" value={form.phone} onChange={handleChange} required className="input-field" placeholder="01012345678" />
              </div>
              <div>
                <label className="text-xs text-white/60 mb-1.5 block">السن *</label>
                <input name="age" type="number" min="18" value={form.age} onChange={handleChange} required className="input-field" placeholder="22" />
              </div>
            </div>

            <div>
              <label className="text-xs text-white/60 mb-1.5 block">الباسورد *</label>
              <input name="password" type="password" value={form.password} onChange={handleChange} required className="input-field" placeholder="••••••••" />
            </div>

            <div>
              <label className="text-xs text-white/60 mb-1.5 block">الدور</label>
              <select name="role" value={form.role} onChange={handleChange} className="input-field">
                <option value="user" className="bg-zinc-900">user</option>
                <option value="admin" className="bg-zinc-900">admin</option>
              </select>
            </div>

            <button type="submit" disabled={loading} className="btn-primary mt-2 disabled:opacity-50">
              {loading ? 'جاري الإنشاء...' : 'إنشاء الحساب'}
            </button>
          </form>

          <p className="text-center text-sm text-white/40 mt-6">
            عندك حساب؟ <Link to="/login" className="text-violet-400 hover:text-violet-300 font-medium">سجل دخول</Link>
          </p>
        </div>

        <p className="text-center text-[11px] text-white/20 mt-6">API: {import.meta.env.VITE_API_URL || 'http://localhost:5000/api/auth'}</p>
      </div>
    </div>
  );
}
