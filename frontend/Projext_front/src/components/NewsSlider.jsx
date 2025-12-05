import { register } from 'swiper/element/bundle'
import styles from '../Styles/Home.module.css'

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
import { Link } from 'react-router-dom'

function NewsSlider() {


const listaNoticias = [{id:1, title:"pg", slug:"pg",
    body:'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga ex eveniet cumque sed quaerat. Nam est maxime repellendus alias harum, perferendis ipsum dolor quo delectus nobis similique corrupti, quia sunt!',
    image:news1 },
    {id:2,title:"rs", slug:"rs",
        body:'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga ex eveniet cumque sed quaerat. Nam est maxime repellendus alias harum, perferendis ipsum dolor quo delectus nobis similique corrupti, quia sunt!',
        image:news2
    },
    {id:3,title:"sc", slug:"sc",
        body:'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga ex eveniet cumque sed quaerat. Nam est maxime repellendus alias harum, perferendis ipsum dolor quo delectus nobis similique corrupti, quia sunt!',
        image:news3
    },]
              
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
        <section className={styles.noticias}>
        <h2>Notícias</h2>
        <Swiper
        slidesPerView={slidePerView}
        pagination={{clickable: true}}
        navigation
        >
          {listaNoticias.map((item)=>(
            <SwiperSlide key={item.id}>

              <Link to={`/Noticias/${item.slug}`}>
                <img src={item.image} alt="slider" className={styles.slideItem} />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
  )

}

export default NewsSlider