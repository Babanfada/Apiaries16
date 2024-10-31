const {
  NOT_FOUND,
  BAD_REQUEST,
  UNAUTHORIZED,
} = require("../middlewares/customErrors");
const { StatusCodes } = require("http-status-codes");
const {
  order_items: ORDER_ITEMS,
  delivery_address: DELIVERY_ADD,
  orders: ORDERS,
  products: PRODUCTS,
  product_images: PRODUCT_IMAGES,
  sequelize,
  users: USERS,
} = require("../models");
const cloudinary = require("cloudinary").v2;
const { Op, Sequelize } = require("sequelize");
const moment = require("moment");
const { checkPermissions } = require("../middlewares/authentication");
const sendOrderStatusEmail = require("../utils/sendOrderStatusEmail");
const sendDeliveryStatusEmail = require("../utils/sendDeliveryStatusEmail");

const getAllOrders = async (req, res) => {
  const queryObject = {};
  const totalOrders = await ORDERS.count();
  const { numberFilter, fields, sort } = req.query;

  const fieldsToCheck = {
    // user_id: (value) => value,
    transaction_id: (value) => ({
      [Sequelize.Op.like]: Sequelize.fn("LOWER", `%${value.toLowerCase()}%`),
    }),
    tx_ref: (value) => ({
      [Sequelize.Op.like]: Sequelize.fn("LOWER", `%${value.toLowerCase()}%`),
    }),
    paymentStatus: (value) => {
      if (value === "---") {
        return {
          [Sequelize.Op.or]: ["pending", "failed", "successful", "canceled"],
        };
      }
      if (value !== "---" && value !== undefined) {
        return value;
      }

      return undefined;
    },
    deliveryStatus: (value) => {
      if (value === "---") {
        return {
          [Sequelize.Op.or]: ["pending", "failed", "delivered", "canceled"],
        };
      }
      if (value !== "---" && value !== undefined) {
        return value;
      }

      return undefined;
    },
  };

  Object.keys(req.query).forEach((key) => {
    if (fieldsToCheck[key]) {
      queryObject[key] = fieldsToCheck[key](req.query[key]);
    }
  });

  if (numberFilter) {
    const operatorMap = {
      ">": "gt",
      ">=": "gte",
      "=": "eq",
      "<": "lt",
      "<=": "lte",
    };
    const regEx = /(\b<=|>=|=|<|>|\b&lt;=|\b&gt;=|\b&lt;|\b&gt;|\b&le;)\b/g;
    let filter = numberFilter.replace(
      regEx,
      (match) => `/${operatorMap[match]}/`
    );
    // console.log(filter);
    const options = ["tax", "shippingFee", "subTotal", "total", "user_id"];
    filter.split(" ").forEach((item) => {
      const [field, operator, value] = item.split("/");
      if (options.includes(field)) {
        queryObject[field] = {
          [Sequelize.Op[operator]]: Number(value),
        };
      }
    });
  }
  const page = Number(req.query.pages) || 1;
  const limit = Number(req.query.limit) || 5;
  const offset = (page - 1) * limit;
  const numOfPages = Math.ceil(totalOrders / limit);
  let sortList;
  switch (sort) {
    case "high-low":
      sortList = [["total", "DESC"]];
      break;
    case "low-high":
      sortList = [["total", "ASC"]];
      break;
    default:
      sortList = [["createdAt", "ASC"]];
      break;
  }
  const orders = await ORDERS.findAll({
    where: { ...queryObject },
    include: [
      {
        model: ORDER_ITEMS,
        required: false,
      },
      {
        model: DELIVERY_ADD,
        required: false,
      },
    ],
    attributes: fields ? fields.split(",") : undefined,
    order: sortList,
    limit,
    offset,
  });
  const paymentStatusCount = await ORDERS.findAll({
    attributes: [
      "paymentStatus",
      [Sequelize.fn("COUNT", Sequelize.col("order_id")), "count"],
    ],
    group: ["paymentStatus"],
  });
  const deliveryStatusCount = await ORDERS.findAll({
    attributes: [
      "deliveryStatus",
      [Sequelize.fn("COUNT", Sequelize.col("order_id")), "count"],
    ],
    group: ["deliveryStatus"],
  });
  const monthlyRevenue = await ORDERS.findAll({
    attributes: [
      [
        Sequelize.fn("DATE_FORMAT", Sequelize.col("createdAt"), "%Y-%m"),
        "month",
      ],
      [Sequelize.fn("SUM", Sequelize.col("total")), "total_revenue"],
    ],
    group: [Sequelize.fn("DATE_FORMAT", Sequelize.col("createdAt"), "%Y-%m")],
    order: [
      [Sequelize.fn("DATE_FORMAT", Sequelize.col("createdAt"), "%Y-%m"), "ASC"],
    ],
  });

  res.status(StatusCodes.OK).json({
    orders,
    totalOrders,
    count: orders.length,
    numOfPages,
    paymentStatusCount,
    deliveryStatusCount,
    monthlyRevenue,
  });
};
const getSingleOrder = async (req, res) => {
  const { order_id } = req.params;
  const orders = await ORDERS.findOne({
    where: { order_id },
    include: [
      {
        model: ORDER_ITEMS,
        required: false,
      },
      {
        model: DELIVERY_ADD,
        required: false,
      },
    ],
  });
  if (!orders) {
    throw new NOT_FOUND(`This order does not exist`);
  }
  const user_id = orders.user_id;

  // Count orders by payment status for a specific user
  // const paymentStatusCount = await ORDERS.findAll({
  //   attributes: [
  //     "paymentStatus",
  //     [Sequelize.fn("COUNT", Sequelize.col("order_id")), "count"],
  //   ],
  //   where: {
  //     user_id,
  //   },
  //   group: ["paymentStatus"],
  // });

  // Count orders by delivery status for a specific user
  // const deliveryStatusCount = await ORDERS.findAll({
  //   attributes: [
  //     "deliveryStatus",
  //     [Sequelize.fn("COUNT", Sequelize.col("order_id")), "count"],
  //   ],
  //   where: {
  //     user_id,
  //   },
  //   group: ["deliveryStatus"],
  // });
  res.status(StatusCodes.OK).json({
    orders,
    // deliveryStatusCount, paymentStatusCount
  });
};

