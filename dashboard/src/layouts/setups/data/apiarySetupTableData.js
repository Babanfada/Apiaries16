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
import { useSetupComp } from "features/apiarySetup/setupCompThunk";
import { useDeleteSetup } from "features/apiarySetup/setupCompThunk";
import { setUpdateSetup } from "features/apiarySetup/setupCompSlice";

export default function apiarySetupTableData() {
  const dispatch = useDispatch();
  const { deleteSetup } = useDeleteSetup();
  const {
    isGettingAllSetupComp,
    setupComp: { apiarySetupComp = [], count = 0, numOfPages = 0, totalSetupComp = 0 } = {},
    refetch,
  } = useSetupComp();
  const Author = ({ image, component_name, component_id }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} size="sm" />
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {`${component_id} `}
        </MDTypography>
        <MDTypography variant="caption">{component_name}</MDTypography>
      </MDBox>
    </MDBox>
  );

  const rows = apiarySetupComp.map((setup, i) => {
    const { component_id, service_id, component_name, description, stock, price } = setup;
    const payload = {
      service_id,
      component_name,
      description,
      stock,
      price,
    };

    const handleEdit = () => {
      dispatch(setUpdateSetup(payload));
    };
    const handleDelete = () => {
      const confirmation = window.confirm(
        "You are about to Delete a apiary setup  records permanently, ARE YOU SURE?"
      );
      if (!confirmation) return;
      deleteSetup(component_id);
    };
    return {
      component: (
        <Author image={logoSlack} component_name={component_name} component_id={component_id} />
      ),
      service: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {service_id}
        </MDTypography>
      ),
      stock: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {stock}
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
            to={`/createupdatesetup/${component_id}`}
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
      { Header: "component", accessor: "component", width: "45%", align: "left" },
      { Header: "service", accessor: "service", width: "45%", align: "left" },
      { Header: "stock", accessor: "stock", align: "left" },
      { Header: "description", accessor: "description", align: "center" },
      { Header: "price", accessor: "price", align: "center" },
      { Header: "update", accessor: "update", align: "center" },
      { Header: "remove", accessor: "remove", align: "center" },
    ],
    rows: rows,
    numOfPages,
    refetch,
    count,
    isGettingAllSetupComp,
    totalSetupComp,
  };
}
