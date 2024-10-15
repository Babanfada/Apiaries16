import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
// import { BiSort } from "react-icons/bi";
import SearchIcon from "@mui/icons-material/Search";
// import styles from "../../styles/components/deliveryaddressmodal.module.scss";
// import styles from "../../"
import CloseIcon from "@mui/icons-material/Close";
import { CustomButton } from "../Button";
// import useRegister from "../../hooks/register";
import { resetValues } from "../../features/users/userSlice";
import { Loader1 } from "../Loader";
import { useDispatch } from "react-redux";
import useRegister from "hooks/Register";
import styles from "../../layouts/styles/modal.module.scss";
// import { useThemeContext } from "../../hooks/ThemeContext";
// import QueryOrder from "../QueryOrder";
// import QueryProduct from "./QueryProduct";
const style = {
  position: "absolute",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default function UserSearchModal({ isGettingAllUser }) {
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
            Search users <CloseIcon style={{ cursor: "pointer" }} onClick={handleClose} />
          </Typography>
          <p>which user are you looking for?</p>
          <SearchUsers handleClose={handleClose} isGettingAllUser={isGettingAllUser} />
        </Box>
      </Modal>
    </div>
  );
}

const SearchUsers = ({ handleClose, isGettingAllUser }) => {
  const { searchUsers } = useRegister();
  const dispatch = useDispatch();
  const resetQuery = () => {
    dispatch(resetValues());
  };

  return (
    <form className={styles.paper}>
      {searchUsers.map((input) => {
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
        {isGettingAllUser === "pending" ? <Loader1 color="success" /> : "Find Out"}
      </CustomButton>
    </form>
  );
};
import PropTypes from "prop-types";

// Add prop validation for UserSearchModal
UserSearchModal.propTypes = {
  isGettingAllUser: PropTypes.string.isRequired,
};

// Add prop validation for SearchUsers
SearchUsers.propTypes = {
  handleClose: PropTypes.func.isRequired,
  isGettingAllUser: PropTypes.string.isRequired,
};
