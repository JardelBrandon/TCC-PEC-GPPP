import styles from './Home.module.css'
import gppp from '../../img/gppp_banner.png'
import LinkButton from "../layout/LinkButton";

function Home() {
    return(
        <section className={styles.homeContainer}>
            <h1>Bem-vindo ao <span>GPP+</span></h1>
            <p>Comece a gerenciar os seus projetos agora mesmo!</p>
            <div className={styles.item}>
                <LinkButton to="/newProject" text="Criar Projeto"/>
                <LinkButton to="/dashboard" text="Dashboard"/>
            </div>
            <img src={gppp} alt="GPPP+"/>
        </section>
    )
}
export default Home