import { register } from 'swiper/element/bundle'
import '../Styles/Header.css'

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

function NewsSlider() {


  const data = [{id:'1',image:news1},
                {id:'2',image:news2},
                {id:'3',image:news3},
              ]
              
  const [slidePerView, setSlidePerView] = useState(2);
  useEffect(() => {
    function handleResize(){
      if(window.innerWidth< 720){
        setSlidePerView(1);
      }
      else{
        setSlidePerView(2);
      }
    }
      handleResize();
      window.addEventListener("resize",handleResize);

      return () =>{
        window.removeEventListener("resize",handleResize);
      }
  }, []);

  return(
        <section className='noticias'>
        <Swiper
        slidesPerView={slidePerView}
        pagination={{clickable: true}}
        navigation
        >
          {data.map((item)=>(
            <SwiperSlide key={item.id}>
              <img src={item.image} alt="slider" className='slide-item' />
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
  )

}

export default NewsSlider