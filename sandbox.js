const bcrypt = require('bcryptjs')
let salt = bcrypt.genSaltSync(10);
let hash = bcrypt.hashSync("B4c0/\/", salt);
console.log(hash);
let bener = bcrypt.compareSync("B4c0/\/", hash)
console.log(bener);

let salah = bcrypt.compareSync("B4c0/\/22", hash)
console.log(salah);


  // "production": {
  //   "username": "root",
  //   "password": null,
  //   "database": "database_production",
  //   "host": "127.0.0.1",
  //   "dialect": "mysql"
  // }