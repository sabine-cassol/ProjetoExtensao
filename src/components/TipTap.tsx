
interface TiptapProps {
  value: string;
  onChange: (val: string) => void;
}

const Tiptap = ({ value, onChange }: TiptapProps) => {
  return (
    <div className="w-full mt-6 border border-zinc-200 rounded-lg overflow-hidden shadow-sm focus-within:ring-2 focus-within:ring-zinc-900/10 focus-within:border-zinc-500 transition-all">
      
      
      <div className="bg-zinc-50/80 border-b border-zinc-200 p-2 flex flex-wrap gap-1 items-center sticky top-0 z-10 backdrop-blur-sm">
        <button type="button" className="px-3 py-1 text-xs font-bold rounded text-zinc-600 hover:bg-zinc-200/60">B</button>
        <button type="button" className="px-3 py-1 text-xs italic rounded text-zinc-600 hover:bg-zinc-200/60">I</button>
        <div className="h-4 w-px bg-zinc-300 mx-1" />
        <button type="button" className="px-3 py-1 text-xs font-semibold rounded text-zinc-600 hover:bg-zinc-200/60">H2</button>
        <button type="button" className="px-3 py-1 text-xs font-semibold rounded text-zinc-600 hover:bg-zinc-200/60">H3</button>
        <div className="h-4 w-px bg-zinc-300 mx-1" />
        <button type="button" className="px-3 py-1 text-xs rounded text-zinc-600 hover:bg-zinc-200/60">• Lista</button>
        <button type="button" className="px-3 py-1 text-xs rounded text-zinc-600 hover:bg-zinc-200/60">1. Lista</button>
      </div>

      <textarea
        className="w-full h-48 p-4 text-sm leading-relaxed outline-none resize-y text-zinc-800 placeholder-zinc-400"
        placeholder="Digite o conteúdo da notícia aqui..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      
    </div>
  )
}

export default Tiptap