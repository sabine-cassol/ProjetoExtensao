// import { Swiper, SwiperSlide } from 'swiper/react';
// import { ChevronLeft, ChevronRight } from 'lucide-react'
// import { Navigation, Autoplay } from 'swiper/modules';
// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/swiper-bundle.css';

// function Debug() {
//     return (

//         <>
//             <main>
//                 <div className="w-full max-w-6xl overflow-hidden">
//                     <div className="w-full border border-zinc-400 bg-card mt-6 relative group rounded-md overflow-hidden">
//                         <Swiper
//                             modules={[Navigation, Autoplay]}
//                             navigation={{
//                                 prevEl: '.swiper-button-custom-prev',
//                                 nextEl: '.swiper-button-custom-next',
//                             }}
//                             loop={true}
//                             spaceBetween={0}
//                             slidesPerView={1}
//                             breakpoints={{
//                                 768: {
//                                     slidesPerView: 2,
//                                 },
//                             }}
//                             autoplay={{
//                                 delay: 5000,
//                                 disableOnInteraction: false,
//                             }}
//                             style={{ width: '100%', overflow: 'hidden' }} // força o swiper a respeitar o container
//                             className="w-full"
//                         >
//                             {Array.from({ length: 6 }).map((_, index) => (
//                                 <SwiperSlide key={index} style={{ minWidth: 0 }}> {/* evita que o slide expanda */}
//                                     <div className="flex w-full aspect-video items-center justify-center bg-muted text-foreground border-zinc-400 md:border-r md:last:border-r-0 select-none">
//                                         <span className="text-2xl font-semibold">{index + 1}</span>
//                                     </div>
//                                 </SwiperSlide>
//                             ))}
//                         </Swiper>

//                         <button className="swiper-button-custom-prev hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-background border border-zinc-300 w-10 h-10 rounded-full items-center justify-center cursor-pointer shadow-md hover:bg-accent transition-colors">
//                             <ChevronLeft className="h-4 w-4 text-foreground" />
//                         </button>

//                         <button className="swiper-button-custom-next hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-background border border-zinc-300 w-10 h-10 rounded-full items-center justify-center cursor-pointer shadow-md hover:bg-accent transition-colors">
//                             <ChevronRight className="h-4 w-4 text-foreground" />
//                         </button> 
//                     </div>
//                 </div>
//             </main>
//         </>
//     )
// }

// export default Debug

import { Link } from "react-router-dom"
import logo from '../assets/React.svg'
import logo1 from '../assets/IMG_20251114_003344.png'
import extension from '../assets/Extension.svg'

// function Debug() {
//     return (
//         <>
//             <div className="flex size-full items-center justify-center p-4">
//                 <div className="relative grid size-full max-w-[1600px] place-items-center justify-center gap-10 overflow-hidden rounded-lg border p-4 shadow-sm lg:h-fit lg:grid-cols-2">
//                     <Link to="/" className="inline-flex cursor-pointer justify-center gap-2 whitespace-nowrap rounded-md border-2 font-bold text-sm outline-none transition-all duration-300 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 dark:aria-invalid:ring-destructive/40 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0 bg-background hover:bg-accent hover:text-accent-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50 h-9 px-4 py-2 has-[>svg]:px-3 absolute items-center top-5 right-5 shadow-[0px_4px_0px_0px_rgba(0,0,0,0.1)] hover:translate-y-[1px] hover:shadow-[0px_2px_0px_0px_rgba(0,0,0,0.1)] active:translate-y-[3px] active:shadow-[0px_0px_0px_0px_rgba(0,0,0,0.1)] dark:shadow-[0px_4px_0px_0px_rgba(0,0,0,0.4)] dark:active:shadow-[0px_0px_0px_0px_rgba(0,0,0,0.4)] dark:hover:shadow-[0px_2px_0px_0px_rgba(0,0,0,0.4)]">
//                         <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-arrow-left text-primary" aria-hidden="true"><path d="m12 19-7-7 7-7"></path><path d="M19 12H5"></path></svg>
//                         <p>Inicio</p>
//                     </Link>

