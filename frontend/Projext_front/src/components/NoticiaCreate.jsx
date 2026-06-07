import styles from '../Styles/NoticiaCreate.module.css'
function NoticiaCreate() {
    const handleSubmit = (e) =>{
        e.preventDefault()
    }

    return (
        <section className={styles.create}>
            <div className={styles.createContainer}>
                <form onSubmit={handleSubmit} className={styles.createWrapper}>

                    <div className={styles.createHead}>
                        <h2 className={styles.createTitle}>Criar uma nova notícia</h2>
                        <p className={styles.createDesc}>A notícia será visível para todos os usuários do site.</p>
                    </div>

                    <div className={styles.inputGroup}>
                        <label htmlFor="titulo" className={styles.label}>Título da notícia</label>
                        <input type="text" id="titulo" className={styles.inputField} placeholder="Digite o título..." required />
                    </div>

                    <div className={styles.inputGroup}>
                        <label htmlFor="conteudo" className={styles.label}>Conteúdo</label>
                        <textarea id="conteudo" className={styles.textareaField} placeholder="Descrição da notícia..." required></textarea>
                    </div>

                    <div className={styles.inputGroup}>
                        <label className={styles.label}>Envie a imagem</label>
                        <div className={styles.fileUploadWrapper}>
                            <input type="file" id="imagem" className={styles.fileInput} />
                            <label htmlFor="imagem" className={styles.fileLabel}>
                                <span>Selecionar imagem</span>
                            </label>
                        </div>
                    </div>

                    <button type="submit" className={styles.submitBtn}>Publicar Notícia</button>
                </form>
            </div>
        </section>
    );
}


export default NoticiaCreate