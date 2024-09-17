import * as React from "react";
// import PropTypes from "prop-types";
// import Box from "@mui/material/Box";
// import Collapse from "@mui/material/Collapse";
// import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
// import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
// import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
// import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
// import { CiEdit } from "react-icons/ci";
// import { MdDelete } from "react-icons/md";
// import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Link } from "react-router-dom";
// import { setUpdateEmployee } from "../../features/employees/employeesSlice";
import { useDispatch } from "react-redux";
// import {
//   useDeleteEmployee,
//   useSingleEmployee,
// } from "../../features/employees/employeesThunk";
import PaginationControlled from "./Pagination";
// import { useDeleteStation } from "../../features/supply/stationsThunk";
import { CiEdit } from "react-icons/ci";
import { useDeleteSupply } from "../../features/supplies/suppliesThunk";
import { setUpdateSupplies } from "../../features/supplies/suppliesSlice";
// import { setUpdateStation } from "../../features/stations/stationSlice";

function Row(props) {
  const { suppli } = props;
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
    isEdit,
  } = suppli;

  const [open, setOpen] = React.useState(false);
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
  const dispatch = useDispatch();
 const { deleteSupply, isCreatingSupply } = useDeleteSupply();
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

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell component="th" scope="row">
          <Link to={`/admin/supplies/${supply_id}`}>{supply_id}</Link>
        </TableCell>
        <TableCell align="left">{supply_name}</TableCell>
        <TableCell align="right">{category}</TableCell>
        <TableCell align="right">{quantity}</TableCell>
        <TableCell align="right">{storage_location}</TableCell>
        <TableCell align="right">{status}</TableCell>
        <TableCell align="left">
          <Link
            onClick={() => handleEdit()}
            to={`/admin/createupdatesupplies/${supply_id}`}
          >
            <CiEdit />
            {/* edit */}
          </Link>

          <DeleteForeverIcon onClick={() => handleDelete()} />
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function SuppliesTable({
  handleChange,
  supply,
  numOfPages,
  pages,
}) {
  //   console.log(supply);
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            {/* <TableCell /> */}
            <TableCell>SN (ID)</TableCell>
            <TableCell>Supply Name</TableCell>
            <TableCell align="right">Category</TableCell>
            <TableCell align="right"> Quantity</TableCell>
            <TableCell align="right">Location</TableCell>
            <TableCell align="right">status</TableCell>
            <TableCell align="left">manage</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {supply.map((suppli, i) => (
            <Row key={i} suppli={suppli} />
          ))}
        </TableBody>
      </Table>
      <PaginationControlled pageDetails={{ handleChange, numOfPages, pages }} />
    </TableContainer>
  );
}
