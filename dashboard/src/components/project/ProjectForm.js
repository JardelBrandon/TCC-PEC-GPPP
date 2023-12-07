import {useEffect, useState} from "react";
import styles from './ProjectForm.module.css'
import Input from "../form/Input";
import Select from "../form/Select";
import SubmitButton from "../form/SubmitButton";
function ProjectForm({handleSubmit, btnText, projectData}) {

    const [categories, setCategories] = useState([])
    const [project, setProject] = useState(projectData || {"budget": 0})

    useEffect(() => {
        fetch("http://localhost:3333/objectives", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((resp) => resp.json())
            .then((data) => {
                console.log(data)
                setCategories(data)
            })
            .catch((err) => console.log(err))
    }, [])

    const submit = (e) => {
        e.preventDefault()
        console.log(project)
        handleSubmit(project)
    }

    function handleChangeName(e) {
        setProject({ ...project, [e.target.name]: e.target.value})
        // console.log(project)
    }
    function handleChangeBudget(e) {
        setProject({ ...project, [e.target.name]: Number(e.target.value)})
        // console.log(project)
    }
    function handleCategory(e) {
        setProject({
            ...project,
            category: {
                id: e.target.value,
                name: e.target.options[e.target.selectedIndex].text,
            }})
    }

    return(
        <form onSubmit={submit} className={styles.form}>
            <div>
                <Input
                    type="text"
                    text="Nome do projeto"
                    name="name"
                    placeholder="Insira o nome do projeto"
                    handleOnChange={handleChangeName}
                    value={project.name ? project.name : ''}
                />
            </div>
            <Input
                type="number"
                text="Orçamento do projeto"
                name="budget"
                placeholder="Insira o orçamento total"
                handleOnChange={handleChangeBudget}
                defaultValue={0}
            />
            <Select
                name="categoryId"
                text="Selecione a categoria"
                options={categories}
                handleOnChange={handleCategory}
                value={project.category ? project.category.id : ''}
            />
            <SubmitButton text={btnText}/>
        </form>
    )
}
export default ProjectForm