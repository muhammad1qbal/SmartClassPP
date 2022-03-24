const express = require('express');
const Controller = require('../controllers/controller');
const router = express.Router()



router.get('/:id/edit', Controller.studentsGet)
router.post('/:id/edit', Controller.studentsPost)
router.get('/:id', Controller.students)




module.exports = router