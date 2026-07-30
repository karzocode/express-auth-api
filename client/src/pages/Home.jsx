import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Home() {
  const { isAuthenticated } = useAuth();
  return (
    <div className="max-w-7xl mx-auto px-6">
      {/* Hero */}
      <div className="mt-16 md:mt-24 text-center relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-violet-600/20 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] text-white/50 mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            API is Running on :5000
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-[0.95]">
            Auth API <br/>
            <span className="bg-gradient-to-r from-violet-400 via-indigo-400 to-fuchsia-400 bg-clip-text text-transparent">جاهز للفرونت</span>
          </h1>
          <p className="text-white/50 max-w-2xl mx-auto mt-6 text-base md:text-lg leading-relaxed">
            عملتلك فرونت كامل React + Tailwind مربوط بالـ Express Auth API بتاعك. 
            فيه Login و Register و Role-based Access و كل حاجة جاهزة.
          </p>

          <div className="flex items-center justify-center gap-3 mt-8">
            {!isAuthenticated ? (
              <>
                <Link to="/register" className="px-8 py-3.5 rounded-xl bg-white text-black font-semibold hover:bg-white/90 transition">ابدأ الآن</Link>
                <Link to="/login" className="px-8 py-3.5 rounded-xl glass hover:bg-white/10 transition font-medium">تسجيل دخول</Link>
              </>
            ) : (
              <Link to="/dashboard" className="px-8 py-3.5 rounded-xl bg-white text-black font-semibold">روح للـ Dashboard</Link>
            )}
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="grid md:grid-cols-3 gap-4 mt-20 mb-20">
        {[
          { k: 'POST', ep: '/register', d: 'تسجيل مستخدم جديد مع تشفير bcrypt و validation كاملة', color: 'from-violet-600 to-indigo-600' },
          { k: 'POST', ep: '/login', d: 'دخول بـ email أو username و إرجاع JWT token صالح لمدة ساعة', color: 'from-emerald-600 to-teal-600' },
          { k: 'GET', ep: '/me + /protected + /admin', d: 'روتس محمية بـ verifyToken و checkRole للأدمن فقط', color: 'from-amber-600 to-orange-600' },
        ].map((f) => (
          <div key={f.ep} className="glass rounded-[20px] p-6">
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${f.color} flex items-center justify-center text-[10px] font-bold tracking-widest`}>{f.k}</div>
            <h3 className="font-mono text-sm font-semibold mt-4">{f.ep}</h3>
            <p className="text-sm text-white/40 mt-2 leading-relaxed">{f.d}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
