import Header from '../components/Header.jsx'
import SideBar1 from '../components/SideBar1.jsx';
import NewsSlider from '../components/NewsSlider'
import Options from '../components/Options.jsx'
import styles from '../Styles/Home.module.css';

import { useState, useEffect } from "react";
import { useUser } from "../context/UserContext.jsx"

function Home() {
  const { role } = useUser(); 

  const [showSideBar, setShowSideBar] = useState(true);

  const mainContentClass = showSideBar ? styles.empurrado : styles.principal;


    useEffect(() => {
        if (role === 'guest' && showSideBar) {
            setShowSideBar(false);
        }
    }, [role]);

  return(
    <>

        <Header aoClick={()=>{
            setShowSideBar(!showSideBar);
        }
        } />
    <SideBar1 visivel={showSideBar}/>

    <main className={`${styles.principal} ${mainContentClass}`}>
  

    <NewsSlider/> 

      <section className={styles.info}>
        <h1 className={styles.infoTitulo}>
          A EXTENSÃO UNIVERSITÁRIA NA UNICESUMAR
        </h1>

        <p className={styles.infoTexto}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi aliquam fugiat voluptatum neque earum! Aut dicta, voluptates quia et ducimus dolor quam! Maiores iure similique nesciunt adipisci ipsam porro sequi! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus atque laboriosam, iste error molestiae assumenda quod cupiditate unde animi quidem placeat nostrum possimus. Accusantium dicta dolor aperiam ipsa error blanditiis.</p>
  
      </section>
     
  
      <Options />

    </main>
      <footer className={styles.footer}>
        
         @2025 UNICESUMAR. Todos direitos reservados.

      </footer>

    </>
  )
}

export default Home