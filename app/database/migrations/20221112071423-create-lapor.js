'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('lapors', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nama_pelaku: {
        type: Sequelize.STRING
      },
      tempat_kejadian: {
        type: Sequelize.STRING
      },
      tanggal_kejadian: {
        type: Sequelize.STRING
      },
      hubungan: {
        type: Sequelize.STRING
      },
      uraian: {
        type: Sequelize.STRING
      },
      gambar: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
      },
      isAnonym: {
        type: Sequelize.BOOLEAN
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
      authId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "auths",
          key: "id"
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
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
    await queryInterface.dropTable('lapors');
  }
};