const PERIODOS_DISPONIVEIS = Array.from({ length: 10 }, (_, i) => (i + 1).toString());

export default function SeletorPeriodos({
    value,
    onChange
}: {
    value: string;
    onChange: (novoValor: string) => void;
}) {
    const periodosSelecionados = value
        ? value.split(',').map(p => p.trim().replace('º', '')).filter(Boolean)
        : [];

    const alternarPeriodo = (periodo: string) => {
        const jaSelecionado = periodosSelecionados.includes(periodo);
        const novaLista = jaSelecionado
            ? periodosSelecionados.filter((p) => p !== periodo)
            : [...periodosSelecionados, periodo].sort((a, b) => Number(a) - Number(b));

        onChange(novaLista.map((p) => `${p}º`).join(', '));
    };

    return (
        <div className="flex flex-nowrap gap-2 overflow-x-auto border border-zinc-400 rounded-sm p-2">
            {PERIODOS_DISPONIVEIS.map((periodo) => {
                const selecionado = periodosSelecionados.includes(periodo);
                return (
                    <button
                        key={periodo}
                        type="button"
                        onClick={() => alternarPeriodo(periodo)}
                        className={`text-xs px-3 py-1.5 rounded-full font-medium transition-colors cursor-pointer shrink-0 whitespace-nowrap ${
                            selecionado
                                ? 'bg-(--lightCyan) text-white'
                                : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
                        }`}
                    >
                        {periodo}º
                    </button>
                );
            })}
        </div>
    );
}