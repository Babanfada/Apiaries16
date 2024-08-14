const Sequelize = require("sequelize");
const { product_images: IMAGES, product_colors: COLORS } = require("./index");
module.exports = function (sequelize, DataTypes) {
  const products = sequelize.define(
    "products",
    {
      product_id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      product_name: {
        type: DataTypes.STRING(120),
        allowNull: false,
      },
      product_type: {
        type: DataTypes.ENUM(
          "honey",
          "wax",
          "propolis",
          "royal jelly",
          "venom"
        ),
        allowNull: true,
        defaultValue: "honey",
      },
      description: {
        type: DataTypes.STRING(1000),
        allowNull: false,
      },
      quantity: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      unit: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      price: {
        type: DataTypes.DECIMAL(60, 2),
        allowNull: false,
        defaultValue: 0.0,
      },
      total_in_stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 15,
      },
      harvest_year: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      packaging_type: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      available: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: 1,
      },
      averageRating: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      numOfReviews: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      numOfTimesSold: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      // user: {
      //   type: DataTypes.INTEGER,
      //   allowNull: true,
      //   references: {
      //     model: "users",
      //     key: "user_id",
      //   },
      // },
      // createdat: {
      //   type: DataTypes.DATE,
      //   allowNull: true,
      //   defaultValue: Sequelize.Sequelize.literal("CURRENT_TIMESTAMP"),
      // },
      // updatedat: {
      //   type: DataTypes.DATE,
      //   allowNull: true,
      //   defaultValue: Sequelize.Sequelize.literal("CURRENT_TIMESTAMP"),
      // },
    },
    {
      sequelize,
      tableName: "products",
      hasTrigger: true,
      timestamps: true,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "product_id" }],
        },
        // {
        //   name: "user",
        //   using: "BTREE",
        //   fields: [{ name: "user" }],
        // },
      ],
    }
  );
  products.associate = function (models) {
    products.hasMany(models.product_colors, { foreignKey: "product_id" });
    products.hasMany(models.product_images, { foreignKey: "product_id" });
  };
  products.afterDestroy(async (productInstance, options) => {
    const { product_id } = productInstance;
    const product_images = await IMAGES.findAll({ where: { product_id } });
    const product_colors = await COLORS.findAll({ where: { product_id } });
    console.log(
      "Product images and color for Deletion:",
      product_images,
      product_colors
    );

    await IMAGES.destroy({ where: { product_id } });
    await COLORS.destroy({ where: { product_id } });
  });
  return products;
};
