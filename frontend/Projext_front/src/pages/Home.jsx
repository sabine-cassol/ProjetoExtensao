import Header from '../components/Header.jsx'
import SideBar1 from '../components/SideBar1.jsx';
import NewsSlider from '../components/NewsSlider'
import Options from '../components/Options.jsx'

import { useState } from "react";


function Home() {

  const [showSideBar, setShowSideBar] = useState(true);


  return(
    <>

    <Header />

    <main className="principal">
  

    <NewsSlider/> 

      <section className='info'>
        <h1 className='infoTitulo'>
          A EXTENSÃO UNIVERSITÁRIA NA UNICESUMAR
        </h1>

        <p className='infoText'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi aliquam fugiat voluptatum neque earum! Aut dicta, voluptates quia et ducimus dolor quam! Maiores iure similique nesciunt adipisci ipsam porro sequi! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus atque laboriosam, iste error molestiae assumenda quod cupiditate unde animi quidem placeat nostrum possimus. Accusantium dicta dolor aperiam ipsa error blanditiis.</p>
  
      </section>


      <Options />

      <footer className='footer'>
        
         @2025 UNICESUMAR. Todos direitos reservados.

      </footer>
    </main>

    </>
  )
}

export default Home