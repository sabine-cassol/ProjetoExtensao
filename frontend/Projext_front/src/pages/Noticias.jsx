import Header from  '../components/Header'
import SideBar1 from '../components/SideBar1'
import NewsGrid from '../components/NewsGrid'
import '../Styles/News.css'


import { useState } from "react"

export default function Noticias(){

    const [showSideBar, setShowSideBar] = useState(true);
    const mainContentClass = showSideBar ? 'Shifted' : 'main-content';
    return (
        <>
        <Header aoClick={()=>{
            setShowSideBar(!showSideBar)
        }} />
        <SideBar1 visivel={showSideBar}/>
        <main className={mainContentClass}> 
                <NewsGrid />
        </main>
        </>
    )
}