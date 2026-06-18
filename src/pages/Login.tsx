// import { useState } from "react"
// // import { Link } from "react-router-dom"
// // import { ArrowLeft} from "lucide-react"
// // import Img from "../assets/IMG_20251202_183447.png" 

import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import Extension from '../assets/Extension.svg';
import { ArrowLeft } from 'lucide-react'

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
    <section className="p-4 min-h-screen flex border bg-zinc-50/50 overflow-x-hidden">

      <section className='border border-zinc-200 bg-white w-full flex-1 flex justify-center items-center rounded-lg flex-row'>
        <section className='w-1/2 h-full hidden md:flex items-center justify-center  rounded-md '>
          <img src={Extension} className='absolute opacity-30 aspect-square min-w-65 bottom-0 left-0' />
          <div className='p-24 flex flex-col gap-4'>
            <h1 className='text-4xl font-bold text-(--darkBlue)'>
              Lorem ipsum
            </h1>
            <p className='text-xs'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque iste nulla, impedit quos, ducimus laudantium delectus explicabo modi hic nihil asperiores unde, sed nostrum saepe suscipit quisquam architecto ab voluptate.</p>
          </div>
        </section>

        {/* Lado Direito (Azul) */}
        {/* Removemos o w-full e adicionamos h-full */}
        <section className='w-1/2 h-full flex items-center justify-center rounded-md relative'>

          <section>
            {erroAuth && (
              <p>Ocorreu um erro</p>
            )}
            <form onSubmit={handleSubmit}>
              <div className='flex flex-col items-center justify-center gap-2.5 w-100 p-6  '>
                <Link to="/" className='absolute top-8 right-8 bg-zinc-100 rounded-lg p-2 px-4 flex items-center gap-1 '>
                  <span>
                    <ArrowLeft size={16} />
                  </span>
                  Início
                </Link>
                <h2 className='text-xl font-bold text-(--darkBlue)'>
                  Entrar na sua conta
                </h2>
                <label htmlFor="" className='mr-auto'>Digite o usuário</label>
                <input type="text" value={login} onChange={(e) => setLogin(e.target.value)} placeholder="digite seu usuário" required className='border-3 p-3 w-full border-cyan-300 rounded-xl focus:outline-0 ' />
                <label htmlFor="" className='mr-auto'>Digite sua senha</label>
                <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="digite sua senha" required className='border-3 p-3 w-full border-cyan-300 rounded-xl focus:outline-0 ' />
                <button type="submit" className='cursor-pointer w-full bg-(--lightCyan) rounded-md p-2 text-white font-semibold hover:bg-cyan-500 active:bg-cyan-300'> Entrar </button>
              </div>
            </form>
          </section>
        </section>
      </section>
    </section>
  )
}