"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Categories",
      [
        {
          imgUrl: "cac-mon-goi.png",
          name: "Các món gỏi",
          slug: "cac-mon-goi",
          active: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          imgUrl: "cac-mon-chao.png",
          name: "Các món cháo",
          slug: "cac-mon-chao",
          active: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          imgUrl: "com-chien.png",
          name: "Cơm chiên",
          slug: "com-chien",
          active: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Categories", null, {});
  },
};
