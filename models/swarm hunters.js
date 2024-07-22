const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('swarm hunters', {
    hunter_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    assigned_supervisor: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'employees',
        key: 'emp_id'
      }
    },
    fullname: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    phone: {
      type: DataTypes.STRING(20),
      allowNull: true,
      unique: "phone"
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: true,
      unique: "email"
    },
    joining_date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    'tip(naira)': {
      type: DataTypes.DECIMAL(10,3),
      allowNull: true
    },
    employment_status: {
      type: DataTypes.ENUM('active','inactive'),
      allowNull: true,
      defaultValue: "active"
    },
    emergency_contact_name: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    emergency_contact: {
      type: DataTypes.STRING(20),
      allowNull: true,
      unique: "emergency_contact"
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'swarm hunters',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "hunter_id" },
        ]
      },
      {
        name: "phone",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "phone" },
        ]
      },
      {
        name: "email",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "email" },
        ]
      },
      {
        name: "emergency_contact",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "emergency_contact" },
        ]
      },
      {
        name: "assigned_supervisor",
        using: "BTREE",
        fields: [
          { name: "assigned_supervisor" },
        ]
      },
    ]
  });
};
