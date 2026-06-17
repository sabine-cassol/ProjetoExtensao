import Header from '../components/Header.tsx'
import Footer from '../components/Footer.tsx'
import { SidebarProvider } from "../components/ui/sidebar.tsx"
import { AppSidebar } from "../components/app-sidebar.tsx"
import { useAuth } from '@/context/AuthContext.tsx'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"

import { Globe, Clock4, FileText, ScrollText } from 'lucide-react'

function Home() {
    const { role } = useAuth();
    return (
        <>
            <SidebarProvider defaultOpen={role === 'student' || role === 'teacher'}>
                <div className="flex flex-col w-screen min-h-screen">
                    <Header />

                    <div className="flex flex-1 w-full">

                        <AppSidebar />

                        <main className="p-4 flex-1 bg-zinc-50/50">
                            <h1 className="text-4xl font-bold overflow-hidden"> Início </h1>
                            <div className="w-full max-w-6xl mx-auto border border-zinc-400 bg-card mt-6">
                                <Carousel
                                    className="w-full"
                                    opts={{
                                        align: "start",
                                        loop: true,
                                        watchSlides: true,
                                    }}
                                >
                                    <CarouselContent className="ml-0">
                                        {Array.from({ length: 6 }).map((_, index) => (
                                            <CarouselItem key={index} className="pl-0 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                                                <div className="flex aspect-video items-center justify-center bg-muted text-foreground border-r last:border-r-0 rounded-none h-48">
                                                    <span className="text-2xl font-semibold">{index + 1}</span>
                                                </div>
                                            </CarouselItem>
                                        ))}
                                    </CarouselContent>

                                    <CarouselPrevious className="left-4" />
                                    <CarouselNext className="right-4" />
                                </Carousel>
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
                    </div>
                </div>
            </SidebarProvider>
            <Footer />
        </>
    )
}

export default Home