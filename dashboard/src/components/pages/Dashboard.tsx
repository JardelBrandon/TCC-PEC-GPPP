import { Chart } from "react-google-charts";
import {useEffect, useState} from "react";
import Loading from '../layout/Loading'
import Container from "../layout/Container";

// const projectsBudget = [
//     ["Name", "Popularity"],
//     ["Cesar", 250],
//     ["Rachel", 0],
//     ["Patrick", 2900],
//     ["Eric", 0],
// ];
//
// const projectsCosts = [
//     ["Name", "Popularity"],
//     ["Cesar", 370],
//     ["Rachel", 600],
//     ["Patrick", 0],
//     ["Eric", 0],
// ];

export const data = [
    ["Element", "Density", { role: "style" }],
    ["Copper", 8.94, "#b87333"], // RGB value
    ["Silver", 10.49, "silver"], // English color name
    ["Gold", 19.3, "gold"],
    ["Platinum", 21.45, "color: #e5e4e2"], // CSS-style declaration
];



export const options = {
    legend: { position: "top" },
    title: "My Daily Activities",
    is3D: true
};

export const optionsProjectsPie = {
    legend: { position: "top" },
    title: "Estados dos projetos",
    subtitle: "Status",
    colors: ["red", "gold", "green"],
    is3D: true,
};

export const optionsProjectsBar = {
    chart: {
        legend: {position: "top"},
        title: "Orçamento dos projetos",
        subtitle: "Financeiro",
    }
};

export const optionsTasksPie = {
    legend: { position: "top" },
    title: "Estados das tarefas",
    subtitle: "Status",
    colors: ["red", "green", "gold", "blue"],
    is3D: true
};

export const optionsTasksBar = {
    legend: { position: "top" },
    title: "Orçamento das tarefas",
    subtitle: "Financeiro",
};

export default function Dashboard() {

    const [projects, setProjects] = useState([])
    const [tasks, setTasks] = useState([])
    const [removeLoading, setRemoveLoading] = useState(false)

    useEffect( () => {
            fetch('http://localhost:3333/projects/dashboard', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then((resp) => resp.json())
                .then((data) => {
                    console.log(data)
                    setProjects(data)
                    setRemoveLoading(true)
                })
                .catch((err) => console.log(err))
    },[])

    console.log(projects)

    const projectsFinances = [["Projeto", "Capital", "Custos"]].concat(projects.map(project => ([
            project.name, project.budget || 0, project.costs || 0
        ]
    )))

    const projectsStatus = [["Status", "Projetos"]].concat(
        [...projects.map(project => project.status).reduce((acc, e) => acc.set(e, (acc.get(e) || 0) + 1), new Map())]
    )

    console.log(projectsFinances)
    console.log(projectsStatus)

    useEffect( () => {
            fetch('http://localhost:3333/tasks/dashboard', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then((resp) => resp.json())
                .then((data) => {
                    console.log(data)
                    setTasks(data)
                })
                .catch((err) => console.log(err))
    },[])
    // setRemoveLoading(true)

    const tasksFinances = [["Tarefa", "Custos"]].concat(tasks.map(task => ([
            task.name, task.costs || 0
        ]
    )))

    const tasksStatus = [["Status", "Projetos"]].concat(
        [...tasks.map(task => task.status).reduce((acc, e) => acc.set(e, (acc.get(e) || 0) + 1), new Map())]
    )

    console.log(tasksFinances)
    console.log(tasksStatus)


    if (!projects.length && !tasks.length) return <Container>{!removeLoading && <Loading />}</Container>;
    return (
        <Container>
            {removeLoading && projects.length === 0 && (
                <p>Não há projetos cadastrados!</p>
            )}
            {projects.length && (
                <Container>
                    <Chart
                        chartType="PieChart"
                        data={projectsStatus}
                        options={optionsProjectsPie}
                        width={"100%"}
                        height={"400px"}
                    />
                    <Chart
                        chartType="Bar"
                        width="100%"
                        height="400px"
                        data={projectsFinances}
                        options={optionsProjectsBar}
                    />
                </Container>
            )}
            {tasks.length && (
                <Container>
                    <Chart
                        chartType="PieChart"
                        width={"100%"}
                        height={"400px"}
                        data={tasksStatus}
                        options={optionsTasksPie}
                    />
                    <Chart
                        chartType="ColumnChart"
                        width="100%"
                        height="400px"
                        data={tasksFinances}
                        options={optionsTasksBar}
                    />
                </Container>
            )}
        </Container>
    )
}