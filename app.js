const express = require('express');
const session = require('express-session');
const app = express();
const port = 3000;
const route = require('./routes/index')
// app.set('trust proxy', 1)

// const Controller = require('./controllers/controller');

app.set('view engine', 'ejs');
app.use(express.urlencoded({
  extended: true
}))





app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false, sameSite: true }
}))

app.use('/', route)



app.get('/teachers', Controller.getListCourse)
app.get('/teachers/name', Controller.getListTeacher)
app.get('/teachers/add', Controller.addForm)
app.post('/teachers/add', Controller.postAddForm)
app.get('/teachers/add/profile', Controller.formProfile);
app.post('/teachers/add/profile', Controller.addFormProfile)

app.get('/teachers/:id', Controller.getStudentsById)


app.listen(port, () => {
  console.log(`Terhubung ke port ${port}`);
})