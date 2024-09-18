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
// import { MdDelete } from "react-icons/md";
// import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";
// import { setUpdateEmployee } from "../../features/employees/employeesSlice";
import { useDispatch } from "react-redux";
// import {
//   useDeleteEmployee,
//   useSingleEmployee,
// } from "../../features/employees/employeesThunk";
import PaginationControlled from "./Pagination";
import { setUpdateNok } from "../../features/nok/nokSlice";
import { useDeleteNok } from "../../features/nok/nokThunk";

function Row(props) {
  const { nok } = props;
  const {
    nok_id,
    emp_id,
    fullname,
    email,
    address,
    phone,
    gender,
    relationship,
  } = nok;
  const [open, setOpen] = React.useState(false);
  const payload = {
    nok_id,
    emp_id,
    fullname,
    email,
    address,
    phone,
    gender,
    relationship,
  };
  const dispatch = useDispatch();
    const { deleteNok } = useDeleteNok();
  const handleEdit = () => {
    dispatch(setUpdateNok(payload));
  };
  const handleDelete = () => {
    const confirmation = window.confirm(
      "You are about to Delete an next of kin records permanently, ARE YOU SURE?"
    );
    if (!confirmation) return;
    deleteNok(nok_id);
  };
  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell component="th" scope="row">
          <Link
            onClick={() => handleEdit()}
            to={`/admin/createupdatenok/${nok_id}`}
          >
            {nok_id}
          </Link>
        </TableCell>
        <TableCell align="left">
          <Link onClick={() => handleEdit()} to={`/admin/employees/${nok_id}`}>
            {emp_id}
          </Link>
        </TableCell>
        <TableCell align="right">{fullname}</TableCell>
        <TableCell align="right">{email}</TableCell>
        <TableCell align="right">{address}</TableCell>
        <TableCell align="right">{phone}</TableCell>
        <TableCell align="right">{gender}</TableCell>
        <TableCell align="right">{relationship}</TableCell>
        <TableCell align="left">
          <Link
            onClick={() => handleEdit()}
            to={`/admin/createupdatenok/${nok_id}`}
          >
            <CiEdit />
          </Link>
          <DeleteForeverIcon onClick={() => handleDelete()} />
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function Nok_Table({
  handleChange,
  employeesNOK,
  numOfPages,
  pages,
}) {
  //   console.log(employees);
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell>NOK</TableCell>
            <TableCell>EMP</TableCell>
            <TableCell align="right">Full Name</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">ADDRESS</TableCell>
            <TableCell align="right">PHONE</TableCell>
            <TableCell align="right">GENDER</TableCell>
            <TableCell align="right">RELATIONSHIP</TableCell>
            <TableCell align="left">manage</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {employeesNOK.map((nok, i) => (
            <Row key={i} nok={nok} />
          ))}
        </TableBody>
      </Table>
      <PaginationControlled pageDetails={{ handleChange, numOfPages, pages }} />
    </TableContainer>
  );
}
