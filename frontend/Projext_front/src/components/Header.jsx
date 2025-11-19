import logo from '../assets/1763073341698.png';
import logo1 from '../assets/IMG_20251114_003344.png';
import { Link } from "react-router-dom";
import { useEffect , useState } from 'react';
import { Menu, Search } from 'lucide-react'


function Header({isLogged = true, aoClick}) {
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
      <nav className='middleContent'>
        <Link to="/">Início </Link>
        <Link to="Noticias"> Notícias </Link>
        <Link to="Projetos"> Projetos </Link>
        <Link to="">Contato </Link>
      </nav>
      <Link to="Login" className='btn'>
        <p>
        Inscrever-se
        </p>
      </Link>
    </header>
    )
}

export default Header