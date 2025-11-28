import { Book, Check, Copy } from 'lucide-react'
import { Link } from "react-router-dom";

function SideBar1({visivel}){
    return (
        <>
        <aside className={`sidebar ${visivel ? "open" : "closed"}`}>
            <nav className="items">
                <Link to="/Atividades"> <Book size={20} /> Atividades extensionistas</Link>
                <p> <Check size={20} /> Minhas atividades</p>
                <Link to="/Relatorios"> <Copy size={20} />  Relatórios</Link>
            </nav>
        </aside>
        </>
    )
}

export default SideBar1