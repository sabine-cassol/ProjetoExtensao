import { Swiper, SwiperSlide } from 'swiper/react';
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/swiper-bundle.css';

function Debug() {
    return (
        <>
            <section className="w-full max-w-6xl overflow-hidden">
                <div className="w-full border border-zinc-400 bg-card mt-6 relative group rounded-md overflow-hidden">
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

                        style={{ width: '100%', overflow: 'hidden' }}
                        className="w-full"
                    >
                        {Array.from({ length: 6 }).map((_, index) => (
                            <SwiperSlide key={index} style={{ minWidth: 0 }}>
                                <div className="flex w-full aspect-video items-center justify-center bg-muted text-foreground border-zinc-400 md:border-r md:last:border-r-0 select-none">
                                    <span className="text-2xl font-semibold">{index + 1}</span>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    <button className="swiper-button-custom-prev hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-background border border-zinc-300 w-10 h-10 rounded-full items-center justify-center cursor-pointer shadow-md hover:bg-accent transition-colors">
                        <ChevronLeft className="h-4 w-4 text-foreground" />
                    </button>

                    <button className="swiper-button-custom-next hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-background border border-zinc-300 w-10 h-10 rounded-full items-center justify-center cursor-pointer shadow-md hover:bg-accent transition-colors">
                        <ChevronRight className="h-4 w-4 text-foreground" />
                    </button>
                </div>
            </section >
            {/* <div className='mt-12 space-y-4'>
                <h2 className=' text-center text-(--darkBlue) text-3xl font-bold'>
                    A extensão universitária na Universidade
                </h2>

                <p className='indent-8 text-justify'>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempora ut amet autem quia odit qui, excepturi, quae modi sed, labore obcaecati molestiae culpa? Repudiandae voluptatem officia aperiam blanditiis dolorum dolorem! Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas, cum dolorem sapiente maxime, fuga eum in ex repellendus reiciendis quod minima consequuntur, nam ea quasi? Illum itaque asperiores quisquam sed?
                </p>
            </div> */}

            <div>
                <h2>a extensão universitária na Universidade</h2>

                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptate, natus officiis veritatis numquam libero est quos odio cumque qui maiores, beatae illo corporis similique, expedita quaerat laborum vero doloribus optio? Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quisquam, voluptatibus harum debitis possimus ipsam animi sequi quae ex sed consectetur eius rerum odit sunt excepturi. Cumque accusamus quod veniam dolor?</p>
            </div>
        </>
    )
}

export default Debug


