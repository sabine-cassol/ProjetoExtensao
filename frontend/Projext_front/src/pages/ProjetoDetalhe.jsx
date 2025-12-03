import Header from  '../components/Header'
import SideBar1 from '../components/SideBar1'
import { useParams } from 'react-router-dom';
import { useState } from "react"
import '../Styles/Projeto.css'
import { Info } from 'lucide-react';



const listaProjetos = [{id:1, title:"InovaEdu", slug:"InovaEdu",info:"O avanço da Inteligência Artificial e da tecnologia na educação apresenta oportunidades significativas para melhorar o aprendizado, mas muitos estudantes ainda não sabem como utilizar essas ferramentas de forma eficiente e segura. Além disso, a falta de conhecimento sobre segurança da informação expõe jovens a riscos online, como golpes e vazamento de dados. Este projeto busca preencher essa lacuna, promovendo a inclusão digital e capacitando os alunos para utilizar a tecnologia de maneira responsável e estratégica em seus estudos. Ao realizar palestras presenciais e compartilhar conteúdos educativos online, amplia-se o impacto da iniciativa, permitindo que um número maior de estudantes tenha acesso a informações essenciais para seu desenvolvimento acadêmico e digital. Para os acadêmicos que participam do projeto, a experiência contribui para sua formação profissional e social, desenvolvendo competências em docência, comunicação e uso de tecnologia educacional. Este projeto está alinhado com os Objetivos de Desenvolvimento Sustentável (ODS), especialmente com: ODS 4 – Educação de Qualidade: ao proporcionar acesso ao conhecimento sobre IA e tecnologia para estudantes. ODS 9 – Indústria, Inovação e Infraestrutura: ao incentivar o uso de tecnologia e inovação no aprendizado. ODS 10 – Redução das Desigualdades: ao promover inclusão digital para estudantes de diferentes contextos sociais. Dessa forma, o InovaEdu se torna um meio de democratização do acesso à tecnologia educacional e segurança digital, preparando os alunos para os desafios do mundo conectado. O projeto \"InovaEdu: Potencializando Estudos com IA e Tecnologia\" busca capacitar estudantes do Ensino Fundamental II e Ensino Médio no uso de ferramentas de Inteligência Artificial para melhorar seu desempenho acadêmico, além de fornecer orientações sobre segurança da informação e informática básica. A iniciativa também envolve a produção de conteúdos educativos para redes sociais, como Instagram e YouTube, promovendo a inclusão digital e o uso consciente da tecnologia. Acadêmicos dos cursos de Engenharia de Software e Análise e Desenvolvimento de Sistemas serão os responsáveis por ministrar palestras, desenvolver materiais didáticos e criar conteúdos multimídia. O projeto utilizará a infraestrutura da universidade, incluindo estúdios de gravação, laboratórios de informática e auditórios, garantindo uma experiência prática e enriquecedora para os participantes." },
    {id:2,title:"Computação para a vida", slug:"ComputaçãoParaaVida",info: "A inclusão digital é um fator essencial para o desenvolvimento pessoal e profissional no mundo atual. Muitas pessoas ainda possuem dificuldades com ferramentas básicas de informática, o que limita suas oportunidades de trabalho e estudo. Além disso, o conhecimento em programação e planilhas avançadas é cada vez mais valorizado no mercado, abrindo portas para melhores colocações profissionais. Em 2024, o projeto ofereceu apenas informática básica, o que evidenciou a necessidade de aprofundamento em áreas mais específicas. Por isso, em 2025, serão introduzidos novos cursos, abordando temas mais avançados e preparando melhor os participantes para o mundo digital. A participação dos acadêmicos do curso de Análise e Desenvolvimento de Sistemas no projeto é igualmente benéfica, pois permite que eles desenvolvam habilidades didáticas, comunicação e trabalho em equipe, além de aplicarem seus conhecimentos em um contexto real. Esse projeto está alinhado aos Objetivos de Desenvolvimento Sustentável (ODS) da ONU, em especial: • ODS 4 – Educação de Qualidade: ao promover conhecimento digital acessível e de qualidade. • ODS 8 – Trabalho Decente e Crescimento Econômico: ao capacitar os participantes para oportunidades profissionais melhores. • ODS 10 – Redução das Desigualdades: ao oferecer cursos gratuitos que democratizam o acesso ao conhecimento."},
    {id:3,title:"Projeto", slug:"projeto",info:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis perspiciatis quo sed omnis"}
]

function ProjetoDetalhe() {
   
    const [showSideBar, setShowSideBar] = useState(true);
    const mainContentClass = showSideBar ? 'Shifted' : 'main-content';
    const { projetoId } = useParams();

   


    const projeto = listaProjetos.find(p => p.slug === projetoId); 

    if (!projeto) {
        return <h1>Projeto Não Encontrado (404)</h1>;
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
                            <h1>{projeto.title}</h1>
                            <div className='hr'></div>
                        </section>

                        <section className="projetoInfo">
                            <p>{projeto.info}</p>
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

export default ProjetoDetalhe;