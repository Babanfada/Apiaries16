import React from "react";
// import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useCurrentUser } from "features/users/userThunk";
import { Loader1 } from "components copy/Loader";
// import styling from "../../styles/pages/forgotpassword.module.scss";
// import { CircularProgress } from "@mui/material";
const PrivateRoute = ({ children }) => {
  const { isCheckingCurrentUser, currentUser } = useCurrentUser();
  // useCurrentUser;
  const navigate = useNavigate();
  React.useEffect(() => {
    // Check if currentUser is defined and has keys
    if (!currentUser) {
      navigate("/authentication/check");
    }
  }, [currentUser, navigate]);

  if (isCheckingCurrentUser === "pending") {
    return (
      // className={styling.wrapper}
      <div>
        <span
          style={{
            display: "grid",
            placeItems: "center",
            marginTop: "20px",
          }}
        >
          <Loader1 />
          {/* <CircularProgress size={50} color="primary" /> */}
        </span>
      </div>
    );
  }

  return children;
};

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PrivateRoute;
