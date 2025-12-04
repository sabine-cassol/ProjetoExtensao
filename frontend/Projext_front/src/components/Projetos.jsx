import { Link } from 'react-router-dom'
import Default from '../assets/IMG_20251202_183447.png';
import { ChevronRight } from 'lucide-react';
import styles from '../Styles/Projetos.module.css'

const listaProjetos = [{id:1, title:"InovaEdu", slug:"InovaEdu"},
    {id:2,title:"Computação para a vida", slug:"ComputaçãoParaaVida"},
    {id:3,title:"Projeto", slug:"projeto"}
]


export default function ProjetosGrid(){
    return (
        

        <section className={styles.projetosGridContainer}>
            
                    <h2>
                        Projetos ativos
                    </h2>

                <section className={styles.projetos}>
                {listaProjetos.map(projeto =>(
                    <div key={projeto.id} className={styles.projeto}>
                        <div className={styles.projetoImage}> 
                            <img src={Default} alt="" />
                        </div>
                            <h3 className={styles.projetoTitle}>
                                {projeto.title}
                            </h3>

                            <Link to={`/Projetos/${projeto.slug}`} className={styles.anchorProject}>
                                Ver Detalhes do Projeto <ChevronRight />
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

