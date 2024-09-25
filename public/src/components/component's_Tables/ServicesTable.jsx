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
import { useDeleteReport } from "../../features/catch_reports/reportsThunk";
import { setUpdateReport } from "../../features/catch_reports/reportSlice";
import { useDeleteService } from "../../features/services/servicesThunk";
import { setUpdateService } from "../../features/services/serviceSlice";
// import { setUpdateHive } from "../../features/hives/hiveSlice";
// import { useDeleteHive } from "../../features/hives/hivesThunk";

function Row(props) {
  const { serv } = props;
  const {
    service_id,
    service_name,
    description,
    numOfTimesRendered,
    category,
  } = serv;
  const payload = {
    // service_id,
    service_name,
    description,
    numOfTimesRendered,
    category,
  };
  const dispatch = useDispatch();
  const { deleteService } = useDeleteService();
  const handleEdit = () => {
    dispatch(setUpdateService(payload));
  };
  const handleDelete = () => {
    const confirmation = window.confirm(
      "You are about to Delete a serv records permanently, ARE YOU SURE?"
    );
    if (!confirmation) return;
    deleteService(service_id);
  };
  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell component="th" scope="row">
          <Link
            onClick={() => handleEdit()}
            to={`/admin/createupdateservice/${service_id}`}
          >
            {service_id}
          </Link>
        </TableCell>
        <TableCell align="left">{service_name}</TableCell>
        <TableCell title={description} align="left">
          {description.length > 50
            ? `${description.slice(0, 50)}...`
            : description}
        </TableCell>
        <TableCell align="right">{numOfTimesRendered}</TableCell>
        <TableCell align="right">{category}</TableCell>
        <TableCell align="left">
          <Link
            onClick={() => handleEdit()}
            to={`/admin/createupdateservice/${service_id}`}
          >
            <CiEdit />
          </Link>
          <DeleteForeverIcon onClick={() => handleDelete()} />
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function ServicesTable({
  handleChange,
  service,
  numOfPages,
  pages,
}) {
  //   console.log(employees);
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell>SERVICE ID</TableCell>
            <TableCell align="right">SERVICE NAME</TableCell>
            <TableCell align="right">DESCRIPTION</TableCell>
            <TableCell align="right">RENDERED</TableCell>
            <TableCell>CATEGORY</TableCell>
            <TableCell align="left">MANAGE</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {service.map((serv, i) => (
            <Row key={i} serv={serv} />
          ))}
        </TableBody>
      </Table>
      <PaginationControlled pageDetails={{ handleChange, numOfPages, pages }} />
    </TableContainer>
  );
}
