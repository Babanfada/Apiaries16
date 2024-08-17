const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  const product_images = sequelize.define(
    "product_images",
    {
      image_id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      product_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "products",
          key: "product_id",
        },
      },
      image0: {
        type: DataTypes.STRING(1000),
        allowNull: true,
        defaultValue: "/uploads/example.jpeg",
      },
      img0_public_id: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      image1: {
        type: DataTypes.STRING(1000),
        allowNull: true,
        defaultValue: "/uploads/example.jpeg",
      },
      img1_public_id: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      image2: {
        type: DataTypes.STRING(1000),
        allowNull: true,
        defaultValue: "/uploads/example.jpeg",
      },
      img2_public_id: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "product_images",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "image_id" }],
        },
        {
          name: "product_id",
          using: "BTREE",
          fields: [{ name: "product_id" }],
        },
      ],
    }
  );
  product_images.associate = function (models) {
    product_images.belongsTo(models.products, {
      foreignKey: "product_id",
    });
  };

  return product_images;
};
