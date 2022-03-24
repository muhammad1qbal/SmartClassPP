const express = require('express');
const Controller = require('../controllers/controller');
const router = express.Router()
const students = require('./student')

router.get('/', Controller.homeGet)

router.post('/',Controller.homePost)

router.use('/students', students)


module.exports = router