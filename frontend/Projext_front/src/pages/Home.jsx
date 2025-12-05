import Header from '../components/Header.jsx'
import SideBar1 from '../components/SideBar1.jsx';
import NewsSlider from '../components/NewsSlider'
import Options from '../components/Options.jsx'
import styles from '../Styles/Home.module.css';

import { useState } from "react";
import { useUser } from "../context/UserContext.jsx"

function Home() {

  const { user, role, logout } = useUser();

  const [showSideBar, setShowSideBar] = useState(true);
  const mainContentClass = showSideBar ? styles.empurrado : styles.principal;


  return(
    <>

        <Header aoClick={()=>{
            setShowSideBar(!showSideBar)
        }} />
    <SideBar1 visivel={showSideBar}/>

    <main className={`${styles.principal} ${mainContentClass}`}>
  

    <NewsSlider/> 

      <section className={styles.info}>
        <h1 className={styles.infoTitulo}>
          A EXTENSÃO UNIVERSITÁRIA NA UNICESUMAR
        </h1>

        <p className={styles.infoTexto}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi aliquam fugiat voluptatum neque earum! Aut dicta, voluptates quia et ducimus dolor quam! Maiores iure similique nesciunt adipisci ipsam porro sequi! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus atque laboriosam, iste error molestiae assumenda quod cupiditate unde animi quidem placeat nostrum possimus. Accusantium dicta dolor aperiam ipsa error blanditiis.</p>
  
      </section>

       {role === 'professor' && (
                        <p style={{color: 'blue'}}>👨‍🏫 Você tem permissões de Professor. Acesse a gestão de notas e turmas.</p>
                    )}
       {role === 'aluno' && (
                        <p style={{color: 'green'}}>📚 Você tem permissões de Aluno. Consulte seus materiais e desempenho.</p>
                    )}
       {role === 'guest' && (
          <p style={{color: 'black'}}>📚 Você tem permissões de visitatne. Consulte seus materiais e desempenho.</p>
        )}      
        

      <Options />

    </main>
      <footer className={styles.footer}>
        
         @2025 UNICESUMAR. Todos direitos reservados.

      </footer>

    </>
  )
}

export default Home