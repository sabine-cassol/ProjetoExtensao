import { Book, Check, Copy, House , Newspaper, Globe, Headset } from 'lucide-react'
import { Link } from "react-router-dom";
import styles from '../Styles/Home.module.css';


function SideBar1({visivel}){
    return (
        <>
        <aside className={`${styles.sidebar} ${visivel ? styles.open : styles.closed}`}>
            <nav className={styles.items}>
                <Link to="/"className={styles.inicioSide}> <House size={20}/> Inicio</Link>
                <Link to="/Noticias" className={styles.noticiasSide}> <Newspaper size={20}/> Noticias</Link>
                <Link to="/Projetos"className={styles.projetosSide}> <Globe size={20}/> Projetos</Link>
                <Link to="/Atividades"> <Book size={20} /> Atividades extensionistas</Link>
                <p> <Check size={20} /> Minhas atividades</p>
                <Link to="/Relatorios"> <Copy size={20} />  Relatórios</Link>
                <Link to="/Contato" className={styles.contatosSide}> <Headset size={20} /> Contato </Link>
            </nav>
        </aside>
        </>
    )
}

export default SideBar1