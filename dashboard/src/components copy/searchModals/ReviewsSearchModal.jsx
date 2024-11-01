import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

import SearchIcon from "@mui/icons-material/Search";

import CloseIcon from "@mui/icons-material/Close";
import { CustomButton } from "../Button";

import { Loader1 } from "../Loader";
import { useDispatch } from "react-redux";

import styles from "../../layouts/styles/modal.module.scss";

const style = {
  position: "absolute",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default function ReviewSearchModal({ isGettingAllReviews }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  //   const { theme } = useThemeContext();
  //   const isDarkMode = theme === "dark-theme";
  return (
    <div>
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
            Search Reviews <CloseIcon style={{ cursor: "pointer" }} onClick={handleClose} />
          </Typography>
          <p>which review are you looking for?</p>
          <SearchReview handleClose={handleClose} isGettingAllReviews={isGettingAllReviews} />
        </Box>
      </Modal>
    </div>
  );
}

const SearchReview = ({ handleClose, isGettingAllReviews }) => {
  const { reviewInputs } = useReviewInputs();
  const dispatch = useDispatch();
  const resetQuery = () => {
    dispatch(resetValues());
  };

  return (
    <form className={styles.paper}>
      {reviewInputs
        .filter(
          (input) => input.name === "title" || input.name === "rating" || input.name === "sort"
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
        {isGettingAllReviews === "pending" ? <Loader1 color="success" /> : "Find Out"}
      </CustomButton>
    </form>
  );
};
import PropTypes from "prop-types";
import { resetValues } from "features/reviews/reviewSlice";
import { useReviewInputs } from "hooks/ServicesDetails";

// Add prop validation for ReviewSearchModal
ReviewSearchModal.propTypes = {
  isGettingAllReviews: PropTypes.string.isRequired,
};

// Add prop validation for SearchUsers
SearchReview.propTypes = {
  handleClose: PropTypes.func.isRequired,
  isGettingAllReviews: PropTypes.string.isRequired,
};
