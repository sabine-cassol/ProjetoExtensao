import Header from  '../components/Header'
import SideBar1 from '../components/SideBar1'
import ProjetosGrid from '../components/Projetos.jsx'
import styles from '../Styles/Projetos.module.css'

import { useState,useEffect } from "react";
import { useUser } from "../context/UserContext.jsx"


export default function Login(){
    const [showSideBar, setShowSideBar] = useState(true);
    const mainContentClass = showSideBar ? styles.Shifted : styles.mainContent;
        const { role } = useUser(); 
        
            useEffect(() => {
                if (role === 'guest' && showSideBar) {
                    setShowSideBar(false);
                }
            }, [role]);
            
    return (
        <>
        <Header aoClick={()=>{
            setShowSideBar(!showSideBar)
        }} />

        <SideBar1 visivel={showSideBar}/>
        <main className={mainContentClass}> 
                <ProjetosGrid />
        </main>
        </>
    )
}