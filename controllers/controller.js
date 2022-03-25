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

const helper = require('../helpers/index');

class Controller {

  static getListCourse(req, res) {
    console.log('ddd');
    Course.findAll({
      include: Category
    }).then(listCourse => {
      // console.log(listCourse);

      // let rupiah = listCourse.map(el => el.dataValues.price)
      // console.log(rupiah); 
      // listCourse.forEa
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
        role: "teacher"
      }
    }).then(listTeacher => {
      console.log(listTeacher);
      console.log('ccc');
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
      res.render('listStudent', {
        listStudentbyId
      });
    }).catch(err => {
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
      console.log(data);
      res.redirect('/teachers/add/profile')
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
            res.redirect(`/teachers`)
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
    Course.findAll().then(data => {
      console.log('cccc');
      let course = data.map(el => el.dataValues)
      // console.log(course[0].id);
      res.render('register', {database: course})
    })
  }

  static registerPost(req, res) {
    console.log('vvv');
    let pass = bcryptjs.hashSync(req.body.password.toString(), salt)
    req.body.password = pass

    let {
      name, email, role, CourseId
    } = req.body;
    let data = {
      name,
      password: pass,
      email,
      role,
      CourseId,
    }
  
    User.create(data).then(() => {
      console.log(data);
      res.redirect('/register/profile')
    }).catch(err => {
      let error = err.errors.map(el => el.message)
      res.send(error)
    })
  }

  static registerProfileGet(req, res) {
    User.findAll().then(data => {
      let id = data.map(el => el.dataValues.id)
      let lastId = id[id.length - 1]
      res.render("registerProfile")
    })
  }

  static registerProfilePost(req, res) {
    console.log('ddda');
    let {
      age,
      gender,
      phone
    } = req.body;


    User.findAll().then(data2 => {
      let lastId = data2[data2.length - 1].dataValues.id
      console.log(lastId);
      let data = {
        age,
        gender,
        phone,
        UserId: lastId

      }
      return Profile.create(data).then(() => {
        res.redirect('/')
      }).catch(err => {
        res.send(err)
      })
    })

  }

  
  


  

  static logout(req, res) {
    req.session.destroy(err => {
      res.redirect('/')
    })
  }
}

module.exports = Controller;