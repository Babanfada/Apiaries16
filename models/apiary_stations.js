const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  const apiary_stations = sequelize.define(
    "apiary_stations",
    {
      station_id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      station_name: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      "supervisor(int)": {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "employees",
          key: "emp_id",
        },
      },
      "supervisor(ext)": {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "employees",
          key: "emp_id",
        },
      },
      location: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      longitude: {
        type: DataTypes.DECIMAL(50, 8),
        allowNull: true,
      },
      latitude: {
        type: DataTypes.DECIMAL(10, 8),
        allowNull: true,
      },
      station_size: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      number_of_hive_boxes: {
        type: DataTypes.DECIMAL(10, 0),
        allowNull: true,
      },
      status: {
        type: DataTypes.ENUM("active", "inactive", "terminated"),
        allowNull: true,
        defaultValue: "inactive",
      },
      station_maintainace_history: {
        type: DataTypes.STRING(200),
        allowNull: true,
      },
      last_inspection_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      next_inspection_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      notes: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "apiary_stations",
      timestamps: true,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "station_id" }],
        },
        {
          name: "supervisor(int)",
          using: "BTREE",
          fields: [{ name: "supervisor(int)" }],
        },
        {
          name: "supervisor(ext)",
          using: "BTREE",
          fields: [{ name: "supervisor(ext)" }],
        },
      ],
    }
  );
  apiary_stations.associate = function (models) {
    apiary_stations.belongsTo(models.employees, {
      as: "internalSupervisor",
      foreignKey: "supervisor(int)",
    });
    apiary_stations.belongsTo(models.employees, {
      as: "externalSupervisor",
      foreignKey: "supervisor(ext)",
    });
  };

  apiary_stations.associate = function (models) {
    apiary_stations.hasMany(models.honey_harvest, { foreignKey: "station_id" });
  };
  return apiary_stations;
};