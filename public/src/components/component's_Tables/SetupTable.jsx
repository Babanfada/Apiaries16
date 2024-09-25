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
import { useDeleteSetup } from "../../features/apiarySetup/setupCompThunk";
import { setUpdateSetup } from "../../features/apiarySetup/setupCompSlice";

function Row(props) {
  const { setup } = props;
  const {
    component_id,
    service_id,
    component_name,
    description,
    stock,
    price,
  } = setup;
  const payload = {
    service_id,
    component_name,
    description,
    stock,
    price,
  };
  const dispatch = useDispatch();
  const { deleteSetup } = useDeleteSetup();
  const handleEdit = () => {
    dispatch(setUpdateSetup(payload));
  };
  const handleDelete = () => {
    const confirmation = window.confirm(
      "You are about to Delete a apiary setup  records permanently, ARE YOU SURE?"
    );
    if (!confirmation) return;
    deleteSetup(component_id);
  };
  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell component="th" scope="row">
          <Link
            onClick={() => handleEdit()}
            to={`/admin/createupdatesetup/${component_id}`}
          >
            {component_id}
          </Link>
        </TableCell>
        <TableCell align="left">{service_id}</TableCell>
        <TableCell align="left">{component_name}</TableCell>
        <TableCell title={description} align="left">
          {description.length > 50
            ? `${description.slice(0, 50)}...`
            : description}
        </TableCell>
        <TableCell align="right">{stock}</TableCell>
        <TableCell align="right">{price}</TableCell>
        <TableCell align="left">
          <Link
            onClick={() => handleEdit()}
            to={`/admin/createupdatesetup/${component_id}`}
          >
            <CiEdit />
          </Link>
          <DeleteForeverIcon onClick={() => handleDelete()} />
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function SetupTable({
  handleChange,
  apiarySetupComp,
  numOfPages,
  pages,
}) {
  //   console.log(employees);
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell>SN</TableCell>
            <TableCell>SERVICE ID</TableCell>
            <TableCell align="right">SETUP NAME</TableCell>
            <TableCell align="right">DESCRIPTION</TableCell>
            <TableCell align="right">STOCK</TableCell>
            <TableCell>PRICE</TableCell>
            <TableCell align="left">MANAGE</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {apiarySetupComp.map((setup, i) => (
            <Row key={i} setup={setup} />
          ))}
        </TableBody>
      </Table>
      <PaginationControlled pageDetails={{ handleChange, numOfPages, pages }} />
    </TableContainer>
  );
}
