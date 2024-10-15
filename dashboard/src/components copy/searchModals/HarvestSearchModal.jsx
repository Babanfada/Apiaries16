import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { BiSort } from "react-icons/bi";
// import styles from "../../styles/components/deliveryaddressmodal.module.scss";
// import styles from "../../"
import CloseIcon from "@mui/icons-material/Close";
import { CustomButton } from "../Button";
// import { useEmployee } from "../../hooks/register";
import { Loader1 } from "../Loader";
import { useDispatch } from "react-redux";
// import { resetValues } from "../../features/nok/nokSlice";
import { useHarvest, useNok } from "../../hooks/DashDetails_2";
import { resetValues } from "../../features/harvest/honey_harvestSlice";
import SearchIcon from "@mui/icons-material/Search";
import styles from "../../layouts/styles/modal.module.scss";
const style = {
  position: "absolute",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default function HarvestSearchModal({ isGettingAllHarvest }) {
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
            Search Harvests <CloseIcon style={{ cursor: "pointer" }} onClick={handleClose} />
          </Typography>
          <p>which harvest are you looking for?</p>
          <SearchHarvest handleClose={handleClose} isGettingAllHarvest={isGettingAllHarvest} />
        </Box>
      </Modal>
    </div>
  );
}

const SearchHarvest = ({ handleClose, isGettingAllHarvest }) => {
  const { harvestInputs } = useHarvest();
  const dispatch = useDispatch();
  const resetQuery = () => {
    dispatch(resetValues());
  };

  return (
    <form className={styles.paper}>
      {harvestInputs
        .filter((detail) => detail.name !== "note" && detail.name !== "unit")
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
        backgroundhover={"grey"}
        height={"8vh"}
        onClick={() => handleClose()}
        type="button"
        style={{
          width: "100%",
          fontWeight: "bold",
        }}
      >
        {isGettingAllHarvest === "pending" ? <Loader1 color="success" /> : "Find Out"}
      </CustomButton>
    </form>
  );
};
import PropTypes from "prop-types";

// Add PropTypes for HarvestSearchModal
HarvestSearchModal.propTypes = {
  isGettingAllHarvest: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).isRequired,
};
// Add PropTypes for SearchHarvest
SearchHarvest.propTypes = {
  handleClose: PropTypes.func.isRequired,
  isGettingAllHarvest: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool, // Adjust based on the expected type
  ]).isRequired,
};
