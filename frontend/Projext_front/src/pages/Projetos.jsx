import Header from  '../components/Header'
import SideBar1 from '../components/SideBar1'
import ProjetosGrid from '../components/Projetos.jsx'
import '../Styles/Projetos.css'

import { useState } from "react"

export default function Login(){
    const [showSideBar, setShowSideBar] = useState(true);
    const mainContentClass = showSideBar ? 'shifted' : 'main-content';
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