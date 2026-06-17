import { Swiper, SwiperSlide } from 'swiper/react';
import { Globe, Clock4, FileText, ScrollText, ChevronLeft, ChevronRight } from 'lucide-react'
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';

function Home() {
    return (
        <>
            <main className="p-4 flex-1 bg-zinc-50/50 overflow-hidden">

                <div className=" max-w-6xl ">
                    <div className="w-full mx-auto border border-zinc-400 bg-card mt-6 relative group rounded-md overflow-hidden">
                        <Swiper
                            modules={[Navigation, Autoplay]}
                            navigation={{
                                prevEl: '.swiper-button-custom-prev',
                                nextEl: '.swiper-button-custom-next',
                            }}
                            loop={true}
                            spaceBetween={0}
                            slidesPerView={1}
                            breakpoints={{
                                768: {
                                    slidesPerView: 2,
                                },
                            }}

                            autoplay={{
                                delay: 5000,
                                disableOnInteraction: false,
                            }}
                            className="w-full"
                        >
                            {Array.from({ length: 6 }).map((_, index) => (
                                <SwiperSlide key={index}>
                                    <div className="flex w-full aspect-3/2 items-center justify-center bg-muted text-foreground border-zinc-400 md:border-r md:last:border-r-0 select-none">
                                        <span className="text-2xl font-semibold">{index + 1}</span>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                        <button className="swiper-button-custom-prev hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-background border border-zinc-300 w-10 h-10 rounded-full items-center justify-center cursor-pointer shadow-md hover:bg-accent transition-colors disabled:opacity-50">
                            <ChevronLeft className="h-4 w-4 text-foreground" />
                        </button>

                        <button className="swiper-button-custom-next hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-background border border-zinc-300 w-10 h-10 rounded-full items-center justify-center cursor-pointer shadow-md hover:bg-accent transition-colors disabled:opacity-50">
                            <ChevronRight className="h-4 w-4 text-foreground" />
                        </button>

                    </div>
                </div>
                <div className='mt-12'>
                    <h2 className=' justify-self-center text-(--darkBlue) text-3xl font-bold'>
                        A extensão universitária na UniCesumar
                    </h2>
                    <br />
                    <p className='indent-8'>
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempora ut amet autem quia odit qui, excepturi, quae modi sed, labore obcaecati molestiae culpa? Repudiandae voluptatem officia aperiam blanditiis dolorum dolorem! Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas, cum dolorem sapiente maxime, fuga eum in ex repellendus reiciendis quod minima consequuntur, nam ea quasi? Illum itaque asperiores quisquam sed?
                    </p>
                </div>
                <section className='mt-20'>
                    <section className='grid grid-cols-4 gap-8'>
                        <div className='flex justify-center items-center flex-col gap-4'>
                            <div className='bg-(--lightCyan) p-6 rounded-xl text-white '>
                                <Globe size={40} />
                            </div>
                            <p>Projeto de extensão</p>
                        </div>
                        <div className='flex justify-center items-center flex-col gap-4'>
                            <div className='bg-[#f71e1e] p-6 rounded-xl text-white' >
                                <Clock4 size={40} />
                            </div>
                            <p>Check-in de horas</p>
                        </div>
                        <div className='flex justify-center items-center flex-col gap-4'>
                            <div className='bg-[#ffc400] p-6 rounded-xl text-white'>
                                <FileText size={40} />
                            </div>
                            <p>Relatórios</p>
                        </div>
                        <div className='flex justify-center items-center flex-col gap-4'>
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