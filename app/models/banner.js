'use strict';
module.exports = (sequelize, DataTypes) => {
  const banner = sequelize.define('banner', {
    image: {
      type: DataTypes.STRING
    },

  }, {
    tableName: "banners"
  });

  banner.associate = function(models) {

  };

  return banner;
};