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
// import { setUpdateHive } from "../../features/hives/hiveSlice";
// import { useDeleteHive } from "../../features/hives/hivesThunk";

function Row(props) {
  const { report } = props;
  const {
    report_id,
    hunter_id,
    assigned_supervisor,
    total_boxes_assigned,
    colonized_boxes,
    uncolonized_boxes,
    delivered_to_apiary,
    date_assigned,
    catch_date,
    catch_location,
    catch_status,
    season,
    notes,
  } = report;
  const payload = {
    report_id,
    hunter_id,
    assigned_supervisor,
    total_boxes_assigned,
    colonized_boxes,
    uncolonized_boxes,
    delivered_to_apiary,
    date_assigned,
    catch_date,
    catch_location,
    catch_status,
    season,
    notes,
  };
  const dispatch = useDispatch();
  const { deleteReport } = useDeleteReport();
  const handleEdit = () => {
    dispatch(setUpdateReport(payload));
  };
  const handleDelete = () => {
    const confirmation = window.confirm(
      "You are about to Delete a report records permanently, ARE YOU SURE?"
    );
    if (!confirmation) return;
    deleteReport(report_id);
  };
  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell component="th" scope="row">
          <Link to={`/admin/catchreports/${report_id}`}>{report_id}</Link>
        </TableCell>
        <TableCell align="left">
          <Link to={`/admin/swarmhunters/${hunter_id}`}>{hunter_id}</Link>
        </TableCell>
        <TableCell align="left">
          <Link to={`/admin/employees/${assigned_supervisor}`}>
            {assigned_supervisor}
          </Link>
        </TableCell>
        <TableCell align="right">{total_boxes_assigned}</TableCell>
        <TableCell align="right">{date_assigned}</TableCell>
        <TableCell align="left">
          <Link
            onClick={() => handleEdit()}
            to={`/admin/createupdatereport/${report_id}`}
          >
            <CiEdit />
          </Link>
          <DeleteForeverIcon onClick={() => handleDelete()} />
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function ReportTable({
  handleChange,
  reports,
  numOfPages,
  pages,
}) {
  //   console.log(employees);
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell>REPORT ID</TableCell>
            <TableCell align="right">HUNTER</TableCell>
            <TableCell align="right">SUPERVISOR</TableCell>
            <TableCell align="right">BOXES ASSIGNED</TableCell>
            <TableCell>DATE ASSIGNED</TableCell>
            <TableCell align="left">MANAGE</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {reports.map((report, i) => (
            <Row key={i} report={report} />
          ))}
        </TableBody>
      </Table>
      <PaginationControlled pageDetails={{ handleChange, numOfPages, pages }} />
    </TableContainer>
  );
}
