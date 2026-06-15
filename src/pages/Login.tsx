// import { useState } from "react"
// // import { Link } from "react-router-dom"
// // import { ArrowLeft} from "lucide-react"
// // import Img from "../assets/IMG_20251202_183447.png" 

import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  // const [username, setUsername] = useState("")
  // const [password, setPassword] = useState("")
  // const [error, setError] = useState("")

  const { loginAction, erroAuth } = useAuth();
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!login || !password) return;

    const sucesso = await loginAction(login, password);
    if (sucesso) {
      console.log('Redirecionar usuário para a Dashboard...');
      navigate('/');
    }
  };
  return (
    <section className="p-4 min-h-screen flex items-center justify-center bg-zinc-50/50">
      {erroAuth && (
        <p>Ocorreu um erro</p>
      )}
      <form onSubmit={handleSubmit}>
        <label htmlFor=""></label>
        <input type="text" value={login} onChange={(e)=>setLogin(e.target.value)} placeholder="digite seu usuário" />
        <label htmlFor=""></label>
        <input type="text" value={password} onChange={(e)=>setPassword(e.target.value)}  placeholder="digite sua senha" />
        <button type="submit" className='cursor-pointer'> entrar </button>
      </form>
    </section>
  )
}