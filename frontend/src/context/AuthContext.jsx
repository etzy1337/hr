import { createContext, useContext, useState, useEffect } from "react";
import { API_BASE } from "../data/jobs";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Przy starcie sprawdź czy jest aktywna sesja
  useEffect(() => {
    fetch(`${API_BASE}/api/Account/AuthMe`, { credentials: "include" })
      .then(res => res.ok ? res.json() : null)
      .then(data => setUser(data))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  const login = (userData) => setUser(userData);

  const logout = async () => {
    await fetch(`${API_BASE}/api/Account/logout`, {
      method: "POST",
      credentials: "include"
    });
    setUser(null);
  };

  // Użytkownik ma rolę Admin lub Examiner (nazwy ról z backendu kolegi)
  const isAdmin = user?.roles?.some(r =>
    r.toLowerCase() === "admin"
  ) ?? false;

  const isExaminer = user?.roles?.some(r =>
    r.toLowerCase() === "examiner"
  ) ?? false;

  return (
    <AuthContext.Provider value={{ user, login, logout, isAdmin, isExaminer, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
