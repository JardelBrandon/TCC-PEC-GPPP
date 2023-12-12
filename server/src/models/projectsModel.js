const notion = require("../services/connection")
const {getObjective} = require("./objectivesModel");
const {getTask} = require("./tasksModel");

const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ACTIVITIES_ID;

async function adapterResponse(project, idObjectives, idTasks) {

    const objectives = await Promise.all(idObjectives.map((id) => {
        return getObjective(id);
    }));

    const tasks = await Promise.all(idTasks.map((id) => {
        return getTask(id);
    }));

    return ({
        id: project.id,
        name: project.properties.Name.title[0].plain_text,
        budget: project.properties.Budget.number,
        category: objectives.map((objective) => ({
            "id": objective.id,
            "name": objective.properties.Name.title[0].plain_text
        })),
        costs: project.properties.Costs.rollup.number,
        tasks: tasks
    })
}

const getProject = async (id) => {
    const project = await notion.pages.retrieve({
        page_id: id
    })
    const idObjectives = project.properties.Objectives.relation.map(id => id.id);
    const idTasks = project.properties.Tasks.relation.map(id => id.id);

    const typedResponse = await adapterResponse(project, idObjectives, idTasks);

    console.log(typedResponse);
    return typedResponse;
};

const getProjects = async () => {
    const projects = await notion.databases.query({
        database_id: NOTION_DATABASE_ID,
    });

    const typedResponse = await Promise.all(
        projects.results.map(async project => {

        const idObjectives = project.properties.Objectives.relation.map(id => id.id);
        const idTasks = project.properties.Tasks.relation.map(id => id.id);

        return await adapterResponse(project, idObjectives, idTasks);
        })
    );

    console.dir(await projects, {depth: null});
    return await typedResponse;
};

const getProjectsMonthly = async () => {

    const projectsMonthly = await notion.databases.query({
        database_id: NOTION_DATABASE_ID,
        "filter": {
            "property": 'Do Dates',
            "rollup": {
                "any": {
                    "date": {
                        "next_week": {},
                        "past_week": {},
                        "this_week": {}
                    }
                }
            }
        },
    });


    const typedResponse = await Promise.all(
        projectsMonthly.results.map(async project => {

            const idObjectives = project.properties.Objectives.relation.map(id => id.id);
            const idTasks = project.properties.Tasks.relation.map(id => id.id);

            return await adapterResponse(project, idObjectives, idTasks);
        })
    );

    console.dir(typedResponse, {depth: null});
    return typedResponse;
};

const getProjectsDashboard = async () => {
    const projectsDashboard = await notion.databases.query({
        database_id: NOTION_DATABASE_ID,
    });

    const typedResponse = await Promise.all(
        projectsDashboard.results.map(async project => {
            return ({
                name: project.properties.Name.title[0].plain_text,
                budget: project.properties.Budget.number,
                costs: project.properties.Costs.rollup.number,
                status: project.properties.Status.formula.string
            })
        })
    );

    console.dir(await typedResponse, {depth: null});
    return await typedResponse;
};

const createProject = async (project) => {
    const {name, budget, category} = project;

    const createdProject = await notion.pages.create({
        parent: {
            database_id: NOTION_DATABASE_ID,
        },
        "properties": {
            "Name": {
                "title": [
                    {
                        "text": {
                            "content": name
                        }
                    }
                ]
            },
            "Budget": {
                "number": budget
            },
            "Objectives": {
                "relation": [{
                    "id": category.id
                }]
            }
        }
    });
    console.log(createdProject);
    return({id: createdProject.id, url: createdProject.url})
}

const deleteProject = async (id) => {
    const removedProject = await notion.blocks.delete({
        block_id: id
    })
    console.log(removedProject);
    return removedProject;
};

const updateProject = async (id, project) => {
    const {name, budget, category} = project;

    let updatedProject = await notion.pages.update({
        "page_id": id,
        "properties": {
            "Name": {
                "title": [
                    {
                        "text": {
                            "content": name
                        }
                    }
                ]
            },
            "Budget": {
                "number": budget
            }
        }
    });

    console.log("asdfasdf", category, "qewrqwerqwer\n\n\n\n")

    if(category.id !== "Selecione uma opção" && !category.length) {
        updatedProject = await notion.pages.update({
            "page_id": id,
            "properties": {
                "Objectives": {
                    "relation": [
                        {
                        "id": category.id
                        }
                    ]
                }
            }
        });
    }

    const idObjectives = updatedProject.properties.Objectives.relation.map(id => id.id);
    const idTasks = updatedProject.properties.Tasks.relation.map(id => id.id);

    const typedResponse = await adapterResponse(updatedProject, idObjectives, idTasks);
    console.log(typedResponse);
    return typedResponse;
};

module.exports = {
    getProject,
    getProjects,
    getProjectsMonthly,
    getProjectsDashboard,
    createProject,
    deleteProject,
    updateProject
};