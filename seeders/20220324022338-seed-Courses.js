'use strict';
const fs = require('fs');

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    const data = JSON.parse(fs.readFileSync("./data/course.json", "utf-8"));
    let dataSeed = data.map(el => {
      el.createdAt = new Date();
      el.updatedAt = new Date();
      return el;
    })
    return queryInterface.bulkInsert('Courses', dataSeed, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('Courses', null, {})
  }
};