import { Globe, Clock4, FileText, ScrollText} from 'lucide-react'
import Carrousel from '../components/Carrousel.tsx';

function Home() {
    return (
        <>
            <main>
            <Carrousel/>

                <div className='mt-12 space-y-4'>
                    <h2 className=' text-center text-(--darkBlue) text-3xl font-bold'>
                        A extensão universitária na UniCesumar
                    </h2>

                    <p className='indent-8 text-justify'>
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempora ut amet autem quia odit qui, excepturi, quae modi sed, labore obcaecati molestiae culpa? Repudiandae voluptatem officia aperiam blanditiis dolorum dolorem! Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas, cum dolorem sapiente maxime, fuga eum in ex repellendus reiciendis quod minima consequuntur, nam ea quasi? Illum itaque asperiores quisquam sed?
                    </p>
                </div>
                <section className='mt-20'>
                    <section className='grid grid-cols-2 lg:grid-cols-4 gap-8'>
                        <div className='flex justify-center text-center items-center flex-col gap-4'>
                            <div className='bg-(--lightCyan) p-6 rounded-xl text-white '>
                                <Globe size={40} />
                            </div>
                            <p>Projeto de extensão</p>
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
            </main>
        </>
    )
}

export default Home