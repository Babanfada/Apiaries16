import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import logoSlack from "assets/images/small-logos/logo-slack.svg";
import React from "react";
// import { useProducts } from "features/products/productthunk";
import PropTypes from "prop-types";
// import { setUpdateProduct } from "features/products/productsSlice";
// import { useDeleteProduct } from "features/products/productthunk";
import { useOrders } from "features/orders/ordersThunk";
import { setUpdateOrder } from "features/orders/ordersSlice";

export default function ordersTableData() {
  const dispatch = useDispatch();
  // const { deleteProduct } = useDeleteProduct();
  const {
    isGettingAllOrders,
    data: { orders = [], totalOrders = 0, count = 0, numOfPages = 1 },
    refetch,
  } = useOrders();
  const Author = ({ image, order_id, user_id }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} size="sm" />
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {`order ${order_id} `}
        </MDTypography>
        <MDTypography variant="caption">user {user_id}</MDTypography>
      </MDBox>
    </MDBox>
  );
  Author.propTypes = {
    image: PropTypes.string.isRequired,
    user_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    order_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  };
  const Job = ({ title, description }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
        {`tax: ${title}`}
      </MDTypography>
      <MDTypography variant="caption">{`shipping Fee: ${description}`}</MDTypography>
    </MDBox>
  );
  Job.propTypes = {
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    description: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  };
  const Coord = ({ title, description }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
        {`total: ${title}`}
      </MDTypography>
      <MDTypography variant="caption">{`sub total: ${description}`}</MDTypography>
    </MDBox>
  );
  Coord.propTypes = {
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    description: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  };
  const Coord2 = ({ title, description }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
        {`tx_ref: ${title}`}
      </MDTypography>
      <MDTypography variant="caption">{`tex_id: ${description}`}</MDTypography>
    </MDBox>
  );
  Coord2.propTypes = {
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    description: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  };
  const rows = orders.map((item, i) => {
    const {
      order_id,
      user_id,
      tax,
      shippingFee,
      subTotal,
      total,
      paymentStatus,
      deliveryStatus,
      tx_ref,
      transaction_id,
      order_items,
      delivery_address: { phone, city, state, country, street },
    } = item;
    const del_add = `${street},${city},${state},${country}. telephone: ${phone}`;

    // const del_add2 = `telephone: ${phone}`;
    // const { image0 } = product_images?.[0] || {};
    const payload = { paymentStatus, deliveryStatus };

    const handleEdit = () => {
      dispatch(setUpdateOrder(payload));
    };
    // const handleDelete = () => {
    //   const confirmation = window.confirm(
    //     "You are about to Delete a product records permanently, ARE YOU SURE?"
    //   );
    //   if (!confirmation) return;
    //   deleteProduct(product_id);
    // };
    return {
      orders: (
        <Link to={`/orders/${order_id}`}>
          <Author image={logoSlack} order_id={order_id} user_id={user_id} />,
        </Link>
      ),
      details: <Job title={tax} description={shippingFee} />,
      cost: <Coord title={total} description={subTotal} />,
      transactions: <Coord2 title={tx_ref} description={transaction_id} />,
      payment: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          <MDBox ml={-1}>
            <MDBadge
              badgeContent={paymentStatus}
              color={
                paymentStatus === "successful"
                  ? "success"
                  : paymentStatus === "pending"
                  ? "primary"
                  : paymentStatus === "canceled"
                  ? "secondary"
                  : "error"
              }
              variant="gradient"
              size="sm"
            />
          </MDBox>
        </MDTypography>
      ),
      delivery: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          <MDBox ml={-1}>
            <MDBadge
              badgeContent={deliveryStatus}
              color={
                deliveryStatus === "delivered"
                  ? "success"
                  : deliveryStatus === "pending"
                  ? "primary"
                  : deliveryStatus === "canceled"
                  ? "secondary"
                  : "error"
              }
              variant="gradient"
              size="sm"
            />
          </MDBox>
        </MDTypography>
      ),
      update: (
        <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
          <Link
            onClick={() => {
              handleEdit();
            }}
            to={`/updateorder/${order_id}`}
          >
            Edit
          </Link>
        </MDTypography>
      ),
      address: (
        <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
          {del_add.length > 30 ? phone : del_add}
        </MDTypography>
      ),
      items: (
        <MDTypography
          style={{ display: "flex", flexDirection: "column" }}
          component="a"
          variant="caption"
          color="text"
          fontWeight="medium"
        >
          {order_items.map(({ product_id }, i) => {
            return (
              <Link key={i} to={`/products/${product_id}`}>
                product: {product_id}
              </Link>
            );
          })}
        </MDTypography>
      ),
    };
  });
  return {
    columns: [
      { Header: "orders", accessor: "orders", width: "45%", align: "left" },
      { Header: "details", accessor: "details", align: "left" },
      { Header: "cost", accessor: "cost", align: "center" },
      { Header: "transactions", accessor: "transactions", align: "center" },
      { Header: "payment", accessor: "payment", align: "center" },
      { Header: "delivery", accessor: "delivery", align: "center" },
      { Header: "items", accessor: "items", align: "center" },
      { Header: "address", accessor: "address", align: "center" },
      { Header: "update", accessor: "update", align: "center" },
    ],
    rows: rows,
    numOfPages,
    refetch,
    count,
    totalOrders,
    isGettingAllOrders,
  };
}
