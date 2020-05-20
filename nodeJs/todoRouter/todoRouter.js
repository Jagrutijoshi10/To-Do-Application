"use strict";
const express = require('express'),
    router = express.Router(),
    todoController = require('../todoController/todoController');

router.get('/user-list', (req, res) => {
    todoController.getUserList(req, res);
})
router.post('/list-of-task', (req, res) => {
    todoController.getListOfTask(req, res);
})
router.post('/add-task', (req, res) => {
    todoController.addTask(req, res);
})
router.post('/edit-task', (req, res) => {
    todoController.editTask(req, res);
})
router.post('/delete-task', (req, res) => {
    todoController.deleteTask(req, res);
})
router.post('/task-details', (req, res) => {
    todoController.taskDetails(req, res);
})

module.exports = router;