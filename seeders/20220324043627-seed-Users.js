'use strict';
const fs = require('fs');
const bcrypt = require('bcryptjs')
let salt = bcrypt.genSaltSync(10);
let hash = bcrypt.hashSync("B4c0/\/", salt);

module.exports = {
  up: (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    let data = JSON.parse(fs.readFileSync("./data/user.json", "utf-8"));
    data.forEach(el => {
        el.createdAt = new Date();
        el.updatedAt = new Date();
        el.password = el.password
        el.password =  bcrypt.hashSync(el.password.toString(), salt)
      })
    return queryInterface.bulkInsert('Users', data, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('Users', null, {})
  }
};