// import { useState } from "react"
// // import { Link } from "react-router-dom"
// // import { ArrowLeft} from "lucide-react"
// // import Img from "../assets/IMG_20251202_183447.png" 

export default function Login() {
  // const [username, setUsername] = useState("")
  // const [password, setPassword] = useState("")
  // const [error, setError] = useState("")


  return (
    <section className="p-4 min-h-screen flex items-center justify-center bg-zinc-50/50">
        <form>
          <label htmlFor=""></label>
          <input type="text" placeholder="digite seu usuário"/>
          <label htmlFor=""></label>
          <input type="text" placeholder="digite sua senha"/>
          <button type="submit"> entrar </button>
        </form>
    </section>
  )
}