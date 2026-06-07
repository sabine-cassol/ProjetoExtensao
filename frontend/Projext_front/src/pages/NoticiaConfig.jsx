import Header from  '../components/Header'
import SideBar1 from '../components/SideBar1'
import NoticiaCreate from '../components/NoticiaCreate';
import styles from '../Styles/NoticiaCreate.module.css'
import { useState,useEffect } from "react";
import { useUser } from '../context/UserContext';
import { useParams, useNavigate } from 'react-router-dom';

function NoticiaConfig() {
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
            setShowSideBar(!showSideBar)}}
            />
                    
            <SideBar1 visivel={showSideBar}/>
            <main className={mainContentClass}>
                <NoticiaCreate/>
            </main>
        </>

    );
}

export default NoticiaConfig