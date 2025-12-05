import Header from  '../components/Header'
import SideBar1 from '../components/SideBar1'
import { useParams } from 'react-router-dom';
import { useState } from "react"
import '../Styles/Noticia.css'
import news1 from '../assets/3d-world-news-background-loop-free-video.jpg'
import news2 from '../assets/depositphotos_56880225-stock-photo-words-news.jpg'
import news3 from '../assets/images.jpeg'




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

function NoticiaDetalhe() {
   
    const [showSideBar, setShowSideBar] = useState(true);
    const mainContentClass = showSideBar ? 'Shifted' : 'main-content';
    const { noticiaId } = useParams();

   
    const noticia = listaNoticias.find(p => p.slug === noticiaId); 

    if (!noticia) {
        return <h1>Noticia Não Encontrado (404)</h1>;
    }

    return (
        <>
                <Header aoClick={()=>{
                    setShowSideBar(!showSideBar)
                }} />
        
                <SideBar1 visivel={showSideBar}/>
                <main className={mainContentClass}>
                    <section className="noticiaContainer">
                        <div>

                        <section className='noticiaHead'>
                            <h1>{noticia.title}</h1>
                        </section>

                        <section className="noticiaImage">
                            <img src={noticia.image} alt="" />
                        </section>

                        <section className="noticiaParagrafo">
                            <p>{noticia.body}</p>
                        </section>

                        </div>
                    </section>
                </main>
        </>
    );
}

export default NoticiaDetalhe