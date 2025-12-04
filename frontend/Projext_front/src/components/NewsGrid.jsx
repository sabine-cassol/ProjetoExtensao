import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import Default from '../assets/Image-not-found.png'
import styles from '../Styles/News.module.css'

const listaNoticias = [{id:1, title:"pg", slug:"pg"},
    {id:2,title:"rs", slug:"rs"},
    {id:3,title:"sc", slug:"sc"}
]

function NewsGrid(){
    return (
    
            <section className={styles.newsGridContainer}>
                <h2>Notícias</h2>
                <section className={styles.news}>

                {listaNoticias.map(noticia =>(
                    <div key={noticia.id} className={styles.new}>
                        <div className={styles.newImage}> 
                            <img src={Default} alt="" />
                        </div>
                            <h3 className={styles.newTitle}>
                                {noticia.title}
                            </h3>

                            <Link to={`/Noticias/${noticia.slug}`} className={styles.anchorNew}>
                                Ver Detalhes da noticia <ChevronRight />
                            </Link>
                    
                    </div>
                    ))}

                    {/* <div className="new">
                        <div className="newImage">
                        
                        </div>
                        <h3 className="newTitle">
                        Lorem ipsum dolor sit amet
                        </h3>

                        
                    </div>
                    <div className="new">
                        <div className="newImage">
                        </div>
                        <h3 className="newTitle">
                        Lorem ipsum dolor sit amet 
                        </h3>
                    </div>
                    <div className="new">
                        <div className="newImage">                        
                        </div>
                        <h3 className="newTitle">
                        Lorem ipsum dolor sit amet
                        </h3>
                    </div>
                        <div className="new">
                        <div className="newImage">                        
                        </div>
                        <h3 className="newTitle">
                        Lorem ipsum dolor sit amet 
                        </h3>
                    </div>
                        <div className="new">
                        <div className="newImage">                        
                        </div>
                        <h3 className="newTitle">
                        Lorem ipsum dolor sit amet
                        </h3>
                    </div>
                        <div className="new">
                        <div className="newImage">                        
                        </div>
                        <h3 className="newTitle">
                        Lorem ipsum dolor sit amet
                        </h3>
                    </div>
                        <div className="new">
                        <div className="newImage">                        
                        </div>
                        <h3 className="newTitle">
                        Lorem ipsum dolor sit amet
                        </h3>
                    </div>
                        <div className="new">
                        <div className="newImage">                        
                        </div>
                        <h3 className="newTitle">
                        Lorem ipsum dolor sit amet
                        </h3>
                    </div> */}
                </section>
            </section>
        
    )
}

export default NewsGrid
