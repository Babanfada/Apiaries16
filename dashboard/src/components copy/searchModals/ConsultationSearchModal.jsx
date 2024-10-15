import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import SearchIcon from "@mui/icons-material/Search";
import styles from "../../layouts/styles/modal.module.scss";
import CloseIcon from "@mui/icons-material/Close";
import { CustomButton } from "../Button";
import { Loader1 } from "../Loader";
import { useDispatch } from "react-redux";
import { useConsultationInputs } from "../../hooks/ServicesDetails";
import { resetValues } from "../../features/consultation/consultationSlice";

const style = {
  position: "absolute",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default function ConsultationSearchModal({ isGettingAllC_Items }) {
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
            Seaerch Consultations <CloseIcon style={{ cursor: "pointer" }} onClick={handleClose} />
          </Typography>
          <p>which service are you looking for?</p>
          <SearchConsultation handleClose={handleClose} isGettingAllC_Items={isGettingAllC_Items} />
        </Box>
      </Modal>
    </div>
  );
}

const SearchConsultation = ({ handleClose, isGettingAllC_Items }) => {
  const { consultationInputs } = useConsultationInputs();
  const dispatch = useDispatch();
  const resetQuery = () => {
    dispatch(resetValues());
  };

  return (
    <form className={styles.paper}>
      {consultationInputs
        .filter(
          (detail) =>
            detail.name !== "description" && detail.name !== "service_id" && detail.name !== "price"
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
        {isGettingAllC_Items === "pending" ? <Loader1 color="success" /> : "Find Out"}
      </CustomButton>
    </form>
  );
};
import PropTypes from "prop-types";

ConsultationSearchModal.propTypes = {
  isGettingAllC_Items: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool, // Adjust based on the expected type
  ]).isRequired,
};

SearchConsultation.propTypes = {
  handleClose: PropTypes.func.isRequired,
  isGettingAllC_Items: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool, // Adjust based on the expected type
  ]).isRequired,
};
