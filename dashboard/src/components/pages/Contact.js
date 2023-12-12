import styles from "./Contact.module.css"
import Container from "../layout/Container";
import LinkMailTo from "../form/LinkMailTo";
import Coffee from "../form/Coffee";

function Contact() {
    return(
        <Container>
            <header className={styles.headerContainer}>
                <div className={styles.header}>
                    <div className={styles.checkboxContainer}>
                        <div className={styles.checkboxWrapper}>
                            <input type="checkbox" id={styles.toggle}/>
                            <label className={styles.checkbox} for={styles.toggle}>
                                <div className={styles.trace} id={styles.filho}></div>
                                <div className={styles.trace}></div>
                                <div className={styles.trace}></div>
                            </label>
                            <div className={styles.menu}/>
                                <nav className={styles.menuItens}>
                                    <ul>
                                        <li>
                                            <a href="http://localhost:5000">Home</a>
                                        </li>
                                        <li>
                                            <a href="https://gppp.notion.site/gppp-886080ee31a4439aa4678801b0e359ea">Notion</a>
                                        </li>
                                        <li>
                                            <a href="https://github.com/JardelBrandon/TCC-PEC-GPPP">Códigos</a>
                                        </li>
                                    </ul>
                                </nav>
                        </div>
                    </div>
                </div>
                <h1>Jardel Brandon</h1>
                <h2>Engenharia da Computação</h2>
                <div className={styles.socialMedia}>
                    <a className={styles.btn} href="https://www.linkedin.com/in/jardelbrandon/">Linkedin</a>
                    <a className={styles.btn} href="https://github.com/JardelBrandon">Github</a>
                </div>
            </header>
            <main className={styles.main}>
                <div className={styles.cardContainer}>
                    <a href="https://portal.ifpe.edu.br/pesqueira/">
                        <div className={styles.card}>
                            <div className={styles.cardWrapper}>
                                <h2>1ª Formação</h2>
                                <p>Acesse o site institucional!</p>
                            </div>
                        </div>
                    </a>
                    <div className={styles.cardText}>
                        Instituto Federal de Educação, Ciências e Tecnologia de Pernambuco (IFPE) -
                        Campus Pesqueira: Curso Técnico em Eletroeletrônica Integrado ao ensino médio (2011 - 2015)
                    </div>
                </div>
                <div className={styles.cardContainer}>
                    <a href="https://www.ifpb.edu.br/campinagrande">
                        <div className={styles.card}>
                            <div className={styles.cardWrapper}>
                                <h2>2ª Formação</h2>
                                <p>Acesse o site institucional!</p>
                            </div>
                        </div>
                    </a>
                    <div className={styles.cardText}>
                        Instituto Federal de Educação, Ciências e Tecnologia da Paraíba (IFPB) -
                        Campus Campina Grande: Graduando no Curso de Bacharelado em Engenharia de Computação
                        (2016.2 - Atualmente)
                    </div>
                </div>
                <div className={styles.cardContainer}>
                    <a href=" http://lattes.cnpq.br/4185920538778449">
                        <div className={styles.card}>
                            <div className={styles.cardWrapper}>
                                <h2>CV Lattes</h2>
                                <p>Confira o currículo!</p>
                            </div>
                        </div>
                    </a>
                    <div className={styles.cardText}>
                        Diversas outras experiências, podem ser conferidas no currículo lattes. Podendo ser acessado
                        atráves do link no card da imagem ao lado.
                    </div>
                </div>
            </main>
            <div className={styles.buyMeACoffee}>
                <Coffee />
            </div>
            <footer className={styles.footer}>
                <p>
                    Feito por: Jardel Brandon de Araujo Regis
                </p>
                <LinkMailTo label="jardelbrandon@gmail.com" mailto="mailto:jardelbrandon@gmail.com" />
            </footer>
        </Container>
    )
}
export default Contact