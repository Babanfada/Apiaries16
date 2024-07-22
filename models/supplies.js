const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('supplies', {
    supply_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    supply_name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    category: {
      type: DataTypes.ENUM('processing','packaging'),
      allowNull: true,
      defaultValue: "packaging"
    },
    quantity: {
      type: DataTypes.DECIMAL(10,0),
      allowNull: true
    },
    status: {
      type: DataTypes.ENUM('used','new','need repair'),
      allowNull: true,
      defaultValue: "new"
    },
    storage_location: {
      type: DataTypes.ENUM('warehouse','factory'),
      allowNull: true,
      defaultValue: "factory"
    },
    supplier: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    minimum_stock_level: {
      type: DataTypes.DECIMAL(10,0),
      allowNull: true
    },
    purchase_date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    purchase_cost: {
      type: DataTypes.DECIMAL(10,3),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'supplies',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "supply_id" },
        ]
      },
    ]
  });
};
