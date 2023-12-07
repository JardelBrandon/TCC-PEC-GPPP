import {useState} from "react";
import styles from '../project/ProjectForm.module.css'
import Input from "../form/Input";
import SubmitButton from "../form/SubmitButton";
import Message from "../layout/Message";
function TaskForm({handleSubmit, btnText, projectData}) {

    const [task, setTask] = useState({'idActivities': projectData.id, "costs": 0})
    const [message, setMessage] = useState()
    const [type, setType] = useState()

    function createPost(task) {
        const newCost = parseFloat(projectData.costs) + parseFloat(task.costs)

        //maximum value validation
        if(newCost > parseFloat(projectData.budget)) {
            setMessage('Orçamento ultrapassado, verifique o valor da tarefa')
            setType('error')
            return false
        }
        projectData.costs = newCost

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
                projectData.tasks.push(data)
                handleSubmit(projectData)
                setMessage('Tarefa criado com sucesso!')
                setType('success')
            })
            .catch((err) => console.log(err))
    }

    function submit(e) {
        e.preventDefault()
        createPost(task)
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
                defaultValue={0}
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
            {message && <Message type={type} msg={message}/>}
        </form>
    )
}
export default TaskForm