//                     <div className="size-full max-h-[90svh] max-lg:hidden">
//                         <div className="relative h-full" role="region" aria-rolesdescription="carrousel" data-slot="carrousel" style={{ aspectRatio: 0.75 / 1 }}>
//                             <div className="h-full overflow-hidden" data-slot="carrousel-content">
//                                 <div className="flex -ml-4 h-full" style={{transform: 'translate3d(0px,0px,0px)'}}>
//                                     <div role="group" aria-roledescription="slide" data-slot="carrousel-item" className="min-w-0 shrink-0 grow-0 basis-full pl-4 flex items-center justify-center">
//                                         <img src={logo} width={430} height={530} draggable="false" className="size-full object-contain" alt="backgroundimg" />
//                                     </div>
//                                 </div>
//                             </div>
//                             <div className="motion-preset-focus -translate-x-1/2 absolute bottom-12 left-1/2 flex w-full items-center justify-center gap-2">
//                                 <div className="h-[6px] w-8 cursor-pointer rounded-full transition-all duration-500 hover:w-12 bg-primary"></div>
//                             </div>
//                         </div>
//                     </div>
//                     <div className="flex w-full max-w-[400px] flex-col items-center gap-10 overflow-hidden">
//                         <div className="flex flex-col gap-5 ">
//                             <img src={logo1} alt="logo1" className="size-24" />
//                             <h1 className="font-bold text-3xl"> Entrar na sua conta</h1>
//                         </div>
//                         <form className="w-full space-y-6">
//                             <div className="flex w-full flex-col">
//                                 <label htmlFor="login" className="mb-4 flex select-none items-center gap-2 font-bold text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-50 group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50">Quem é você mesmo?:</label>
//                                 <div className="relative">
//                                     <input data-slot="input" className="flex h-9 w-full min-w-0 border px-3 py-1 text-base shadow-xs outline-none transition-[color,box-shadow,border] selection:bg-primary selection:text-primary-foreground placeholder:text-muted-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm bg-input/30 border-input rounded-md focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive" id="login" max="254" placeholder="aluno@exemplo.com" type="text" value="" name="login"></input>
//                                 </div>
//                                 <p className="mt-2 text-muted-foreground text-xs "> Digite seu usuário e volte ao sistema </p>
//                                 <p className="mt-2 flex min-h-4 items-center font-bold text-destructive text-xs"></p>
//                                 <div className="mt-4 flex items-center justify-center gap-2 ">
//                                     <button data-disabled="true" type="submit" className="inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-md border-2 font-bold text-sm outline-none transition-all duration-300 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 dark:aria-invalid:ring-destructive/40 [&amp;_svg:not([class*='size-'])]:size-4 [&amp;_svg]:pointer-events-none [&amp;_svg]:shrink-0 border-primary bg-primary/80 text-primary-foreground hover:bg-primary/90 h-9 px-4 py-2 has-[&gt;svg]:px-3 shadow-[0px_4px_0px_0px_rgba(0,0,0,0.1)] hover:translate-y-[1px] hover:shadow-[0px_2px_0px_0px_rgba(0,0,0,0.1)] active:translate-y-[3px] active:shadow-[0px_0px_0px_0px_rgba(0,0,0,0.1)] dark:shadow-[0px_4px_0px_0px_rgba(0,0,0,0.4)] dark:active:shadow-[0px_0px_0px_0px_rgba(0,0,0,0.4)] dark:hover:shadow-[0px_2px_0px_0px_rgba(0,0,0,0.4)]">Próximo</button>
//                                 </div>
//                             </div>
//                         </form>
//                         <a data-disabled="false" className="inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-md border-2 font-bold outline-none transition-all duration-300 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 dark:aria-invalid:ring-destructive/40 [&amp;_svg:not([class*='size-'])]:size-4 [&amp;_svg]:pointer-events-none [&amp;_svg]:shrink-0 border-none underline-offset-4 hover:underline h-9 px-4 py-2 has-[&gt;svg]:px-3 text-foreground text-xs shadow-none hover:translate-y-0 hover:shadow-none active:translate-y-0 active:shadow-none dark:shadow-none dark:active:shadow-none dark:hover:shadow-none">Ainda não tem uma conta? crie agora!</a>
//                     </div>
//                 </div>
//             </div>
//         </>
//     )
// }

// export default Debug

