import { createContext, useEffect, useState, useContext } from "react";
import type { LoginDto, RegisterDto, LoggedUserDto } from "../Models/User";
import { authMe, login, logout, register } from "../Api/AccountApi";

type AuthContextType = {
  user: LoggedUserDto | null;
  isLoading: boolean;

  loginUser: (dto: LoginDto) => Promise<void>;
  registerUser: (dto: RegisterDto) => Promise<void>;
  logoutUser: () => Promise<void>;

  isAuthenticated: boolean;
  isAdmin: () => boolean;
  isExaminer: ()=>boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<LoggedUserDto | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const res = await authMe();
        setUser(res);
      } catch {
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, []);

  const loginUser = async (dto: LoginDto) => {
    const userData = await login(dto);
    setUser(userData);
  };

  const registerUser = async (dto: RegisterDto) => {
    const userData = await register(dto);
    setUser(userData);
  };

  const logoutUser = async () => {
    await logout();
    setUser(null);
  };

  const isAuthenticated = !!user;

  const isAdmin = () => {
    return user?.roles?.includes("Admin") ?? false;
  };
   const isExaminer = () => {
    return user?.roles?.includes("Examiner") ?? false;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        loginUser,
        registerUser,
        logoutUser,
        isAuthenticated,
        isAdmin,
        isExaminer
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (ctx === undefined) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return ctx;
};