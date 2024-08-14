const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  const product_colors = sequelize.define(
    "product_colors",
    {
      color_id: {
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
      color0: {
        type: DataTypes.STRING(7),
        allowNull: true,
        defaultValue: "#222",
      },
      color1: {
        type: DataTypes.STRING(7),
        allowNull: true,
        defaultValue: "#222",
      },
      color2: {
        type: DataTypes.STRING(7),
        allowNull: true,
        defaultValue: "#222",
      },
    },
    {
      sequelize,
      tableName: "product_colors",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "color_id" }],
        },
        {
          name: "product_id",
          using: "BTREE",
          fields: [{ name: "product_id" }],
        },
      ],
    }
  );
  product_colors.associate = function (models) {
    product_colors.belongsTo(models.products, {
      foreignKey: "product_id",
    });
  };
  return product_colors;
};
