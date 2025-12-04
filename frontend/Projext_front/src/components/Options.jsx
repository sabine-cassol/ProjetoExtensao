import styles from '../Styles/Home.module.css';

function Options(){
  return (
    <section className={styles.options}>
        <div className={styles.optionsContainer}>
          <div className={styles.optionItem}>
            <div className={styles.icon1}>
              <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-globe-icon lucide-globe"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
            </div>
            <p> Projetos de extensão </p>
          </div>
          <div className={styles.optionItem}>
            <div className={styles.icon2}>
              <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-clock-icon lucide-clock"><path d="M12 6v6l4 2"/><circle cx="12" cy="12" r="10"/></svg>
            </div> 
            <p>Check-in de horas</p>
            </div>
          <div className={styles.optionItem}>
            <div className={styles.icon3}>
              <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-file-text-icon lucide-file-text"><path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z"/><path d="M14 2v5a1 1 0 0 0 1 1h5"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/></svg>
            </div>
            <p> Relatórios</p>
          </div>

          <div className={styles.optionItem}>
            <div className={styles.icon4}>
              <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-notepad-text-icon lucide-notepad-text"><path d="M8 2v4"/><path d="M12 2v4"/><path d="M16 2v4"/><rect width="16" height="18" x="4" y="4" rx="2"/><path d="M8 10h6"/><path d="M8 14h8"/><path d="M8 18h5"/></svg>
            </div>
            <p>Certificados</p>
          </div>
        </div>
      </section>

  )
}

export default Options;