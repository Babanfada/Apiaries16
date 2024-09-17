const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "equipments_tools",
    {
      tool_id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      tool_name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      category: {
        type: DataTypes.ENUM("beekeping", "carpentary", "processing"),
        allowNull: true,
        defaultValue: "beekeping",
      },
      quantity: {
        type: DataTypes.DECIMAL(10, 0),
        allowNull: true,
      },
      status: {
        type: DataTypes.ENUM("used", "new", "need repair"),
        allowNull: true,
        defaultValue: "new",
      },
      storage_location: {
        type: DataTypes.ENUM("warehouse", "apiary site", "factory"),
        allowNull: true,
        defaultValue: "factory",
      },
      supplier: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      purchase_date: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      purchase_cost: {
        type: DataTypes.DECIMAL(10, 3),
        allowNull: true,
      },
      currency: {
        type: DataTypes.STRING(15),
        allowNull: true,
      },
      last_maintanace_date: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      next_maintanace_date: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      retired: {
        type: DataTypes.ENUM("retired", "not retired"),
        allowNull: true,
        defaultValue: "not retired",
      },
      note: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "equipments_tools",
      timestamps: true,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "tool_id" }],
        },
      ],
    }
  );
};
