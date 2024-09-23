import * as React from "react";
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
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import PaginationControlled from "./Pagination";
import { setUpdateHunter } from "../../features/hunters/huntersSlice";
import { useDeleteHunter } from "../../features/hunters/huntersThunk";

function Row(props) {
  const { hunter } = props;
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
  const dispatch = useDispatch();
  const { deleteHunter } = useDeleteHunter();
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
  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell component="th" scope="row">
          <Link to={`/admin/swarmhunters/${hunter_id}`}>{hunter_id}</Link>
        </TableCell>
        <TableCell align="left">
          <Link to={`/admin/employees/${assigned_supervisor}`}>
            {assigned_supervisor}
          </Link>
        </TableCell>
        <TableCell align="right">{fullname}</TableCell>
        <TableCell align="right">{phone}</TableCell>
        <TableCell align="right">{employment_status}</TableCell>
        <TableCell align="left">
          <Link
            onClick={() => handleEdit()}
            to={`/admin/createupdatehunter/${hunter_id}`}
          >
            <CiEdit />
          </Link>
          <DeleteForeverIcon onClick={() => handleDelete()} />
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function Hunters_Table({
  handleChange,
  hunters,
  numOfPages,
  pages,
}) {
  //   console.log(employees);
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell>HUNTER ID</TableCell>
            <TableCell>SUPERVISOR</TableCell>
            <TableCell align="right">FULL NAME</TableCell>
            <TableCell align="right">PHONE</TableCell>
            <TableCell align="right">EMPLOYMENT STATUS</TableCell>
            <TableCell align="left">MANAGE</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {hunters.map((hunter, i) => (
            <Row key={i} hunter={hunter} />
          ))}
        </TableBody>
      </Table>
      <PaginationControlled pageDetails={{ handleChange, numOfPages, pages }} />
    </TableContainer>
  );
}
