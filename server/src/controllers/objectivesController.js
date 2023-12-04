const objectivesModel = require('../models/objectivesModel')

const getObjectives = async (req, res) => {

    const objectives = await objectivesModel.getObjectives();

    return res.status(200).json(objectives);
};

const getObjectivesQuarterly = async (req, res) => {

    const objectivesQuarterly = await objectivesModel.getObjectivesQuarterly();

    return res.status(200).json(objectivesQuarterly);
};

const getObjective = async (req, res) => {
    const {id} = req.params;

    const objective = await objectivesModel.getObjective(id);

    return res.status(200).json(objective);
};

const createObjective = async (req, res) => {
    const createdObjective = await objectivesModel.createObjective(req.body);
    return res.status(201).json(createdObjective);
};

const deleteObjective = async (req, res) => {
    const {id} = req.params;

    await objectivesModel.deleteObjective(id);
    return res.status(204).json();
};

const updateObjective = async (req, res) => {
    const {id} = req.params;

    await objectivesModel.updateObjective(id, req.body);
    return res.status(204).json();
}

module.exports = {
    getObjectivesQuarterly,
    getObjectives,
    getObjective,
    createObjective,
    deleteObjective,
    updateObjective
}