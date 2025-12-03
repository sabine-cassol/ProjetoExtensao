import { Link } from 'react-router-dom'

const listaProjetos = [{id:1, title:"InovaEdu", slug:"InovaEdu"},
    {id:2,title:"Computação para a vida", slug:"ComputaçãoParaaVida"},
    {id:3,title:"Projeto", slug:"projeto"}
]


export default function ProjetosGrid(){
    return (
        

        <section className="projetosGridContainer">
            
                    <h2>
                        Projetos ativos
                    </h2>

                <section className="projetos">
                {listaProjetos.map(projeto =>(
                    <div key={projeto.id} className='projeto'>
                        <div className="projetoImage"> 

                        </div>
                            <h3 className="projetoTitle">
                                {projeto.title}
                            </h3>

                            <Link to={`/Projetos/${projeto.slug}`}>
                                Ver Detalhes do Projeto
                            </Link>
                    
                    </div>
                    ))}

                    {/* <div className="projeto">
                        <div className="projetoImage">
                        
                        </div>
                        <h3 className="projetoTitle">
                            Computação para a vida
                        </h3>
 
                    </div>
                    <div className="projeto">
                        <div className="projetoImage">
                        </div>
                        <h3 className="projetoTitle">
                            InovaEdu
                        </h3>
                    </div>
                    <div className="projeto">
                        <div className="projetoImage">                        
                        </div>
                        <h3 className="projetoTitle">
                        Lorem ipsum dolor sit amet
                        </h3>
                    </div> */}
                </section>
            </section>
        
    )
}