function Debug() {
    return (
        <>
            <section className="flex h-screen w-full items-center justify-center p-4 overflow-hidden">
                <section className="relative grid size-full max-w-[1600px] place-items-center justify-center gap-10 overflow-hidden rounded-lg border border-neutral-300 p-4 shadow-sm lg:h-fit lg:grid-cols-2">
                    <Link to="/" className="inline-flex cursor-pointer justify-center gap-2 whitespace-nowrap rounded-md border border-zinc-500 font-bold text-sm outline-none transition-all duration-300 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 dark:aria-invalid:ring-destructive/40 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0 bg-background hover:bg-zinc-100 hover:text-accent-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50 h-9 px-4 py-2 has-[>svg]:px-3 absolute items-center top-5 right-5 hover:translate-y-[1px] active:translate-y-[3px] active:shadow-[0px_0px_0px_0px_rgba(0,0,0,0.1)] dark:active:shadow-[0px_0px_0px_0px_rgba(0,0,0,0.4)] ">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-arrow-left text-primary" aria-hidden="true"><path d="m12 19-7-7 7-7"></path><path d="M19 12H5"></path></svg>
                        <p>Início</p>
                    </Link>
                    <div className="size-full max-h-[90svh] max-lg:hidden">
                        <div className="relative h-full" role="region" aria-rolesdescription="carrousel" data-slot="carrousel" style={{ aspectRatio: 0.75 / 1 }}>
                            <div className="h-full overflow-hidden" data-slot="carrousel-content">
                                <div className="flex -ml-4 h-full" style={{ transform: 'translate3d(0px,0px,0px)' }}>
                                    <div role="group" aria-roledescription="slide" data-slot="carrousel-item" className="min-w-0 shrink-0 grow-0 flex flex-col basis-full pl-8 items-center justify-center">
                                        <div className="max-w-[350px] text-left">

                                            <h1 className="text-3xl font-extrabold text-(--darkBlue) tracking-tight sm:text-4xl mb-3">
                                                Seu portal de extensão
                                            </h1>

                                            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                                                Acesse sua conta para acompanhar seus projetos, relatórios e atividades em tempo real.
                                            </p>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex w-full max-w-[400px] flex-col items-center gap-10 overflow-hidden">
                        <div className="flex flex-col items-center gap-5 ">
                            <img src={logo1} alt="logo1" className="size-18" />
                            <h1 className="font-bold text-3xl text-(#005387cc)"> Entrar na sua conta</h1>
                        </div>
                        <form className="w-full space-y-6">
                            <div className="flex w-full flex-col">
                                <label htmlFor="login" className="mb-4 flex select-none items-center gap-2 font-bold text-sm leading-none">Digite seu usuário</label>
                                <div className="relative mb-4">
                                    <input data-slot="input" className="flex h-9 w-full min-w-0 border px-3 py-1 text-base shadow-xs outline-none transition-[color,box-shadow,border] selection:bg-primary selection:text-primary-foreground placeholder:text-muted-foreground md:text-sm bg-input/30 border-zinc-300 rounded-md focus-visible:border-(--lightCyan) focus-visible:ring-(--lightCyan)/30 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive" id="login" max="254" placeholder="aluno@exemplo.com" type="text" autoComplete="off" name="login"></input>
                                </div>
                                <label htmlFor="login" className="mb-4 flex select-none items-center gap-2 font-bold text-sm leading-none ">Digite sua senha</label>
                                <div className="relative mb-2">
                                    <input data-slot="input" className="flex h-9 w-full min-w-0 border px-3 py-1 text-base shadow-xs outline-none transition-[color,box-shadow,border] selection:bg-primary selection:text-primary-foreground placeholder:text-muted-foreground md:text-sm bg-input/30 border-zinc-300 rounded-md focus-visible:border-(--lightCyan) focus-visible:ring-(--lightCyan)/30 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive" id="password" max="254" placeholder="••••••••••" type="password" name="password"></input>
                                </div>
                                <p className="mt-2 flex min-h-4 items-center font-bold text-destructive text-xs"></p>
                                <div className="mt-4 flex items-center justify-center gap-2 ">
                                    <button type="submit" className="inline-flex min-w-0 w-1/3 cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-md font-bold text-sm outline-none transition-all duration-300 focus-visible:border-ring focus-visible:ring-[1px] focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 dark:aria-invalid:ring-destructive/40 [&amp;_svg:not([class*='size-'])]:size-4 [&amp;_svg]:pointer-events-none [&amp;_svg]:shrink-0 border-primary bg-(--lightCyan) text-primary-foreground hover:bg-(--cyanHover) h-9 px-4 py-2 has-[&gt;svg]:px-3 hover:translate-y-[1px] hover:shadow-[0px_2px_0px_0px_rgba(0,0,0,0.1)] active:translate-y-0.75 active:shadow-[0px_0px_0px_0px_rgba(0,0,0,0.1)] dark:active:shadow-[0px_0px_0px_0px_rgba(0,0,0,0.4)] dark:hover:shadow-[0px_2px_0px_0px_rgba(0,0,0,0.4)]"> Entrar </button>
                                </div>
                            </div>
                        </form>
                        <a data-disabled="false" className="inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-md border-2 font-bold outline-none transition-all duration-300 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 dark:aria-invalid:ring-destructive/40 [&amp;_svg:not([class*='size-'])]:size-4 [&amp;_svg]:pointer-events-none [&amp;_svg]:shrink-0 border-none underline-offset-4 hover:underline h-9 px-4 py-2 has-[&gt;svg]:px-3 text-foreground text-xs shadow-none hover:translate-y-0 hover:shadow-none active:translate-y-0 active:shadow-none dark:shadow-none dark:active:shadow-none dark:hover:shadow-none">Problemas com o login? contate o TI</a>
                    </div>
                </section>
            </section>
        </>
    )
}

export default Debug