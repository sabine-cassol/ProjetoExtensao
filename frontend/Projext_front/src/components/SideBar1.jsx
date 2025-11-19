import { Book, Check, Copy } from 'lucide-react'

function SideBar1({visivel}){
    return (
        <>
        <aside className={`sidebar ${visivel ? "open" : "closed"}`}>
            <nav className="items">
                <p> <Book size={20} /> Atividades extensionistas</p>
                <p> <Check size={20} /> Minhas atividades</p>
                <p> <Copy size={20} />  Relatórios</p>
            </nav>
        </aside>
        </>
    )
}

export default SideBar1