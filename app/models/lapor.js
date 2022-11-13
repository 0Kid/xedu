'use strict';
module.exports = (sequelize, DataTypes) => {
  const lapor = sequelize.define('lapor', {
    nama_pelaku: {
      type: DataTypes.STRING
    },
    tempat_kejadian: {
      type: DataTypes.STRING
    },
    tanggal_kejadian: {
      type: DataTypes.STRING
    },
    hubungan: {
      type: DataTypes.STRING
    },
    uraian: {
      type: DataTypes.STRING
    },
    isAnonym: {
      type: DataTypes.BOOLEAN
    },
    gambar: {
      type: DataTypes.STRING
    },
    status: {
      type: DataTypes.STRING
    },
  }, {
    tableName: "lapors"
  });

  lapor.associate = function(models) {
    lapor.belongsTo(models.sekolah, { foreginKey: "sekolahId"})
    lapor.belongsTo(models.auth, { foreginKey: "authId"})

  };

  return lapor;
};