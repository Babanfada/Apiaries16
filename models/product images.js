const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('product images', {
    image_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'products',
        key: 'product_id'
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
    tableName: 'product images',
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
        name: "product_id",
        using: "BTREE",
        fields: [
          { name: "product_id" },
        ]
      },
    ]
  });
};
