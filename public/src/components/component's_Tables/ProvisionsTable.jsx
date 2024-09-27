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
import { useDeleteProvision } from "../../features/supplyProvision/supplyprovThunk";
import { setUpdateProvision } from "../../features/supplyProvision/supplyProvSlice";


function Row(props) {
  const { item } = props;
  const {
    item_id,
    service_id,
    item_name,
    description,
    quantity,
    price_NGN,
  } = item;
  const payload = {
    service_id,
    item_name,
    description,
    quantity,
    price_NGN,
  };
  const dispatch = useDispatch();
  const { deleteProvision } = useDeleteProvision();
  const handleEdit = () => {
    dispatch(setUpdateProvision(payload));
  };
  const handleDelete = () => {
    const confirmation = window.confirm(
      "You are about to Delete a provision records permanently, ARE YOU SURE?"
    );
    if (!confirmation) return;
    deleteProvision(item_id);
  };
  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell component="th" scope="row">
          <Link
            onClick={() => handleEdit()}
            to={`/admin/provisions/${item_id}`}
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
        <TableCell align="right">{quantity}</TableCell>
        <TableCell align="right">{price_NGN}</TableCell>
        <TableCell align="left">
          <Link
            onClick={() => handleEdit()}
            to={`/admin/provisions/${item_id}`}
          >
            <CiEdit />
          </Link>
          <DeleteForeverIcon onClick={() => handleDelete()} />
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function ProvisionsTable({
  handleChange,
  provisions,
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
            <TableCell align="right">QUANTITY</TableCell>
            <TableCell>PRICE</TableCell>
            <TableCell align="left">MANAGE</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {provisions.map((item, i) => (
            <Row key={i} item={item} />
          ))}
        </TableBody>
      </Table>
      <PaginationControlled pageDetails={{ handleChange, numOfPages, pages }} />
    </TableContainer>
  );
}
