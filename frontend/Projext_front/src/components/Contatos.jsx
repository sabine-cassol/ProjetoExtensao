import styles from '../Styles/Contatos.module.css'
function Contato1(){
    return (
    
        <section className={styles.contato}>
            <section className={styles.contatoContainer}>
                <div className={styles.telefones}>
                    <h2>Telefones</h2>
                    <p>adsdasdmoim - 123321</p>
                    <p>amkasmkmaskdm - 123</p>
                    <p>maskmdkams - 11111</p>
                </div>

                <div>
                    <h2>Email</h2>
                    <p>email@email.com</p>
                </div>

                <div>
                    <h2>Instagram</h2>
                    <p>instagram</p>
                </div>

                <div>
                    <h2>Endereço</h2>
                    <p>endereço</p>
                </div>
            </section>
        </section>
        
    )
}

export default Contato1
