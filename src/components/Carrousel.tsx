import { Swiper, SwiperSlide } from 'swiper/react';
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Navigation, Autoplay, Pagination } from 'swiper/modules';
import { NEWS } from '@/data/New.ts';
import { Link } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/swiper-bundle.css';
import 'swiper/css/pagination';

function Carrousel() {
    return (
        <>
            <section >
                <div className="w-full max-w-7xl overflow-hidden">
                    <div className="w-full border border-zinc-400 bg-card mt-2 relative group rounded-md overflow-hidden">
                        <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black/50 to-transparent z-10 pointer-events-none" />

                        <h1 className='absolute z-20 text-xl md:text-3xl font-bold top-3 left-4 text-white drop-shadow-md'>
                            Notícias
                        </h1>
                        <div className="relative w-full group">
                            <Swiper
                                modules={[Navigation, Autoplay, Pagination]}
                                navigation={{
                                    prevEl: '.swiper-button-custom-prev',
                                    nextEl: '.swiper-button-custom-next',
                                }}
                                autoplay={{
                                    delay: 5000,
                                    disableOnInteraction: false,
                                    pauseOnMouseEnter: true,
                                }}
                                loop={true}
                                spaceBetween={-1}
                                slidesPerView={1}
                                breakpoints={{
                                    768: {
                                        slidesPerView: 2,
                                    },
                                }}

                                pagination={{
                                    clickable: true,
                                }}
                                style={{
                                    width: '100%',
                                    overflow: 'hidden',
                                    // ISSO AQUI VAI DEIXAR AS BOLINHAS SEMPRE VISÍVEIS:
                                    ['--swiper-pagination-color' as any]: '#ffffff', // Cor das bolinhas ativas (Branco)
                                    ['--swiper-pagination-bullet-inactive-color' as any]: '#858b94', // Cor das inativas (Cinza)
                                    ['--swiper-pagination-bullet-inactive-opacity' as any]: '0.6',
                                }}
                                className="w-full"
                            >
                                {NEWS.map((noticia) => (
                                    <SwiperSlide key={noticia.id} style={{ minWidth: 0 }}>
                                        <Link to={`/Notícias/${noticia.id}`} className="block w-full aspect-video relative group overflow-hidden">
                                            <div className="flex w-full h-full items-center justify-center bg-muted text-foreground border-zinc-400 md:border-r md:last:border-r-0 select-none">
                                                <img
                                                    src={noticia.imageUrl}
                                                    alt={noticia.titulo}
                                                    className="w-full h-full object-cover"
                                                    loading='lazy'
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end p-4">
                                                    <h3 className="text-white font-semibold text-lg line-clamp-1">
                                                        {noticia.titulo}
                                                    </h3>
                                                </div>
                                            </div>
                                        </Link>
                                    </SwiperSlide>
                                ))}
                            </Swiper>

                        </div>


                        <button className="swiper-button-custom-prev flex absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-10 bg-background border border-zinc-300 w-8 h-8 md:w-10 md:h-10 rounded-full items-center justify-center cursor-pointer shadow-md hover:bg-neutral-300 transition-colors">
                            <ChevronLeft className="h-4 w-4 text-foreground" />
                        </button>

                        <button className="swiper-button-custom-next flex absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-10 bg-background border border-zinc-300 w-8 h-8 md:w-10 md:h-10 rounded-full items-center justify-center cursor-pointer shadow-md hover:bg-neutral-300 transition-colors">
                            <ChevronRight className="h-4 w-4 text-foreground" />
                        </button>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Carrousel