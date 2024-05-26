"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Menus",
      [
        {
          imgUrl: "goi-hai-san.png",
          name: "Gỏi hải sản",
          price: 125000,
          slug: "goi-hai-san",
          categoryId: 1,
          active: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          imgUrl: "goi-kho-ca-sac.png",
          name: "Gỏi khô cá sặc",
          price: 85000,
          slug: "goi-kho-ca-sac",
          categoryId: 1,
          active: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          imgUrl: "chao-hai-san.png",
          name: "Cháo hải sản",
          price: 110000,
          slug: "chao-hai-san",
          categoryId: 2,
          active: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          imgUrl: "chao-ngheu.png",
          name: "Cháo nghêu",
          price: 110000,
          slug: "chao-ngheu",
          categoryId: 2,
          active: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          imgUrl: "com-chien-ca-man.png",
          name: "Cơm chiên cá mặn",
          price: 110000,
          slug: "com-chien-ca-man",
          categoryId: 3,
          active: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          imgUrl: "com-chien-cua.png",
          name: "Cơm chiên cua",
          price: 110000,
          slug: "com-chien-cua",
          categoryId: 3,
          active: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Menus", null, {});
  },
};
