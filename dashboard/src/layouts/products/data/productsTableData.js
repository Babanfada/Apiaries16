import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import logoSlack from "assets/images/small-logos/logo-slack.svg";
import React from "react";
import { useProducts } from "features/products/productthunk";
import PropTypes from "prop-types";
import { setUpdateProduct } from "features/products/productsSlice";
import { useDeleteProduct } from "features/products/productthunk";

export default function productsTableData() {
  const dispatch = useDispatch();
  const { deleteProduct } = useDeleteProduct();
  const {
    isGettingAllProducts,
    data: { totalProducts = 0, count = 0, numOfPages = 0, totalQuantity = [], products = [] } = {},
    refetch,
  } = useProducts();
  const Author = ({ image, product_name, product_id }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} size="sm" />
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {`${product_id} `}
        </MDTypography>
        <MDTypography variant="caption">{product_name}</MDTypography>
      </MDBox>
    </MDBox>
  );
  Author.propTypes = {
    image: PropTypes.string.isRequired,
    product_name: PropTypes.string.isRequired,
    product_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  };
  const Job = ({ title, description }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
        {`current stock: ${title}`}
      </MDTypography>
      <MDTypography variant="caption">{`rating: ${description}`}</MDTypography>
    </MDBox>
  );
  Job.propTypes = {
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    description: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  };
  const rows = products.map((item, i) => {
    const {
      product_id,
      product_name,
      product_type,
      quantity,
      unit,
      price,
      total_in_stock,
      averageRating,
      description,
      harvest_year,
      packaging_type,
      numOfReviews,
      numOfTimesSold,
      product_images,
      // available,
      // product_colors,
    } = item;
    const { image0 } = product_images?.[0] || {};
    const payload = {
      product_id,
      product_name,
      product_type,
      quantity,
      unit,
      price,
      total_in_stock,
      averageRating,
      description,
      harvest_year,
      packaging_type,
      numOfReviews,
      numOfTimesSold,
      // product_colors,
      // available,
      // product_images,
    };

    const handleEdit = () => {
      dispatch(setUpdateProduct(payload));
    };
    const handleDelete = () => {
      const confirmation = window.confirm(
        "You are about to Delete a product records permanently, ARE YOU SURE?"
      );
      if (!confirmation) return;
      deleteProduct(product_id);
    };
    return {
      products: (
        <Link to={`/products/${product_id}`}>
          <Author image={image0} product_name={product_name} product_id={product_id} />,
        </Link>
      ),
      type: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          <MDBox ml={-1}>
            <MDBadge
              badgeContent={product_type}
              color={
                product_type === "honey"
                  ? "success"
                  : product_type === "wax"
                  ? "primary"
                  : product_type === "propolis"
                  ? "secondary"
                  : product_type === "royal jelly"
                  ? "default"
                  : "error"
              }
              variant="gradient"
              size="sm"
            />
          </MDBox>
        </MDTypography>
      ),
      details: <Job title={total_in_stock} description={averageRating} />,
      quantity: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {`${quantity} ${unit}`}
        </MDTypography>
      ),
      price: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          # {price}
        </MDTypography>
      ),
      // status: (
      //   <MDBox ml={-1}>
      //     <MDBadge
      //       badgeContent={available === true ? "available" : "not available"}
      //       color={available === true ? "success" : "error"}
      //       variant="gradient"
      //       size="sm"
      //     />
      //   </MDBox>
      // ),
      update: (
        <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
          <Link
            onClick={() => {
              handleEdit();
            }}
            to={`/createupdateproduct/${product_id}`}
          >
            Edit
          </Link>
        </MDTypography>
      ),
      remove: (
        <MDTypography
          component="a"
          variant="caption"
          color="text"
          fontWeight="medium"
          onClick={() => {
            handleDelete();
          }}
        >
          <Link>remove</Link>
        </MDTypography>
      ),
    };
  });
  return {
    columns: [
      { Header: "products", accessor: "products", width: "45%", align: "left" },
      { Header: "type", accessor: "type", align: "left" },
      { Header: "details", accessor: "details", align: "center" },
      { Header: "quantity", accessor: "quantity", align: "center" },
      { Header: "price", accessor: "price", align: "center" },
      // { Header: "status", accessor: "status", align: "center" },
      { Header: "update", accessor: "update", align: "center" },
      { Header: "remove", accessor: "remove", align: "center" },
    ],
    rows: rows,
    numOfPages,
    refetch,
    count,
    totalProducts,
    totalQuantity,
    isGettingAllProducts,
  };
}
