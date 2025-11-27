import '../Styles/Login.css'
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react"

export default function Login(){
    return (
    <section className='loginContainer'>
        <section className="login">
            <section className='loginTextInfo'>
                <h2>Lorem ipsum</h2>
                <p> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates ea cumque ex illum at corrupti sapiente minima adipisci id magnam commodi, quis rem aperiam facilis officia assumenda quaerat impedit possimus.</p>
            </section>
            <section className='loginInputContainer'>
                <h2>Entrar na sua conta</h2>
                <input type="text" placeholder="email" required/>
                <input type="password" placeholder="senha" required/>
                <button className='inputButton'> Entrar </button>
            </section>
            <Link className='backButton' to="/"> <ArrowLeft size={18}/>Voltar</Link> 
        </section>
    </section>
    )
}