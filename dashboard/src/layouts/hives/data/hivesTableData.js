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
import { useHives } from "features/hives/hivesThunk";
import { useDeleteHive } from "features/hives/hivesThunk";
import { setUpdateHive } from "features/hives/hiveSlice";

export default function hivesTableData() {
  const dispatch = useDispatch();
  const { deleteHive } = useDeleteHive();
  const {
    isGettingAllHives,
    hives: {
      hives = [],
      totalHives = 0,
      count = 0,
      numOfPages = 0,
      colonizationCount = [],
      hiveCurrentLocationCount = [],
      hiveStatusCount = [],
      hiveTypeCount = [],
      hiveUseConditionCount = [],
    },
    refetch,
  } = useHives();
  // console.log(pages);

  const Author = ({ image, hive_type, location, hive_id }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} hive_type={hive_type} size="sm" />
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {/* {hive_type} */}
          <Link to={`/hives/${hive_id}`}>{`${hive_id} ${hive_type}`}</Link>
        </MDTypography>
        <MDTypography variant="caption">{location}</MDTypography>
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
      <MDTypography variant="caption">{description}</MDTypography>
    </MDBox>
  );
  const rows = hives.map((hive, i) => {
    const {
      hive_id,
      assigned_hunter,
      hive_type,
      num_of_frames,
      colonized,
      status,
      use_condition,
      first_installation,
      current_location,
      last_inspection_date,
      note,
    } = hive;
    const payload = {
      hive_id,
      assigned_hunter,
      hive_type,
      num_of_frames,
      colonized,
      status,
      use_condition,
      first_installation,
      current_location,
      last_inspection_date,
      note,
    };

    const handleEdit = () => {
      dispatch(setUpdateHive(payload));
    };
    const handleDelete = () => {
      const confirmation = window.confirm(
        "You are about to Delete a hives records permanently, ARE YOU SURE?"
      );
      if (!confirmation) return;
      deleteHive(hive_id);
    };
    return {
      hive: (
        <Author
          image={LogoAsana}
          hive_type={hive_type}
          location={current_location}
          hive_id={hive_id}
        />
      ),
      hunter: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          <Link to={`/hunters/${assigned_hunter}`}>{assigned_hunter}</Link>
        </MDTypography>
      ),
      status: (
        <MDBox ml={-1}>
          <MDBadge
            badgeContent={status}
            color={status === "inuse" ? "success" : status === "unuse" ? "warning" : "error"}
            variant="gradient"
            size="sm"
          />
        </MDBox>
      ),
      colonized: (
        <MDBox ml={-1}>
          <MDBadge
            badgeContent={colonized}
            color={
              colonized === "confirmed" ? "success" : colonized === "pending" ? "warning" : "error"
            }
            variant="gradient"
            size="sm"
          />
        </MDBox>
      ),
      condition: (
        <MDBox ml={-1}>
          <MDBadge
            badgeContent={use_condition}
            color={
              use_condition === "new" ? "success" : use_condition === "used" ? "warning" : "error"
            }
            variant="gradient"
            size="sm"
          />
        </MDBox>
      ),
      management: (
        <Coord
          title={`installed_on: ${first_installation || "N/A"}`}
          description={`inspected_on: ${last_inspection_date || "N/A"}`}
        />
      ),
      frames: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {num_of_frames}
        </MDTypography>
      ),
      note: (
        <MDTypography
          title={note}
          component="a"
          href="#"
          variant="caption"
          color="text"
          fontWeight="medium"
        >
          {note.length > 20 ? `${note.slice(0, 20)}...` : note}
        </MDTypography>
      ),
     
      update: (
        <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
          <Link
            onClick={() => {
              handleEdit();
            }}
            to={`/createupdatehive/${hive_id}`}
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
      { Header: "hive", accessor: "hive", width: "45%", align: "left" },
      { Header: "hunter", accessor: "hunter", align: "left" },
      { Header: "status", accessor: "status", align: "center" },
      { Header: "colonized", accessor: "colonized", align: "center" },
      { Header: "condition", accessor: "condition", align: "center" },
      { Header: "management", accessor: "management", align: "center" },
      { Header: "frames", accessor: "frames", align: "center" },
      { Header: "note", accessor: "note", align: "center" },
      { Header: "update", accessor: "update", align: "center" },
      { Header: "remove", accessor: "remove", align: "center" },
    ],
    rows: rows,
    numOfPages,
    count,
    refetch,
    isGettingAllHives,
    hives,
    totalHives,
    colonizationCount,
    hiveCurrentLocationCount,
    hiveStatusCount,
    hiveTypeCount,
    hiveUseConditionCount,
  };
}