const getAllOrdersByUser = async (req, res) => {
  const { user_id, fullname } = req.user;
  const orders = await ORDERS.findAll({
    where: { user_id },
    include: [
      {
        model: ORDER_ITEMS,
        required: false,
      },
      {
        model: DELIVERY_ADD,
        required: false,
      },
    ],
  });

  if (orders.length === 0) {
    throw new NOT_FOUND(`${fullname} has no orders yet`);
  }
  checkPermissions({ reqUser: req.user, resUser: user_id });
  // Count orders by payment status for a specific user
  const paymentStatusCount = await ORDERS.findAll({
    attributes: [
      "paymentStatus",
      [Sequelize.fn("COUNT", Sequelize.col("order_id")), "count"],
    ],
    where: {
      user_id,
    },
    group: ["paymentStatus"],
  });

  // Count orders by delivery status for a specific user
  const deliveryStatusCount = await ORDERS.findAll({
    attributes: [
      "deliveryStatus",
      [Sequelize.fn("COUNT", Sequelize.col("order_id")), "count"],
    ],
    where: {
      user_id,
    },
    group: ["deliveryStatus"],
  });
  res
    .status(StatusCodes.OK)
    .json({ orders, deliveryStatusCount, paymentStatusCount });
};

const createOrder = async (req, res, next) => {
  const { items: cartItems, tax, shippingFee, deliveryAddress } = req.body;
  const user_id = req.user.user_id;

  if (
    !cartItems ||
    cartItems.length < 1 ||
    !tax ||
    !shippingFee ||
    !deliveryAddress
  ) {
    throw new BAD_REQUEST(
      "You need to provide all fields and ensure the cart is not empty"
    );
  }

  // Calculate the subtotal and prepare the order items
  let orderItems = [];
  let productNames = []; // Array to store product names
  let subtotal = 0;

  const aboutToBeMadeOrders = cartItems.map(async (item) => {
    const product = await PRODUCTS.findOne({
      where: { product_id: item.product_id },
    });
    if (!product) {
      throw new NOT_FOUND("This product does not exist!!!");
    }

    const { image0 } = await PRODUCT_IMAGES.findOne({
      where: { product_id: item.product_id },
    });

    const { product_name, price, product_id } = product;
    const singleOrderItem = {
      product_name,
      image: image0,
      price,
      amount: item.amount,
      product_id,
      color: item.color,
    };
    orderItems = [...orderItems, singleOrderItem];
    subtotal += singleOrderItem.amount * price;
    productNames.push(product_name); // Add product name to the array
  });

  await Promise.all(aboutToBeMadeOrders);

  const total = subtotal + shippingFee + tax;

  // Start a transaction to ensure atomicity
  const transaction = await sequelize.transaction();

  try {
    // Create the order
    const order = await ORDERS.create(
      {
        user_id,
        tax,
        shippingFee,
        subTotal: subtotal,
        total,
      },
      { transaction }
    );

    // Create the order items
    const orderItemsPromises = orderItems.map((item) => {
      return ORDER_ITEMS.create(
        {
          ...item,
          order_id: order.order_id,
        },
        { transaction }
      );
    });
    await Promise.all(orderItemsPromises);

    // Create the delivery address
    await DELIVERY_ADD.create(
      {
        ...deliveryAddress,
        order_id: order.order_id,
      },
      { transaction }
    );

    // Commit the transaction if everything goes well
    await transaction.commit();

    // Convert product names array to a comma-separated string
    const productNamesString = productNames.join(", ");

    // Send order status email
    sendOrderStatusEmail({
      email: req.user.email,
      fullname: req.user.fullname,
      paymentStatus: order.paymentStatus,
      productNames: productNamesString, // Pass the product names string
      tx_ref: order.tx_ref,
      transaction_id: order.transaction_id,
    });
    res.status(StatusCodes.CREATED).json({
      msg: `Order created successfully`,
      order,
    });
  } catch (error) {
    // Rollback the transaction in case of any errors
    await transaction.rollback();
    next(error); // Forward the error to the error-handling middleware
  }
};

