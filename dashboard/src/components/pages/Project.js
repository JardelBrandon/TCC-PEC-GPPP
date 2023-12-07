import {v4 as uuidv4} from 'uuid'
import styles from './Project.module.css'
import {useParams} from "react-router-dom";
import {useState, useEffect} from "react";
import Loading from "../layout/Loading";
import Container from "../layout/Container";
import ProjectForm from "../project/ProjectForm";
import Message from "../layout/Message";
import TaskForm from "../task/TaskForm";
import TaskCard from '../task/TaskCard'


function Project() {

    const {id} = useParams()
    const [project, setProject] = useState([])
    const [showProjectForm, setShowProjectForm] = useState(false)
    const [showTaskForm, setShowTaskForm] = useState(false)
    const [message, setMessage] = useState()
    const [type, setType] = useState()
    const [tasks, setTasks] = useState([])

    useEffect(() => {
        setTimeout(() => {
            fetch(`http://localhost:3333/project/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then((resp) => resp.json())
                .then((data) => {
                    console.log(data)
                    setProject(data)
                    setTasks(data.tasks)
                })
                .catch((err) => console.log(err))
        }, 300)
    }, [id])

    function editPost(project) {
        // budget validation
        if (project.budget < project.cost) {
            setMessage('O orçamento não pode ser menor que o custo do projeto!')
            setType('error')
            return false
        }

        fetch(`http://localhost:3333/project/${project.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(project)
        })
            .then((resp) => resp.json())
            .then((data) => {
                setProject(data)
                setShowProjectForm(false)
                setMessage('Projeto atualizado!')
                setType('success')
            })
            .catch((err) => console.log(err))
            .finally(setMessage())
    }

    function createTask() {
        // last task
        const lastTask = project.tasks[project.tasks.length - 1]

        lastTask.id = uuidv4()

        const lastTaskCost = lastTask.cost
        const newCost = parseFloat(project.cost) + parseFloat(lastTaskCost)

        //maximum value validation
        if(newCost > parseFloat(project.budget)) {
            setMessage('Orçamento ultrapassado, verifique o valor da tarefa')
            setType('error')
            project.tasks.pop()
            return false
        }

        // add task cost to project total cost
        project.cost = newCost

        // update project
        fetch(`http://localhost:3333/project/${project.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(project)
        })
            .then((resp) => resp.json())
            .then((data) => {
                console.log(data)
                setShowTaskForm(false)
            })
            .catch((err) => console.log(err))
            .finally(setMessage())
    }

    function removeTask(id, cost) {
        const tasksUpdate = project.tasks.filter(
            (task) => task.id !== id
        )

        const projectUpdated = project

        projectUpdated.tasks = tasksUpdate
        projectUpdated.cost = parseFloat(projectUpdated.cost) - parseFloat(cost)

        fetch(`http://localhost:3333/project/${projectUpdated.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(projectUpdated)
        })
            .then((resp) => resp.json())
            .then((data) => {
                console.log(data)
                setProject(projectUpdated)
                setTasks(tasksUpdate)
                setMessage('Tarefa removida com sucesso!')
                setType('success')
            })
            .catch((err) => console.log(err))
    }

    function toggleProjectForm() {
        setShowProjectForm(!showProjectForm)
    }

    function toggleTaskForm() {
        setShowTaskForm(!showTaskForm)
    }

    return (
        <>
            {project.name ? (
                <div className={styles.projectDetails}>
                    <Container customClass={'column'}>
                        {message && <Message type={type} msg={message}/>}
                        <div className={styles.detailsContainer}>
                            <h1>Projeto: {project.name}</h1>
                            <button className={styles.btn} onClick={toggleProjectForm}>
                                {!showProjectForm ? 'Editar projeto' : 'Fechar'}
                            </button>
                            {!showProjectForm ? (
                                <div className={styles.projectInfo}>
                                    <p>
                                        <span>Categoria:</span> {project.category[0].name}
                                    </p>
                                    <p>
                                        <span>Total de orçamento:</span> R${project.budget}
                                    </p>
                                    <p>
                                        <span>Total utilizado:</span> R${project.cost}
                                    </p>
                                </div>
                            ) : (
                                <div className={styles.projectInfo}>
                                    <ProjectForm
                                        handleSubmit={editPost}
                                        btnText="Concluir edição"
                                        projectData={project}
                                    />
                                </div>
                            )}
                        </div>
                        <div className={styles.taskFormContainer}>
                            <h2>Adicione uma tarefa:</h2>
                            <button className={styles.btn} onClick={toggleTaskForm}>
                                {!showTaskForm ? 'Adicionar tarefa' : 'Fechar'}
                            </button>
                            <div className={styles.projectInfo}>
                                {showTaskForm && (
                                      <TaskForm
                                        handleSubmit={createTask}
                                        btnText="Adicionar tarefa"
                                        projectData={project}
                                      />
                                )}
                            </div>
                            <h2>Tarefa</h2>
                            <Container customClass="start">
                                {tasks.length > 0 &&
                                    tasks.map((task) => (
                                        <TaskCard
                                            id={task.id}
                                            name={task.name}
                                            cost={task.cost}
                                            description={task.description}
                                            key={task.id}
                                            handleRemove={removeTask}
                                        />

                                    ))

                                }{tasks.length === 0 && <p>Não há tarefas cadastrados.</p>}
                            </Container>
                        </div>
                    </Container>
                </div>
            ): (<Loading/>)}
        </>
    )
}
export default Project