const {
  Category,
  Course,
  User,
  Profile
} = require('../models');

const {
  Op
} = require('sequelize');

const bcryptjs = require('bcryptjs')
let salt = bcryptjs.genSaltSync(10);

class Controller {
  static homeGet (req, res){
    res.render('home.ejs')

  }

  static homePost (req, res){
    User.findOne({where:{email: req.body.email}})
    .then(data => {
      if (data) {
        let check = bcryptjs.compareSync(req.body.password, data.password)
        if (check) {
          if (data.role == 'student') {
            res.redirect(`/students/${data.id}`)
          } else {
            res.render('home.ejs')
          }
        } else {
          res.render('home.ejs')
        }
      } else {
        res.render('home.ejs')
      }
    })
  }

  static students (req, res){
    User.findAll({include:[Course, Profile]}).then(data => {
      let student = data.find(el => el.dataValues.id == req.params.id)

      console.log(student.password);
      res.render('students.ejs', {database: student, profile: student.Profile, course:student.Course})
    })
  }

  static studentsGet(req, res) {
    let idStudent = req.params.id
    res.render('editStudent.ejs', {database: idStudent})

  }

  static studentsPost(req, res) {
    Profile.update(req.body,{where: {id: req.params.id}})
    .then(() => {
      res.redirect(`/students/${req.params.id}`)
    })
    .catch(err => {
      console.log(err);
    })
    
  }
}

module.exports = Controller;