const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  const orders = sequelize.define(
    "orders",
    {
      order_id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "users",
          key: "user_id",
        },
      },
      tax: {
        type: DataTypes.DECIMAL(60, 4),
        allowNull: false,
      },
      shippingFee: {
        type: DataTypes.DECIMAL(60, 4),
        allowNull: false,
      },
      subTotal: {
        type: DataTypes.DECIMAL(60, 4),
        allowNull: false,
      },
      total: {
        type: DataTypes.DECIMAL(60, 4),
        allowNull: false,
      },
      paymentStatus: {
        type: DataTypes.ENUM("pending", "failed", "successful", "canceled"),
        allowNull: true,
        defaultValue: "pending",
      },
      deliveryStatus: {
        type: DataTypes.ENUM("pending", "failed", "delivered", "canceled"),
        allowNull: true,
        defaultValue: "pending",
      },
      tx_ref: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      transaction_id: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "orders",
      timestamps: true,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "order_id" }],
        },
        {
          name: "user_id",
          using: "BTREE",
          fields: [{ name: "user_id" }],
        },
      ],
    }
  );

  orders.associate = function (models) {
    orders.hasMany(models.order_items, { foreignKey: "order_id" });
    orders.hasOne(models.delivery_address, { foreignKey: "order_id" });
  };
  return orders;
};
