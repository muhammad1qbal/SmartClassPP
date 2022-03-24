const express = require('express');
const Controller = require('../controllers/controller');
const router = express.Router()




router.get('/', Controller.getListCourse)
router.get('/name', Controller.getListTeacher)
router.get('/add', Controller.addForm)
router.post('/add', Controller.postAddForm)
router.get('/add/profile', Controller.formProfile);
router.post('/add/profile', Controller.addFormProfile)

router.get('/:id', Controller.getStudentsById)

module.exports = router