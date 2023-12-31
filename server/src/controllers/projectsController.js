const projectsModel = require('../models/projectsModel')

const getProject = async (req, res) => {
    const {id} = req.params;

    const project = await projectsModel.getProject(id);

    return res.status(200).json(project);
};

const getProjects = async (req, res) => {

    const projects = await projectsModel.getProjects();

    return res.status(200).json(projects);
};

const getProjectsMonthly = async (req, res) => {

    const projectsMonthly = await projectsModel.getProjectsMonthly();

    return res.status(200).json(projectsMonthly);
};

const getProjectsDashboard = async (req, res) => {

    const projectsDashboard = await projectsModel.getProjectsDashboard();

    return res.status(200).json(projectsDashboard);
};

const createProject = async (req, res) => {
    const createdProject = await projectsModel.createProject(req.body);
    return res.status(201).json(createdProject);
};

const deleteProject = async (req, res) => {
    const {id} = req.params;

    await projectsModel.deleteProject(id);
    return res.status(204).json();
};

const updateProject = async (req, res) => {
    const {id} = req.params;

    const project = await projectsModel.updateProject(id, req.body);
    return res.status(201).json(project);
}

module.exports = {
    getProject,
    getProjects,
    getProjectsMonthly,
    getProjectsDashboard,
    createProject,
    deleteProject,
    updateProject
}