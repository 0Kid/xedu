'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('auths', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      email: {
        unique: true,
        type: Sequelize.STRING
      },
      nama_lengkap: {
        type: Sequelize.STRING
      },
      alamat: {
        type: Sequelize.TEXT
      },
      notelp: {
        type: Sequelize.STRING
      },
      sekolahId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "sekolahs",
          key: "id"
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      },
      jenis_kelamin: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('auths');
  }
};