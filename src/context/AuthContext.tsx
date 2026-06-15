import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

export type UserRole = 'guest' | 'student' | 'teacher';

interface User {
  id: string;
  login: string;
  role: UserRole;
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


const MOCK_USERS = [
  { id: '1', login: 'professor@escola.com', password: '123', role: 'teacher' as UserRole },
  { id: '2', login: 'aluno@escola.com', password: '123', role: 'student' as UserRole }
];

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [erroAuth, setErroAuth] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const role: UserRole = user ? user.role : 'guest';


  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);


  const loginAction = async (loginField: string, passwordField: string): Promise<boolean> => {
    setLoading(true);
    setErroAuth(null);

    return new Promise((resolve) => {
      setTimeout(() => {

        const foundUser = MOCK_USERS.find(
          (u) => u.login === loginField && u.password === passwordField
        );

        if (foundUser) {

          setUser({
            id: foundUser.id,
            login: foundUser.login,
            role: foundUser.role
          });
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