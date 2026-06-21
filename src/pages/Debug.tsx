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


