import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import { CustomButton } from "../Button";
// import { useEmployee } from "../../hooks/register";
import { Loader1 } from "../Loader";
import { useDispatch } from "react-redux";
import { useEquipments } from "../../hooks/DashDetails";
import { resetValues } from "../../features/equuipments/equipmentSlice";
import SearchIcon from "@mui/icons-material/Search";
import styles from "../../layouts/styles/modal.module.scss";
const style = {
  position: "absolute",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default function EquipmentSearchModal({ isGettingAllequipments }) {
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
            Search Equipments <CloseIcon style={{ cursor: "pointer" }} onClick={handleClose} />
          </Typography>
          <p>which equipment are you looking for?</p>
          <SearchEquipments
            handleClose={handleClose}
            isGettingAllequipments={isGettingAllequipments}
          />
        </Box>
      </Modal>
    </div>
  );
}

const SearchEquipments = ({ handleClose, isGettingAllequipments }) => {
  const { searchEquipments } = useEquipments();
  const dispatch = useDispatch();
  const resetQuery = () => {
    dispatch(resetValues());
  };

  return (
    <form className={styles.paper}>
      {searchEquipments.map((input) => {
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
        {isGettingAllequipments === "pending" ? <Loader1 color="success" /> : "Find Out"}
      </CustomButton>
    </form>
  );
};
import PropTypes from "prop-types";

EquipmentSearchModal.propTypes = {
  isGettingAllequipments: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool, // Adjust based on the expected type
  ]).isRequired,
};

SearchEquipments.propTypes = {
  handleClose: PropTypes.func.isRequired,
  isGettingAllequipments: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool, // Adjust based on the expected type
  ]).isRequired,
};
