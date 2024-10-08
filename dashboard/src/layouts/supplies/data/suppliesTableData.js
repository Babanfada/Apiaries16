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
import { useSupplies } from "features/supplies/suppliesThunk";
import { useDeleteSupply } from "features/supplies/suppliesThunk";
import { setUpdateSupplies } from "features/supplies/suppliesSlice";

export default function suppliesTableData() {
  const dispatch = useDispatch();
  const { deleteSupply, isCreatingSupply } = useDeleteSupply();
  const {
    isGettingAllSupplies,
    supplies: {
      totalSUpplies,
      count,
      numOfPages,
      categoryCount = [],
      statusCount = [],
      storageLocationCount = [],
      supply = [],
    } = {},
    refetch,
  } = useSupplies();
  const Author = ({ image, name, min_stock, supply_id }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={name} size="sm" />
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          <Link to={`#`}>{`${supply_id} ${name}`}</Link>
        </MDTypography>
        <MDTypography variant="caption">min stock: {min_stock}</MDTypography>
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
  const rows = supply.map((suppli, i) => {
    const {
      supply_id,
      supply_name,
      category,
      quantity,
      status,
      storage_location,
      supplier,
      minimum_stock_level,
      purchase_date,
      purchase_cost,
    } = suppli;
    const payload = {
      supply_id,
      supply_name,
      category,
      quantity,
      status,
      storage_location,
      supplier,
      minimum_stock_level,
      purchase_date,
      purchase_cost,
    };
    const handleEdit = () => {
      dispatch(setUpdateSupplies(payload));
    };
    const handleDelete = () => {
      const confirmation = window.confirm(
        "You are about to Delete an a supply records permanently, ARE YOU SURE?"
      );
      if (!confirmation) return;
      deleteSupply(supply_id);
    };
    return {
      supplies: (
        <Author
          image={LogoAsana}
          name={supply_name}
          min_stock={minimum_stock_level}
          supply_id={supply_id}
        />
      ),
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
          title={`Cost: ${purchase_cost ? Number(purchase_cost).toFixed(2) : "N/A"}`}
          description={`Purchased on: ${purchase_date || "N/A"} naira`}
        />
      ),
      update: (
        <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
          <Link
            onClick={() => {
              handleEdit();
            }}
            to={`/createupdatesupply/${supply_id}`}
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
      { Header: "supplies", accessor: "supplies", width: "45%", align: "left" },
      { Header: "detail", accessor: "detail", align: "left" },
      { Header: "status", accessor: "status", align: "center" },
      { Header: "location", accessor: "location", align: "center" },
      { Header: "supplier", accessor: "supplier", align: "center" },
      { Header: "acquired", accessor: "acquired", align: "center" },
      { Header: "update", accessor: "update", align: "center" },
      { Header: "remove", accessor: "remove", align: "center" },
    ],
    rows: rows,
    numOfPages,
    count,
    refetch,
    isGettingAllSupplies,
    totalSUpplies,
    categoryCount,
    statusCount,
    storageLocationCount,
  };
}
