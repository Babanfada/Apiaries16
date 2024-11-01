import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
// import MDBadge from "components/MDBadge";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import logoSlack from "assets/images/small-logos/logo-slack.svg";
import React from "react";
import PropTypes from "prop-types";
// import { useOrders } from "features/orders/ordersThunk";
// import { setUpdateOrder } from "features/orders/ordersSlice";
import { useReviews } from "features/reviews/reviewsThunk";
import { setUpdateReview } from "features/reviews/reviewSlice";

export default function reviewsTableData() {
  const dispatch = useDispatch();
  // const { deleteProduct } = useDeleteProduct();
  const {
    data: { reviews = [], totalReviews = 0, count = 0, numOfPages = 1 },
    refetch,
    isGettingAllReviews,
  } = useReviews();
  const Author = ({ image, review_id, user_id }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} size="sm" />
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {`review ${review_id} `}
        </MDTypography>
        <MDTypography variant="caption">user {user_id}</MDTypography>
      </MDBox>
    </MDBox>
  );
  Author.propTypes = {
    image: PropTypes.string.isRequired,
    user_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    review_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  };
  const Job = ({ title, description }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
        {`${title.length > 20 ? `${title.slice(0, 12)}...` : title}`}
      </MDTypography>
      <MDTypography variant="caption">{`${
        description.length > 20 ? `${description.slice(0, 12)}...` : description
      }`}</MDTypography>
    </MDBox>
  );
  Job.propTypes = {
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    description: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  };
  const Coord = ({ title, description }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
        {`product: ${title}`}
      </MDTypography>
      <MDTypography variant="caption">{`rating: ${description}`}</MDTypography>
    </MDBox>
  );
  Coord.propTypes = {
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    description: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  };

  const rows = reviews.map((item, i) => {
    const { review_id, product_id, user_id, rating, title, comment, review_images } = item;
    console.log(review_images);
    const payload = { review_id, product_id, user_id, rating, title, comment };
    const handleEdit = () => {
      dispatch(setUpdateReview(payload));
    };
    const handleDelete = () => {
      const confirmation = window.confirm(
        "You are about to Delete a review records permanently, ARE YOU SURE?"
      );
      if (!confirmation) return;
      // deleteProduct(product_id);
    };
    return {
      reviews: <Author image={logoSlack} review_id={review_id} user_id={user_id} />,
      comment: <Job title={title} description={comment} />,
      details: <Coord title={product_id} description={rating} />,
      update: (
        <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
          <Link
            onClick={() => {
              handleEdit();
            }}
            to={`/updatereview/${review_id}`}
          >
            Edit
          </Link>
        </MDTypography>
      ),
      remove: (
        <MDTypography
          onClick={() => {
            handleDelete();
          }}
          component="a"
          variant="caption"
          color="text"
          fontWeight="medium"
        >
          Remove
        </MDTypography>
      ),
      images: (
        <MDTypography
          style={{ display: "flex", flexDirection: "column" }}
          component="a"
          variant="caption"
          color="text"
          fontWeight="medium"
        >
          {review_images.map(({ image0, image1, image2 }, i) => {
            return (
              <div style={{ display: "flex", gap: "2px" }} key={i}>
                <MDAvatar src={image0} size="sm" />
                <MDAvatar src={image1} size="sm" />
                <MDAvatar src={image2} size="sm" />
              </div>
            );
          })}
        </MDTypography>
      ),
    };
  });
  return {
    columns: [
      { Header: "reviews", accessor: "reviews", width: "45%", align: "left" },
      { Header: "comment", accessor: "comment", align: "center" },
      { Header: "details", accessor: "details", align: "left" },
      { Header: "images", accessor: "images", align: "center" },
      // { Header: "update", accessor: "update", align: "center" },
      // { Header: "remove", accessor: "remove", align: "center" },
    ],
    rows: rows,
    numOfPages,
    refetch,
    count,
    totalReviews,
    isGettingAllReviews,
  };
}
