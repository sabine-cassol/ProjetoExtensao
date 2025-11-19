import Header from  '../components/Header'
import SideBar1 from '../components/SideBar1'


import { useState } from "react"

export default function Noticias(){

    const [showSideBar, setShowSideBar] = useState(true);
    return (
        <>
        <Header aoClick={()=>{
            setShowSideBar(!showSideBar)
        }} />
        <SideBar1 visivel={showSideBar}/>
        </>
    )
}