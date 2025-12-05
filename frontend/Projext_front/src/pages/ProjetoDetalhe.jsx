import Header from  '../components/Header'
import SideBar1 from '../components/SideBar1'
import { useParams } from 'react-router-dom';
import { useState } from "react"
import '../Styles/Projeto.css'
import { Info } from 'lucide-react';




const listaProjetos = [{id:1, title:"InovaEdu", slug:"InovaEdu",
    justificativa:"O avanço da Inteligência Artificial e da tecnologia na educação apresenta oportunidades significativas para melhorar o aprendizado, mas muitos estudantes ainda não sabem como utilizar essas ferramentas de forma eficiente e segura. Além disso, a falta de conhecimento sobre segurança da informação expõe jovens a riscos online, como golpes e vazamento de dados. Este projeto busca preencher essa lacuna, promovendo a inclusão digital e capacitando os alunos para utilizar a tecnologia de maneira responsável e estratégica em seus estudos. Ao realizar palestras presenciais e compartilhar conteúdos educativos online, amplia-se o impacto da iniciativa, permitindo que um número maior de estudantes tenha acesso a informações essenciais para seu desenvolvimento acadêmico e digital. Para os acadêmicos que participam do projeto, a experiência contribui para sua formação profissional e social, desenvolvendo competências em docência, comunicação e uso de tecnologia educacional. Este projeto está alinhado com os Objetivos de Desenvolvimento Sustentável (ODS), especialmente com: ODS 4 – Educação de Qualidade: ao proporcionar acesso ao conhecimento sobre IA e tecnologia para estudantes. ODS 9 – Indústria, Inovação e Infraestrutura: ao incentivar o uso de tecnologia e inovação no aprendizado. ODS 10 – Redução das Desigualdades: ao promover inclusão digital para estudantes de diferentes contextos sociais. Dessa forma, o InovaEdu se torna um meio de democratização do acesso à tecnologia educacional e segurança digital, preparando os alunos para os desafios do mundo conectado. O projeto \"InovaEdu: Potencializando Estudos com IA e Tecnologia\" busca capacitar estudantes do Ensino Fundamental II e Ensino Médio no uso de ferramentas de Inteligência Artificial para melhorar seu desempenho acadêmico, além de fornecer orientações sobre segurança da informação e informática básica. A iniciativa também envolve a produção de conteúdos educativos para redes sociais, como Instagram e YouTube, promovendo a inclusão digital e o uso consciente da tecnologia. Acadêmicos dos cursos de Engenharia de Software e Análise e Desenvolvimento de Sistemas serão os responsáveis por ministrar palestras, desenvolver materiais didáticos e criar conteúdos multimídia. O projeto utilizará a infraestrutura da universidade, incluindo estúdios de gravação, laboratórios de informática e auditórios, garantindo uma experiência prática e enriquecedora para os participantes.",
    pretensao: "• Orientar estudantes do Ensino Fundamental II e Ensino Médio sobre como utilizar ferramentas de Inteligência Artificial (IA) para aprimorar seu desempenho acadêmico. • Promover a alfabetização digital e a segurança da informação, conscientizando sobre boas práticas no uso da internet e proteção de dados pessoais. • Capacitar os alunos em informática básica, abordando temas como navegação segura, escolha de dispositivos e uso eficiente da tecnologia nos estudos. • Produzir e divulgar conteúdos educativos em redes sociais (Instagram e YouTube), ampliando o alcance das informações para além das palestras presenciais. • Proporcionar aos acadêmicos envolvidos no projeto a experiência prática de ensino e extensão, desenvolvendo habilidades pedagógicas, comunicacionais e técnicas. • Contribuir para a redução da desigualdade digital, garantindo que alunos de diferentes contextos tenham acesso ao conhecimento tecnológico essencial.",
    requisitos:"O projeto \"InovaEdu: Potencializando Estudos com IA e Tecnologia\" busca capacitar estudantes do Ensino Fundamental II e Ensino Médio no uso de ferramentas de Inteligência Artificial para melhorar seu desempenho acadêmico, além de fornecer orientações sobre segurança da informação e informática básica. A iniciativa também envolve a produção de conteúdos educativos para redes sociais, como Instagram e YouTube, promovendo a inclusão digital e o uso consciente da tecnologia. Acadêmicos dos cursos de Engenharia de Software e Análise e Desenvolvimento de Sistemas serão os responsáveis por ministrar palestras, desenvolver materiais didáticos e criar conteúdos multimídia. O projeto utilizará a infraestrutura da universidade, incluindo estúdios de gravação, laboratórios de informática e auditórios, garantindo uma experiência prática e enriquecedora para os participantes.",
    detalhes:"Os alunos dos cursos de Engenharia de Software e Análise e Desenvolvimento de Sistemas serão divididos em três frentes principais de atuação, garantindo que todas as atividades sejam bem estruturadas ao longo do semestre: 1. Produção de Conteúdos para Redes Sociais Utilização do estúdio de gravação da universidade para gravar vídeos curtos para Instagram e YouTube. Criação de postagens informativas sobre IA, segurança digital e boas práticas no uso da tecnologia. Edição de vídeos e podcasts educativos. 2. Planejamento e Execução das Palestras Preparação de materiais didáticos nos laboratórios de informática, incluindo apresentações, tutoriais e simulações. Organização de palestras presenciais e online para estudantes, com uso de ferramentas interativas. Realização de eventos no auditório da universidade para atender grupos maiores de alunos. 3. Pesquisa e Desenvolvimento de Materiais Pesquisa de ferramentas de IA aplicáveis ao ensino e produção de guias práticos para estudantes. Desenvolvimento de um site ou blog para reunir conteúdos e interagir com os participantes. Avaliação do impacto das atividades, coletando feedback dos alunos e professores das escolas. Divisão das Atividades ao Longo do Semestre ? Semana 1-3: Planejamento das ações, divisão das equipes e levantamento de materiais e fontes de pesquisa. ? Semana 4-6: Produção de vídeos e posts para redes sociais + desenvolvimento dos primeiros materiais didáticos. ? Semana 7-9: Início das palestras em escolas públicas e privadas, tanto presenciais quanto online. ? Semana 10-12: Continuação das palestras e gravação de conteúdos mais aprofundados no estúdio da universidade. ? Semana 13-15: Divulgação dos materiais criados, avaliação do impacto do projeto e preparação de um relatório final. ? Semana 16: Evento de encerramento com uma grande palestra no auditório da universidade para estudantes e professores convidados." },

    {id:2,title:"Computação para a vida", slug:"ComputaçãoParaaVida",
        pretensao: "A inclusão digital é um fator essencial para o desenvolvimento pessoal e profissional no mundo atual. Muitas pessoas ainda possuem dificuldades com ferramentas básicas de informática, o que limita suas oportunidades de trabalho e estudo. Além disso, o conhecimento em programação e planilhas avançadas é cada vez mais valorizado no mercado, abrindo portas para melhores colocações profissionais. Em 2024, o projeto ofereceu apenas informática básica, o que evidenciou a necessidade de aprofundamento em áreas mais específicas. Por isso, em 2025, serão introduzidos novos cursos, abordando temas mais avançados e preparando melhor os participantes para o mundo digital. A participação dos acadêmicos do curso de Análise e Desenvolvimento de Sistemas no projeto é igualmente benéfica, pois permite que eles desenvolvam habilidades didáticas, comunicação e trabalho em equipe, além de aplicarem seus conhecimentos em um contexto real. Esse projeto está alinhado aos Objetivos de Desenvolvimento Sustentável (ODS) da ONU, em especial: • ODS 4 – Educação de Qualidade: ao promover conhecimento digital acessível e de qualidade. • ODS 8 – Trabalho Decente e Crescimento Econômico: ao capacitar os participantes para oportunidades profissionais melhores. • ODS 10 – Redução das Desigualdades: ao oferecer cursos gratuitos que democratizam o acesso ao conhecimento.",
        requisitos: "O projeto Computação para a Vida trabalhará com uma equipe de alunos, acadêmicos do curso de Análise e Desenvolvimento de Sistemas. Inicialmente os academicos irão desenvolver um material para o treinamento do público alvo, e receberão um treinamento dos professores responsáveis para que possam desenvolver a sua atividade de extensão. As atividades desenvolvidas para o público alvo terão duração aproximada de 32 horas cada oficina, elas abordaram temas importantes para o uso no dia a dia do computador, como segurança da informaçao, ferramentas de escritório, navegação na internet e pesquisa.",
        justificativa: "A inclusão digital é um fator essencial para o desenvolvimento pessoal e profissional no mundo atual. Muitas pessoas ainda possuem dificuldades com ferramentas básicas de informática, o que limita suas oportunidades de trabalho e estudo. Além disso, o conhecimento em programação e planilhas avançadas é cada vez mais valorizado no mercado, abrindo portas para melhores colocações profissionais. Em 2024, o projeto ofereceu apenas informática básica, o que evidenciou a necessidade de aprofundamento em áreas mais específicas. Por isso, em 2025, serão introduzidos novos cursos, abordando temas mais avançados e preparando melhor os participantes para o mundo digital. A participação dos acadêmicos do curso de Análise e Desenvolvimento de Sistemas no projeto é igualmente benéfica, pois permite que eles desenvolvam habilidades didáticas, comunicação e trabalho em equipe, além de aplicarem seus conhecimentos em um contexto real. Esse projeto está alinhado aos Objetivos de Desenvolvimento Sustentável (ODS) da ONU, em especial: • ODS 4 – Educação de Qualidade: ao promover conhecimento digital acessível e de qualidade. • ODS 8 – Trabalho Decente e Crescimento Econômico: ao capacitar os participantes para oportunidades profissionais melhores. • ODS 10 – Redução das Desigualdades: ao oferecer cursos gratuitos que democratizam o acesso ao conhecimento.",
        detalhes: "Datas: 16 de março a 18 de maio (10 sábados) Conteúdos: Windows e Linux Word e Google Docs Excel e Google Planilhas Canva e PowerPoint Internet e Segurança da Informação E-mail e ChatGPT Curso de Programação em Python (24h) Datas: 25 de maio a 06 de julho (6 sábados) Conteúdos: Fundamentos da Linguagem Python Estruturas de Controle e Repetição Desenvolvimento de Sites e Aplicativos",
    },
    {id:3,title:"Projeto", slug:"projeto",info:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis perspiciatis quo sed omnis"}
]

function ProjetoDetalhe() {
   
    const [showSideBar, setShowSideBar] = useState(true);
    const mainContentClass = showSideBar ? 'Shifted' : 'mainContent';
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
                            <h1> {projeto.title}</h1>
                            <div className='hr'></div>
                        </section>

                        {projeto.pretensao && projeto.pretensao.length > 0 ? (
                        <section className="projetoInfo projetoParagrafo">
                            <span>Pretensão da atividade</span>
                            <p>{projeto.pretensao}</p>
                        </section>) : null}

                        {projeto.requisitos && projeto.requisitos.length > 0 ? (
                        <section className="projetoRequisitos projetoParagrafo">
                            <span>Requisitios Técnicos</span>
                            <p>{projeto.requisitos}</p>
                        </section>):null}

                        {projeto.justificativa && projeto.justificativa.length > 0 ? (
                        <section className="projetoJustificativa projetoParagrafo">
                            <span>Justificativa de Relevância</span>
                            <p>{projeto.justificativa}</p>
                        </section>): null}

                        {projeto.detalhes && projeto.detalhes.length > 0 ? (
                        <section className="projetoDetalhe projetoParagrafo">
                            <span>Detalhes da Atividade</span>
                            <p>{projeto.detalhes}</p>
                        </section>
                        ) : null }

                        <section className='btn'>
                        
                        <button className='projetoBtn'> Quero participar </button>
                        </section>
                        </div>
                    </section>

                </main>
        </>
    );
}

export default ProjetoDetalhe;