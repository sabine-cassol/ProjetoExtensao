import Header from '../components/Header.jsx'
import NewsSlider from '../components/NewsSlider'
import { register } from 'swiper/element/bundle'

register();
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import { useState, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'

import news1 from '../assets/3d-world-news-background-loop-free-video.jpg'
import news2 from '../assets/depositphotos_56880225-stock-photo-words-news.jpg'
import news3 from '../assets/images.jpeg'




function Home() {


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

      <section className='options'>
        <div className='optionsContainer'>
          <div className='optionItem'>
            <div className="icon1">
              <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-globe-icon lucide-globe"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
            </div>
            <p> Projetos de extensão </p>
          </div>
          <div className='optionItem'>
            <div className="icon2">
              <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-clock-icon lucide-clock"><path d="M12 6v6l4 2"/><circle cx="12" cy="12" r="10"/></svg>
            </div> 
            <p>Check-in de horas</p>
            </div>
          <div className='optionItem'>
            <div className="icon3">
              <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-file-text-icon lucide-file-text"><path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z"/><path d="M14 2v5a1 1 0 0 0 1 1h5"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/></svg>
            </div>
            <p> Relatórios</p>
          </div>

          <div className='optionItem'>
            <div className="icon4">
              <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-notepad-text-icon lucide-notepad-text"><path d="M8 2v4"/><path d="M12 2v4"/><path d="M16 2v4"/><rect width="16" height="18" x="4" y="4" rx="2"/><path d="M8 10h6"/><path d="M8 14h8"/><path d="M8 18h5"/></svg>
            </div>
            <p>Certificados</p>
          </div>
        </div>
      </section>



      <footer className='footer'>
        
         @2025 UNICESUMAR. Todos direitos reservados.

      </footer>
    </main>

    </>
  )
}

export default Home