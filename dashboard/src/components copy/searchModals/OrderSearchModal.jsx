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
// import { resetValues } from "../../features/users/userSlice";
import { Loader1 } from "../Loader";
import { useDispatch } from "react-redux";
// import useRegister from "hooks/Register";
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

export default function OrderSearchModal({ isGettingAllOrders }) {
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
            Search orders <CloseIcon style={{ cursor: "pointer" }} onClick={handleClose} />
          </Typography>
          <p>which order are you looking for?</p>
          <SearchOrders handleClose={handleClose} isGettingAllOrders={isGettingAllOrders} />
        </Box>
      </Modal>
    </div>
  );
}

const SearchOrders = ({ handleClose, isGettingAllOrders }) => {
  const { orderInputs } = useOrderInputs();
  const dispatch = useDispatch();
  const resetQuery = () => {
    dispatch(resetValues());
  };

  return (
    <form className={styles.paper}>
      {orderInputs.map((input) => {
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
        {isGettingAllOrders === "pending" ? <Loader1 color="success" /> : "Find Out"}
      </CustomButton>
    </form>
  );
};
import PropTypes from "prop-types";
import { resetValues } from "features/orders/ordersSlice";
import { useOrderInputs } from "hooks/ServicesDetails";

// Add prop validation for OrderSearchModal
OrderSearchModal.propTypes = {
  isGettingAllOrders: PropTypes.string.isRequired,
};

// Add prop validation for SearchUsers
SearchOrders.propTypes = {
  handleClose: PropTypes.func.isRequired,
  isGettingAllOrders: PropTypes.string.isRequired,
};
