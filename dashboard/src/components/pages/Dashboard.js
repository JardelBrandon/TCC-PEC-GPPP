import styles from "./Dashboard.module.css"
import { Chart } from "react-google-charts";
import {useEffect, useState} from "react";
import Loading from '../layout/Loading'
import Container from "../layout/Container";

export const optionsProjectsPie = {
    legend: { position: "top" },
    title: "Estados dos projetos",
    subtitle: "Status",
    colors: ["gold", "green", "red"],
    is3D: true,
};

export const optionsProjectsBar = {
    legend: {position: "top"},
    title: "Orçamento dos projetos",
    subtitle: "Financeiro",
    bars: "vertical",
    hAxis: {
        title: "Projetos",
    },
    vAxis: {
        title: "Reais (R$)",
    },
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
    hAxis: {
        title: "Tarefas",
    },
    vAxis: {
        title: "Reais (R$)",
    },
};

export default function Dashboard() {

    const [projects, setProjects] = useState([])
    const [tasks, setTasks] = useState([])
    const [loadingProjects, setLoadingProjects] = useState(true)
    const [loadingTasks, setLoadingTasks] = useState(true)
    const [showProjectsCharts, setShowProjectsCharts] = useState(true)
    const [showTasksCharts, setShowTasksCharts] = useState(false)

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
                    setLoadingProjects(false)
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
                    setLoadingTasks(false)
                })
                .catch((err) => console.log(err))
    },[])

    const tasksFinances = [["Tarefa", "Custos"]].concat(tasks.map(task => ([
            task.name, task.costs || 0
        ]
    )))

    const tasksStatus = [["Status", "Projetos"]].concat(
        [...tasks.map(task => task.status).reduce((acc, e) => acc.set(e, (acc.get(e) || 0) + 1), new Map())]
    )

    console.log(tasksFinances)
    console.log(tasksStatus)

    function toggleProjectsCharts() {
        setShowProjectsCharts(!showProjectsCharts)
    }

    function toggleTasksCharts() {
        setShowTasksCharts(!showTasksCharts)
    }

    // if (!projects.length && !tasks.length) return <Container>{(loadingProjects || loadingTasks) && <Loading />}</Container>;
    return (
        <Container>
            <div className={styles.infoDetails}>
                    <div className={styles.chartsContainer}>
                        <h2>Dashboard Projetos:</h2>
                        <button className={styles.btn} onClick={toggleProjectsCharts}>
                            {!showProjectsCharts ? 'Gráficos Projetos': 'Fechar'}
                        </button>
                    </div>
                    <Container>
                    {loadingProjects && <Loading />}
                    {!loadingProjects && projects.length === 0 && (
                        <p>Não há projetos cadastrados!</p>
                    )}
                    </Container>
                    {(Boolean(projects.length) && showProjectsCharts) &&
                        <div className={styles.dashboardInfo}>
                                <div className={styles.chartPie}>
                                    <Chart
                                        chartType="PieChart"
                                        data={projectsStatus}
                                        options={optionsProjectsPie}
                                        width={"100%"}
                                        height={"350px"}
                                    />
                                </div>
                                <div className={styles.chartBar}>
                                    <Chart
                                        chartType="ColumnChart"
                                        width="100%"
                                        height="350px"
                                        data={projectsFinances}
                                        options={optionsProjectsBar}
                                    />
                                </div>
                        </div>
                    }
            </div>
            <div className={styles.infoDetails}>
                <div className={styles.chartsContainer}>
                    <h2>Dashboard Tarefas:</h2>
                    <button className={styles.btn} onClick={toggleTasksCharts}>
                        {!showTasksCharts ? 'Gráficos Tarefas': 'Fechar'}
                    </button>
                </div>
                <Container>
                    {loadingTasks && <Loading />}
                    {!loadingTasks && tasks.length === 0 && (
                        <p>Não há Tarefas cadastradas!</p>
                    )}
                </Container>
                {(Boolean(tasks.length) && showTasksCharts) &&
                    <div className={styles.dashboardInfo}>
                        <div className={styles.chartPie}>
                            <Chart
                                chartType="PieChart"
                                data={tasksStatus}
                                options={optionsTasksPie}
                                width={"100%"}
                                height={"350px"}
                            />
                        </div>
                        <div className={styles.chartBar}>
                            <Chart
                                chartType="ColumnChart"
                                width="100%"
                                height="350px"
                                data={tasksFinances}
                                options={optionsTasksBar}
                            />
                        </div>
                    </div>
                }
            </div>
        </Container>
    )
}