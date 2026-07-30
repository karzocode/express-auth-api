import { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/axios';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const res = await api.get('/me');
          setUser(res.data.user);
          localStorage.setItem('user', JSON.stringify(res.data.user));
        } catch {
          logout();
        }
      }
      setInitialLoading(false);
    };
    checkAuth();
  }, []);

  const register = async (data) => {
    setLoading(true);
    try {
      const res = await api.post('/register', data);
      return res.data;
    } catch (err) {
      throw err.response?.data?.message || 'حدث خطأ أثناء التسجيل';
    } finally {
      setLoading(false);
    }
  };

  const login = async (identifier, password) => {
    setLoading(true);
    try {
      const res = await api.post('/login', { identifier, password });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      setUser(res.data.user);
      return res.data;
    } catch (err) {
      throw err.response?.data?.message || 'خطأ في تسجيل الدخول';
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  const value = {
    user,
    loading,
    initialLoading,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
    register,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
