import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import logoSlack from "assets/images/small-logos/logo-slack.svg";
import React from "react";
import { usePolServices } from "features/pollination/polservicesThunk";
import { useDeletePolServices } from "features/pollination/polservicesThunk";
import { setUpdatePolServ } from "features/pollination/polservicesSlice";
import PropTypes from "prop-types";

const Author = ({ image, crop_type, pol_service_id }) => (
  <MDBox display="flex" alignItems="center" lineHeight={1}>
    <MDAvatar src={image} size="sm" />
    <MDBox ml={2} lineHeight={1}>
      <MDTypography display="block" variant="button" fontWeight="medium">
        {`${pol_service_id} `}
      </MDTypography>
      <MDTypography variant="caption">{crop_type}</MDTypography>
    </MDBox>
  </MDBox>
);

Author.propTypes = {
  image: PropTypes.string.isRequired,
  crop_type: PropTypes.string.isRequired,
  pol_service_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default function pollinationTableData() {
  const dispatch = useDispatch();
  const { deletePolService } = useDeletePolServices();
  const {
    isGettingAllPolServices,
    polservices: { polservices = [], totalPolServices, count, numOfPages } = {},
    refetch,
  } = usePolServices();
  // const Author = ({ image, crop_type, pol_service_id }) => (
  //   <MDBox display="flex" alignItems="center" lineHeight={1}>
  //     <MDAvatar src={image} size="sm" />
  //     <MDBox ml={2} lineHeight={1}>
  //       <MDTypography display="block" variant="button" fontWeight="medium">
  //         {`${pol_service_id} `}
  //       </MDTypography>
  //       <MDTypography variant="caption">{crop_type}</MDTypography>
  //     </MDBox>
  //   </MDBox>
  // );
  // Author.propTypes = {
  //   image: PropTypes.string.isRequired,
  //   crop_type: PropTypes.string.isRequired,
  //   pol_service_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  // };
  const rows = polservices.map((item, i) => {
    const { pol_service_id, service_id, crop_type, service_description, rendered, price } = item;
    const payload = {
      service_id,
      crop_type,
      service_description,
      rendered,
      price,
    };

    const handleEdit = () => {
      dispatch(setUpdatePolServ(payload));
    };
    const handleDelete = () => {
      const confirmation = window.confirm(
        "You are about to Delete a pollination service records permanently, ARE YOU SURE?"
      );
      if (!confirmation) return;
      deletePolService(pol_service_id);
    };
    return {
      pollination: (
        <Author image={logoSlack} crop_type={crop_type} pol_service_id={pol_service_id} />
      ),
      service: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {service_id}
        </MDTypography>
      ),
      description: (
        <MDTypography
          title={service_description}
          component="a"
          href="#"
          variant="caption"
          color="text"
          fontWeight="medium"
        >
          {service_description.length > 20
            ? `${service_description.slice(0, 20)}...`
            : service_description}
        </MDTypography>
      ),
      rendered: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          # {rendered}
        </MDTypography>
      ),
      price: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          # {price}
        </MDTypography>
      ),
      update: (
        <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
          <Link
            onClick={() => {
              handleEdit();
            }}
            to={`/createupdatepollination/${pol_service_id}`}
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
      { Header: "pollination", accessor: "pollination", width: "45%", align: "left" },
      { Header: "service", accessor: "service", align: "left" },
      { Header: "description", accessor: "description", align: "center" },
      { Header: "rendered", accessor: "rendered", align: "center" },
      { Header: "price", accessor: "price", align: "center" },
      { Header: "update", accessor: "update", align: "center" },
      { Header: "remove", accessor: "remove", align: "center" },
    ],
    rows: rows,
    numOfPages,
    refetch,
    count,
    isGettingAllPolServices,
    totalPolServices,
  };
}
