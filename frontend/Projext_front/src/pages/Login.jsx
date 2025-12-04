import styles from '../Styles/Login.module.css';
import Img from '../assets/IMG_20251202_183447.png';
import { useState } from 'react';
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { X } from "lucide-react";
import { Check } from "lucide-react";




export default function Login(){
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

                <form action="">
                        <div className={styles.inputWrapper}>
                            {/* <X className={styles.invalid}/>  */}
                            <input type="text" placeholder="Digite o usuário" required /> 
                        <p>Usuário/RA</p> 
                        </div>
                        <div className={styles.inputWrapper}>
                            {/* <Check className={styles.valid}/> */}
                            <input type="password" placeholder="Digite a senha" required/> 
                        <p>Senha</p> 
                        </div>
                        <button className={styles.inputButton}> Entrar </button>
                </form>
                    </section>
                
            <Link className={styles.backButton} to="/"> <ArrowLeft size={18}/>início</Link> 
        </section>
    </section>
    )
}