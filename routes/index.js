const express = require('express');
const Controller = require('../controllers/controller');
const router = express.Router()
const students = require('./students')
const teachers = require('./teachers')


router.get('/', Controller.homeGet)
router.post('/',Controller.homePost)
router.get('/register', Controller.registerGet)
router.post('/register', Controller.registerPost)

router.get('/register/profile', Controller.registerProfileGet)
router.post('/register/profile', Controller.registerProfilePost)


router.get('/logout', Controller.logout)

router.use('/students', students)

router.use('/teachers', teachers)



module.exports = router