// import React from 'react'

// const VerifyEmail = () => {
//   return (
//     <div>VerifyEmail</div>
//   )
// }

// export default VerifyEmail

import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useVerifyUser } from "../../features/users/userThunk";
import { CircularProgress } from "@mui/material";
// import Meta from "../../components/Meta";
// import AuthNav from "../../components/AuthNav";
// import styles from "../../styles/pages/forgotpassword.module.scss";
// import denied from "../../assets/denied.png";
// import granted from "../../assets/granted.png";
// import { CircularProgress } from "@mui/material";
// import { useThemeContext } from "../../hooks/ThemeContext";
// import { useVerifyUser } from "../../features/users/userThunk";
function useQuery() {
  return new URLSearchParams(useLocation().search);
}
const VerifyEmail = () => {
  const { verifyUser, isVerifyingUser, isError } = useVerifyUser();
  //   const { isVerfiedUserEmailSuccessful } = useSelector((store) => store.users);
  //   const { theme } = useThemeContext();
  //   const isDarkMode = theme === "dark-theme";
  //   const title = "verify-email";
  const query = useQuery();
  const navigate = useNavigate();
  React.useEffect(() => {
    verifyUser({
      verificationString: query.get("token"),
      email: query.get("email"),
    });
  }, []);

  //   if (isVerfiedUserEmailSuccessful) {
  //     window.setTimeout(() => {
  //       navigate("/enter-email");
  //     }, 3000);
  //   }
  React.useEffect(() => {
    if (isVerifyingUser === "success") {
      const timer = window.setTimeout(() => {
        navigate("/authflow/email");
      }, 5000);
      return () => clearTimeout(timer); // Clear timeout if component unmounts
    }
  }, [isVerifyingUser, navigate]);
  if (isError) {
    return (
      <div>
        {/* <Meta title={title} /> */}
        {/* <AuthNav /> */}
        <section>
          {/* <img src={denied} alt="mailbox" /> */}
          <p style={{ textAlign: "center" }}>Failed !!!</p>
          <span>
            something went wrong, probably token expired. retry{" "}
            <Link to="/authflow/email">here</Link>
          </span>
        </section>
      </div>
    );
  }
  if (isVerifyingUser === "pending") {
    return (
      <div>
        {/* <Meta title={title} /> */}
        {/* <AuthNav /> */}
        <span
          style={{
            display: "grid",
            placeItems: "center",
            marginTop: "20px",
          }}
        >
          <CircularProgress size={50} color="primary" />;
        </span>
      </div>
    );
  }
  return (
    <div
      style={{
        // background: isDarkMode && "black",
        height: "100vh",
      }}
      //   className={styles.wrapper}
    >
      {/* <Meta title={title} />
      <AuthNav /> */}
      <section>
        {/* <img src={granted} alt="granted" /> */}
        <p>Congratulations !!!</p>
        <span style={{ fontSize: "large" }}>
          Thanks for joining us, you will be redirected to login shortly
        </span>
      </section>
    </div>
  );
};

export default VerifyEmail;
