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
import { useConsultation } from "features/consultation/consultationThunk";
import { useDeleteConsultation } from "features/consultation/consultationThunk";
import { setUpdateConsultation } from "features/consultation/consultationSlice";

export default function consultationTableData() {
  const dispatch = useDispatch();
  const { deleteConsultation } = useDeleteConsultation();
  const {
    isGettingAllC_Items,
    c_items: { consultancy_items = [], count = 0, numOfPages = 0, totalCitems = 0 } = {},
    refetch,
  } = useConsultation();
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

  const rows = consultancy_items.map((item, i) => {
    const { item_id, service_id, item_name, description, numOfTimesRendered, price } = item;
    const payload = {
      service_id,
      item_name,
      description,
      numOfTimesRendered,
      price,
    };

    const handleEdit = () => {
      dispatch(setUpdateConsultation(payload));
    };
    const handleDelete = () => {
      const confirmation = window.confirm(
        "You are about to Delete a apiary item  records permanently, ARE YOU SURE?"
      );
      if (!confirmation) return;
      deleteConsultation(item_id);
    };
    return {
      consultation: <Author image={logoSlack} item_name={item_name} item_id={item_id} />,
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
      rendered: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          # {numOfTimesRendered}
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
            to={`/createupdateconsultation/${item_id}`}
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
      { Header: "consultation", accessor: "consultation", width: "45%", align: "left" },
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
    isGettingAllC_Items,
    totalCitems,
  };
}
