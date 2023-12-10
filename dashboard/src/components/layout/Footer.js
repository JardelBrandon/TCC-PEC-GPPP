import {FaGithub, FaInstagram, FaLinkedin} from "react-icons/fa";
import styles from './Footer.module.css'

function Footer() {
    return (
        <footer className={styles.footer}>
            <ul className={styles.socialList}>
                <li>
                    <a href="https://github.com/JardelBrandon">
                        <FaGithub/>
                    </a>
                </li>
                <li>
                    <a href="https://instagram.com/JardelBrandon">
                        <FaInstagram/>
                    </a>
                </li>
                <li>
                    <a href="http://linkedin.com/in/JardelBrandon">
                        <FaLinkedin/>
                    </a>
                </li>
            </ul>
            <p className={styles.copyRight}><span>GPP+</span> &copy; 2023</p>
        </footer>
    )
}
export default Footer