const updateOrder = async (req, res) => {
  const { order_id } = req.params;
  const { tx_ref, transaction_id, paymentStatus, deliveryStatus } = req.body;
  const order = await ORDERS.findOne({
    where: { order_id },
    include: [{ model: ORDER_ITEMS }, { model: DELIVERY_ADD }],
  });

  checkPermissions({ reqUser: req.user, resUser: order.user_id });

  const transaction = await sequelize.transaction();
  try {
    // Update product sales and inventory if payment is successful
    if (paymentStatus === "successful") {
      await Promise.all(
        order.order_items.map(async (orderItem) => {
          const product = await PRODUCTS.findByPk(orderItem.product_id);
          if (product) {
            product.numOfTimesSold += 1;
            product.total_in_stock = Math.max(
              0,
              product.total_in_stock - orderItem.amount
            );
            await product.save({ transaction });
          }
        })
      );
    }

    // Prepare fields for order update
    const updateFields = {};
    if (tx_ref) updateFields.tx_ref = tx_ref;
    if (transaction_id) updateFields.transaction_id = transaction_id;
    if (paymentStatus) updateFields.paymentStatus = paymentStatus;
    if (deliveryStatus) updateFields.deliveryStatus = deliveryStatus;

    // Update the order details and send status email
    if (Object.keys(updateFields).length > 0) {
      await order.update(updateFields, { transaction });

      const { email, fullname } = await USERS.findByPk(order.user_id);
      const deliveryAddressExists = await DELIVERY_ADD.findOne({
        where: { order_id: order.order_id },
      });
      const productNames = order.order_items
        .map((item) => item.product_name)
        .join(", ");

      if (paymentStatus) {
        await sendOrderStatusEmail({
          email,
          fullname,
          tx_ref: order.tx_ref,
          transaction_id: order.transaction_id,
          paymentStatus: order.paymentStatus,
          productNames,
        });
      }

      await sendDeliveryStatusEmail({
        email,
        fullname,
        deliveryStatus: order.deliveryStatus,
        deliveryAddress: deliveryAddressExists,
        productNames,
        orderId: order.order_id,
      });
    }

    await transaction.commit();
    res
      .status(StatusCodes.OK)
      .json({ order, msg: "order details updated succesfully" });
  } catch (error) {
    await transaction.rollback();
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

const updateDelDetails = async (req, res) => {
  const { deliveryAddress } = req.body;
  const { order_id } = req.params;
  const deliveryAddressExists = await DELIVERY_ADD.findOne({
    where: { order_id },
  });

  if (!deliveryAddressExists) {
    throw new BAD_REQUEST(
      `There is no delivery address for this order ${order_id}`
    );
  }
  await deliveryAddressExists.update(deliveryAddress);
  res.status(StatusCodes.OK).json({
    msg: `Delivery details with order id ${deliveryAddressExists.order_id} successfuly updated`,
  });
};
module.exports = {
  getAllOrders,
  getSingleOrder,
  getAllOrdersByUser,
  createOrder,
  updateOrder,
  updateDelDetails,
};
