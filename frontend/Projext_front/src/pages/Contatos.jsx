import Header from  '../components/Header'
import SideBar1 from '../components/SideBar1'
import Contato1 from '../components/Contatos.jsx'
import styles from '../Styles/Contatos.module.css'

import { useState } from "react"

export default function Contato(){
    const [showSideBar, setShowSideBar] = useState(true);
    const mainContentClass = showSideBar ? styles.Shifted : styles.mainContent;
    return (
        <>
        <Header aoClick={()=>{
            setShowSideBar(!showSideBar)
        }} />

        <SideBar1 visivel={showSideBar}/>
        <main className={mainContentClass}> 
            <Contato1 />
        </main>
        </>
    )
}