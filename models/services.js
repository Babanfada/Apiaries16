const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  const services = sequelize.define(
    "services",
    {
      service_id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      service_name: {
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
      category: {
        type: DataTypes.ENUM(
          "Consultancy",
          "Apiary Setup",
          "Supply Provision",
          "Pollination",
          "Other"
        ),
        allowNull: true,
        defaultValue: "Consultancy",
      },
    },
    {
      sequelize,
      tableName: "services",
      timestamps: true,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "service_id" }],
        },
      ],
    }
  );
  services.associate = function (models) {
    services.hasMany(models.apiary_setup_components, { foreignKey: "service_id" });
    services.hasMany(models.consultancy_items, { foreignKey: "service_id" });
    services.hasMany(models.pollination_services, { foreignKey: "service_id" });
    services.hasMany(models.supply_provision_items, {
      foreignKey: "service_id",
    });
  };
  return services;
};
