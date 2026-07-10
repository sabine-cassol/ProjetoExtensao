import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { USERS } from '../data/Users.ts'
import { loginStudent, loginTeacher, type AuthResponse } from '../services/Login.ts';

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
  loginAction: (loginField: string, passwordField: string, selectedRole: 'aluno' | 'professor') => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [erroAuth, setErroAuth] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const url = import.meta.env.VITE_API_URL_PROXY || '/api';

  const role: UserRole = user ? (user.role as UserRole) : 'guest';

  useEffect(() => {
    const verificarSessao = async () => {
      try {
        const usuarioLocal = localStorage.getItem('@SeuApp:user');

        if (!usuarioLocal) {
          setLoading(false);
          return;
        }

        const usuarioLogado: User = JSON.parse(usuarioLocal);
        const rotaMe = usuarioLogado.role === 'teacher' ? '/professores/me' : '/alunos/me';


        const response = await fetch(`${url}${rotaMe}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
        });

        if (!response.ok) {
          localStorage.removeItem('@SeuApp:user');
          setUser(null);
          return; 
        }

        const dadosUsuario = await response.json();
        let dadosInternos = null;

        if (dadosUsuario.aluno || dadosUsuario.professor) {
          dadosInternos = usuarioLogado.role === 'teacher' ? dadosUsuario.professor : dadosUsuario.aluno;
        } else {
          dadosInternos = dadosUsuario;
        }

        if (!dadosInternos || !dadosInternos.id) {
          throw new Error("Formato de dados inválido ou ID ausente na resposta do /me");
        }

        const usuarioAtualizado: User = {
          id: String(dadosInternos.id),
          login: dadosInternos.email || dadosInternos.login,
          role: usuarioLogado.role,
          ra: 'ra' in dadosInternos ? String(dadosInternos.ra) : ''
        };

        setUser(usuarioAtualizado);
        localStorage.setItem('@SeuApp:user', JSON.stringify(usuarioAtualizado));
      } catch (error) {
        console.error("❌ Erro fatal ao restaurar sessão:", error);
        localStorage.removeItem('@SeuApp:user');
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    verificarSessao();
  }, [url]);



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
  const loginAction = async (
    loginField: string,
    passwordField: string,
    selectedRole: 'aluno' | 'professor'
  ): Promise<boolean> => {
    setLoading(true);
    setErroAuth(null);

    try {
      const serviçoLogin = selectedRole === 'professor' ? loginTeacher : loginStudent;

      // 1. resultadoApi agora está corretamente tipado como AuthResponse
      const resultadoApi: AuthResponse = await serviçoLogin.logar({
        email: loginField,
        senha: passwordField
      });

      if (!resultadoApi) {
        throw new Error('Dados do usuário não foram encontrados na resposta da API.');
      }

      const roleDefinido: UserRole = selectedRole === 'aluno' ? 'student' : 'teacher';

      // 2. Buscamos o objeto interno (seja aluno ou professor) baseado na role
      const dadosUsuario = selectedRole === 'aluno' ? resultadoApi.aluno : resultadoApi.professor;

      // Se o backend não mandou o objeto esperado, barramos aqui
      if (!dadosUsuario) {
        throw new Error(`Dados do ${selectedRole} não vieram na resposta do servidor.`);
      }

      // 3. Monta o usuário global mapeando os campos sem erros de tipagem
      const loggedInUser: User = {
        id: String(dadosUsuario.id),
        login: dadosUsuario.email,
        role: roleDefinido,
        // Se for aluno, lê o 'ra'. Se for professor, deixa vazio '', já que não precisa de matrícula
        ra: 'ra' in dadosUsuario ? String(dadosUsuario.ra) : ''
      };

      localStorage.setItem('@SeuApp:user', JSON.stringify(loggedInUser));
      setUser(loggedInUser);

      return true;

    } catch (error: any) {
      console.error("Erro no loginAction:", error);
      setErroAuth(error.message || 'Falha ao conectar com o servidor.');
      return false;
    } finally {
      setLoading(false);
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