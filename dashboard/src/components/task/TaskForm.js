import {useState} from "react";
import styles from '../project/ProjectForm.module.css'
import Input from "../form/Input";
import SubmitButton from "../form/SubmitButton";
function TaskForm({handleSubmit, btnText, projectData}) {

    const [task, setTask] = useState({'idActivities': projectData.id})

    function createPost(task) {
        fetch("http://localhost:3333/task", {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(task)
        })
            .then((resp) => resp.json())
            .then((data) => {
                console.log(data)
            })
            .catch((err) => console.log(err))
    }

    function submit(e) {
        e.preventDefault()
        console.log("criando:", task)
        createPost(task)
        projectData.tasks.push(task)
        handleSubmit(projectData)
    }

    function handleChange(e) {
        setTask({ ...task, [e.target.name]: e.target.value})
        // console.log(task)
    }
    function handleChangeCost(e) {
        setTask({ ...task, [e.target.name]: Number(e.target.value)})
        // console.log(project)
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
                name="costs"
                placeholder="Insira o valor total"
                handleOnChange={handleChangeCost}
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
export default TaskForm