import Header from  '../components/Header'
import SideBar1 from '../components/SideBar1'
import styles from '../Styles/Atividades.module.css'


import { useState } from "react"

export default function Atividades(){
    const [showSideBar, setShowSideBar] = useState(true);
    const mainContentClass = showSideBar ? styles.Shifted : styles.mainContent;
    return (
        <>
        <Header aoClick={()=>{
            setShowSideBar(!showSideBar)
        }} />

        <SideBar1 visivel={showSideBar}/>
        <main className={mainContentClass}>
            <section className={styles.atividadesContainer}>
                <section className={styles.atividades}>
                    <div>
                        <h2>Atividades extensionistas </h2>
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th>Nome Completo</th>
                                <th>Projeto</th>
                                <th>Data</th>
                                <th>Entrada</th>
                                <th>Saida</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Ana Oliveira</td>
                                <td>InovaEdu</td>
                                <td>01/02/2025</td>
                                <td>13:30</td>
                                <td>14:30</td>
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colSpan="4"></td>
                            </tr>
                        </tfoot>
                    </table>
                </section>
            </section>
        </main>
        </>
    )
}