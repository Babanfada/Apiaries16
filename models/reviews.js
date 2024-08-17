const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  const reviews = sequelize.define(
    "reviews",
    {
      review_id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      product_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "products",
          key: "product_id",
        },
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "users",
          key: "user_id",
        },
      },
      rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      comment: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "reviews",
      hasTrigger: true,
      timestamps: true,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "review_id" }],
        },
        {
          name: "user_id",
          using: "BTREE",
          fields: [{ name: "user_id" }],
        },
        {
          name: "product_id",
          using: "BTREE",
          fields: [{ name: "product_id" }],
        },
      ],
    }
  );
  reviews.associate = function (models) {
    reviews.hasMany(models.review_images, { foreignKey: "review_id" });
    reviews.belongsTo(models.products, {
      foreignKey: "product_id",
    });
    reviews.beforeDestroy(async (reviewInstance, options) => {
      const { review_id } = reviewInstance;
      const review_imagesTBD = await models.review_images.findOne({
        where: { review_id },
      });
      await review_imagesTBD.destroy();
    });
    const updateProductRating = async (product_id) => {
      const reviews = await models.reviews.findAll({
        where: { product_id },
        attributes: ["rating"],
      });

      const numOfReviews = reviews.length;
      const averageRating =
        reviews.reduce((sum, review) => sum + review.rating, 0) / numOfReviews;

      const product = await models.products.findByPk(product_id);
      if (product) {
        product.averageRating = averageRating;
        product.numOfReviews = numOfReviews;
        await product.save();
      }
    };
    reviews.afterCreate(async (reviewInstance, options) => {
      const { review_id, product_id } = reviewInstance;
      await models.review_images.create({
        review_id,
        image0: "/uploads/default.jpeg",
        img0_public_id: "default_public_id",
        image1: "/uploads/default.jpeg",
        img1_public_id: "default_public_id",
        image2: "/uploads/default.jpeg",
        img2_public_id: "default_public_id",
      });
      await updateProductRating(product_id);
      console.log(
        `Default images and colors created for review ID: ${review_id}`
      );
    });
    reviews.afterUpdate(async (reviewInstance, options) => {
      const { product_id } = reviewInstance;
      await updateProductRating(product_id);
    });
  };
  return reviews;
};
