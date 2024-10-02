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
import { useDeleteStation } from "../../features/stations/stationsThunk";
import { CiEdit } from "react-icons/ci";
import { setUpdateStation } from "../../features/stations/stationSlice";

function Row(props) {
  const { station } = props;
  const {
    station_id,
    station_name,
    supervisor_int,
    supervisor_ext,
    location,
    status,
    longitude,
    latitude,
    station_size,
    number_of_hive_boxes,
    station_maintainace_history,
    last_inspection_date,
    next_inspection_date,
    notes,
  } = station;

  const [open, setOpen] = React.useState(false);
  const payload = {
    station_name,
    supervisor_int,
    supervisor_ext,
    location,
    status,
    longitude,
    latitude,
    station_size,
    number_of_hive_boxes,
    station_maintainace_history,
    last_inspection_date,
    next_inspection_date,
    notes,
  };
  const dispatch = useDispatch();
  const { deleteStation, isdeletingStation } = useDeleteStation();
  const handleEdit = () => {
    dispatch(setUpdateStation(payload));
  };
  const handleDelete = () => {
    const confirmation = window.confirm(
      "You are about to Delete an a station records permanently, ARE YOU SURE?"
    );
    if (!confirmation) return;
    deleteStation(station_id);
  };

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell component="th" scope="row">
          <Link to={`/admin/stations/${station_id}`}>{station_id}</Link>
        </TableCell>
        <TableCell align="left">{station_name}</TableCell>
        <TableCell align="right">{location}</TableCell>
        <TableCell align="right">
          {" "}
          <Link to={`/admin/employees/${supervisor_int}`}> {supervisor_int}</Link>
        </TableCell>
        <TableCell align="right">
          <Link to={`/admin/employees/${supervisor_ext}`}> {supervisor_ext}</Link>
        </TableCell>
        <TableCell align="right">{status}</TableCell>
        <TableCell align="left">
          <Link onClick={() => handleEdit()} to={`/admin/createupdatestation/${station_id}`}>
            <CiEdit />
            {/* edit */}
          </Link>
          {/* <button onClick={() => handleDelete()}>delete</button> */}
          <DeleteForeverIcon onClick={() => handleDelete()} />
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function StationsTable({ handleChange, stations, numOfPages, pages }) {
  //   console.log(stations);
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            {/* <TableCell /> */}
            <TableCell>SN (ID)</TableCell>
            <TableCell>station_name</TableCell>
            <TableCell align="right">location</TableCell>
            <TableCell align="right"> internal supervisor</TableCell>
            <TableCell align="right">external supervisor</TableCell>
            <TableCell align="right">status</TableCell>
            <TableCell align="left">manage</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {stations.map((station, i) => (
            <Row key={i} station={station} />
          ))}
        </TableBody>
      </Table>
      <PaginationControlled pageDetails={{ handleChange, numOfPages, pages }} />
    </TableContainer>
  );
}
import PropTypes from "prop-types";
Row.propTypes = {
  station: PropTypes.shape({
    station_id: PropTypes.number.isRequired,
    station_name: PropTypes.string.isRequired,
    supervisor_int: PropTypes.string.isRequired,
    supervisor_ext: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    longitude: PropTypes.number,
    latitude: PropTypes.number,
    station_size: PropTypes.number,
    number_of_hive_boxes: PropTypes.number,
    station_maintainace_history: PropTypes.string,
    last_inspection_date: PropTypes.string,
    next_inspection_date: PropTypes.string,
    notes: PropTypes.string,
  }).isRequired,
};

StationsTable.propTypes = {
  stations: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleChange: PropTypes.func.isRequired,
  numOfPages: PropTypes.number.isRequired,
  pages: PropTypes.number.isRequired,
};
