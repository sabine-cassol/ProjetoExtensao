
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
// import { NEWS } from '@/data/New.ts'
import { Calendar, ArrowLeft, User, Pencil, Trash, AlertCircle } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
// import { type Noticia } from '@/data/New.ts'
import Erro from '../components/Error.tsx'
import { type Noticia } from '@/data/NewType.ts'
import { noticiaSchema } from "@/schemas/authSchemas";
import { NoticiaDetalhesSkeleton } from '@/components/NewDetailSkeleton.tsx';
import { useNoticiaId, useAtualizarNoticia, useDeletarNoticia } from '@/services/noticiaService';
import Tiptap from '@/components/TipTap.tsx'
import { toast } from 'sonner'
import imageCompression from 'browser-image-compression';
import { useRef } from 'react'

async function converterParaBase64(arquivo: File): Promise<string> {
    const opcoes = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1200,
        useWebWorker: true
    };

    const arquivoComprimido = await imageCompression(arquivo, opcoes);

    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(arquivoComprimido);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
    });
}

function NewDetail() {
    const { noticiaId } = useParams<{ noticiaId: string }>();
    const { role, user } = useAuth();
    const { pathname } = useLocation();
    const [editForm, setEditForm] = useState<Noticia | undefined>(undefined);
    const refsCampos = useRef<Record<string, HTMLElement | null>>({});
    // const [listaNews, setListaNews] = useState(NEWS);

    // const noticia = listaNews.find(n => n.id == noticiaId);
    const [isEditing, setIsEditing] = useState(false);
    const [errosNoticia, setErrosNoticia] = useState<Record<string, string>>({});
    const [uploadStatus, setUploadStatus] = useState<'idle' | 'loading' | 'success'>('idle');
    const [fileName, setFileName] = useState<string>('');


    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    const { data: noticia, isLoading, error } = useNoticiaId(noticiaId);

    const atualizarMutation = useAtualizarNoticia(noticiaId!, () => setIsEditing(false));

    const deletarMutation = useDeletarNoticia(noticiaId!);

    const ehAutor = role === 'teacher' && !!user?.id && (
        noticia?.professorId === Number(user.id) || user?.isAdmin
    );

    const handleStartEditing = () => {
        if (ehAutor) {
            setEditForm(noticia);
            setUploadStatus('idle');
            setFileName('');
            setIsEditing(true);
        } else {
            console.log("Você não tem permissão para editar");
        }
    };

    const handleChange = (name: keyof Noticia, value: string) => {
        if (editForm) {
            setEditForm({
                ...editForm,
                [name]: value
            });
        }
    };

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        setFileName(file.name);
        setUploadStatus('loading');

        try {
            const base64 = await converterParaBase64(file);

            // Atualiza a propriedade imageUrl no editForm
            handleChange('imageUrl', base64);
            setUploadStatus('success');
        } catch (error) {
            console.error("Erro no upload", error);
            toast.error("Erro ao processar imagem");
            setUploadStatus('idle');
        }
    };

    const handleSaveEdit = () => {
        setErrosNoticia({});
        if (!editForm) return;

        const validacao = noticiaSchema.safeParse({
            titulo: editForm.titulo,
            resumo: editForm.resumo,
            conteudo: editForm.conteudo,
            imagem: editForm.imageUrl
        });

        if (!validacao.success) {
            const erros: Record<string, string> = {};
            validacao.error.issues.forEach((issue) => {
                const campo = issue.path[0] as string;
                if (!erros[campo]) {
                    erros[campo] = issue.message;
                }
            });
            setErrosNoticia(erros);

            const primeiroCampoComErro = Object.keys(erros)[0];
            const elemento = refsCampos.current[primeiroCampoComErro];
            if (elemento) {
                elemento.scrollIntoView({ behavior: 'smooth', block: 'center' });
                elemento.focus();
            }

            return;
        }

        atualizarMutation.mutate(editForm);
    };

    const handleDelete = () => {
        const confirmou = confirm("Deseja mesmo deletar a notícia?");
        if (!confirmou) return;
        deletarMutation.mutate();
    };

    if (isLoading) {
        return <NoticiaDetalhesSkeleton></NoticiaDetalhesSkeleton>
    }

    if (error || !noticia) {
        return (
            <div className="flex flex-col items-center justify-center">
                <Erro tipo="Notícia" />
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

                    {ehAutor && (<section className='border border-b-0 border-zinc-200 flex justify-end bg-gray-100 px-4 py-2 rounded-t-sm'>
                        {!isEditing ? (
                            <div className='flex items-center overflow-hidden border border-zinc-300 bg-white rounded-sm'>
                                <button onClick={handleStartEditing} className='cursor-pointer border-r border-zinc-300 bg-white rounded-l-sm p-2 hover:bg-slate-50' title='Editar Notícia'>
                                    <Pencil size={18}></Pencil>
                                </button>
                                <button onClick={handleDelete} disabled={deletarMutation.isPending} className='cursor-pointer  rounded-sm p-2 hover:bg-slate-50' title='Deletar Notícia'>
                                    <Trash size={18}></Trash>
                                </button>
                            </div>
                        ) :
                            (<div className='flex gap-3 font-normal text-sm'>
                                <button onClick={() => setIsEditing(false)} className="flex-1 px-4 py-1.5 text-sm font-medium text-slate-700 bg-white border border-zinc-500 rounded-lg hover:bg-slate-50  hover:text-slate-800 active:bg-slate-100 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">Cancelar</button>
                                <button onClick={handleSaveEdit} disabled={atualizarMutation.isPending} className="flex-1 px-4 py-1.5 text-sm font-medium text-white bg-[#2ab646] border border-green-500 rounded-lg hover:bg-green-600 active:bg-green-400 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"> {atualizarMutation.isPending ? 'Salvando...' : 'Confirmar'} </button>
                            </div>)}
                    </section>)}
                    <article className={`bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 md:p-8 shadow-xs ${role === 'teacher' ? 'rounded-b-xl' : 'rounded-xl'}`}>

                        {isEditing ? (
                            <>
                                <input type="text" value={editForm?.titulo || ''} onChange={(e) => handleChange('titulo', e.target.value)} ref={(el) => { refsCampos.current['titulo'] = el; }} className="border text-3xl md:text-4xl w-full text-zinc-800 border-zinc-400 rounded-sm p-2 focus:outline-none focus:border-zinc-500 focus-within:ring-2 focus-within:ring-zinc-900/10 focus-within:border-zinc-500 transition-all" />
                                {errosNoticia.titulo && (
                                    <div className="flex items-center gap-1.5 mt-1.5 text-red-600">
                                        <div className='flex flex-row gap-1 items-center'>
                                            <AlertCircle className="size-3.5 shrink-0" />
                                            <span className="text-xs font-medium tracking-wide">
                                                {errosNoticia.titulo}
                                            </span>
                                        </div>
                                    </div>
                                )}
                            </>

                        ) : (
                            <h1 className="text-3xl md:text-4xl font-bold leading-relaxed text-zinc-900 dark:text-white font-segoe">
                                {noticia.titulo}
                            </h1>
                        )
                        }

                        <div className="flex flex-wrap items-center gap-4 mt-4 text-xs md:text-sm text-neutral-700 dark:text-zinc-400 border-b border-zinc-100 dark:border-zinc-800 pb-4">
                            <div className="flex items-center gap-1.5">
                                <User size={16} className="text-zinc-400" />
                                <span className='text-neutral-700 font-medium'>Por <span className="text-neutral-700 ">{noticia.autor.nome ?? 'autor desconhecido'}</span></span>
                            </div>
                            <span className="text-zinc-400 dark:text-zinc-700">•</span>
                            <div className="flex items-center gap-1.5">
                                <Calendar size={16} className="text-zinc-400" />
                                <span className='text-neutral-700 font-medium'>{new Date(noticia.createdAt).toLocaleDateString('pt-BR')}</span>
                            </div>
                        </div>

                        {isEditing ? (
                            <>
                                <input type="text" value={editForm?.resumo || ''} onChange={(e) => handleChange('resumo', e.target.value)} ref={(el) => { refsCampos.current['resumo'] = el; }} className="mt-6 text-sm font-medium  text-zinc-600 pl-4 italic bg-neutral-100  py-2 border w-full  border-zinc-400 rounded-sm p-2 focus:outline-none focus:border-zinc-500 focus-within:ring-2 focus-within:ring-zinc-900/10 focus-within:border-zinc-500 transition-all" />
                                {errosNoticia.resumo && (
                                    <div className="flex items-center gap-1.5 mt-1.5 text-red-600">
                                        <div className='flex flex-row gap-1 items-center'>
                                            <AlertCircle className="size-3.5 shrink-0" />
                                            <span className="text-xs font-medium tracking-wide">
                                                {errosNoticia.resumo}
                                            </span>
                                        </div>
                                    </div>
                                )}
                            </>
                        ) : (
                            <p className="mt-6 text-sm font-medium  text-zinc-600 pl-4 italic bg-neutral-100  py-2 ">
                                {noticia.resumo}
                            </p>
                        )}

                        {isEditing ? (
                            <>
                                <div className="mt-8">
                                    <Tiptap
                                        value={editForm?.conteudo || ''}
                                        onChange={(novoConteudo) => handleChange('conteudo', novoConteudo)}
                                    />
                                </div>
                                {errosNoticia.conteudo && (
                                    <div className="flex items-center gap-1.5 mt-1.5 text-red-600">
                                        <div className="flex flex-row gap-1 items-center">
                                            <AlertCircle className="size-3.5 shrink-0" />
                                            <span className="text-xs font-medium tracking-wide">
                                                {errosNoticia.conteudo}
                                            </span>
                                        </div>
                                    </div>
                                )}
                            </>
                        ) : (
                            <div
                                className="mt-8 text-sm font-normal leading-relaxed text-zinc-800 dark:text-zinc-200 break-words overflow-hidden
            [&_h1]:text-2xl [&_h1]:font-bold [&_h1]:mt-4 [&_h1]:mb-2 [&_h1]:break-words
            [&_h2]:text-xl [&_h2]:font-bold [&_h2]:mt-3 [&_h2]:mb-2 [&_h2]:break-words
            [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:mt-2 [&_h3]:mb-1 [&_h3]:break-words
            [&_p]:mb-3 [&_p]:indent-8 [&_p]:break-words
            [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:mb-3 
            [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:mb-3
            [&_strong]:font-bold [&_em]:italic 
            [&_blockquote]:border-l-4 [&_blockquote]:border-zinc-300 [&_blockquote]:pl-4 [&_blockquote]:italic"
                                dangerouslySetInnerHTML={{ __html: noticia.conteudo || "-" }}
                            />
                        )}

                        {isEditing ? (
                            <div className="mt-6 flex flex-col gap-2">
                                <span className="font-semibold text-neutral-700 dark:text-zinc-300">
                                    Alterar imagem referente à notícia
                                </span>

                                {editForm?.imageUrl && (
                                    <div className="mx-auto my-2 max-w-2xl overflow-hidden rounded-xl border border-zinc-300 dark:border-zinc-700">
                                        <img
                                            src={editForm.imageUrl}
                                            alt="Preview da imagem"
                                            className="w-full h-auto max-h-80 object-cover"
                                        />
                                    </div>
                                )}

                                <label
                                    htmlFor="image-upload"
                                    className={`flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-xl cursor-pointer transition-colors duration-200 ${uploadStatus === 'loading' ? 'border-blue-300 bg-blue-50/50 cursor-wait' : ''
                                        } ${uploadStatus === 'success' ? 'border-green-300 bg-green-50/50' : 'border-gray-300 bg-gray-50 hover:bg-gray-100 hover:border-blue-300 dark:bg-zinc-800 dark:border-zinc-700 dark:hover:bg-zinc-800/80'
                                        }`}
                                >
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6 text-gray-500 px-4 text-center">
                                        {uploadStatus === 'loading' && (
                                            <>
                                                <svg className="animate-spin h-8 w-8 mb-3 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                <p className="text-sm font-medium text-blue-600">Enviando imagem...</p>
                                                <p className="text-xs text-gray-400 mt-1 truncate max-w-xs">{fileName}</p>
                                            </>
                                        )}
                                        {uploadStatus === 'success' && (
                                            <>
                                                <svg className="w-8 h-8 mb-3 text-green-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                                </svg>
                                                <p className="text-sm font-medium text-green-600">Imagem atualizada com sucesso!</p>
                                                <p className="text-xs text-gray-500 mt-1 truncate max-w-xs font-mono bg-white dark:bg-zinc-900 px-2 py-1 rounded border border-green-200">
                                                    {fileName}
                                                </p>
                                                <span className="text-xs text-blue-500 underline mt-2 hover:text-blue-600">Trocar por outra imagem</span>
                                            </>
                                        )}
                                        {uploadStatus === 'idle' && (
                                            <>
                                                <svg className="w-8 h-8 mb-3 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                                </svg>
                                                <p className="mb-1 text-sm"><span className="font-semibold">Clique para trocar a imagem</span> ou arraste o novo arquivo</p>
                                                <p className="text-xs text-gray-400">(Max. 1MB)</p>
                                            </>
                                        )}
                                    </div>

                                    <input
                                        id="image-upload"
                                        type="file"
                                        accept="image/*"
                                        className="hidden w-full h-auto object-contain"
                                        onChange={handleFileChange}
                                        disabled={uploadStatus === 'loading'}
                                    />
                                </label>

                                {errosNoticia.imagem && (
                                    <div className="flex items-center gap-1.5 mt-1.5 text-red-600">
                                        <div className="flex flex-row gap-1 items-center">
                                            <AlertCircle className="size-3.5 shrink-0" />
                                            <span className="text-xs font-medium tracking-wide">
                                                {errosNoticia.imagem}
                                            </span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="mx-auto mt-8 max-w-2xl overflow-hidden rounded-xl border-2 border-zinc-300">
                                <img
                                    src={noticia.imageUrl}
                                    alt="Imagem da notícia"
                                    loading='lazy'
                                    className="w-full h-auto object-contain"
                                />
                            </div>
                        )}

                    </article>
                </h1>
            </main>

        </>
    )
}

export default NewDetail