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
import { setUpdateHive } from "../../features/hives/hiveSlice";
import { useDeleteHive } from "../../features/hives/hivesThunk";

function Row(props) {
  const { hive } = props;
  const {
    hive_id,
    assigned_hunter,
    hive_type,
    num_of_frames,
    colonized,
    status,
    use_condition,
    first_installation,
    current_location,
    last_inspection_date,
    note,
  } = hive;
  const payload = {
    hive_id,
    assigned_hunter,
    hive_type,
    num_of_frames,
    colonized,
    status,
    use_condition,
    first_installation,
    current_location,
    last_inspection_date,
    note,
  };
  const dispatch = useDispatch();
  const { deleteHive } = useDeleteHive();
  const handleEdit = () => {
    dispatch(setUpdateHive(payload));
  };
  const handleDelete = () => {
    const confirmation = window.confirm(
      "You are about to Delete a hives records permanently, ARE YOU SURE?"
    );
    if (!confirmation) return;
    deleteHive(hive_id);
  };
  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell component="th" scope="row">
          <Link to={`/admin/hives/${hive_id}`}>{hive_id}</Link>
        </TableCell>
        <TableCell align="left">
          <Link to={`/admin/swarmhunters/${assigned_hunter}`}>
            {assigned_hunter}
          </Link>
        </TableCell>
        <TableCell align="right">{current_location}</TableCell>
        <TableCell align="right">{status}</TableCell>
        <TableCell align="right">{first_installation}</TableCell>
        <TableCell align="right">{colonized}</TableCell>
        <TableCell align="left">
          <Link
            onClick={() => handleEdit()}
            to={`/admin/createupdatehive/${hive_id}`}
          >
            <CiEdit />
          </Link>
          <DeleteForeverIcon onClick={() => handleDelete()} />
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function HivesTable({ handleChange, hives, numOfPages, pages }) {
  //   console.log(employees);
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell>HIVE ID</TableCell>
            <TableCell align="right">HUNTER</TableCell>
            <TableCell align="right">LOCATION</TableCell>
            <TableCell align="right">STATUS</TableCell>
            <TableCell align="right">WHEN INSTALLED</TableCell>
            <TableCell>COLONIZED?</TableCell>
            <TableCell align="left">MANAGE</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {hives.map((hive, i) => (
            <Row key={i} hive={hive} />
          ))}
        </TableBody>
      </Table>
      <PaginationControlled pageDetails={{ handleChange, numOfPages, pages }} />
    </TableContainer>
  );
}
import PropTypes from "prop-types"; // Im
Row.propTypes = {
  hive: PropTypes.shape({
    hive_id: PropTypes.string.isRequired,
    assigned_hunter: PropTypes.string.isRequired,
    hive_type: PropTypes.string.isRequired, // Added
    num_of_frames: PropTypes.number.isRequired, // Added
    colonized: PropTypes.bool.isRequired,
    status: PropTypes.string.isRequired,
    use_condition: PropTypes.string.isRequired, // Added
    first_installation: PropTypes.string.isRequired,
    current_location: PropTypes.string.isRequired,
    last_inspection_date: PropTypes.string, // Added
    note: PropTypes.string, // Added
  }).isRequired,
};
HivesTable.propTypes = {
  handleChange: PropTypes.func.isRequired,
  hives: PropTypes.arrayOf(
    PropTypes.shape({
      hive_id: PropTypes.string.isRequired,
      assigned_hunter: PropTypes.string.isRequired,
      hive_type: PropTypes.string.isRequired, // Added
      num_of_frames: PropTypes.number.isRequired, // Added
      colonized: PropTypes.bool.isRequired,
      status: PropTypes.string.isRequired,
      use_condition: PropTypes.string.isRequired, // Added
      first_installation: PropTypes.string.isRequired,
      current_location: PropTypes.string.isRequired,
      last_inspection_date: PropTypes.string, // Added
      note: PropTypes.string, // Added
    })
  ).isRequired,
  numOfPages: PropTypes.number.isRequired,
  pages: PropTypes.number.isRequired,
};