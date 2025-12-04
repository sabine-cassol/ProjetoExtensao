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
                                <th>Nome</th>
                                <th>Data de Início</th>
                                <th>Data de Encerramento</th>
                                <th>Carga Horária</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Computação para a vida</td>
                                <td>25/08/2025</td>
                                <td>30/10/2025</td>
                                <td>100h</td>
                            </tr>
                            <tr>
                                <td>Inovaedu Potencializando Estudos Com ia e Tecnologia</td>
                                <td>01/01/2024</td>
                                <td>15/03/2024</td>
                                <td>100h</td>
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