'use strict';

const nodemailer = require('nodemailer')
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsTo(models.Course);
      User.hasOne(models.Profile);
    }

    static mail(send) {
        let sendEmail = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'iqbal.muh998@gmail.com',
          pass: 'kqboucqllkvhtmiu'
        }
      })
      let mailOptions = {
        from: 'iqbal.muh998@gmail.com',
        to: send,
        subject: 'success update',
        text: 'your profile has been updated'
      }

      sendEmail.sendMail(mailOptions, (err, info) => {
        if (err) {
          console.log(err);
        }
      })
    }

  }
  User.init({
    name: {type: DataTypes.STRING, validate:{notEmpty: {msg:'Nama lengkap harus diisi'}}},
    password: {type: DataTypes.STRING, validate:{notEmpty: {msg:'Password lengkap harus diisi'}}},
    email: {type: DataTypes.STRING, 
      validate:{notEmpty: {msg:'email lengkap harus diisi'},
      isEmail: {msg:'format email tidak valid'}}},
    role: {type: DataTypes.STRING, validate:{notEmpty: {msg:'role lengkap harus diisi'}}},
    userCode: DataTypes.STRING,
    CourseId: DataTypes.INTEGER
  }, {
    sequelize,
    hooks: {
      beforeCreate(instance, options) {
        
        let code =instance.role.slice(0,1) +'_'+instance.name.split(' ').join('_')+'_'+instance.email.slice(0,3)
        instance.userCode = code
      }
    },
    modelName: 'User',
  });
  return User;
};