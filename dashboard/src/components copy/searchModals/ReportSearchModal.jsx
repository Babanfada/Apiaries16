import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { BiSort } from "react-icons/bi";
import CloseIcon from "@mui/icons-material/Close";
import { CustomButton } from "../Button";
import { Loader1 } from "../Loader";
import { useDispatch } from "react-redux";
import { useCatchReports } from "../../hooks/DashDetails_2";
import { resetValues } from "../../features/catch_reports/reportSlice";
import SearchIcon from "@mui/icons-material/Search";
import styles from "../../layouts/styles/modal.module.scss";
const style = {
  position: "absolute",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default function ReportSearchModal({ isGettingAllReports }) {
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
            Search Harvest Reports <CloseIcon style={{ cursor: "pointer" }} onClick={handleClose} />
          </Typography>
          <p>wahat reports are you looking for?</p>
          <SearchReport handleClose={handleClose} isGettingAllReports={isGettingAllReports} />
        </Box>
      </Modal>
    </div>
  );
}

const SearchReport = ({ handleClose, isGettingAllReports }) => {
  const { reportInputs } = useCatchReports();
  const dispatch = useDispatch();
  const resetQuery = () => {
    dispatch(resetValues());
  };

  return (
    <form className={styles.paper}>
      {reportInputs
        .filter(
          (detail) =>
            detail.name !== "hunter_id" &&
            detail.name !== "notes" &&
            detail.name !== "assigned_supervisor" &&
            detail.name !== "delivered_to_apiary" &&
            detail.name !== "date_assigned" &&
            detail.name !== "catch_location"
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
        {isGettingAllReports === "pending" ? (
          <Loader1 color="success" />
        ) : (
          "Find Out"
        )}
      </CustomButton>
    </form>
  );
};
import PropTypes from "prop-types";

ReportSearchModal.propTypes = {
  isGettingAllReports: PropTypes.string.isRequired,
};

SearchReport.propTypes = {
  handleClose: PropTypes.func.isRequired,
  isGettingAllReports: PropTypes.string.isRequired,
};
