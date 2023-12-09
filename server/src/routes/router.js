const express = require('express');

const objectivesController = require("../controllers/objectivesController");
const objectivesMiddleware = require("../middlewares/objectivesMiddleware");

const projectsController = require("../controllers/projectsController");
const projectsMiddleware = require("../middlewares/projectsMiddleware");

const tasksController = require("../controllers/tasksController");
const tasksMiddleware = require("../middlewares/tasksMiddleware");

const router = express.Router();

router.get('/', (req, res) =>
    res.status(200).send("Hello World!"));

router.get('/objectives', objectivesController.getObjectives);
router.get('/objective/:id', objectivesController.getObjective);
router.get('/objectives/quarterly', objectivesController.getObjectivesQuarterly);
router.post('/objective', objectivesMiddleware.validateBody, objectivesController.createObjective);
router.delete('/objective/:id', objectivesController.deleteObjective);
router.patch('/objective/:id', objectivesMiddleware.validateBody, objectivesController.updateObjective);

router.get('/project/:id', projectsController.getProject);
router.get('/projects', projectsController.getProjects);
router.get('/projects/monthly', projectsController.getProjectsMonthly);
router.get('/projects/dashboard', projectsController.getProjectsDashboard);
router.post('/project', projectsMiddleware.validateBody, projectsController.createProject);
router.delete('/project/:id', projectsController.deleteProject);
router.patch('/project/:id', projectsMiddleware.validateBody, projectsController.updateProject);

router.get('/task/:id', tasksController.getTask);
router.get('/tasks', tasksController.getTasks);
router.get('/tasks/weekly', tasksController.getTasksWeekly);
router.get('/tasks/dashboard', tasksController.getTasksDashboard);
router.post('/task', tasksMiddleware.validateBody, tasksController.createTask);
router.delete('/task/:id', tasksController.deleteTask);
router.patch('/task/:id', tasksMiddleware.validateBody, tasksController.updateTask);

module.exports = router;