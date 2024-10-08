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
import LogoAsana from "assets/images/small-logos/logo-asana.svg";
import { useEquipments } from "features/equuipments/equipmentThunk";
import { useDeleteEquipment } from "features/equuipments/equipmentThunk";
import { setUpdateEquipment } from "features/equuipments/equipmentSlice";
export default function equipmentsTableData() {
  const dispatch = useDispatch();
  const { deleteEquipment } = useDeleteEquipment();
  const {
    equipments: {
      equipment = [],
      totalEquipments = 0,
      count = 0,
      numOfPages = 0,
      categoryCount = [],
      statusCount = [],
      storageLocationCount = [],
    } = {},
    refetch,
    isGettingAllequipments,
  } = useEquipments();
  const Author = ({ image, name, retired, tool_id }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={name} size="sm" />
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          <Link to={`#`}>{`${tool_id} ${name}`}</Link>
        </MDTypography>
        <MDTypography variant="caption">{retired}</MDTypography>
      </MDBox>
    </MDBox>
  );
  const Job = ({ title, description }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
        <Link to={`#`}>{`${title}`}</Link>
      </MDTypography>
      <MDTypography variant="caption">
        <Link to={`#`}>{`quantity: ${description}`}</Link>
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
  const rows = equipment.map((single_equipment, i) => {
    const {
      tool_id,
      tool_name,
      category,
      quantity,
      status,
      storage_location,
      supplier,
      purchase_date,
      purchase_cost,
      currency,
      last_maintanace_date,
      next_maintanace_date,
      retired,
      note,
    } = single_equipment;
    const payload = {
      tool_id,
      tool_name,
      category,
      quantity,
      status,
      storage_location,
      supplier,
      purchase_date,
      purchase_cost,
      currency,
      last_maintanace_date,
      next_maintanace_date,
      retired,
      note,
    };
    const handleEdit = () => {
      dispatch(setUpdateEquipment(payload));
    };
    const handleDelete = () => {
      const confirmation = window.confirm(
        "You are about to Delete an an equipment records permanently, ARE YOU SURE?"
      );
      if (!confirmation) return;
      deleteEquipment(tool_id);
    };
    return {
      equipment: <Author image={LogoAsana} name={tool_name} retired={retired} tool_id={tool_id} />,
      detail: <Job title={category} description={quantity} />,
      status: (
        <MDBox ml={-1}>
          <MDBadge
            badgeContent={status}
            color={status === "new" ? "success" : status === "used" ? "warning" : "error"}
            variant="gradient"
            size="sm"
          />
        </MDBox>
      ),
      location: (
        <MDBox ml={-1}>
          <MDBadge
            badgeContent={storage_location}
            color={
              storage_location === "warehouse"
                ? "success"
                : storage_location === "factory"
                ? "error"
                : "warning"
            }
            variant="gradient"
            size="sm"
          />
        </MDBox>
      ),
      supplier: (
        <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
          {supplier}
        </MDTypography>
      ),
      acquired: (
        <Coord
          title={`Cost: ${purchase_cost ? Number(purchase_cost).toFixed(2) : "N/A"} ${
            currency || ""
          }`}
          description={`Purchased on: ${purchase_date || "N/A"}`}
        />
      ),
      maintenance: (
        <Coord
          title={`Last maintenance: ${last_maintanace_date || "N/A"}`}
          description={`Next maintenance: ${next_maintanace_date || "N/A"}`}
        />
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
            to={`/createupdateequipment/${tool_id}`}
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
            Remove
          </Link>
        </MDTypography>
      ),
    };
  });
  return {
    columns: [
      { Header: "equipment", accessor: "equipment", width: "45%", align: "left" },
      { Header: "details", accessor: "details", align: "left" },
      { Header: "status", accessor: "status", align: "center" },
      { Header: "location", accessor: "location", align: "center" },
      { Header: "supplier", accessor: "supplier", align: "center" },
      { Header: "acquired", accessor: "acquired", align: "center" },
      { Header: "maintenance", accessor: "maintenance", align: "center" },
      { Header: "note", accessor: "note", align: "center" },
      { Header: "update", accessor: "update", align: "center" },
      { Header: "remove", accessor: "remove", align: "center" },
    ],
    rows: rows,
    numOfPages,
    count,
    refetch,
    totalEquipments,
    categoryCount,
    statusCount,
    storageLocationCount,
    isGettingAllequipments,
  };
}
