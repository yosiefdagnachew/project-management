const express = require('express');
const router = express.Router();
const {
    createProject,
    getProjects,
    getProject,
    addEmployee,
    removeEmployee,
    updateProject,
    createProjectReport,
    getReports,
    acceptProject,
    cancleProject
} = require('../controllers/projectController');

const {
    createMessage,
    getMessages,
} = require('../controllers/discussionController');

const {
    createTask,
    getTasks,
    updateTask
} = require('../controllers/taskController');

router.get('/projects', getProjects);
router.get('/projects/reports', getReports);
router.post('/projects/acceptProject', acceptProject);
router.post('/projects/cancleProject', cancleProject);
router.get('/projects/:projectId', getProject);
router.post('/projects/:projectId/createReport', createProjectReport);
router.post('/projects/:projectId/addEmployee', addEmployee);
router.post('/projects/:projectId/removeEmployee', removeEmployee);
router.get('/projects/:projectId/getTasks', getTasks);
router.post('/projects/createProject', createProject);
router.post('/projects/:projectId/createTask', createTask);
router.post('/projects/:projectId/tasks/:taskid', updateTask);
router.post('/projects/:projectId/updateProject', updateProject);

// routing for chatboard
router.get('/projects/:projectId/chatboard/:chatboard/getMessages', getMessages);
router.post('/projects/:projectId/chatboard/:chatboard/createMessage', createMessage);

module.exports = router;