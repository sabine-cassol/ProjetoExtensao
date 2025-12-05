import logo from '../assets/1763073341698.png';
import logo1 from '../assets/IMG_20251114_003344.png';
import { Link } from "react-router-dom";
import { useEffect , useState } from 'react';
import { Menu, Search } from 'lucide-react'
import styles from '../Styles/Home.module.css';


function Header({isLogged = true, aoClick}) {
    //responsividade da logo
        const [logoSrc, setLogoSrc] = useState(logo);
    
        useEffect(() => {
            function handleResize() {
                if (window.innerWidth < 550) {
                    setLogoSrc(logo); // <-- Define logo padrão/normal para mobile
                } 
        // 2. Condição INTERMEDIÁRIA: Tablet/Small Desktop (entre 550px e 850px)
                else if (window.innerWidth < 850) {
                    setLogoSrc(logo1); // <-- Define logo1 (logo menor/diferente)
                } 
        // 3. Condição PADRÃO: Desktop (> 850px)
                else if (window.innerHeight> 850){
                    setLogoSrc(logo); // <-- Define logo padrão/normal para desktop
                }
            }
    
            handleResize();
    
            window.addEventListener("resize", handleResize);
    
            return () => {
                window.removeEventListener("resize", handleResize);
            };
            
        }, []);
    
        //fim do codigo da responsividade da logo

    return (
    <header className={styles.Header}>
      <div className={styles.LogoContainer}> 
        
        {isLogged ? (
        <span onClick={()=>{
            
        }}>
            <Menu onClick={aoClick} />    
        </span>
        ) : (
        <span>
            <Search />    
        </span>
        )}
         <img src={logoSrc} alt="" /> 
         <div></div> 
      </div>
      <nav className={styles.middleContent}>
        <Link className={styles.middleElement} to="/">Início </Link>
        <Link className={styles.middleElement} to="/Noticias"> Notícias </Link>
        <Link className={styles.middleElement} to="/Projetos"> Projetos </Link>
        <Link className={styles.middleElement} to="/Contato">Contato </Link>
      </nav>
      <Link to="/Login" className={styles.btn}>
        <p>
        Inscrever-se
        </p>
      </Link>
    </header>
    )
}

export default Header