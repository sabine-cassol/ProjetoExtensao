import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { USERS } from '../data/Users.ts'
import { logintest } from '../services/Login.ts';

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

  // login sem api
  // const loginAction = async (loginField: string, passwordField: string): Promise<boolean> => {
  //   setLoading(true);
  //   setErroAuth(null);

  //   return new Promise((resolve) => {
  //     setTimeout(() => {
  //       const foundUser = USERS.find(
  //         (u) => u.login === loginField && u.password === passwordField
  //       );

  //       if (foundUser) {
  //         const loggedInUser: User = {
  //           id: foundUser.id,
  //           login: foundUser.login,
  //           role: foundUser.role as UserRole,
  //           ra: foundUser.RA
  //         };


  //         localStorage.setItem('@SeuApp:user', JSON.stringify(loggedInUser));

  //         setUser(loggedInUser);
  //         setLoading(false);
  //         resolve(true);
  //       } else {
  //         setErroAuth('Usuário ou senha incorretos.');
  //         setLoading(false);
  //         resolve(false);
  //       }
  //     }, 1500);
  //   });
  // };

  //login com a api
  const loginAction = async (loginField: string, passwordField: string): Promise<boolean> => {
    setLoading(true);
    setErroAuth(null);

    try {
      const resultadoApi = await logintest.logar({
        email: loginField,
        senha: passwordField
      });

      // 1. Mapeia o 'tipo' da API para o 'role' do Front-end
      let roleDefinido: UserRole = 'guest'; // valor padrão caso não encontre

      if (resultadoApi.tipo === 'aluno') {
        roleDefinido = 'student';
      } else if (resultadoApi.tipo === 'professor') {
        roleDefinido = 'teacher';
      }

      // 2. Como os dados do aluno estão dentro de resultadoApi.aluno, pegamos de lá
      const dadosUsuario = resultadoApi.aluno;

      if (!dadosUsuario) {
        throw new Error('Dados do usuário não foram encontrados na resposta.');
      }

      // 3. Monta o objeto User do Front-end perfeitamente
      const loggedInUser: User = {
        id: String(dadosUsuario.id),
        login: dadosUsuario.email, // Ou dadosUsuario.nome, dependendo do que você usa como login
        role: roleDefinido,
        ra: dadosUsuario.ra ?? ''
      };

      // 4. Salva no localStorage e no estado
      localStorage.setItem('@SeuApp:user', JSON.stringify(loggedInUser));
      setUser(loggedInUser);

      return true;

    } catch (error: any) {
      console.error("Erro no loginAction:", error);
      setErroAuth(error.message || 'Falha ao conectar com o servidor.');
      return false;
    }
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