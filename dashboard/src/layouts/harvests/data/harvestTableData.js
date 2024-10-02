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
import MDBadge from "components/MDBadge";''
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import React from "react";
import logoInvesion from "assets/images/small-logos/logo-invision.svg";
import { useHoneyHarvest } from "features/harvest/honey_harvestThunk";
import { useDeleteHarvest } from "features/harvest/honey_harvestThunk";
import { setUpdateHarvest } from "features/harvest/honey_harvestSlice";

export default function harvestTableData() {
  const dispatch = useDispatch();
  const { deleteHarvest } = useDeleteHarvest();
  const {
    isGettingAllHarvest,
    honey_harvest: {
      harvest = [],
      totalHarvestQuantity = 0,
      count = 0,
      harvestedVolumeByYear = [],
      qualityRatingCount = [],
      numOfPages = 0,
      totalHarvest = 0,
    } = {},
    refetch,
  } = useHoneyHarvest();
  const Author = ({ image, name, year, station_id }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={name} size="sm" />
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          <Link to={`/stations/${station_id}`}>{`${station_id} ${name}`}</Link>
        </MDTypography>
        <MDTypography variant="caption">{year}</MDTypography>
      </MDBox>
    </MDBox>
  );

  const rows = harvest.map((harv, i) => {
    const {
      harvest_id,
      harvest_year,
      station_id,
      station_name,
      harvest_date,
      quantity_collected,
      colouration,
      unit,
      quality_rating,
      note,
    } = harv;
    const payload = {
      harvest_id,
      harvest_year,
      station_id,
      station_name,
      harvest_date,
      quantity_collected,
      colouration,
      unit,
      quality_rating,
      note,
    };

    const handleEdit = () => {
      dispatch(setUpdateHarvest(payload));
    };
    const handleDelete = () => {
      const confirmation = window.confirm(
        "You are about to Delete an harvest records permanently, ARE YOU SURE?"
      );
      if (!confirmation) return;
      deleteHarvest(harvest_id);
    };
    return {
      harvest: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {harvest_id}
        </MDTypography>
      ),
      station: (
        <Author
          image={logoInvesion}
          year={harvest_year}
          name={station_name}
          station_id={station_id}
        />
      ),
      date: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {harvest_date}
        </MDTypography>
      ),
      quantity: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {quantity_collected}
        </MDTypography>
      ),
      unit: (
        <MDBox ml={-1}>
          <MDBadge
            badgeContent={unit}
            color={unit === "litres" ? "success" : "warning"}
            variant="gradient"
            size="sm"
          />
        </MDBox>
      ),
      color: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {colouration}
        </MDTypography>
      ),
      rating: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {quality_rating} of 5
        </MDTypography>
      ),
      note: (
        <MDTypography title={note} component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {note.length > 20 ? `${note.slice(0, 20)}...` : note}
        </MDTypography>
      ),
      update: (
        <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
          <Link
            onClick={() => {
              handleEdit();
            }}
            to={`/createupdateharvest/${harvest_id}`}
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
      { Header: "harvest", accessor: "harvest", width: "45%", align: "left" },
      { Header: "station", accessor: "station", width: "45%", align: "left" },
      { Header: "date", accessor: "date", align: "left" },
      { Header: "quantity", accessor: "quantity", align: "center" },
      { Header: "unit", accessor: "unit", align: "center" },
      { Header: "color", accessor: "color", align: "center" },
      { Header: "rating", accessor: "rating", align: "center" },
      { Header: "note", accessor: "note", align: "center" },
      { Header: "update", accessor: "update", align: "center" },
      { Header: "remove", accessor: "remove", align: "center" },
    ],
    rows: rows,
    harvest,
    numOfPages,
    count,
    refetch,
    isGettingAllHarvest,
    totalHarvestQuantity,
    harvestedVolumeByYear,
    qualityRatingCount,
    totalHarvest,
  };
}
