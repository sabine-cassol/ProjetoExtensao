import { useState } from "react"
import { Link } from "react-router-dom"
import { ArrowLeft} from "lucide-react"
import Img from "../assets/IMG_20251202_183447.png" // Ajuste o caminho da sua imagem se necessário

export default function Login() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
  }

  return (
    <section className="p-4 min-h-screen flex items-center justify-center bg-zinc-50/50">

      <section className="relative flex flex-col lg:flex-row items-center justify-between xl:justify-around w-full max-w-6xl h-auto lg:h-[90vh] border border-zinc-200 rounded-2xl p-6 md:p-12 bg-background  overflow-hidden">
    
        <img src={Img} alt="" className="absolute opacity-10 pointer-events-none select-none w-96 h-96 rotate-250deg -left-10 -bottom-10 lg:right-[75%] lg:top-[50%] lg:left-auto lg:bottom-auto filter drop-shadow-md"/>

        <section className="hidden lg:block max-w-md space-y-4 z-10">
          <h2 className="text-blue-950 text-4xl font-bold ">
            Lorem ipsum  
          </h2>
          <p className="text-zinc-900 text-sm ">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates ea cumque ex illum at corrupti sapiente minima adipisci id magnam commodi, quis rem aperiam facilis officia assumenda quaerat impedit possimus.
          </p>
        </section>

        <section className="w-full max-w-md lg:w-5/12 bg-background lg:border-none p-0 sm:p-6 lg:p-0 rounded-xl z-10 mt-12 lg:mt-0">
          <h2 className="text-cyan-950 font-semibold text-xl mb-4 text-center lg:text-left">
            Entrar na sua conta
          </h2>

          {error && (
            <div className="p-3 mb-4 text-sm font-medium text-destructive bg-destructive/10 rounded-lg text-center" role="alert">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="flex flex-col gap-4 w-full">

            <div className="relative w-full group">
              <input type="text" id="username" placeholder="Digite o usuário" required value={username} onChange={(e) => setUsername(e.target.value)}className="peer w-full rounded-xl border-2 border-zinc-200 bg-background px-3.5 pb-3 pt-7 text-sm font-medium text-zinc-900 placeholder:text-zinc-400 focus:border-cyan-500 focus:bg-zinc-50/30 focus:outline-none transition-all duration-200"/> 
              <label htmlFor="username"className="absolute left-3.5 top-2.5 text-xs font-bold tracking-wide uppercase text-zinc-400 transition-colors duration-200 peer-focus:text-cyan-600 pointer-events-none">
                Usuário / RA
              </label> 
            </div>

            <div className="relative w-full group">
              <input 
                type="password" 
                id="password"
                placeholder="Digite a senha" 
                required 
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
                className="peer w-full rounded-xl border-2 border-zinc-200 bg-background px-3.5 pb-3 pt-7 text-sm font-medium text-zinc-900 placeholder:text-zinc-400 focus:border-cyan-500 focus:bg-zinc-50/30 focus:outline-none transition-all duration-200"
              /> 
              <label 
                htmlFor="password"
                className="absolute left-3.5 top-2.5 text-xs font-bold tracking-wide uppercase text-zinc-400 transition-colors duration-200 peer-focus:text-cyan-600 pointer-events-none"
              >
                Senha
              </label> 
            </div>

            <button className="w-full font-bold text-white bg-cyan-500 hover:bg-cyan-600 active:bg-cyan-700 h-11 text-base rounded-xl cursor-pointer transition-all duration-200 shadow-sm hover:shadow active:scale-[0.99]">
              Entrar
            </button>
          </form>
        </section>
    
        <Link to="/" className="absolute flex gap-1.5 items-center justify-center right-6 top-6 text-xs font-bold uppercase tracking-wider px-3.5 py-2 bg-zinc-100 hover:bg-zinc-200 active:bg-zinc-300 text-zinc-700 rounded-lg transition-colors duration-200"> 
          <ArrowLeft size={16}/> início
        </Link> 

      </section>
    </section>
  )
}