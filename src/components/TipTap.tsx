import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useEffect } from 'react';

interface TiptapProps {
  value: string;
  onChange: (val: string) => void;
}

const Tiptap = ({ value, onChange }: TiptapProps) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'w-full min-h-48 p-4 text-sm leading-relaxed outline-none text-zinc-800 max-w-none focus:outline-none [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_h2]:text-xl [&_h2]:font-bold [&_h3]:text-lg [&_h3]:font-semibold [&_p]:mb-2'
      }
    }

  });

  // sincroniza o editor se o "value" mudar externamente (ex: ao carregar dados pra edição)
  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value, { emitUpdate: false });
    }
  }, [value, editor]);

  if (!editor) {
    return null;
  }

  return (
    <div className="w-full mt-6 border border-zinc-200 rounded-lg overflow-hidden shadow-sm focus-within:ring-2 focus-within:ring-zinc-900/10 focus-within:border-zinc-500 transition-all">

      <div className="bg-zinc-50/80 border-b border-zinc-200 p-2 flex flex-wrap gap-1 items-center sticky top-0 z-10 backdrop-blur-sm">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`px-3 py-1 text-xs font-bold rounded hover:bg-zinc-200/60 ${editor.isActive('bold') ? 'bg-zinc-200 text-zinc-900' : 'text-zinc-600'
            }`}
        >
          B
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`px-3 py-1 text-xs italic rounded hover:bg-zinc-200/60 ${editor.isActive('italic') ? 'bg-zinc-200 text-zinc-900' : 'text-zinc-600'
            }`}
        >
          I
        </button>

        <div className="h-4 w-px bg-zinc-300 mx-1" />

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`px-3 py-1 text-xs font-semibold rounded hover:bg-zinc-200/60 ${editor.isActive('heading', { level: 2 }) ? 'bg-zinc-200 text-zinc-900' : 'text-zinc-600'
            }`}
        >
          H2
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={`px-3 py-1 text-xs font-semibold rounded hover:bg-zinc-200/60 ${editor.isActive('heading', { level: 3 }) ? 'bg-zinc-200 text-zinc-900' : 'text-zinc-600'
            }`}
        >
          H3
        </button>

        <div className="h-4 w-px bg-zinc-300 mx-1" />

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`px-3 py-1 text-xs rounded hover:bg-zinc-200/60 ${editor.isActive('bulletList') ? 'bg-zinc-200 text-zinc-900' : 'text-zinc-600'
            }`}
        >
          • Lista
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`px-3 py-1 text-xs rounded hover:bg-zinc-200/60 ${editor.isActive('orderedList') ? 'bg-zinc-200 text-zinc-900' : 'text-zinc-600'
            }`}
        >
          1. Lista
        </button>
      </div>

      <EditorContent editor={editor} />
    </div>
  )
}

export default Tiptap