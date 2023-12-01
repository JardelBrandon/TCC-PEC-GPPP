const notion = require("../_services/connection")

const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ACTIVITIES_ID

const getProjects = async () => {
    const projects = await notion.databases.query({
        database_id: NOTION_DATABASE_ID,
    });
    console.dir(projects, {depth: null});
    return projects;
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
    console.dir(projectsMonthly, {depth: null})
    return projectsMonthly;
};

const getProject = async (id) => {
    const project = await notion.pages.retrieve({
        page_id: id
    })
    console.log(project);
    return project;
};

const createProject = async (project) => {
    const {title} = project;

    const createdProject = await notion.pages.create({
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