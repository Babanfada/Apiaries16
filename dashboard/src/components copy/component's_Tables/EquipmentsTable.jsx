import * as React from "react";
// import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
// import FaceIcon from "@mui/icons-material/Face";
// import Face4Icon from "@mui/icons-material/Face4";
// import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
// import { SlUserFemale } from "react-icons/sl";
import { Link } from "react-router-dom";

import { useDispatch } from "react-redux";
import PaginationControlled from "./Pagination";
import { setUpdateEquipment } from "../../features/equuipments/equipmentSlice";
import { useDeleteEquipment } from "../../features/equuipments/equipmentThunk";

function Row(props) {
  const { single_equipment } = props;
  const dispatch = useDispatch();
  const { deleteEquipment } = useDeleteEquipment();
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
  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell component="th" scope="row">
          <Link to={`/admin/equipments/${tool_id}`}>{tool_id}</Link>
        </TableCell>
        <TableCell align="left">{tool_name}</TableCell>
        <TableCell align="right">{quantity}</TableCell>
        <TableCell align="right">{category}</TableCell>
        <TableCell align="right">{status}</TableCell>
        <TableCell align="left">{retired ? "YES" : "NO"}</TableCell>
        <TableCell align="left">
          <Link
            onClick={() => handleEdit()}
            to={`/admin/createupdateequipments/${tool_id}`}
          >
            <CiEdit />
          </Link>
          {/* <button onClick={() => handleDelete()}>delete</button> */}
          <DeleteForeverIcon onClick={() => handleDelete()} />
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function EquipmentTable({
  equipment,
  numOfPages,
  pages,
  handleChange,
}) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell>SN (ID)</TableCell>
            <TableCell>Tool Name</TableCell>
            <TableCell align="right">Quantity</TableCell>
            <TableCell align="right">Category</TableCell>
            <TableCell align="right">Condition</TableCell>
            <TableCell align="left">Retired?</TableCell>
            <TableCell align="left">Manage</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {equipment.map((single_equipment, i) => (
            <Row key={i} single_equipment={single_equipment} />
          ))}
        </TableBody>
      </Table>
      <PaginationControlled pageDetails={{ handleChange, numOfPages, pages }} />
    </TableContainer>
  );
}
import PropTypes from "prop-types"; // Import PropTypes
// Prop validation for EquipmentTable
EquipmentTable.propTypes = {
  equipment: PropTypes.arrayOf(
    PropTypes.shape({
      tool_id: PropTypes.string.isRequired,
      tool_name: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      quantity: PropTypes.number.isRequired,
      status: PropTypes.string.isRequired,
      storage_location: PropTypes.string,
      supplier: PropTypes.string,
      purchase_date: PropTypes.string,
      purchase_cost: PropTypes.number,
      currency: PropTypes.string,
      last_maintanace_date: PropTypes.string,
      next_maintanace_date: PropTypes.string,
      retired: PropTypes.bool.isRequired,
      note: PropTypes.string,
    })
  ).isRequired,
  numOfPages: PropTypes.number.isRequired,
  pages: PropTypes.arrayOf(PropTypes.number).isRequired,
  handleChange: PropTypes.func.isRequired,
};

Row.propTypes = {
  single_equipment: PropTypes.shape({
    tool_id: PropTypes.string.isRequired,
    tool_name: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
    status: PropTypes.string.isRequired,
    storage_location: PropTypes.string,
    supplier: PropTypes.string,
    purchase_date: PropTypes.string,
    purchase_cost: PropTypes.number,
    currency: PropTypes.string,
    last_maintanace_date: PropTypes.string,
    next_maintanace_date: PropTypes.string,
    retired: PropTypes.bool.isRequired,
    note: PropTypes.string,
  }).isRequired,
};