import { CURSOS_DISPONIVEIS } from '@/schemas/authSchemas';// reaproveitando a lista existente

export function SeletorCursos({
    value,
    onChange
}: {
    value: string;
    onChange: (novoValor: string) => void;
}) {
    const cursosSelecionados = value ? value.split(',').map(c => c.trim()).filter(Boolean) : [];

    const alternarCurso = (curso: string) => {
        const jaSelecionado = cursosSelecionados.includes(curso);
        const novaLista = jaSelecionado
            ? cursosSelecionados.filter((c) => c !== curso)
            : [...cursosSelecionados, curso];

        onChange(novaLista.join(', '));
    };

    return (
        <div className="flex flex-wrap gap-2 border border-zinc-400 rounded-sm p-2">
            {CURSOS_DISPONIVEIS.map((curso) => {
                const selecionado = cursosSelecionados.includes(curso);
                return (
                    <button
                        key={curso}
                        type="button"
                        onClick={() => alternarCurso(curso)}
                        className={`text-xs px-3 py-1.5 rounded-full font-medium transition-colors cursor-pointer ${
                            selecionado
                                ? 'bg-(--lightCyan) text-white'
                                : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
                        }`}
                    >
                        {curso}
                    </button>
                );
            })}
        </div>
    );
}