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
import LogoAsana from "assets/images/small-logos/logo-asana.svg";
import { useHunters } from "features/hunters/huntersThunk";
import { useDeleteHunter } from "features/hunters/huntersThunk";
import { setUpdateHunter } from "features/hunters/huntersSlice";
export default function huntersTableData() {
  const dispatch = useDispatch();
  const { deleteHunter } = useDeleteHunter();
  const {
    isGettingAllHunters,
    hunters: {
      hunters = [],
      totalHunters = 0,
      count = 0,
      numOfPages = 1,
      contractStatusCount = [],
    } = {},
    refetch,
  } = useHunters();
  // console.log(pages);

  const Author = ({ image, name, email, hunter_id }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={name} size="sm" />
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          <Link to={`/hunters/${hunter_id}`}>{`${hunter_id} ${name}`}</Link>
        </MDTypography>
        <MDTypography variant="caption">{email}</MDTypography>
      </MDBox>
    </MDBox>
  );
  const Job = ({ title, description }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
        <Link to={`#`}>{`${title}`}</Link>
      </MDTypography>
      <MDTypography variant="caption">
        <Link to={`#`}>{`${description}`}</Link>
      </MDTypography>
    </MDBox>
  );
  const Coord = ({ title, description }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
        {title}
      </MDTypography>
      {/* <MDTypography variant="caption">{description}</MDTypography> */}
    </MDBox>
  );
  const rows = hunters.map((hunter, i) => {
    const {
      hunter_id,
      assigned_supervisor,
      fullname,
      phone,
      email,
      joining_date,
      tip,
      employment_status,
      emergency_contact_name,
      emergency_contact,
      notes,
    } = hunter;
    const payload = {
      hunter_id,
      assigned_supervisor,
      fullname,
      phone,
      email,
      joining_date,
      tip,
      employment_status,
      emergency_contact_name,
      emergency_contact,
      notes,
    };

    const handleEdit = () => {
      dispatch(setUpdateHunter(payload));
    };
    const handleDelete = () => {
      const confirmation = window.confirm(
        "You are about to Delete a hunter records permanently, ARE YOU SURE?"
      );
      if (!confirmation) return;
      deleteHunter(hunter_id);
    };
    return {
      hunter: <Author image={LogoAsana} name={fullname} email={email} hunter_id={hunter_id} />,
      supervisor: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          <Link to={`/employees/${assigned_supervisor}`}>{assigned_supervisor}</Link>
        </MDTypography>
      ),
      contact: <Coord title={`${phone || "N/A"}`} description={`email: ${email || "N/A"}`} />,
      tip: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {tip}
        </MDTypography>
      ),
      status: (
        <MDBox ml={-1}>
          <MDBadge
            badgeContent={employment_status}
            color={
              employment_status === "active"
                ? "success"
                : employment_status === "inactive"
                ? "warning"
                : "error"
            }
            variant="gradient"
            size="sm"
          />
        </MDBox>
      ),
      emergency_contact: <Job title={emergency_contact_name} description={emergency_contact} />,
      date_employed: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {joining_date}
        </MDTypography>
      ),
      note: (
        <MDTypography
          title={notes}
          component="a"
          href="#"
          variant="caption"
          color="text"
          fontWeight="medium"
        >
          {notes.length > 20 ? `${notes.slice(0, 20)}...` : notes}
        </MDTypography>
      ),
      update: (
        <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
          <Link
            onClick={() => {
              handleEdit();
            }}
            to={`/createupdatehunter/${hunter_id}`}
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
      { Header: "hunter", accessor: "hunter", width: "45%", align: "left" },
      { Header: "supervisor", accessor: "supervisor", align: "left" },
      { Header: "contact", accessor: "contact", align: "center" },
      { Header: "tip", accessor: "tip", align: "center" },
      { Header: "status", accessor: "status", align: "center" },
      { Header: "emergency_contact", accessor: "emergency_contact", align: "center" },
      { Header: "date_employed", accessor: "date_employed", align: "center" },
      { Header: "note", accessor: "note", align: "center" },
      { Header: "update", accessor: "update", align: "center" },
      { Header: "remove", accessor: "remove", align: "center" },
    ],
    rows: rows,
    numOfPages,
    count,
    isGettingAllHunters,
    refetch,
    hunters,
    totalHunters,
    contractStatusCount,
  };
}
