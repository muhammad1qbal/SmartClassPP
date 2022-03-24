const express = require('express');
const Controller = require('../controllers/controller');
const router = express.Router()
const students = require('./student')



router.get('/', Controller.homeGet)
router.post('/',Controller.homePost)
router.get('/register', Controller.registerGet)
router.get('/register', Controller.registerPost)

router.use(function(req, res, next) {
  if (!req.session.userId) {
    res.redirect(`/?error=Please login`)
  } else {
    next()
  }
})
router.get('/logout', Controller.logout)
router.use('/students', students)



module.exports = router