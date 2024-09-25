const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  const apiary_setup_components = sequelize.define(
    "apiary_setup_components",
    {
      component_id: {
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
      component_name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      stock: {
        type: DataTypes.DECIMAL(10, 0),
        allowNull: true,
      },
      "price": {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "apiary_setup_components",
      timestamps: true,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "component_id" }],
        },
        {
          name: "service_id",
          using: "BTREE",
          fields: [{ name: "service_id" }],
        },
      ],
    }
  );
  apiary_setup_components.associate = function (models) {
    apiary_setup_components.belongsTo(models.services, {
      foreignKey: "service_id",
    });
  };
  return apiary_setup_components;
};
