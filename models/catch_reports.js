const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('catch_reports', {
    report_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    hunter_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'swarm_hunters',
        key: 'hunter_id'
      }
    },
    assigned_supervisor: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'employees',
        key: 'emp_id'
      }
    },
    total_boxes_assigned: {
      type: DataTypes.DECIMAL(10,0),
      allowNull: true
    },
    colonized_boxes: {
      type: DataTypes.DECIMAL(10,0),
      allowNull: true
    },
    uncolonized_boxes: {
      type: DataTypes.DECIMAL(10,0),
      allowNull: true
    },
    delivered_to_apiary: {
      type: DataTypes.ENUM('all','some','none'),
      allowNull: true,
      defaultValue: "none"
    },
    date_assigned: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    catch_date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    catch_location: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    catch_status: {
      type: DataTypes.ENUM('all pending','all successfull','some pending'),
      allowNull: true
    },
    season: {
      type: DataTypes.ENUM('dry','rain'),
      allowNull: true,
      defaultValue: "rain"
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'catch_reports',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "report_id" },
        ]
      },
      {
        name: "hunter_id",
        using: "BTREE",
        fields: [
          { name: "hunter_id" },
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
