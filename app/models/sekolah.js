'use strict';
module.exports = (sequelize, DataTypes) => {
  const sekolah = sequelize.define('sekolah', {
    nama_sekolah: {
      type: DataTypes.STRING
    },
    alamat: {
      type: DataTypes.TEXT
    },
    notelp: {
      unique:true,
      type: DataTypes.STRING
    },
    password: {
      type: DataTypes.STRING
    },
  }, {
    tableName: "sekolahs"
  });

  sekolah.associate = function(models) {
    sekolah.hasOne(models.auth,{ onDelete: 'cascade' },{ constraints: true}, { foreginKey: "sekolah"})
    sekolah.hasMany(models.lapor,{ onDelete: 'cascade' },{ constraints: true}, { foreginKey: "sekolah"})

  };

  return sekolah;
};