"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Orders", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      orderCode: { allowNull: false, unique: true, type: Sequelize.STRING },
      deliverId: { type: Sequelize.INTEGER },
      handlerId: { type: Sequelize.INTEGER },
      payment_methods: { type: Sequelize.STRING },
      customerId: { allowNull: false, type: Sequelize.INTEGER },
      status: { type: Sequelize.STRING },
      type: { type: Sequelize.INTEGER },
      payment: { type: Sequelize.INTEGER },
      depositAmount: { type: Sequelize.INTEGER },
      shipFee: { type: Sequelize.INTEGER },
      totalAmount: { type: Sequelize.INTEGER },
      totoalPayment: { type: Sequelize.INTEGER },
      items: { type: Sequelize.TEXT },
      history: { type: Sequelize.TEXT },
      place: { type: Sequelize.TEXT },
      note: { type: Sequelize.TEXT },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Orders");
  },
};
