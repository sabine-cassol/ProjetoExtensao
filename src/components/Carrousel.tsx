import { Swiper, SwiperSlide } from 'swiper/react';
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Navigation, Autoplay, Pagination } from 'swiper/modules';
import { useQuery } from '@tanstack/react-query';
// import { NEWS } from '@/data/New.ts';
import { type Noticia } from '@/data/NewType';
import { Link } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/swiper-bundle.css';
import 'swiper/css/pagination';

function Carrousel() {
    const { data: noticias, isLoading, error } = useQuery<Noticia[]>({
        queryKey: ['noticias'],
        queryFn: async () => {
            const res = await fetch('/api/noticias/todas');
            if (!res.ok) {
                const erro = await res.json();
                throw new globalThis.Error(erro.erro || 'Erro ao buscar notícias');
            }
            return res.json();
        }
    });

    if (isLoading) {
        return (
            <section>
                <div className="w-full max-w-full overflow-hidden">
                    <div className="w-full border border-zinc-300 dark:border-zinc-800 bg-card mt-2 relative rounded-md overflow-hidden animate-pulse">

                        <div className="absolute z-20 top-3 left-4 h-7 w-28 bg-zinc-300 dark:bg-zinc-700 rounded" />

                        <div className="grid grid-cols-1 md:grid-cols-2 w-full">

                            <div className="w-full aspect-video bg-zinc-200 dark:bg-zinc-800 relative flex items-end p-4 border-b md:border-b-0 md:border-r border-zinc-300 dark:border-zinc-700">

                                <div className="w-full space-y-2">
                                    <div className="h-5 bg-zinc-300 dark:bg-zinc-700 rounded w-3/4" />
                                </div>
                            </div>

                            <div className="hidden md:flex w-full aspect-video bg-zinc-200 dark:bg-zinc-800 relative items-end p-4">
                                <div className="w-full space-y-2">
                                    <div className="h-5 bg-zinc-300 dark:bg-zinc-700 rounded w-2/3" />
                                </div>
                            </div>

                        </div>

                        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-10 flex gap-1.5">
                            <div className="w-2 h-2 rounded-full bg-zinc-400 dark:bg-zinc-600" />
                            <div className="w-2 h-2 rounded-full bg-zinc-300 dark:bg-zinc-700" />
                            <div className="w-2 h-2 rounded-full bg-zinc-300 dark:bg-zinc-700" />
                        </div>

                        <div className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-10 bg-zinc-300 dark:bg-zinc-700 w-8 h-8 md:w-10 md:h-10 rounded-full" />
                        <div className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-10 bg-zinc-300 dark:bg-zinc-700 w-8 h-8 md:w-10 md:h-10 rounded-full" />

                    </div>
                </div>
            </section>
        )
    }
    if (error || !noticias || noticias.length === 0) {
        return null;
    }

    return (
        <>
            <section >
                <div className="w-full max-w-full overflow-hidden">
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
                                loop={noticias.length > 1}
                                watchOverflow={true}
                                spaceBetween={-1}
                                slidesPerView={1}
                                breakpoints={{
                                    768: {
                                        slidesPerView: noticias.length > 1 ? 2 : 1,
                                    },
                                }}
                                pagination={{
                                    clickable: true,
                                }}
                                style={{
                                    width: '100%',
                                    overflow: 'hidden',
                                    ['--swiper-pagination-color' as any]: '#ffffff', // Cor das bolinhas ativas (Branco)
                                    ['--swiper-pagination-bullet-inactive-color' as any]: '#858b94', // Cor das inativas (Cinza)
                                    ['--swiper-pagination-bullet-inactive-opacity' as any]: '0.6',
                                }}
                                className="w-full"
                            >
                                {noticias.slice(0, 7).map((noticia) => (
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