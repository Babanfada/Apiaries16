const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('apiary stations', {
    station_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    'supervisor(int)': {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'employees',
        key: 'emp_id'
      }
    },
    'supervisor(ext)': {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'employees',
        key: 'emp_id'
      }
    },
    location: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    longitude: {
      type: DataTypes.DECIMAL(50,8),
      allowNull: true
    },
    latitude: {
      type: DataTypes.DECIMAL(10,8),
      allowNull: true
    },
    station_size: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    number_of_hive_boxes: {
      type: DataTypes.DECIMAL(10,0),
      allowNull: true
    },
    status: {
      type: DataTypes.ENUM('active','inactive'),
      allowNull: true,
      defaultValue: "inactive"
    },
    station_maintainace_history: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    last_inspection_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    next_inspection_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'apiary stations',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "station_id" },
        ]
      },
      {
        name: "supervisor(int)",
        using: "BTREE",
        fields: [
          { name: "supervisor(int)" },
        ]
      },
      {
        name: "supervisor(ext)",
        using: "BTREE",
        fields: [
          { name: "supervisor(ext)" },
        ]
      },
    ]
  });
};
