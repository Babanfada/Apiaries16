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
import { useReports } from "features/catch_reports/reportsThunk";
import { useDeleteReport } from "features/catch_reports/reportsThunk";
import { setUpdateReport } from "features/catch_reports/reportSlice";
export default function reportTableData() {
  const dispatch = useDispatch();
  const { deleteReport } = useDeleteReport();
  const {
    isGettingAllReports,
    catch_reports: {
      reports = [],
      totalReports = 0,
      count = 0,
      numOfPages = 0,
      totalboxesAssigned = 0,
      totalColonized = 0,
      totalUnColonized = 0,
    },
    refetch,
  } = useReports();
  const Author = ({ image, season, location, report_id }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} season={season} size="sm" />
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          <Link to={`#`}>{`${report_id} ${season}`}</Link>
        </MDTypography>
        <MDTypography variant="caption">{location}</MDTypography>
      </MDBox>
    </MDBox>
  );
  const Job = ({ title, description }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
        {`colonized: ${title}`}
      </MDTypography>
      <MDTypography variant="caption">{`uncolonized: ${description}`}</MDTypography>
    </MDBox>
  );
  const Job2 = ({ title, description }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
        {`date assigned: ${title}`}
      </MDTypography>
      <MDTypography variant="caption">{`catch date: ${description}`}</MDTypography>
    </MDBox>
  );
  const Coord = ({ title, description }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
        <Link to={`/hunters/${title}`}>hunter {title}</Link>
      </MDTypography>
      <MDTypography variant="caption">
        <Link to={`/employees/${description}`}>supervisor {description}</Link>
      </MDTypography>
    </MDBox>
  );
  const rows = reports.map((report, i) => {
    const {
      report_id,
      hunter_id,
      assigned_supervisor,
      total_boxes_assigned,
      colonized_boxes,
      uncolonized_boxes,
      delivered_to_apiary,
      date_assigned,
      catch_date,
      catch_location,
      catch_status,
      season,
      notes,
    } = report;
    const payload = {
      report_id,
      hunter_id,
      assigned_supervisor,
      total_boxes_assigned,
      colonized_boxes,
      uncolonized_boxes,
      delivered_to_apiary,
      date_assigned,
      catch_date,
      catch_location,
      catch_status,
      season,
      notes,
    };

    const handleEdit = () => {
      dispatch(setUpdateReport(payload));
    };
    const handleDelete = () => {
      const confirmation = window.confirm(
        "You are about to Delete a report records permanently, ARE YOU SURE?"
      );
      if (!confirmation) return;
      deleteReport(report_id);
    };
    return {
      report: (
        <Author image={LogoAsana} season={season} location={catch_location} report_id={report_id} />
      ),
      details: <Coord title={hunter_id} description={assigned_supervisor} />,
      assigned_boxes: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {total_boxes_assigned}
        </MDTypography>
      ),
      colonization: <Job title={colonized_boxes} description={uncolonized_boxes} />,
      catch_stats: <Job2 title={date_assigned} description={catch_date} />,
      status: (
        <MDBox ml={-1}>
          <MDBadge
            badgeContent={catch_status}
            color={
              catch_status === "all successfull"
                ? "success"
                : catch_status === "some pending"
                ? "error"
                : "warning"
            }
            variant="gradient"
            size="sm"
          />
        </MDBox>
      ),
      installed_at_apiary: (
        <MDBox ml={-1}>
          <MDBadge
            badgeContent={catch_status}
            color={
              catch_status === "all" ? "success" : catch_status === "some" ? "error" : "warning"
            }
            variant="gradient"
            size="sm"
          />
        </MDBox>
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
            to={`/createupdatereport/${report_id}`}
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
      { Header: "report", accessor: "report", width: "45%", align: "left" },
      { Header: "details", accessor: "details", align: "left" },
      { Header: "asseigned_boxes", accessor: "asseigned_boxes", align: "center" },
      { Header: "colonization", accessor: "colonization", align: "center" },
      { Header: "catch_stats", accessor: "catch_stats", align: "center" },
      { Header: "status", accessor: "status", align: "center" },
      { Header: "installed_at_apiary", accessor: "installed_at_apiary", align: "center" },
      { Header: "note", accessor: "note", align: "center" },
      { Header: "update", accessor: "update", align: "center" },
      { Header: "remove", accessor: "remove", align: "center" },
    ],
    rows: rows,
    numOfPages,
    count,
    numOfPages,
    refetch,
    isGettingAllReports,
    totalReports,
    totalboxesAssigned,
    totalColonized,
    totalUnColonized,
  };
}
