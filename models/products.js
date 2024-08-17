const Sequelize = require("sequelize");
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
      ],
    }
  );

  products.associate = function (models) {
    products.hasMany(models.product_colors, { foreignKey: "product_id" });
    products.hasMany(models.product_images, { foreignKey: "product_id" });
    products.hasMany(models.reviews, { foreignKey: "product_id" });

    // Define hooks within the associate function
    products.beforeDestroy(async (productInstance, options) => {
      const { product_id, product_name } = productInstance;
      // console.log(models.product_images, models.product_colors);

      const product_imagesTBD = await models.product_images.findOne({
        where: { product_id },
      });
      const product_colorsTBD = await models.product_colors.findOne({
        where: { product_id },
      });
      const product_reviewsTBD = await models.reviews.findOne({
        where: { product_id },
      });
      // console.log("Product images and color for Deletion:", {
      //   product_id,
      //   product_name,
      //   image_id: product_imagesTBD.image_id,
      //   color_id: product_colorsTBD.color_id,
      // });

      await product_imagesTBD.destroy();
      await product_colorsTBD.destroy();
      await product_reviewsTBD.destroy();
    });

    products.afterCreate(async (productInstance, options) => {
      const { product_id } = productInstance;
      await models.product_images.create({
        product_id,
        image0: "/uploads/default.jpeg",
        img0_public_id: "default_public_id",
        image1: "/uploads/default.jpeg",
        img1_public_id: "default_public_id",
        image2: "/uploads/default.jpeg",
        img2_public_id: "default_public_id",
      });

      await models.product_colors.create({
        product_id,
        color0: "#FFFFFF",
        color1: "#FFFFFF",
        color2: "#FFFFFF",
      });

      console.log(
        `Default images and colors created for product ID: ${product_id}`
      );
    });
  };
  return products;
};
