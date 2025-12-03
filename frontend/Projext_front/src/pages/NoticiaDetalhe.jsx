import Header from  '../components/Header'
import SideBar1 from '../components/SideBar1'
import { useParams } from 'react-router-dom';
import { useState } from "react"
import '../Styles/Noticia.css'
import { Info } from 'lucide-react';



const listaNoticias = [{id:1, title:"pg", slug:"pg"},
    {id:2,title:"rs", slug:"rs"},
    {id:3,title:"sc", slug:"sc"}]

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
                                       <section className="projetoContainer">
                        <div>

                        <section className='projetoHead'>
                            <h1>{noticia.title}</h1>
                            <div className='hr'></div>
                        </section>

                        <section className="projetoInfo">
                            <p>{noticia.info}</p>
                        </section>

                        <section className='btn'>
                        
                        <button className='projetoBtn'>Inscrever-se</button>
                        </section>
                        </div>
                    </section>
                </main>
        </>
    );
}

export default NoticiaDetalhe;