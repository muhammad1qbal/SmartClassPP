const {
  Category,
  Course,
  User,
  Profile
} = require('../models');

const {
  Op, EagerLoadingError
} = require('sequelize');

const bcryptjs = require('bcryptjs')
let salt = bcryptjs.genSaltSync(10);

class Controller {

  static getListCourse(req, res) {
    Course.findAll({
      include: Category
    }).then(listCourse => {
      // console.log(listCourse);
      res.render('courseList', {
        listCourse
      })
    }).catch(err => {
      res.send(err);
    })
  }

  static getListTeacher(req, res) {
    User.findAll({
      include: Profile,
      where: {
        role: "Teacher"
      }
    }).then(listTeacher => {
      // console.log(listTeacher);
      res.render('teacherList', {
        listTeacher
      })
    }).catch(err => {
      res.send(err);
    })
  }

  static getStudentsById(req, res) {
    let {
      id
    } = req.params;
    User.findAll({
      include: Profile,
      where: {
        id: id,
        role: "Students"
      }
    }).then(listStudentbyId => {
      // console.log(listStudentbyId);
      res.render('listStudent', {
        listStudentbyId
      });
    }).catch(err => {
      // res.send(err)
      console.log(err);
    })
  }

  static addForm(req, res) {
    res.render('addFormStudent');
  }

  static postAddForm(req, res) {
    let {
      name,
      password,
      email
    } = req.body;
    let data = {
      name,
      password,
      email
    }

    User.create(data).then(() => {
      res.redirect('/teachers/add/profile')
      // console.log(data);
    }).catch(err => {
      res.send(err)
    })
  }

  static formProfile(req, res) {
    res.render("addFormProfile")
  }

  static addFormProfile(req, res) {
    let {
      age,
      gender,
      phone
    } = req.body;
    let data = {
      age,
      gender,
      phone
    }

    Profile.create(data).then(() => {
      res.redirect('/teachers')
    }).catch(err => {
      res.send(err)

  static homeGet (req, res){
    res.render('home.ejs')

  }

  static homePost (req, res){
    User.findOne({where:{email: req.body.email}})
    .then(data => {
      if (data) {
        let check = bcryptjs.compareSync(req.body.password, data.password)
        req.session.userId = data.id
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
    User.findOne({where: {id:req.params.id}})
    .then(data => {

      return Profile.update(req.body,{where: {id: req.params.id}})
      .then(() => {
        User.mail(data.email)
        res.redirect(`/students/${req.params.id}`)
      })
    })
  }

  static registerGet(req, res) {
    res.render('register.ejs')
  }

  static registerPost(req, res) {
    res.redirect('/')
  }

  static logout(req, res) {
    req.session.destroy(err => {
      res.redirect('/')
    })
  }
}

module.exports = Controller;