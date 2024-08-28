import React from "react";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
// import { resetPassword } from "../../features/users/userSlice";
// import useRegister from "../../hooks/register";
// import { CustomButton } from "../../components/Button";
// import { CircularProgress } from "@mui/material";
import { toast } from "react-toastify";
import { Loader1 } from "../../components/Loader";
import { useResetPassword } from "../../features/users/userThunk";
import useRegister from "../../hooks/register";
import { CustomButton } from "../../components";
// import AuthNav from "../../components/AuthNav";
// import Meta from "../../components/Meta";
// import styles from "../../styles/pages/forgotpassword.module.scss";
// import denied from "../../assets/denied.png";
// import { useThemeContext } from "../../hooks/ThemeContext";
// import { useResetPassword } from "../../features/users/userThunk";
function useQuery() {
  return new URLSearchParams(useLocation().search);
}
const ResetPassword = () => {
  const { resetPassword, isResetingPassword, isError } = useResetPassword();
  const { password } = useSelector((store) => store.users);
  const { userDetails } = useRegister();
  const query = useQuery();
  const navigate = useNavigate();
  const token = query.get("token");
  const email = query.get("email");
  const title = "reset password";
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!password) {
      toast.error("You have not provided your new password ");
      return;
    }
    resetPassword({
      email,
      token,
      password,
    });
  };
  //   const { theme } = useThemeContext();
  //   const isDarkMode = theme === "dark-theme";
  //   const darkModeStyle = () => {
  //     if (isDarkMode) {
  //       const darkStyle = {
  //         background: "black",
  //         border: "1px solid #38bdf2",
  //         borderRadius: "5px",
  //         color: "white",
  //       };
  //       return darkStyle;
  //     }
  //     return {};
  //   };
  React.useEffect(() => {
    if (isResetingPassword === "success") {
      window.setTimeout(() => {
        navigate("/authflow/email");
      }, 3000);
    }
  }, [isResetingPassword, navigate]);

  if (isError) {
    return (
      <div>
        {/* <Meta title={title} />
        <AuthNav /> */}
        <section>
          {/* <img src={denied} alt="mailbox" /> */}
          <p style={{ textAlign: "center" }}>Failed !!!</p>
          <span>
            something went wrong, probably token expired. retry{" "}
            <Link to="/authflow/forgetpassword">here</Link>
          </span>
        </section>
      </div>
    );
  }
  return (
    <div>
      {/* <Meta title={title} />
      <AuthNav /> */}
      <section>
        <p>Alright !!</p>
        <span style={{ fontSize: "large" }}>let&apos;s get this done</span>
        <form
          //   style={{ ...darkModeStyle() }}
          className="form"
          onSubmit={handleSubmit}
        >
          {userDetails[1].TextField}
          <CustomButton
            background={"#1212121F"}
            backgroundhover={"#59d9d9"}
            size={"100%"}
            height={"3vh"}
            type="submit"
            disabled={!password}
          >
            {isResetingPassword === "pending" ? <Loader1 /> : "Reset"}
          </CustomButton>
        </form>
      </section>
    </div>
  );
};

export default ResetPassword;
