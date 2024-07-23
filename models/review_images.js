const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('review_images', {
    image_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    review_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'reviews',
        key: 'review_id'
      }
    },
    image0: {
      type: DataTypes.STRING(1000),
      allowNull: true,
      defaultValue: "\/uploads\/example.jpeg"
    },
    image1: {
      type: DataTypes.STRING(1000),
      allowNull: true,
      defaultValue: "\/uploads\/example.jpeg"
    },
    image2: {
      type: DataTypes.STRING(1000),
      allowNull: true,
      defaultValue: "\/uploads\/example.jpeg"
    }
  }, {
    sequelize,
    tableName: 'review_images',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "image_id" },
        ]
      },
      {
        name: "review_id",
        using: "BTREE",
        fields: [
          { name: "review_id" },
        ]
      },
    ]
  });
};
