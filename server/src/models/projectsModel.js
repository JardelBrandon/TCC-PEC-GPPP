const notion = require("../services/connection")
const {getObjective} = require("./objectivesModel");
const {getTask} = require("./tasksModel");

const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ACTIVITIES_ID;

async function adapterResponse(projects, idObjectives, idTasks) {

    const objectives = await Promise.all(idObjectives.map((id) => {
        return getObjective(id);
    }));

    const tasks = await Promise.all(idTasks.map((id) => {
        return getTask(id);
    }));

    return projects.map((data) => ({
        id: data.id,
        name: data.properties.Name.title[0].plain_text,
        budget: data.properties.Budget.number,
        category: objectives.map((objective) => ({
            "id": objective.id,
            "name": objective.properties.Name.title[0].plain_text
        })),
        costs: data.properties.Costs.rollup.number,
        tasks: tasks
    }))
}

const getProjects = async () => {
    const projects = await notion.databases.query({
        database_id: NOTION_DATABASE_ID,
    });

    const typedResponse = await Promise.all(
        projects.results.map(async project => {

        const idObjectives = project.properties.Objectives.relation.map(id => id.id);
        const idTasks = project.properties.Tasks.relation.map(id => id.id);

        return await adapterResponse(projects.results, idObjectives, idTasks);
        })
    );

    console.dir(await typedResponse, {depth: null});
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

            return await adapterResponse(projectsMonthly.results, idObjectives, idTasks);
        })
    );

    console.dir(typedResponse, {depth: null});
    return typedResponse;
};

const getProject = async (id) => {
    const project = await notion.pages.retrieve({
        page_id: id
    })
    const idObjectives = project.properties.Objectives.relation.map(id => id.id);
    const idTasks = project.properties.Tasks.relation.map(id => id.id);

    const typedResponse = await adapterResponse([project], idObjectives, idTasks);

    console.log(typedResponse);
    return typedResponse;
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
    const {title} = project;

    const updatedProject = await notion.pages.update({
        "page_id": id,
        "properties": {
            "Name": {
                "title": [
                    {
                        "text": {
                            "content": title
                        }
                    }
                ]
            }
        }
    });
    console.log(updatedProject);
    return updatedProject;
};

module.exports = {
    getProjectsMonthly,
    getProjects,
    getProject,
    createProject,
    deleteProject,
    updateProject
};