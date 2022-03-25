const express = require('express');
const Controller = require('../controllers/controller');
const router = express.Router()

router.use(function(req, res, next) {
  if (!req.session.userId) {
    res.redirect(`/?error=Please login`)
  } else {
    next()
  }
})


router.get('/', Controller.getListCourse)
router.get('/name', Controller.getListTeacher)
router.get('/add', Controller.addForm)
router.post('/add', Controller.postAddForm)
router.get('/add/profile', Controller.formProfile);
router.post('/add/profile', Controller.addFormProfile)

router.get('/:id', Controller.getStudentsById)

module.exports = router