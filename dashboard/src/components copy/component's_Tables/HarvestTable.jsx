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
import { setUpdateHarvest } from "../../features/harvest/honey_harvestSlice";
import { useDeleteHarvest } from "../../features/harvest/honey_harvestThunk";
// import { deleteHarvest } from "../../../../controllers/honeyHarvest";
// import { setUpdateNok } from "../../features/nok/nokSlice";
// import { useDeleteNok } from "../../features/nok/nokThunk";

function Row(props) {
  const { harv } = props;
  const {
    harvest_id,
    harvest_year,
    station_id,
    station_name,
    harvest_date,
    quantity_collected,
    colouration,
    unit,
    quality_rating,
    note,
  } = harv;
  // const [open, setOpen] = React.useState(false);
  const payload = {
    harvest_id,
    harvest_year,
    station_id,
    station_name,
    harvest_date,
    quantity_collected,
    colouration,
    unit,
    quality_rating,
    note,
  };
  const dispatch = useDispatch();
  const { deleteHarvest } = useDeleteHarvest();
  const handleEdit = () => {
    dispatch(setUpdateHarvest(payload));
  };
  const handleDelete = () => {
    const confirmation = window.confirm(
      "You are about to Delete an harvest records permanently, ARE YOU SURE?"
    );
    if (!confirmation) return;
    deleteHarvest(harvest_id);
  };
  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell component="th" scope="row">
          <Link
            onClick={() => handleEdit()}
            to={`/admin/harvests/${harvest_id}`}
          >
            {harvest_id}
          </Link>
        </TableCell>
        <TableCell align="left">
          <Link
            onClick={() => handleEdit()}
            to={`/admin/stations/${station_id}`}
          >
            {station_id}
          </Link>
        </TableCell>
        <TableCell align="right">{station_name}</TableCell>
        <TableCell align="right">{harvest_date}</TableCell>
        <TableCell align="right">{quantity_collected}</TableCell>
        <TableCell align="right">{unit}</TableCell>
        <TableCell align="right">{colouration}</TableCell>
        <TableCell align="right">{quality_rating}</TableCell>
        <TableCell title={note} align="right">
          {note.length > 25 ? `${note.slice(0, 25)}...` : note}
        </TableCell>
        <TableCell align="left">
          <Link
            onClick={() => handleEdit()}
            to={`/admin/harvests/${harvest_id}`}
          >
            <CiEdit />
          </Link>
          <DeleteForeverIcon onClick={() => handleDelete()} />
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function Harvest_Table({
  handleChange,
  harvest,
  numOfPages,
  pages,
}) {
  //   console.log(employees);
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell>HARVEST ID</TableCell>
            <TableCell>STATION ID</TableCell>
            <TableCell align="right">STATION NAME</TableCell>
            <TableCell align="right">DATE OF HARVEST</TableCell>
            <TableCell align="right">QUANTITY</TableCell>
            <TableCell align="right">UNIT</TableCell>
            <TableCell align="right">COLOURATION</TableCell>
            <TableCell align="right">RATING</TableCell>
            <TableCell align="right">NOTE</TableCell>
            <TableCell align="left">MANAGE</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {harvest.map((harv, i) => (
            <Row key={i} harv={harv} />
          ))}
        </TableBody>
      </Table>
      <PaginationControlled pageDetails={{ handleChange, numOfPages, pages }} />
    </TableContainer>
  );
}
import PropTypes from "prop-types"; // Import PropTypes
Row.propTypes = {
  harv: PropTypes.shape({
    harvest_id: PropTypes.string.isRequired,
    harvest_year: PropTypes.number.isRequired,
    station_id: PropTypes.string.isRequired,
    station_name: PropTypes.string.isRequired,
    harvest_date: PropTypes.string.isRequired,
    quantity_collected: PropTypes.number.isRequired,
    colouration: PropTypes.string.isRequired,
    unit: PropTypes.string.isRequired,
    quality_rating: PropTypes.number.isRequired,
    note: PropTypes.string,
  }).isRequired,
};
Harvest_Table.propTypes = {
  handleChange: PropTypes.func.isRequired,
  harvest: PropTypes.arrayOf(
    PropTypes.shape({
      harvest_id: PropTypes.string.isRequired,
      harvest_year: PropTypes.number.isRequired,
      station_id: PropTypes.string.isRequired,
      station_name: PropTypes.string.isRequired,
      harvest_date: PropTypes.string.isRequired,
      quantity_collected: PropTypes.number.isRequired,
      colouration: PropTypes.string.isRequired,
      unit: PropTypes.string.isRequired,
      quality_rating: PropTypes.number.isRequired,
      note: PropTypes.string,
    })
  ).isRequired,
  numOfPages: PropTypes.number.isRequired,
  pages: PropTypes.arrayOf(PropTypes.number).isRequired,
};