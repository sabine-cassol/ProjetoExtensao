
import './App.css'
import './Styles/Header.css'
import logo from './assets/1763073341698.png';
import logo1 from './assets/IMG_20251114_003344.png';
import { useEffect , useState } from 'react';


function HeaderComponent() {

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

  return(
    <>
    <header className="Header">
      <div className='LogoContainer'> 
         <img src={logoSrc} alt="" /> 
         <div></div> 
      </div>
      <div className='middleContent'>
        <a href="">Início</a>
        <a href=""> Notícias </a>
        <a href=""> Projetos</a>
        <a href="">Contato</a>
      </div>
      <div className='btn'>
      <a href="">Inscrever-se</a>
      </div>
    </header>

    <main className="principal">
      <section className='noticias'>
        <img src="" alt="" />
        <h2>Noticias</h2>
      </section>

      <section className='info'>
        <h1 className='infoTitulo'>
          A EXTENSÃO UNIVERSITÁRIA NA UNICESUMAR
        </h1>

        <p className='infoText'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi aliquam fugiat voluptatum neque earum! Aut dicta, voluptates quia et ducimus dolor quam! Maiores iure similique nesciunt adipisci ipsam porro sequi! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus atque laboriosam, iste error molestiae assumenda quod cupiditate unde animi quidem placeat nostrum possimus. Accusantium dicta dolor aperiam ipsa error blanditiis.</p>
  
      </section>

      <section className='options'>
        <div className='optionsContainer'>
          <div className='optionItem'>
            <div className="icon1"></div>
            <p> Projetos de extensão </p>
          </div>
          <div className='optionItem'>
            <div className="icon2"></div> 
            <p>Check-in de horas</p>
            </div>
          <div className='optionItem'>
            <div className="icon3"></div>
            <p> Relatórios</p>
          </div>

          <div className='optionItem'>
            <div className="icon4"></div>
            <p>Certificados</p>
          </div>
        </div>
      </section>

      <footer className='footer'>
        
         @2025 UNICESUMAR. Todos direitos reservados.

      </footer>
    </main>

    <footer>

    </footer>
    </>
  )
}

export default HeaderComponent