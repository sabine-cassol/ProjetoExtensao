import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { USERS } from '../data/Users.ts'

export type UserRole = 'guest' | 'student' | 'teacher';

interface User {
  id: string;
  login: string;
  role: UserRole;
  ra: string;
}

interface AuthContextData {
  user: User | null;
  loading: boolean;
  erroAuth: string | null;
  role: UserRole;
  loginAction: (loginField: string, passwordField: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [erroAuth, setErroAuth] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const role: UserRole = user ? (user.role as UserRole) : 'guest';
  useEffect(() => {
    const storedUser = localStorage.getItem('@SeuApp:user');

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    setLoading(false);
  }, []);

  const loginAction = async (loginField: string, passwordField: string): Promise<boolean> => {
    setLoading(true);
    setErroAuth(null);

    return new Promise((resolve) => {
      setTimeout(() => {
        const foundUser = USERS.find(
          (u) => u.login === loginField && u.password === passwordField
        );

        if (foundUser) {
          const loggedInUser: User = {
            id: foundUser.id,
            login: foundUser.login,
            role: foundUser.role as UserRole,
            ra: foundUser.RA
          };

  
          localStorage.setItem('@SeuApp:user', JSON.stringify(loggedInUser));

          setUser(loggedInUser);
          setLoading(false);
          resolve(true);
        } else {
          setErroAuth('Usuário ou senha incorretos.');
          setLoading(false);
          resolve(false);
        }
      }, 1500);
    });
  };

  const logout = () => {
    localStorage.removeItem('@SeuApp:user');
    Object.keys(localStorage).forEach((key) => {
    if (key.startsWith('@Ponto:')) {
      localStorage.removeItem(key);
    }
  });
    setUser(null);
    setErroAuth(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, erroAuth, role, loginAction, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um UserProvider');
  }
  return context;
};