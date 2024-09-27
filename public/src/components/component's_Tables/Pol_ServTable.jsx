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
import { useDeletePolServices } from "../../features/pollination/polservicesThunk";
import { setUpdatePolServ } from "../../features/pollination/polservicesSlice";
function Row(props) {
  const { item } = props;
  const {
    pol_service_id,
    service_id,
    crop_type,
    service_description,
    rendered,
    price,
  } = item;
  const payload = {
    service_id,
    crop_type,
    service_description,
    rendered,
    price,
  };
  const dispatch = useDispatch();
  const { deletePolService } = useDeletePolServices();
  const handleEdit = () => {
    dispatch(setUpdatePolServ(payload));
  };
  const handleDelete = () => {
    const confirmation = window.confirm(
      "You are about to Delete a pollination service records permanently, ARE YOU SURE?"
    );
    if (!confirmation) return;
    deletePolService(pol_service_id);
  };
  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell component="th" scope="row">
          <Link
            onClick={() => handleEdit()}
            to={`/admin/pollinationservices/${pol_service_id}`}
          >
            {pol_service_id}
          </Link>
        </TableCell>
        <TableCell align="left">{service_id}</TableCell>
        <TableCell align="left">{crop_type}</TableCell>
        <TableCell title={service_description} align="left">
          {service_description.length > 50
            ? `${service_description.slice(0, 50)}...`
            : service_description}
        </TableCell>
        <TableCell align="right">{rendered}</TableCell>
        <TableCell align="right">{price}</TableCell>
        <TableCell align="left">
          <Link
            onClick={() => handleEdit()}
            to={`/admin/pollinationservices/${pol_service_id}`}
          >
            <CiEdit />
          </Link>
          <DeleteForeverIcon onClick={() => handleDelete()} />
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function Pol_ServTable({
  handleChange,
  polservices,
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
            <TableCell align="right">CROP TYPE</TableCell>
            <TableCell align="right">DESCRIPTION</TableCell>
            <TableCell align="right">RENDERED</TableCell>
            <TableCell>PRICE/HCT</TableCell>
            <TableCell align="left">MANAGE</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {polservices.map((item, i) => (
            <Row key={i} item={item} />
          ))}
        </TableBody>
      </Table>
      <PaginationControlled pageDetails={{ handleChange, numOfPages, pages }} />
    </TableContainer>
  );
}
