const tasksModel = require('../models/tasksModel')

const getTask = async (req, res) => {
    const {id} = req.params;

    const task = await tasksModel.getTask(id);

    return res.status(200).json(task);
};

const getTasks = async (req, res) => {

    const tasks = await tasksModel.getTasks();

    return res.status(200).json(tasks);
};

const getTasksWeekly = async (req, res) => {

    const tasksWeekly = await tasksModel.getTasksWeekly();

    return res.status(200).json(tasksWeekly);
};

const getTasksDashboard = async (req, res) => {

    const tasksWeekly = await tasksModel.getTasksDashboard();

    return res.status(200).json(tasksWeekly);
};

const createTask = async (req, res) => {
    const createdTask = await tasksModel.createTask(req.body);
    return res.status(201).json(createdTask);
};

const deleteTask = async (req, res) => {
    const {id} = req.params;

    await tasksModel.deleteTask(id);
    return res.status(204).json();
};

const updateTask = async (req, res) => {
    const {id} = req.params;

    await tasksModel.updateTask(id, req.body);
    return res.status(204).json();
}

module.exports = {
    getTask,
    getTasks,
    getTasksWeekly,
    getTasksDashboard,
    createTask,
    deleteTask,
    updateTask
}