import logo from '../assets/1763073341698.png';
import logo1 from '../assets/IMG_20251114_003344.png';
import { Link,useNavigate } from "react-router-dom";
import { useEffect,useRef,useState } from 'react';
import { Menu, Search } from 'lucide-react';
import { useUser } from "../context/UserContext.jsx"
import styles from '../Styles/Home.module.css';

const tamanhoPequeno = 550;

function Header({ aoClick }) {
   
        const [logoSrc, setLogoSrc] = useState(logo);
        const { user, role, logout } = useUser();

        const [isMobile, setIsMobile] = useState(window.innerWidth < tamanhoPequeno);
        const [isInfoVisible, setIsInfoVisible] = useState(false);
        const contaRef = useRef(null);
        const navigate = useNavigate();

        const handleLogout = () => {
        logout(); 
        navigate('/'); 
        };


        useEffect(() => {

        function handleClickOutside(event) {
 
            if (contaRef.current && !contaRef.current.contains(event.target)) {
                setIsInfoVisible(false); 
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [contaRef]);

        const toggleInfo = () => {
            setIsInfoVisible(!isInfoVisible);
        };
    
        useEffect(() => {
            function handleResize() {
                if (window.innerWidth < 550) {
                    setLogoSrc(logo);
                } 

                else if (window.innerWidth < 850) {
                    setLogoSrc(logo1); 
                } 

                else if (window.innerHeight> 850){
                    setLogoSrc(logo);
                }
            }
    
            handleResize();
    
            window.addEventListener("resize", handleResize);
    
            return () => {
                window.removeEventListener("resize", handleResize);
            };
            
        }, []);

        useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < tamanhoPequeno);
        };

        window.addEventListener('resize', handleResize);
        
        return () => window.removeEventListener('resize', handleResize);
    }, [role]);

    const showMenuIcon = ['aluno', 'professor'].includes(role) || (role === 'guest' && isMobile);
        
    
    

    return (
    <header className={styles.Header}>
      <div className={styles.LogoContainer}>
        {showMenuIcon ? (
            <span onClick={aoClick}> 
                <Menu />
            </span>
        ) : ( null )}
         <img src={logoSrc} alt="" /> 
         <div></div> 
      </div>
      <nav className={styles.middleContent}>
        <Link className={styles.middleElement} to="/">Início </Link>
        <Link className={styles.middleElement} to="/Noticias"> Notícias </Link>
        <Link className={styles.middleElement} to="/Projetos"> Projetos </Link>
        <Link className={styles.middleElement} to="/Contato">Contato </Link>
      </nav>

      {role === 'guest' && (
          <Link to="/Login" className={styles.btn}>
                <p>
                Inscrever-se
                </p>
          </Link>
      )}

        {role === 'aluno' || role === 'professor' ? (
            <>
                <div className={styles.conta} ref={contaRef}>
                    <div className={styles.contaDisplay} onClick={toggleInfo}>
                        <p>{user.name.charAt(0).toUpperCase()}</p>
                    </div>
                    {isInfoVisible && (
                    <div className={styles.infoConta}>
                        <h5 className={styles.nomeConta}>{user.name}</h5>
                        <span>RA</span>
                        <p className={styles.userConta}>{user.user}</p>
                        <div className={styles.logout}>
                            <button onClick={handleLogout}>Sair</button>
                        </div>
                    </div>

                    )}
                </div>
                
            </>
        ) : null}

      
    </header>
    )
}

export default Header