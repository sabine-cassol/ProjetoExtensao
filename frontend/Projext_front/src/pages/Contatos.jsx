import Header from  '../components/Header'
import SideBar1 from '../components/SideBar1'
import Contato1 from '../components/Contatos.jsx'
import styles from '../Styles/Contatos.module.css'

import { useState,useEffect } from "react";
import { useUser } from '../context/UserContext.jsx';

export default function Contato(){
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
            <Contato1 />
        </main>
        </>
    )
}