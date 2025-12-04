import Header from  '../components/Header'
import SideBar1 from '../components/SideBar1'
import NewsGrid from '../components/NewsGrid'
import styles from '../Styles/News.module.css'


import { useState } from "react"

export default function Noticias(){

    const [showSideBar, setShowSideBar] = useState(true);
    const mainContentClass = showSideBar ? styles.Shifted : styles.mainContent;
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