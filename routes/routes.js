const express = require('express');
const router = express.Router()
const leadController = require('../controllers/leadController')
const verifyToken = require('../middleware/tokenAuth')
const emptyFormCheck = require('../middleware/emptyCheck')
const TaskController = require('../controllers/taskController')
const HomeController = require('../controllers/homeController')
const GNController = require('../controllers/GNController');

//leads API routes
router.post('/generateLead', [emptyFormCheck, verifyToken], leadController.addLead)
router.post('/editlead', [emptyFormCheck, verifyToken], leadController.updateLead);
router.post('/deletelead', [emptyFormCheck, verifyToken], leadController.deleteLead);
router.post('/fetchlead', [verifyToken], leadController.fetchLead);


//task API routes
router.post('/addtask', [emptyFormCheck, verifyToken], TaskController.addTask);
router.post('/edittask', [emptyFormCheck, verifyToken], TaskController.updateTask);
router.post('/deletetask', [emptyFormCheck, verifyToken], TaskController.deleteTask);
router.post('/updtaskstatus', [emptyFormCheck, verifyToken], TaskController.updateTaskStatus);
router.post('/fetchtask/:AssignedTo([a-zA-Z0-9]{0,})?', [verifyToken], TaskController.fetchTask);


//dashboard API routes
router.get('/getmonthlytask', [verifyToken], HomeController.showMonthWiseTask);
router.get('/users', [verifyToken], HomeController.fetchUsers);
router.get('/getmontlyleads', [verifyToken], HomeController.monthlyLeadReport);
router.post('/sendmail',  HomeController.sendMail);

//GN Controller Query Builder
router.post('/add', [emptyFormCheck, verifyToken], GNController.add);
router.post('/edit', [emptyFormCheck, verifyToken],  GNController.edit);
router.post('/delete', [emptyFormCheck, verifyToken], GNController.deleteRecord);
router.post('/showData/:RecordID([a-zA-Z0-9]{0,})?', [emptyFormCheck, verifyToken], GNController.showData);

module.exports = router