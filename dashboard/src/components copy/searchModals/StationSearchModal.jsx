import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import { CustomButton } from "../Button";
// import { useEmployee } from "../../hooks/register";
import { Loader1 } from "../Loader";
import { useDispatch } from "react-redux";
import { resetValues } from "../../features/stations/stationSlice";
import { useDashDetails_1 } from "../../hooks/DashDetails";
import SearchIcon from "@mui/icons-material/Search";
import styles from "../../layouts/styles/modal.module.scss";
const style = {
  position: "absolute",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default function StationSearchModal({ isGettingStations }) {
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
            Search Stations <CloseIcon style={{ cursor: "pointer" }} onClick={handleClose} />
          </Typography>
          <p>which station you looking for?</p>
          <SearchStations handleClose={handleClose} isGettingStations={isGettingStations} />
        </Box>
      </Modal>
    </div>
  );
}

const SearchStations = ({ handleClose, isGettingStations }) => {
  const { searchStations } = useDashDetails_1();
  const dispatch = useDispatch();
  const resetQuery = () => {
    dispatch(resetValues());
    // refetch();
  };

  return (
    <form className={styles.paper}>
      {searchStations.map((input) => {
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
          // color: "white",
          fontWeight: "bold",
        }}
      >
        {isGettingStations === "pending" ? <Loader1 color="success" /> : "Find Out"}
      </CustomButton>
    </form>
  );
};
import PropTypes from "prop-types";

StationSearchModal.propTypes = {
  isGettingStations: PropTypes.string.isRequired,
};

SearchStations.propTypes = {
  handleClose: PropTypes.func.isRequired,
  isGettingStations: PropTypes.string.isRequired,
};
