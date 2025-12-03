import { Link } from 'react-router-dom'

const listaNoticias = [{id:1, title:"pg", slug:"pg"},
    {id:2,title:"rs", slug:"rs"},
    {id:3,title:"sc", slug:"sc"}
]

function NewsGrid(){
    return (
    
            <section className="newsGridContainer">
                <h2>Destaques</h2>
                <section className="news">

                {listaNoticias.map(noticia =>(
                    <div key={noticia.id} className='new'>
                        <div className="newImage"> 

                        </div>
                            <h3 className="newTitle">
                                {noticia.title}
                            </h3>

                            <Link to={`/Noticias/${noticia.slug}`}>
                                Ver Detalhes da noticia
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
