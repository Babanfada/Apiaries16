const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  const honey_harvest = sequelize.define(
    "honey_harvest",
    {
      harvest_id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      harvest_year: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      station_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "apiary_stations",
          key: "station_id",
        },
      },
      station_name: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      harvest_date: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      quantity_collected: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
      },
      unit: {
        type: DataTypes.ENUM("litres", "kg"),
        allowNull: true,
        defaultValue: "litres",
      },
      quality_rating: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 5,
      },
      note: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "honey_harvest",
      timestamps: true,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "harvest_id" }],
        },
        {
          name: "station_id",
          using: "BTREE",
          fields: [{ name: "station_id" }],
        },
      ],
    }
  );

  honey_harvest.associate = function (models) {
    honey_harvest.belongsTo(models.apiary_stations, {
      // as: "internalSupervisor",
      foreignKey: "station_id",
    });
  };
  return honey_harvest;
};
