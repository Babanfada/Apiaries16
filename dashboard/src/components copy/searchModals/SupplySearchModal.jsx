import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { BiSort } from "react-icons/bi";
import SearchIcon from "@mui/icons-material/Search";
import styles from "../../layouts/styles/modal.module.scss";
import CloseIcon from "@mui/icons-material/Close";
import { CustomButton } from "../Button";
import { Loader1 } from "../Loader";
import { useDispatch } from "react-redux";
import { useSuppliesInputs } from "../../hooks/DashDetails";
import { resetValues } from "../../features/supplies/suppliesSlice";

const style = {
  position: "absolute",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default function SuppliesSearchModal({ isGettingSingleSupply }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div className={styles.wrapper}>
      <div>
        <SearchIcon
          fontSize="medium"
          onClick={handleOpen}
          sx={{ cursor: "pointer", fill: "white" }}
          title="search"
        />
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ ...style, background: "white" }} className={styles.box}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Search Supplies <CloseIcon style={{ cursor: "pointer" }} onClick={handleClose} />
          </Typography>
          <p>which supply are you looking for?</p>
          <SuppliesDetails
            handleClose={handleClose}
            isGettingSingleSupply={isGettingSingleSupply}
          />
        </Box>
      </Modal>
    </div>
  );
}

const SuppliesDetails = ({ handleClose, isGettingSingleSupply }) => {
  const { suppliesDetails } = useSuppliesInputs();
  const dispatch = useDispatch();
  const resetQuery = () => {
    dispatch(resetValues());
  };

  return (
    <form className={styles.paper}>
      {suppliesDetails.map((input) => {
        const { name, TextField } = input;
        return <div key={name}>{TextField}</div>;
      })}
      <CustomButton
        background={"inherit"}
        backgroundhover={"grey"}
        height={"8vh"}
        onClick={resetQuery}
        type="button"
        style={{
          width: "100%",
          fontWeight: "bold",
        }}
      >
        reset
      </CustomButton>
      <CustomButton
        background={"inherit"}
        // background={"#3457bf"}
        backgroundhover={"grey"}
        height={"8vh"}
        onClick={() => handleClose()}
        type="button"
        style={{
          width: "100%",
          fontWeight: "bold",
        }}
      >
        {isGettingSingleSupply === "pending" ? <Loader1 color="success" /> : "Find Out"}
      </CustomButton>
    </form>
  );
};
import PropTypes from "prop-types";

SuppliesSearchModal.propTypes = {
  isGettingSingleSupply: PropTypes.string,
};

SuppliesDetails.propTypes = {
  handleClose: PropTypes.func.isRequired,
  isGettingSingleSupply: PropTypes.string,
};
