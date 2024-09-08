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
// import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
// import { SlUserFemale } from "react-icons/sl";
import { Link } from "react-router-dom";
// import { setUpdateEmployee } from "../../features/employees/employeesSlice";
import { useDispatch } from "react-redux";
import PaginationControlled from "./Pagination";
// import {
//   useDeleteEmployee,
//   // useSingleEmployee,
// } from "../../features/employees/employeesThunk";

function Row(props) {
  const { user } = props;
  const { user_id, fullname, email, phone, gender, image, role } = user;
  //   const [open, setOpen] = React.useState(false);
  const payload = {
    user_id,
    fullname,
    email,
    phone,
    gender,
    image,
  };

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell component="th" scope="row">
          <Link to={`/admin/users/${user_id}`}>{user_id}</Link>
        </TableCell>
        <TableCell align="left">
          {image ? (
            <img
              style={{ height: "40px", width: "40px", borderRadius: "50%" }}
              src={image}
              alt="emp_image"
              title="update avatar"
            />
          ) : gender === "female" ? (
            // <SlUserFemale />
            "female"
          ) : (
            // <FaceIcon />
            "male"
          )}
        </TableCell>

        <TableCell align="right">{fullname}</TableCell>
        <TableCell align="right">{gender}</TableCell>
        <TableCell align="right">{phone}</TableCell>
        <TableCell align="left">{role}</TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function UsersTable({ users }) {
  //   console.log(users);
  const { Users, handleChange, numOfPages, pages } = users;
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell>SN (ID)</TableCell>
            <TableCell>Avatar</TableCell>
            <TableCell align="right">Full Name</TableCell>
            <TableCell align="right">Gender</TableCell>
            <TableCell align="right">Phone</TableCell>
            <TableCell align="left">Role</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Users.map((user, i) => (
            <Row key={i} user={user} />
          ))}
        </TableBody>
      </Table>
      <PaginationControlled pageDetails={{ handleChange, numOfPages, pages }} />
    </TableContainer>
  );
}
