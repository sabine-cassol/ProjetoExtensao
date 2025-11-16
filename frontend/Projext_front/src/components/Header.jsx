import '../Styles/Header.css'
import logo from '../assets/1763073341698.png';
import logo1 from '../assets/IMG_20251114_003344.png';
import { Link } from "react-router-dom";
import { useEffect , useState } from 'react';


function Header() {
    //responsividade da logo
        const [logoSrc, setLogoSrc] = useState(logo);
    
        useEffect(() => {
            function handleResize() {
                if (window.innerWidth < 850) {
                    setLogoSrc(logo1);
                } else {
    
                    setLogoSrc(logo);
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
    <header className="Header">
        
      <div className='LogoContainer'> 
         <img src={logoSrc} alt="" /> 
         <div></div> 
      </div>
      <nav className='middleContent'>
        <Link to="/">Início </Link>
        <Link to="Noticias"> Notícias </Link>
        <Link to="Projetos"> Projetos </Link>
        <Link to="">Contato </Link>
      </nav>
      <Link to="Login" className='btn'>
        <a>
        Inscrever-se
        </a>
      </Link>
    </header>
    )
}

export default Header