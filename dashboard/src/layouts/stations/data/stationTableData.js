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
import { useStations } from "features/stations/stationsThunk";
import { setUpdateStation } from "features/stations/stationSlice";
import LogoAsana from "assets/images/small-logos/logo-asana.svg";
export default function stationTableData() {
  const dispatch = useDispatch();
  const {
    isGettingStations,
    stations: {
      stations: Stations = [],
      count = 0,
      totalStations = 0,
      numOfPages = 0,
      totalHives = 0,
      stationSizeCount = [],
    } = {},
    refetch,
  } = useStations();
  const Author = ({ image, name, location, station_id }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={name} size="sm" />
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          <Link to={`/stations/${station_id}`}>{`${station_id} ${name}`}</Link>
        </MDTypography>
        <MDTypography variant="caption">{location}</MDTypography>
      </MDBox>
    </MDBox>
  );
  const Job = ({ title, description }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
        <Link to={`/employees/${title}`}>{`int_sup: ${title}`}</Link>
      </MDTypography>
      <MDTypography variant="caption">
        <Link to={`/employees/${description}`}>{`ext_sup: ${description}`}</Link>
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
  const rows = Stations.map((station, i) => {
    const {
      station_id,
      station_name,
      supervisor_int,
      supervisor_ext,
      location,
      longitude,
      latitude,
      station_size,
      number_of_hive_boxes,
      status,
      station_maintainace_history,
      last_inspection_date,
      next_inspection_date,
      notes,
    } = station;
    const payload = {
      station_name,
      supervisor_int,
      supervisor_ext,
      location,
      longitude,
      latitude,
      station_size,
      number_of_hive_boxes,
      status,
      station_maintainace_history,
      last_inspection_date,
      next_inspection_date,
      notes,
    };
    const handleEdit = () => {
      dispatch(setUpdateStation(payload));
    };
    return {
      station: (
        <Author image={LogoAsana} name={station_name} location={location} station_id={station_id} />
      ),
      supervisors: <Job title={supervisor_int} description={supervisor_ext} />,
      status: (
        <MDBox ml={-1}>
          <MDBadge
            badgeContent={status}
            color={status === "active" ? "success" : status === "inactive" ? "error" : "warning"}
            variant="gradient"
            size="sm"
          />
        </MDBox>
      ),
      size: (
        <MDBox ml={-1}>
          <MDBadge
            badgeContent={station_size}
            color={
              station_size === "small" ? "success" : station_size === "medium" ? "error" : "warning"
            }
            variant="gradient"
            size="sm"
          />
        </MDBox>
      ),
      coordinates: (
        <Coord
          title={`Longitude: ${Number(longitude)?.toFixed(2) || "N/A"}`}
          description={`Latitude: ${Number(latitude)?.toFixed(2) || "N/A"}`}
        />
      ),
      action: (
        <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
          <Link
            onClick={() => {
              handleEdit();
            }}
            to={`/createupdatestation/${station_id}`}
          >
            Edit
          </Link>
        </MDTypography>
      ),
    };
  });
  return {
    columns: [
      { Header: "station", accessor: "station", width: "45%", align: "left" },
      { Header: "supervisors", accessor: "supervisors", align: "left" },
      { Header: "status", accessor: "status", align: "center" },
      { Header: "size", accessor: "size", align: "center" },
      { Header: "coordinates", accessor: "coordinates", align: "center" },
      { Header: "action", accessor: "action", align: "center" },
    ],
    rows: rows,
    numOfPages,
    count,
    totalStations,
    numOfPages,
    totalHives,
    stationSizeCount,
    isGettingStations,
    refetch,
  };
}
