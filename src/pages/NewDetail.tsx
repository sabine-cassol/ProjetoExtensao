
import { useParams } from 'react-router-dom'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { NEWS } from '@/data/New.ts'
import { Calendar, ArrowLeft, User, Pencil } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { type Noticia } from '@/data/New.ts'


function NewDetail() {
    const { noticiaId } = useParams<{ noticiaId: string }>();
    const { role } = useAuth();
    const [editForm, setEditForm] = useState<Noticia | undefined>(undefined);
    const [listaNews, setListaNews] = useState(NEWS);

    const noticia = listaNews.find(n => n.id == noticiaId);
    const [isEditing, setIsEditing] = useState(false);

    const handleStartEditing = () => {
        if (role === "teacher") {
            setEditForm(noticia);
            setIsEditing(true);
        } else {
            console.log("Você nao tem permissão para editar");
        }
    };
    const handleChange = (name: string, value: string) => {
        if (editForm) {
            setEditForm({
                ...editForm,
                [name]: value
            });
        }
    };

    const handleSaveEdit = () => {
        if (!editForm) return;

        setListaNews(prevLista =>
            prevLista.map(item => item.id === editForm.id ? editForm : item)
        );

        setIsEditing(false);

        console.log("Notícia atualizada localmente com sucesso!");
    };


    if (!noticia) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-50">
                <p className="text-lg text-zinc-600 mb-4 font-medium">⚠️ Notícia não encontrada.</p>
                <Link to="/" className="text-indigo-600 hover:underline text-sm font-semibold">Voltar para o início</Link>
            </div>
        );
    }
    return (
        <>

            <main className="flex-1 bg-zinc-50/50">
                <h1 className="text-2xl font-bold">
                    <Link to="/Notícias" className="inline-flex items-center gap-2 text-sm font-medium text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200 mb-6 transition-colors">
                        <ArrowLeft size={16} /> Voltar para Notícias
                    </Link>

                    {role === 'teacher' && (<section className='border border-b-0 border-zinc-200 flex justify-end bg-gray-100 px-4 py-2 rounded-t-sm'>
                        {!isEditing ? (<button onClick={handleStartEditing} className='cursor-pointer border border-zinc-300 bg-white rounded-lg p-2 hover:bg-slate-50' title='Editar Notícia'>
                            <Pencil size={18}></Pencil>
                        </button>) :
                            (<div className='flex gap-3 font-normal text-sm'>
                                <button onClick={() => setIsEditing(false)} className="flex-1 px-4 py-1.5 text-sm font-medium text-slate-700 bg-white border border-zinc-500 rounded-lg hover:bg-slate-50  hover:text-slate-800 active:bg-slate-100 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">Cancelar</button>
                                <button onClick={() => handleSaveEdit() } className="flex-1 px-4 py-1.5 text-sm font-medium text-white bg-[#2ab646] border border-green-500 rounded-lg hover:bg-green-600 active:bg-green-400 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"> Confirmar </button>
                            </div>)}
                    </section>)}
                    <article className={`bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 md:p-8 shadow-xs ${role === 'teacher' ? 'rounded-b-xl' : 'rounded-xl'}`}>

                        {isEditing && role === 'teacher' ? (
                            <input type="text" value={editForm?.titulo || ''} onChange={(e) => handleChange('titulo', e.target.value)} className="border text-3xl md:text-4xl w-full text-zinc-800 border-zinc-400 rounded-sm p-2 focus:outline-none focus:border-zinc-500 focus-within:ring-2 focus-within:ring-zinc-900/10 focus-within:border-zinc-500 transition-all" />
                        ) : (
                            <h1 className="text-3xl md:text-4xl font-bold leading-relaxed text-zinc-900 dark:text-white font-segoe">
                                {noticia?.titulo}
                            </h1>
                        )
                        }

                        <div className="flex flex-wrap items-center gap-4 mt-4 text-xs md:text-sm text-neutral-700 dark:text-zinc-400 border-b border-zinc-100 dark:border-zinc-800 pb-4">
                            <div className="flex items-center gap-1.5">
                                <User size={16} className="text-zinc-400" />
                                <span className='text-neutral-700 font-medium'>Por <span className="text-neutral-700 ">{noticia.autor}</span></span>
                            </div>
                            <span className="text-zinc-400 dark:text-zinc-700">•</span>
                            <div className="flex items-center gap-1.5">
                                <Calendar size={16} className="text-zinc-400" />
                                <span className='text-neutral-700 font-medium'>{noticia.data}</span>
                            </div>
                        </div>

                        {isEditing && role === 'teacher' ? (
                            <input type="text" value={editForm?.resumo || ''} onChange={(e) => handleChange('resumo', e.target.value)} className="mt-6 text-sm font-medium  text-zinc-600 pl-4 italic bg-neutral-100  py-2 border w-full  border-zinc-400 rounded-sm p-2 focus:outline-none focus:border-zinc-500 focus-within:ring-2 focus-within:ring-zinc-900/10 focus-within:border-zinc-500 transition-all" />
                        ) : (
                            <p className="mt-6 text-sm font-medium  text-zinc-600 pl-4 italic bg-neutral-100  py-2 ">
                                {noticia?.resumo}
                            </p>
                        )}

                        {isEditing && role === 'teacher' ? (
                            <textarea value={editForm?.conteudo || ''} onChange={(e) => handleChange('conteudo', e.target.value)} className="mt-8 font-normal text-sm leading-relaxed font-segoe whitespace-pre-line indent-8 border w-full text-zinc-800 border-zinc-400 rounded-sm p-2 focus:outline-none focus:border-zinc-500 focus-within:ring-2 focus-within:ring-zinc-900/10 focus-within:border-zinc-500 transition-all" />
                        ) : (
                            <div className="mt-8 font-normal text-sm leading-relaxed font-segoe whitespace-pre-line indent-8">
                                {noticia?.conteudo}
                            </div>
                        )}

                    </article>
                </h1>
            </main>

        </>
    )
}

export default NewDetail