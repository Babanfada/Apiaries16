const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('products', {
    product_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    product_name: {
      type: DataTypes.STRING(120),
      allowNull: false
    },
    product_type: {
      type: DataTypes.ENUM('honey','wax','propolis','royal jelly','venom'),
      allowNull: true,
      defaultValue: "honey"
    },
    description: {
      type: DataTypes.STRING(1000),
      allowNull: false
    },
    images: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: "\/uploads\/example.jpeg"
    },
    quantity: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    unit: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    price: {
      type: DataTypes.DECIMAL(60,2),
      allowNull: false,
      defaultValue: 0.00
    },
    total_in_stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 15
    },
    harvest_year: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    packaging_type: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    available: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 1
    },
    averageRating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    numOfReviews: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    numOfTimesSold: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    user: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'users',
        key: 'user_id'
      }
    },
    createdat: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    updatedat: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    sequelize,
    tableName: 'products',
    hasTrigger: true,
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "product_id" },
        ]
      },
      {
        name: "user",
        using: "BTREE",
        fields: [
          { name: "user" },
        ]
      },
    ]
  });
};
