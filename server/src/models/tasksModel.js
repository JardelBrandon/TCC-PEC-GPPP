const notion = require("../_services/connection")

const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_TASKS_ID

const getTasks = async () => {
    const tasks = await notion.databases.query({
        database_id: NOTION_DATABASE_ID,
    });
    console.dir(tasks, {depth: null});
    return tasks;
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
    console.dir(tasksWeekly, {depth: null})
    return tasksWeekly;
};

const getTask = async (id) => {
    const task = await notion.pages.retrieve({
        page_id: id
    })
    console.log(task);
    return task;
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