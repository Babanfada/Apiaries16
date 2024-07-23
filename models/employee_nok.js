const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('employee_nok', {
    nok_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    emp_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'employees',
        key: 'emp_id'
      }
    },
    fullname: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: "email"
    },
    address: {
      type: DataTypes.STRING(1000),
      allowNull: false,
      defaultValue: "please update NOK address"
    },
    phone: {
      type: DataTypes.STRING(30),
      allowNull: false,
      unique: "phone"
    },
    gender: {
      type: DataTypes.ENUM('male','female'),
      allowNull: true,
      defaultValue: "male"
    },
    relationship: {
      type: DataTypes.ENUM('spouse','parent','guardian','sibling'),
      allowNull: true,
      defaultValue: "spouse"
    }
  }, {
    sequelize,
    tableName: 'employee_nok',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "nok_id" },
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
        name: "phone",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "phone" },
        ]
      },
      {
        name: "emp_id",
        using: "BTREE",
        fields: [
          { name: "emp_id" },
        ]
      },
    ]
  });
};
