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
import { useSupplyProvision } from "features/supplyProvision/supplyprovThunk";
import { useDeleteProvision } from "features/supplyProvision/supplyprovThunk";
import { setUpdateProvision } from "features/supplyProvision/supplyProvSlice";

export default function provisionsTableData() {
  const dispatch = useDispatch();
  const { deleteProvision } = useDeleteProvision();
  const {
    isGettingAllprovisions,
    supplyProvision: { provisions = [], count = 0, numOfPages = 0, totalProvisions = 0 } = {},
    refetch,
  } = useSupplyProvision();
  const Author = ({ image, item_name, item_id }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} size="sm" />
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {`${item_id} `}
        </MDTypography>
        <MDTypography variant="caption">{item_name}</MDTypography>
      </MDBox>
    </MDBox>
  );

  const rows = provisions.map((item, i) => {
    const { item_id, service_id, item_name, description, quantity, price_NGN } = item;
    const payload = {
      service_id,
      item_name,
      description,
      quantity,
      price_NGN,
    };

    const handleEdit = () => {
      dispatch(setUpdateProvision(payload));
    };
    const handleDelete = () => {
      const confirmation = window.confirm(
        "You are about to Delete a provision records permanently, ARE YOU SURE?"
      );
      if (!confirmation) return;
      deleteProvision(item_id);
    };
    return {
      provisions: <Author image={logoSlack} item_name={item_name} item_id={item_id} />,
      service: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {service_id}
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
      quantity: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          # {quantity}
        </MDTypography>
      ),
      price: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          # {price_NGN}
        </MDTypography>
      ),
      update: (
        <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
          <Link
            onClick={() => {
              handleEdit();
            }}
            to={`/createupdateprovision/${item_id}`}
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
      { Header: "provisions", accessor: "provisions", width: "45%", align: "left" },
      { Header: "service", accessor: "service", align: "left" },
      { Header: "description", accessor: "description", align: "center" },
      { Header: "quantity", accessor: "quantity", align: "center" },
      { Header: "price", accessor: "price", align: "center" },
      { Header: "update", accessor: "update", align: "center" },
      { Header: "remove", accessor: "remove", align: "center" },
    ],
    rows: rows,
    numOfPages,
    refetch,
    count,
    isGettingAllprovisions,
    totalProvisions,
  };
}
