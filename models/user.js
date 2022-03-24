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
    name: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    role: DataTypes.STRING,
    userCode: DataTypes.STRING,
    CourseId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};