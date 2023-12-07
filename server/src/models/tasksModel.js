const notion = require("../services/connection")

const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_TASKS_ID

async function adapterResponse(task) {
    return {
        id: task.id,
        name: task.properties.Name.title[0].plain_text,
        costs: task.properties.Costs.number,
        activities: task.properties.Activities.relation.map(id => id.id)
    };
}

const getTasks = async () => {
    const tasks = await notion.databases.query({
        database_id: NOTION_DATABASE_ID,
    });

    const typedResponse = await Promise.all(
        tasks.results.map(async task => {

            const idActivities = task.properties.Activities.relation.map(id => id.id);

            return await adapterResponse(task, idActivities);
        })
    );

    console.dir(typedResponse, {depth: null})
    return typedResponse;
};

const getTasksWeekly = async () => {

    const tasksWeekly = await notion.databases.query({
        database_id: NOTION_DATABASE_ID,
        "filter": {
            "property": 'Do Date',
            "date": {
                "this_week": {}
            }
        },
    });

    const typedResponse = await Promise.all(
        tasksWeekly.results.map(async task => {

            const idActivities = task.properties.Activities.relation.map(id => id.id);

            return await adapterResponse(task, idActivities);
        })
    );

    console.dir(typedResponse, {depth: null})
    return typedResponse;
};

const getTask = async (id) => {
    const task = await notion.pages.retrieve({
        page_id: id
    })

    const idActivities = task.properties.Activities.relation.map(id => id.id);

    const typedResponse = await adapterResponse(task, idActivities);
    console.log(typedResponse);
    return typedResponse;
};

const createTask = async (task) => {
    const {name, costs, description, idActivities} = task;

    let createdTask = await notion.pages.create({
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
            "Costs": {
                "number": costs
            },
            "Notes": {
                "rich_text": [
                    {
                        "type": "text",
                        "text": {
                            "content": description
                        }
                    }
                ]
            }
        }
    });

    if(idActivities) {
        createdTask = await notion.pages.update({
            "page_id": createdTask.id,
            "properties": {
                "Activities": {
                    "relation": [
                        {
                            "id": idActivities
                        }
                    ]
                }
            }
        });
    }

    const typedResponse = adapterResponse(createdTask);
    console.log(typedResponse);
    return(typedResponse)
}

const deleteTask = async (id) => {
    const removedTask = await notion.blocks.delete({
        block_id: id
    })
    console.log(removedTask);
    return removedTask;
};

const updateTask = async (id, task) => {
    const {name} = task;

    const updatedTask = await notion.pages.update({
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
            }
        }
    });
    console.log(updatedTask);
    return updatedTask;
};

module.exports = {
    getTasksWeekly,
    getTasks,
    getTask,
    createTask,
    deleteTask,
    updateTask
};