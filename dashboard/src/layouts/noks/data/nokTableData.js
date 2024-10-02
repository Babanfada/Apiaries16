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

import React from "react";
// import { useStations } from "features/stations/stationsThunk";
// import { setUpdateStation } from "features/stations/stationSlice";
import logoAtlassian from "assets/images/small-logos/logo-atlassian.svg";
import { useAllNok } from "features/nok/nokThunk";
import { useDeleteNok } from "features/nok/nokThunk";
import { setUpdateNok } from "features/nok/nokSlice";
export default function nokTableData() {
   const { deleteNok } = useDeleteNok();
   const dispatch = useDispatch();
  const {
    isGettingAllNok,
    refetch,
    noks: {
      employeesNOK = [],
      genderTypeCount = [],
      numOfPages,
      totalEmployeesNOK = 0,
      count = 0,
      relationshipTypeCount = [],
    } = {},
  } = useAllNok();
  const Author = ({ image, name, email, nok_id }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={name} size="sm" />
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          <Link>{`${nok_id} ${name}`}</Link>
        </MDTypography>
        <MDTypography variant="caption">{email}</MDTypography>
      </MDBox>
    </MDBox>
  );
 
  const rows = employeesNOK.map((nok, i) => {
    const { nok_id, emp_id, fullname, email, address, phone, gender, relationship } = nok;
    const payload = {
      nok_id,
      emp_id,
      fullname,
      email,
      address,
      phone,
      gender,
      relationship,
    };
    const handleEdit = () => {
      dispatch(setUpdateNok(payload));
    };
    const handleDelete = () => {
      const confirmation = window.confirm(
        "You are about to Delete an next of kin records permanently, ARE YOU SURE?"
      );
      if (!confirmation) return;
      deleteNok(nok_id);
    };
    return {
      nok: <Author image={logoAtlassian} name={fullname} email={email} nok_id={nok_id} />,
      employee: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          <Link to={`/employees/${emp_id}`}>{emp_id}</Link>
        </MDTypography>
      ),
      address: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {address}
        </MDTypography>
      ),
      phone: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {phone}
        </MDTypography>
      ),
      gender: (
        <MDBox ml={-1}>
          <MDBadge
            badgeContent={gender}
            color={gender === "male" ? "success" : "warning"}
            variant="gradient"
            size="sm"
          />
        </MDBox>
      ),
      relationship: (
        <MDBox ml={-1}>
          <MDBadge
            badgeContent={relationship}
            color={
              relationship === "spouse"
                ? "success"
                : relationship === "parent"
                ? "warning"
                : relationship === "guidance"
                ? "error"
                : "info"
            }
            variant="gradient"
            size="sm"
          />
        </MDBox>
      ),
      update: (
        <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
          <Link
            onClick={() => {
              handleEdit();
            }}
            to={`/createupdatenok/${nok_id}`}
          >
            Edit
          </Link>
        </MDTypography>
      ),
      remove: (
        <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
          <Link
            onClick={() => {
              handleDelete();
            }}
          >
            remove
          </Link>
        </MDTypography>
      ),
    };
  });
  return {
    columns: [
      { Header: "nok", accessor: "nok", width: "45%", align: "left" },
      { Header: "employee", accessor: "employee", width: "45%", align: "left" },
      { Header: "address", accessor: "address", align: "left" },
      { Header: "phone", accessor: "phone", align: "center" },
      { Header: "gender", accessor: "gender", align: "center" },
      { Header: "relationship", accessor: "relationship", align: "center" },
      { Header: "update", accessor: "update", align: "center" },
      { Header: "remove", accessor: "remove", align: "center" },
    ],
    rows: rows,
    isGettingAllNok,
    employeesNOK,
    genderTypeCount,
    numOfPages,
    totalEmployeesNOK,
    count,
    relationshipTypeCount,
    refetch,
  };
}
