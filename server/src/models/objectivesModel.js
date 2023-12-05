const notion = require("../services/connection")

const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_OBJECTIVES_ID

const getObjectives = async () => {
    const objectives = await notion.databases.query({
        database_id: NOTION_DATABASE_ID,
    });
    console.dir(objectives, {depth: null});
    return objectives;
};

const getObjectivesQuarterly = async () => {

    const objectivesQuarterly = await notion.databases.query({
        database_id: NOTION_DATABASE_ID,
        "property": 'Do Dates',
        "rollup": {
            "any": {
                "date": {
                    "next_month": {},
                    "past_month": {},
                    "this_month": {}
                }
            }
        },
    });
    console.dir(objectivesQuarterly, {depth: null})
    return objectivesQuarterly;
};

const getObjective = async (id) => {
    const objective = await notion.pages.retrieve({
        page_id: id
    })
    console.log(objective);
    return objective;
};

const createObjective = async (objective) => {
    const {title} = objective;

    const createdObjective = await notion.pages.create({
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
    console.log(createdObjective);
    return({id: createdObjective.id, url: createdObjective.url})
}

const deleteObjective = async (id) => {
    const removedObjective = await notion.blocks.delete({
        block_id: id
    })
    console.log(removedObjective);
    return removedObjective;
};

const updateObjective = async (id, objective) => {
    const {title} = objective;

    const updatedObjective = await notion.pages.update({
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
    console.log(updatedObjective);
    return updatedObjective;
};

module.exports = {
    getObjectivesQuarterly,
    getObjectives,
    getObjective,
    createObjective,
    deleteObjective,
    updateObjective
};