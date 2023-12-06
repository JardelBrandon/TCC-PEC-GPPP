import {useNavigate} from 'react-router-dom'
import styles from './NewProject.module.css'
import ProjectForm from "../project/ProjectForm";
function NewProject() {

    const navigate = useNavigate()
    function createPost(project) {
        // Initialize cost and services
        project.cost = 0
        project.tasks = []

        fetch("http://localhost:3333/project", {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(project)
        })
            .then((resp) => resp.json())
            .then((data) => {
                console.log(data)
                // Redirect
                navigate('/projects', {state:{message: 'Projeto criado com sucesso!'}})
            })
            .catch((err) => console.log(err))
    }


    return(
        <div className={styles.newProjectContainer}>
            <h1>Criar Projeto</h1>
            <p>Crie seu projeto para depois adicionar as tarefas</p>
            <ProjectForm handleSubmit={createPost} btnText="Criar Projeto"/>
        </div>
    )
}
export default NewProject