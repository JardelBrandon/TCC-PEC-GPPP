const express = require('express');
const projectsController = require("../controllers/projectsController");
const projectsMiddleware = require("../middlewares/projectsMiddleware");

const router = express.Router();

router.get('/', (req, res) =>
    res.status(200).send("Hello World!"));

router.get('/projects', projectsController.getProjects);
router.get('/project/:id', projectsController.getProject);
router.get('/projects/monthly', projectsController.getProjectsMonthly);
router.post('/projects', projectsMiddleware.validateBody, projectsController.createProject);
router.delete('/projects/:id', projectsController.deleteProject);
router.patch('/projects/:id', projectsMiddleware.validateBody, projectsController.updateProject);

module.exports = router;