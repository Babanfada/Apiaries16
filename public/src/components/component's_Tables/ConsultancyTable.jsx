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
import { useDeleteConsultation } from "../../features/consultation/consultationThunk";
import { setUpdateConsultation } from "../../features/consultation/consultationSlice";

function Row(props) {
  const { item } = props;
  const {
    item_id,
    service_id,
    item_name,
    description,
    numOfTimesRendered,
    price,
  } = item;
  const payload = {
    service_id,
    item_name,
    description,
    numOfTimesRendered,
    price,
  };
  const dispatch = useDispatch();
  const { deleteConsultation } = useDeleteConsultation();
  const handleEdit = () => {
    dispatch(setUpdateConsultation(payload));
  };
  const handleDelete = () => {
    const confirmation = window.confirm(
      "You are about to Delete a apiary item  records permanently, ARE YOU SURE?"
    );
    if (!confirmation) return;
    deleteConsultation(item_id);
  };
  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell component="th" scope="row">
          <Link
            onClick={() => handleEdit()}
            to={`/admin/createupdateconsultation/${item_id}`}
          >
            {item_id}
          </Link>
        </TableCell>
        <TableCell align="left">{service_id}</TableCell>
        <TableCell align="left">{item_name}</TableCell>
        <TableCell title={description} align="left">
          {description.length > 50
            ? `${description.slice(0, 50)}...`
            : description}
        </TableCell>
        <TableCell align="right">{numOfTimesRendered}</TableCell>
        <TableCell align="right">{price}</TableCell>
        <TableCell align="left">
          <Link
            onClick={() => handleEdit()}
            to={`/admin/createupdatesetup/${item_id}`}
          >
            <CiEdit />
          </Link>
          <DeleteForeverIcon onClick={() => handleDelete()} />
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function ConsultancyTable({
  handleChange,
  consultancy_items,
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
            <TableCell align="right">ITEM NAME</TableCell>
            <TableCell align="right">DESCRIPTION</TableCell>
            <TableCell align="right">RENDERED</TableCell>
            <TableCell>PRICE</TableCell>
            <TableCell align="left">MANAGE</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {consultancy_items.map((item, i) => (
            <Row key={i} item={item} />
          ))}
        </TableBody>
      </Table>
      <PaginationControlled pageDetails={{ handleChange, numOfPages, pages }} />
    </TableContainer>
  );
}
