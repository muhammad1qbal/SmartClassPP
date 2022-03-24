const {
  Category,
  Course,
  User,
  Profile
} = require('../models');

const {
  Op
} = require('sequelize');

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
    })
  }
}

module.exports = Controller;