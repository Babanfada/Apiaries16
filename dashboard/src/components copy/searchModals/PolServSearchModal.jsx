import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { BiSort } from "react-icons/bi";
import CloseIcon from "@mui/icons-material/Close";
import { CustomButton } from "../Button";
import { Loader1 } from "../Loader";
import { useDispatch } from "react-redux";
import { resetValues } from "../../features/pollination/polservicesSlice";
import { usePolServiceInputs } from "../../hooks/ServicesDetails";
import SearchIcon from "@mui/icons-material/Search";
import styles from "../../layouts/styles/modal.module.scss";
const style = {
  position: "absolute",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default function PolServSearchModal({ isGettingAllPolServices }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  //   const { theme } = useThemeContext();
  //   const isDarkMode = theme === "dark-theme";
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
            Search Pollination services <CloseIcon style={{ cursor: "pointer" }} onClick={handleClose} />
          </Typography>
          <p>which of your products are you looking for?</p>
          <SearchPolServ
            handleClose={handleClose}
            isGettingAllPolServices={isGettingAllPolServices}
          />
        </Box>
      </Modal>
    </div>
  );
}

const SearchPolServ = ({ handleClose, isGettingAllPolServices }) => {
  const { polServiceInputs } = usePolServiceInputs();
  const dispatch = useDispatch();
  const resetQuery = () => {
    dispatch(resetValues());
  };

  return (
    <form className={styles.paper}>
      {polServiceInputs
        .filter(
          (detail) =>
            detail.name !== "service_description" &&
            detail.name !== "service_id" &&
            detail.name !== "price"
        )
        .map((input) => {
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
          // color: "white",
          fontWeight: "bold",
        }}
      >
        {isGettingAllPolServices === "pending" ? <Loader1 color="success" /> : "Find Out"}
      </CustomButton>
    </form>
  );
};
import PropTypes from "prop-types";

PolServSearchModal.propTypes = {
  isGettingAllPolServices: PropTypes.string.isRequired,
};

SearchPolServ.propTypes = {
  handleClose: PropTypes.func.isRequired,
  isGettingAllPolServices: PropTypes.string.isRequired,
};
