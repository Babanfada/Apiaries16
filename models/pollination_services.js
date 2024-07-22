const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('pollination_services', {
    pol_service_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    service_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'services',
        key: 'service_id'
      }
    },
    crop_type: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    service_description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    rendered: {
      type: DataTypes.DECIMAL(10,0),
      allowNull: true
    },
    'price/hct (NGN)': {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'pollination_services',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "pol_service_id" },
        ]
      },
      {
        name: "service_id",
        using: "BTREE",
        fields: [
          { name: "service_id" },
        ]
      },
    ]
  });
};
