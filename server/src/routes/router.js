const express = require('express');
const projectsController = require("../controllers/projectsController");
const projectsMiddleware = require("../middlewares/projectsMiddleware");
const tasksController = require("../controllers/tasksController");
const tasksMiddleware = require("../middlewares/tasksMiddleware");

const router = express.Router();

router.get('/', (req, res) =>
    res.status(200).send("Hello World!"));

router.get('/projects', projectsController.getProjects);
router.get('/project/:id', projectsController.getProject);
router.get('/projects/monthly', projectsController.getProjectsMonthly);
router.post('/project', projectsMiddleware.validateBody, projectsController.createProject);
router.delete('/project/:id', projectsController.deleteProject);
router.patch('/project/:id', projectsMiddleware.validateBody, projectsController.updateProject);

router.get('/tasks', tasksController.getTasks);
router.get('/task/:id', tasksController.getTask);
router.get('/tasks/weekly', tasksController.getTasksWeekly);
router.post('/task', tasksMiddleware.validateBody, tasksController.createTask);
router.delete('/task/:id', tasksController.deleteTask);
router.patch('/task/:id', tasksMiddleware.validateBody, tasksController.updateTask);

module.exports = router;