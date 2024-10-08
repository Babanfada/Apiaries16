/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";

import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import logoSlack from "assets/images/small-logos/logo-slack.svg";
import React from "react";
import { useServices } from "features/services/servicesThunk";
import { useDeleteService } from "features/services/servicesThunk";
import { setUpdateService } from "features/services/serviceSlice";

export default function servicesTableData() {
  const dispatch = useDispatch();
  const {
    isGettingAllServices,
    services: { service = [], totalServices = 0, count = 0, numOfPages = 0 },
    refetch,
  } = useServices();
  const { deleteService } = useDeleteService();
  const Author = ({ image, category, service_name, service_id }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} category={category} size="sm" />
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {`${service_id} ${category}`}
        </MDTypography>
        <MDTypography variant="caption">{service_name}</MDTypography>
      </MDBox>
    </MDBox>
  );
  // const Job = ({ title, description }) => (
  //   <MDBox lineHeight={1} textAlign="left">
  //     <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
  //       <Link to={`#`}>{`${title}`}</Link>
  //     </MDTypography>
  //     <MDTypography variant="caption">
  //       <Link to={`#`}>{`${description}`}</Link>
  //     </MDTypography>
  //   </MDBox>
  // );
  // const Coord = ({ title, description }) => (
  //   <MDBox lineHeight={1} textAlign="left">
  //     <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
  //       {title}
  //     </MDTypography>
  //     <MDTypography variant="caption">{description}</MDTypography>
  //   </MDBox>
  // );
  const rows = service.map((serv, i) => {
    const { service_id, service_name, description, numOfTimesRendered, category } = serv;
    const payload = {
      service_id,
      service_name,
      description,
      numOfTimesRendered,
      category,
    };

    const handleEdit = () => {
      dispatch(setUpdateService(payload));
    };
    const handleDelete = () => {
      const confirmation = window.confirm(
        "You are about to Delete a serv records permanently, ARE YOU SURE?"
      );
      if (!confirmation) return;
      deleteService(service_id);
    };
    return {
      service: (
        <Author
          image={logoSlack}
          category={category}
          service_name={service_name}
          service_id={service_id}
        />
      ),

      rendered: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {numOfTimesRendered}
        </MDTypography>
      ),
      description: (
        <MDTypography
          title={description}
          component="a"
          href="#"
          variant="caption"
          color="text"
          fontWeight="medium"
        >
          {description.length > 20 ? `${description.slice(0, 20)}...` : description}
        </MDTypography>
      ),
      update: (
        <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
          <Link
            onClick={() => {
              handleEdit();
            }}
            to={`/createupdateservice/${service_id}`}
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
      { Header: "service", accessor: "service", width: "45%", align: "left" },
      { Header: "rendered", accessor: "rendered", align: "left" },
      { Header: "description", accessor: "description", align: "center" },
      { Header: "update", accessor: "update", align: "center" },
      { Header: "remove", accessor: "remove", align: "center" },
    ],
    rows: rows,
    numOfPages,
    refetch,
    count,
    isGettingAllServices,
    service,
    totalServices,
  };
}
