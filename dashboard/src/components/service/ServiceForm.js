import {useState} from "react";
import styles from '../project/ProjectForm.module.css'
import Input from "../form/Input";
import SubmitButton from "../form/SubmitButton";
function ServiceForm({handleSubmit, btnText, projectData}) {

    const [service, setService] = useState([])

    function submit(e) {
        e.preventDefault()
        projectData.services.push(service)
        handleSubmit(projectData)
    }

    function handleChange(e) {
        setService({...service, [e.target.name]: e.target.value})
    }

    return(
        <form onSubmit={submit} className={styles.form}>
            <Input
                type="text"
                text="Nome da tarefa"
                name="name"
                placeholder="Insira o nome da tarefa"
                handleOnChange={handleChange}
            />
            <Input
                type="number"
                text="Custo da tarefa"
                name="cost"
                placeholder="Insira o valor total"
                handleOnChange={handleChange}
            />
            <Input
                type="text"
                text="Descrição da tarefa"
                name="description"
                placeholder="Descreva a tarefa"
                handleOnChange={handleChange}
            />
            <SubmitButton text={btnText} />
        </form>
    )
}
export default ServiceForm