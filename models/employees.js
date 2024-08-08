const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  const employees = sequelize.define(
    "employees",
    {
      emp_id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      first_name: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      last_name: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      dob: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      phone: {
        type: DataTypes.STRING(30),
        allowNull: false,
        unique: "phone",
      },
      email: {
        type: DataTypes.STRING(30),
        allowNull: false,
        unique: "email",
      },
      address: {
        type: DataTypes.STRING(1000),
        allowNull: false,
        defaultValue: "your address please",
      },
      role: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      department: {
        type: DataTypes.ENUM("beekeeping", "operation", "administration"),
        allowNull: true,
        defaultValue: "operation",
      },
      joining_date: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      salary: {
        type: DataTypes.DECIMAL(10, 3),
        allowNull: true,
      },
      employment_status: {
        type: DataTypes.ENUM("active", "inactive", "terminated"),
        allowNull: true,
        defaultValue: "active",
      },
      employment_type: {
        type: DataTypes.ENUM(
          "full staff",
          "contract staff",
          "station supervisor(ext)"
        ),
        allowNull: true,
        defaultValue: "contract staff",
      },
      skill: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      notes: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "employees",
      timestamps: true,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "emp_id" }],
        },
        {
          name: "phone",
          unique: true,
          using: "BTREE",
          fields: [{ name: "phone" }],
        },
        {
          name: "email",
          unique: true,
          using: "BTREE",
          fields: [{ name: "email" }],
        },
      ],
    }
  );
  employees.associate = function (models) {
    employees.hasOne(models.employee_nok, { foreignKey: "emp_id" });
    employees.hasMany(models.swarm_hunters, {
      foreignKey: "assigned_supervisor",
    });
    employees.hasMany(models.apiary_stations, {
      as: "internallySupervising",
      foreignKey: "supervisor(int)",
    });
    employees.hasMany(models.apiary_stations, {
      as: "externallySupervising",
      foreignKey: "supervisor(ext)",
    });
    employees.hasMany(models.catch_reports, {
      foreignKey: "assigned_supervisor",
    });
  };

  return employees;
};
