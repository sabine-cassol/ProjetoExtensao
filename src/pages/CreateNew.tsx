import Tiptap from "@/components/TipTap"
import { Calendar, User, ChevronUp, ChevronDown, AlertCircle } from 'lucide-react'
import { useState } from "react"
import { toast } from 'sonner';
import imageCompression from 'browser-image-compression';
import { useAuth } from '@/context/AuthContext';
import { noticiaSchema } from "@/schemas/authSchemas";
import { useCriarNoticia } from "@/services/noticiaService";
import { useRef } from "react";

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

function CreateNew() {
    const { user } = useAuth();

    const [uploadStatus, setUploadStatus] = useState<'idle' | 'loading' | 'success'>('idle');
    const [fileName, setFileName] = useState<string>('');
    const [titulo, setTitulo] = useState('');
    const [resumo, setResumo] = useState('');
    const [conteudo, setConteudo] = useState('');
    const [isExpanded, setIsExpanded] = useState(false);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imageBase64, setImageBase64] = useState<string>('');
    const [errosNoticia, setErrosNoticia] = useState<Record<string, string>>({});
    const refsCampos = useRef<Record<string, HTMLElement | null>>({});

    const textoLimpo = conteudo ? conteudo.replace(/<[^>]+>/g, '') : '';
    const longText = textoLimpo.length > 600;

    const textoExibido = longText && !isExpanded ? `${conteudo.substring(0, 600)}...` : conteudo;

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        setFileName(file.name);
        setImageFile(file);
        setUploadStatus('loading');

        try {
            const base64 = await converterParaBase64(file);
            setImageBase64(base64);
            setUploadStatus('success');
        } catch (error) {
            console.error("Erro no upload", error);
            toast.error("Erro ao processar imagem");
            setUploadStatus('idle');
        }
    };

    const criarMutation = useCriarNoticia();

    const handlePublicar = () => {
        setErrosNoticia({});

        const validacao = noticiaSchema.safeParse({
            titulo,
            resumo,
            conteudo,
            imagem: imageBase64
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

        criarMutation.mutate({
            titulo,
            resumo,
            conteudo,
            imageUrl: imageBase64
        });
    };

    // upar imagem com compressão 
    //     const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    //     const file = event.target.files?.[0];
    //     if (!file) return;

    //     setFileName(file.name);
    //     setImageFile(file);
    //     setUploadStatus('loading');

    //     const options = {
    //         maxSizeMB: 50,           // Definimos um limite alto em MB para a lib NÃO forçar a barra na compressão por tamanho
    //         maxWidthOrHeight: 1920,  // Mantém o limite de tamanho dimensional (resolução máxima)
    //         useWebWorker: true,      
    //         fileType: 'image/webp' as const, // Força a conversão para WebP
    //         initialQuality: 1,       // <-- Garante 100% da qualidade original na conversão (sem perdas adicionais)
    //     };

    //     try {
    //         // Executa a conversão e o redimensionamento (se a imagem passar de 1920px)
    //         const compressedBlob = await imageCompression(file, options);

    //         // Troca a extensão para .webp
    //         const newFileName = file.name.replace(/\.[^/.]+$/, "") + ".webp";

    //         const compressedFile = new File([compressedBlob], newFileName, {
    //             type: 'image/webp',
    //         });

    //         setFileName(compressedFile.name);
    //         setImageFile(compressedFile); 

    //         setUploadStatus('success');
    //     } catch (error) {
    //         console.error("Erro no processamento da imagem", error);
    //         setUploadStatus('idle');
    //     }
    // };

    return (
        <>
            <section className="flex-1 flex items-center justify-center p-2">
                <section className=" w-full min-w-[320px] max-w-3xl ">
                    <div>
                        <h2 className="text-xl font-bold">Criar nova notícia</h2>
                        <p className="text-[#9198a1]">Notícias podem ser visualizadas por todos usuários do site, incluindo visitantes</p>
                    </div>
                    <div className="mt-4 flex flex-col gap-2 ">
                        <label htmlFor="input" className="font-semibold">Digite o título da notícia</label>
                        <input type="text" required maxLength={254} value={titulo} onChange={(e) => setTitulo(e.target.value)} ref={(el) => { refsCampos.current['titulo'] = el; }} className="border border-zinc-300  rounded-sm p-2 focus:outline-none focus:border-zinc-500 focus-within:ring-2 focus-within:ring-zinc-900/10 focus-within:border-zinc-500 transition-all" />
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
                        <label htmlFor="input" className="font-semibold">Digite o resumo da notícia</label>
                        <input type="text" required maxLength={254} value={resumo} onChange={(e) => setResumo(e.target.value)} ref={(el) => { refsCampos.current['resumo'] = el; }} className="border border-zinc-300 rounded-sm p-2 focus:outline-none focus:border-zinc-500 focus-within:ring-2 focus-within:ring-zinc-900/10 focus-within:border-zinc-500 transition-all" />
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
                    </div>
                    <div>
                        <Tiptap value={conteudo} onChange={setConteudo}  />
                        {errosNoticia.conteudo && (
                            <div className="flex items-center gap-1.5 mt-1.5 text-red-600">
                                <div className='flex flex-row gap-1 items-center'>
                                    <AlertCircle className="size-3.5 shrink-0" />
                                    <span className="text-xs font-medium tracking-wide">
                                        {errosNoticia.conteudo}
                                    </span>
                                </div>
                            </div>
                        )}

                    </div>
                    <div className="mt-4 flex flex-col gap-2">
                        <span className="font-semibold text-neutral-700">Envie a imagem referente à notícia</span>

                        <label htmlFor="image-upload" className={`flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-xl cursor-pointer transition-colors duration-200 ${uploadStatus === 'loading' ? 'border-blue-300 bg-blue-50/50 cursor-wait' : ''} ${uploadStatus === 'success' ? 'border-green-300 bg-green-50/50' : 'border-gray-300 bg-gray-50 hover:bg-gray-100 hover:border-blue-300'}`}>
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
                                        <p className="text-sm font-medium text-green-600">Upload concluído!</p>
                                        <p className="text-xs text-gray-500 mt-1 truncate max-w-xs font-mono bg-white px-2 py-1 rounded border border-green-200">
                                            {fileName}
                                        </p>
                                        <span className="text-xs text-blue-500 underline mt-2 hover:text-blue-600">Alterar imagem</span>
                                    </>
                                )}
                                {uploadStatus === 'idle' && (
                                    <>
                                        <svg className="w-8 h-8 mb-3 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                        </svg>
                                        <p className="mb-1 text-sm"><span className="font-semibold">Clique para fazer upload</span> ou arraste a imagem</p>
                                        <p className="text-xs text-gray-400">(Max. 1MB)</p>
                                    </>
                                )}

                            </div>

                            <input id="image-upload" type="file" accept="image/*" className="hidden" onChange={handleFileChange} disabled={uploadStatus === 'loading'} />
                        </label>
                        {errosNoticia.imagem && (
                            <div className="flex items-center gap-1.5 mt-1.5 text-red-600">
                                <div className='flex flex-row gap-1 items-center'>
                                    <AlertCircle className="size-3.5 shrink-0" />
                                    <span className="text-xs font-medium tracking-wide">
                                        {errosNoticia.imagem}
                                    </span>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="mt-4 flex flex-col gap-2">
                        <div>
                            <h2 className="text-xl font-bold">Prévia da notícia</h2>
                            <p className="text-[#9198a1] text-xs">OBS.: A notícia publicada pode não ficar exatamente igual à prévia apenas em formatação por conta do tamanho das páginas e espaçamentos diferentes, o conteúdo permanece idêntico </p>
                        </div>
                        <article className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 md:p-8 shadow-xs">

                            <h1 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white leading-tight font-segoe break-words overflow-hidden">
                                {titulo ? titulo : "-"}
                            </h1>

                            <div className="flex flex-wrap items-center gap-4 mt-4 text-xs md:text-sm text-neutral-700 dark:text-zinc-400 border-b border-zinc-100 dark:border-zinc-800 pb-4">
                                <div className="flex items-center gap-1.5">
                                    <User size={16} className="text-zinc-400" />
                                    <span className='text-neutral-700 font-medium'>Por <span className="text-neutral-700">{user?.nome ?? '-'}</span></span>
                                </div>
                                <span className="text-zinc-400 dark:text-zinc-700">•</span>
                                <div className="flex items-center gap-1.5">
                                    <Calendar size={16} className="text-zinc-400" />
                                    <span className='text-neutral-700 font-medium'>{new Date().toLocaleDateString('pt-BR')}</span>
                                </div>
                            </div>

                            <p className="mt-6 text-sm font-medium  text-zinc-600 pl-4 italic bg-neutral-100  py-2 ">
                                {resumo ? resumo : "-"}
                            </p>

                            <div
                                className="mt-8 text-sm font-normal leading-relaxed text-zinc-800 dark:text-zinc-200
                                [&_h1]:text-2xl [&_h1]:font-bold [&_h1]:mt-4 [&_h1]:mb-2
                                [&_h2]:text-xl [&_h2]:font-bold [&_h2]:mt-3 [&_h2]:mb-2
                                [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:mt-2 [&_h3]:mb-1
                                [&_p]:mb-3 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:mb-3 
                                [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:mb-3
                                [&_strong]:font-bold [&_em]:italic [&_blockquote]:border-l-4 [&_blockquote]:border-zinc-300 [&_blockquote]:pl-4 [&_blockquote]:italic
                                break-words overflow-hidden"
                                dangerouslySetInnerHTML={{ __html: textoExibido || "-" }}
                            />

                            {uploadStatus === 'success' && imageFile && (
                                <div className="mx-auto mt-8 max-w-2xl overflow-hidden rounded-xl border-2 border-zinc-300 ">
                                    <img loading='lazy' src={URL.createObjectURL(imageFile)} alt="Preview da notícia" className="w-full h-auto max-h-100 object-cover" />
                                </div>)}

                            {longText && (
                                <div className="mt-4 flex justify-center">
                                    <button
                                        onClick={() => setIsExpanded(!isExpanded)}
                                        className="flex items-center cursor-pointer gap-1 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-200 focus:outline-none"
                                    >
                                        {isExpanded ? (
                                            <>
                                                Ver menos <ChevronUp size={16} />
                                            </>
                                        ) : (
                                            <>
                                                Ler mais <ChevronDown size={16} />
                                            </>
                                        )}
                                    </button>
                                </div>
                            )}

                        </article>
                    </div>

                    <div className="mt-4 flex justify-center items-center">
                        <button onClick={handlePublicar} disabled={criarMutation.isPending || uploadStatus === 'loading'} className="bg-[#2ab646] p-2 px-4 text-white font-semibold rounded-md cursor-pointer hover:bg-green-600 "> {criarMutation.isPending ? 'Publicando...' : 'Publicar notícia'} </button>
                    </div>
                </section>
            </section>
        </>
    )
}

export default CreateNew

