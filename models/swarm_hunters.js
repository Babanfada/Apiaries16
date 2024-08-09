const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  const swarm_hunters = sequelize.define(
    "swarm_hunters",
    {
      hunter_id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      assigned_supervisor: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "employees",
          key: "emp_id",
        },
      },
      fullname: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      phone: {
        type: DataTypes.STRING(20),
        allowNull: true,
        unique: "phone",
      },
      email: {
        type: DataTypes.STRING(100),
        allowNull: true,
        unique: "email",
      },
      joining_date: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      "tip(naira)": {
        type: DataTypes.DECIMAL(10, 3),
        allowNull: true,
      },
      employment_status: {
        type: DataTypes.ENUM("active", "inactive"),
        allowNull: true,
        defaultValue: "active",
      },
      emergency_contact_name: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      emergency_contact: {
        type: DataTypes.STRING(20),
        allowNull: true,
        unique: "emergency_contact",
      },
      notes: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "swarm_hunters",
      timestamps: true,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "hunter_id" }],
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
        {
          name: "emergency_contact",
          unique: true,
          using: "BTREE",
          fields: [{ name: "emergency_contact" }],
        },
        {
          name: "assigned_supervisor",
          using: "BTREE",
          fields: [{ name: "assigned_supervisor" }],
        },
      ],
    }
  );
  // swarm_hunters.associate = function (models) {
  //   swarm_hunters.hasMany(models.hives, { foreignKey: "assigned_hunter" });
  //   swarm_hunters.hasMany(models.catch_reports, {
  //     foreignKey: "hunter_id",
  //   });
  // };
  swarm_hunters.associate = function (models) {
    swarm_hunters.belongsTo(models.employees, {
      foreignKey: "assigned_supervisor",
    });
    swarm_hunters.hasMany(models.hives, { foreignKey: "assigned_hunter" });
    swarm_hunters.hasMany(models.catch_reports, {
      foreignKey: "hunter_id",
    });
  };
  return swarm_hunters;
};
