import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import Default from '../assets/Image-not-found.png'
import styles from '../Styles/News.module.css'
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

function NewsGrid(){
    return (
    
            <section className={styles.newsGridContainer}>
                <h2>Notícias</h2>
                <section className={styles.news}>

                {listaNoticias.map(noticia =>(
                    <div key={noticia.id} className={styles.new}>
                        <div className={styles.newImage}> 
                            <img src={noticia.image} alt="" />
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
