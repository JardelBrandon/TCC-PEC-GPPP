const notion = require("../services/connection")

const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_TASKS_ID

async function adapterResponse(tasks) {
    return tasks.map((data) => ({
        id: data.id,
        name: data.properties.Name.title[0].plain_text,
        costs: data.properties.Costs.number,
        activities: data.properties.Activities.relation.map(id => id.id)
    }));
}

const getTasks = async () => {
    const tasks = await notion.databases.query({
        database_id: NOTION_DATABASE_ID,
    });

    const typedResponse = await Promise.all(
        tasks.results.map(async project => {

            const idActivities = project.properties.Activities.relation.map(id => id.id);

            return await adapterResponse(tasks.results, idActivities);
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
        tasksWeekly.results.map(async project => {

            const idActivities = project.properties.Activities.relation.map(id => id.id);

            return await adapterResponse(tasksWeekly.results, idActivities);
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

    const typedResponse = await adapterResponse([task], idActivities);
    console.log(typedResponse);
    return typedResponse;
};

const createTask = async (task) => {
    const {title} = task;

    const createdTask = await notion.pages.create({
        parent: {
            database_id: NOTION_DATABASE_ID,
        },
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
    console.log(createdTask);
    return({id: createdTask.id, url: createdTask.url})
}

const deleteTask = async (id) => {
    const removedTask = await notion.blocks.delete({
        block_id: id
    })
    console.log(removedTask);
    return removedTask;
};

const updateTask = async (id, task) => {
    const {title} = task;

    const updatedTask = await notion.pages.update({
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