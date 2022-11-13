'use strict';
module.exports = (sequelize, DataTypes) => {
  const auth = sequelize.define('auth', {
    email: {
      unique: true,
      type: DataTypes.STRING
    },
    nama_lengkap: {
      type: DataTypes.STRING
    },
    alamat: {
      type: DataTypes.TEXT
    },
    notelp: {
      type: DataTypes.STRING
    },
    jenis_kelamin: {
      type: DataTypes.STRING
    },
    password: {
      type: DataTypes.STRING
    },
  }, {
    tableName: "auths"
  });

  auth.associate = function(models) {
    auth.belongsTo(models.sekolah, { foreginKey: "sekolahId"})
    auth.hasMany(models.lapor,{ onDelete: 'cascade' },{ constraints: true}, { foreginKey: "auth"})

  };

  return auth;
};