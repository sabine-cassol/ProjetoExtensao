import styles from '../Styles/Login.module.css';
import { useUser } from "../context/UserContext.jsx"
import Img from '../assets/IMG_20251202_183447.png';
import { useState } from 'react';
import { Link,useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { X } from "lucide-react";
import { Check } from "lucide-react";


const TEST_ACCOUNTS = [
    {
        user: "aluno123",
        pass: "senhaaluno",
        name: "Eduardo Aluno",
        role: "aluno"
    },
    {
        user: "professor456",
        pass: "senhaprofessor",
        name: "Maria Professora",
        role: "professor"
    }
];



export default function Login(){
    const {login} = useUser();
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    function handleLogin(e){
        e.preventDefault();
        setError('');
        const foundAccount = TEST_ACCOUNTS.find(account => 
            account.user === username && account.pass == password
        )
        
        if(foundAccount){
        const userData ={
            user:foundAccount.user,
            name:foundAccount.name,
            role:foundAccount.role
        }
        console.log(userData)
        login(userData); 
        navigate('/');
        } else{
            setError("Usuário ou senha inválidos. Tente 'aluno123'/'senhaaluno' ou 'professor456'/'senhaprofessor'.");
            console.error("Tentativa de login falhou.");
        }
    }

    return (
    <section className={styles.loginContainer}>
        <section className={styles.login}>

            <img src={Img}></img>
            <section className={styles.loginTextInfo}>
                <h2>Lorem ipsum</h2>
                <p> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates ea cumque ex illum at corrupti sapiente minima adipisci id magnam commodi, quis rem aperiam facilis officia assumenda quaerat impedit possimus.</p>
            </section>
            <section className={styles.loginInputContainer}>
                <h2>Entrar na sua conta</h2>

                {error && <p style={{color: 'red', fontWeight: 'bold'}}>{error}</p>}

                <form onSubmit={handleLogin}>
                        <div className={styles.inputWrapper}>
                            {/* <X className={styles.invalid}/>  */}
                            <input type="text" placeholder="Digite o usuário" required value={username} onChange={(e) => setUsername(e.target.value)}/> 
                        <p>Usuário/RA</p> 
                        </div>
                        <div className={styles.inputWrapper}>
                            {/* <Check className={styles.valid}/> */}
                            <input type="password" placeholder="Digite a senha" required value={password} onChange={(e) => setPassword(e.target.value)}/> 
                        <p>Senha</p> 
                        </div>
                        <button className={styles.inputButton} > Entrar </button>
                </form>
                    </section>
                
            <Link className={styles.backButton} to="/"> <ArrowLeft size={18}/>início</Link> 
        </section>
    </section>
    )
}