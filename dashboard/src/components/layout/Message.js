import {useState, useEffect} from "react";
import styles from './Message.module.css'
function Function({type, msg}) {

    const [visible, setVisible] = useState(false)

    useEffect(() => {
        if(!msg) {
            setVisible(false)
            return
        }
        setVisible(true)

        const timer = setTimeout(() => {
            setVisible(false)
        }, 10000)

        return () => clearTimeout(timer)

    }, [msg])

    return(
        <>
            {visible && (
                <div className={`${styles.message} ${styles[type]}`}>{msg}</div>
            )}
        </>
    )
}
export default Function