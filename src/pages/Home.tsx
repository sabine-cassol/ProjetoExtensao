import { Globe, Clock4, FileText, ScrollText } from 'lucide-react'
import Carrousel from '../components/Carrousel.tsx';

function Home() {
    return (
        <>
            <section>
                <Carrousel />

                <div className='mt-12 space-y-4'>
                    <h2 className=' text-center text-(--subTitle) text-3xl font-bold'>
                        A extensão universitária na UniCesumar
                    </h2>

                    <p className='indent-8 text-justify leading-relaxed text-gray-700 text-base'>
                        As Atividades de Extensão são componentes essenciais e obrigatórios da sua matriz curricular.
                        Mais do que cumprir uma exigência acadêmica, elas promovem uma ponte sólida de integração entre
                        a universidade e a sociedade. Essa dinâmica permite que você aplique, na prática, os conhecimentos
                        adquiridos em sala de aula, gerando um impacto social real e transformador na comunidade, ao mesmo
                        tempo em que enriquece sua formação profissional, cidadã e humanitária.
                    </p>
                </div>
                <section className='my-12 '>

                    <div className='text-center mb-8'>
                        <h2 className='text-2xl md:text-3xl text-(--subTitle) font-bold mb-2'>
                            Recursos e Detalhes
                        </h2>
                        <h2 className="text-gray-700 text-base">
                            Nesse site você visualizar/gerenciar os seguintes módulos.
                        </h2>
                    </div>

                    <section className='grid grid-cols-2 lg:grid-cols-4 gap-8'>
                        <div className='flex justify-center text-center items-center flex-col gap-4'>
                            <div className='bg-(--lightCyan) p-6 rounded-xl text-white '>
                                <Globe size={40} />
                            </div>
                            <p>Projetos de extensão</p>
                        </div>
                        <div className='flex justify-center text-center items-center flex-col gap-4'>
                            <div className='bg-[#f71e1e] p-6 rounded-xl text-white' >
                                <Clock4 size={40} />
                            </div>
                            <p>Check-in de horas</p>
                        </div>
                        <div className='flex justify-center text-center items-center flex-col gap-4'>
                            <div className='bg-[#ffc400] p-6 rounded-xl text-white'>
                                <FileText size={40} />
                            </div>
                            <p>Relatórios</p>
                        </div>
                        <div className='flex justify-center text-center items-center flex-col gap-4'>
                            <div className='bg-[#203864] p-6 rounded-xl text-white'>
                                <ScrollText size={40} />
                            </div>
                            <p>Certificados </p>
                        </div>
                    </section>
                </section>
            </section>
        </>
    )
}

export default Home