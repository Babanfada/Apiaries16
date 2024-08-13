const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  const supply_provision_items = sequelize.define(
    "supply_provision_items",
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
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      "price_NGN": {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "supply_provision_items",
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
   supply_provision_items.associate = function (models) {
     supply_provision_items.belongsTo(models.services, {
       foreignKey: "service_id",
     });
   };
  return supply_provision_items;
};
