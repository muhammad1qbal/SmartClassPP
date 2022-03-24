const express = require('express');
const app = express();
const port = 3000;
const Controller = require('./controllers/controller');

app.set('view engine', 'ejs');
app.use(express.urlencoded({
  extended: true
}))

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