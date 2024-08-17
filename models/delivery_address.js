const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  const delivery_address = sequelize.define(
    "delivery_address",
    {
      del_id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      order_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "orders",
          key: "order_id",
        },
      },
      phone: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      city: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      state: {
        type: DataTypes.STRING(60),
        allowNull: false,
      },
      country: {
        type: DataTypes.STRING(30),
        allowNull: true,
      },
      street: {
        type: DataTypes.STRING(15),
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "delivery_address",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "del_id" }],
        },
        {
          name: "order_id",
          using: "BTREE",
          fields: [{ name: "order_id" }],
        },
      ],
    }
  );
  delivery_address.associate = function (models) {
    delivery_address.belongsTo(models.orders, {
      foreignKey: "order_id",
    });
  };
  return delivery_address;
};
