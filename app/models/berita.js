'use strict';
module.exports = (sequelize, DataTypes) => {
  const berita = sequelize.define('berita', {
    judul: {
      type: DataTypes.STRING
    },
    image: {
      type: DataTypes.STRING
    },
    content: {
      type: DataTypes.TEXT
    },
  }, {
    tableName: "berita"
  });

  berita.associate = function(models) {

  };

  return berita;
};