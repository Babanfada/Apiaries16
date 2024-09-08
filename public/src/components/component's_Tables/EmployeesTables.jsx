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
// import { CiEdit } from "react-icons/ci";
// import { MdDelete } from "react-icons/md";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Link } from "react-router-dom";
import { setUpdateEmployee } from "../../features/employees/employeesSlice";
import { useDispatch } from "react-redux";
import {
  useDeleteEmployee,
  // useSingleEmployee,
} from "../../features/employees/employeesThunk";

function Row(props) {
  const { employee } = props;
  const {
    emp_id,
    first_name,
    last_name,
    gender,
    email,
    dob,
    phone,
    image,
    role,
    address,
    department,
    employment_type,
    employment_status,
    salary,
    joining_date,
    skill,
    notes,
    createdAt,
    updatedAt,
  } = employee;
  const [open, setOpen] = React.useState(false);
  const payload = {
    emp_id,
    first_name,
    last_name,
    gender,
    email,
    dob,
    phone,
    role,
    address,
    department,
    employment_type,
    employment_status,
    salary,
    joining_date,
    skill,
    notes,
  };
  const dispatch = useDispatch();
  const { deleteEmployee } = useDeleteEmployee();
  const handleEdit = () => {
    dispatch(setUpdateEmployee(payload));
  };
  const handleDelete = () => {
    const confirmation = window.confirm(
      "You are about to Delete an employeee records permanently, ARE YOU SURE?"
    );
    if (!confirmation) return;
    deleteEmployee(emp_id);
  };
  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        {/* <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell> */}
        <TableCell component="th" scope="row">
          <Link to={`/admin/employees/${emp_id}`}>{emp_id}</Link>
        </TableCell>
        <TableCell align="left">
          <Link
            onClick={() => handleEdit()}
            to={`/admin/createupdateemployee/${emp_id}`}
          >
            {image ? (
              <img
                style={{ height: "40px", width: "40px", borderRadius: "50%" }}
                src={image}
                alt="emp_image"
                title="update avatar"
              />
            ) : gender === "female" ? (
              // <SlUserFemale />
              "female avatar"
            ) : (
              // <FaceIcon />
              "male avatar"
            )}
          </Link>
        </TableCell>
        <TableCell align="right">{first_name}</TableCell>
        <TableCell align="right">{last_name}</TableCell>
        <TableCell align="right">{gender}</TableCell>
        <TableCell align="right">{email}</TableCell>
        <TableCell align="right">{dob}</TableCell>
        <TableCell align="right">{phone}</TableCell>
        <TableCell align="right">{role}</TableCell>
        <TableCell align="left">
          <Link
            onClick={() => handleEdit()}
            to={`/admin/createupdateemployee/${emp_id}`}
          >
            {/* <CiEdit /> */}
            edit
          </Link>
          <button onClick={() => handleDelete()}>delete</button>
        </TableCell>
      </TableRow>
      {/* <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Details
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Address</TableCell>
                    <TableCell>Department</TableCell>
                    <TableCell align="left">Employment Type</TableCell>
                    <TableCell align="left">Employment status</TableCell>
                    <TableCell align="left">salary(#)</TableCell>
                    <TableCell align="left">date joined</TableCell>
                    <TableCell align="left">skills</TableCell>
                    <TableCell align="left">notes</TableCell>
                    <TableCell align="left">created on</TableCell>
                    <TableCell align="left">updated on</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableCell align="right">{address}</TableCell>
                  <TableCell align="right">{department}</TableCell>
                  <TableCell align="right">{employment_type}</TableCell>
                  <TableCell align="right">{employment_status}</TableCell>
                  <TableCell align="right">{salary}</TableCell>
                  <TableCell align="right">{joining_date}</TableCell>
                  <TableCell align="right">{skill}</TableCell>
                  <TableCell align="right">{notes}</TableCell>
                  <TableCell align="right">{createdAt}</TableCell>
                  <TableCell align="right">{updatedAt}</TableCell>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow> */}
    </React.Fragment>
  );
}

export default function CollapsibleTable({ employees }) {
  //   console.log(employees);
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            {/* <TableCell /> */}
            <TableCell>SN (ID)</TableCell>
            <TableCell>Avatar</TableCell>
            <TableCell align="right">First name</TableCell>
            <TableCell align="right">Last name</TableCell>
            <TableCell align="right">Gender</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">DOB</TableCell>
            <TableCell align="right">Phone</TableCell>
            <TableCell align="right">role</TableCell>
            <TableCell align="left">manage</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {employees.map((employee, i) => (
            <Row key={i} employee={employee} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
