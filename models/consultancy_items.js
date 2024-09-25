const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  const consultancy_items = sequelize.define(
    "consultancy_items",
    {
      item_id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      service_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "services",
          key: "service_id",
        },
      },
      item_name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      numOfTimesRendered: {
        type: DataTypes.DECIMAL(10, 0),
        allowNull: true,
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "consultancy_items",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "item_id" }],
        },
        {
          name: "service_id",
          using: "BTREE",
          fields: [{ name: "service_id" }],
        },
      ],
    }
  );
  consultancy_items.associate = function (models) {
    consultancy_items.belongsTo(models.services, {
      foreignKey: "service_id",
    });
  };
  return consultancy_items;
};
