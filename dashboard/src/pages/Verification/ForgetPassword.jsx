// import React from "react";

// const ForgetPassword = () => {
//   return <div>ForgetPassword</div>;
// };

// export default ForgetPassword;

// import styles from "../../styles/pages/forgotpassword.module.scss";
import { useDispatch, useSelector } from "react-redux";
// import Meta from "../../components/Meta";
// import useRegister from "../../hooks/register";
// import { CustomButton } from "../../components/Button";
import { CircularProgress } from "@mui/material";
import { toast } from "react-toastify";
// import { changeforgotPasswordEmailSentValue } from "../../features/users/userSlice";
// import AuthNav from "../../components/AuthNav";
import { Link } from "react-router-dom";
// import useRegister from "../../hooks/register";
import { useForgetPassword } from "../../features/users/userThunk";
import { Loader1 } from "../../components copy/Loader";
import { CustomButton } from "../../components copy";
import { useNavigate } from "react-router-dom";
import useRegister from "../../hooks/register";
// import mail from "../../assets/mailbox.png";
// import { useThemeContext } from "../../hooks/ThemeContext";
// import { useForgetPassword } from "../../features/users/userThunk";
const ForgetPassword = () => {
  const { forgetPassword, isForgetingPassword } = useForgetPassword();
  const navigate = useNavigate();
  const title = "forget password";
  const dispatch = useDispatch();
  const { status } = useRegister();
  const { email } = useSelector((store) => store.users);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("You have not provided your email ");
      return;
    }
    forgetPassword({
      email,
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
  if (isForgetingPassword === "success") {
    return (
      <div>
        {/* <Meta title={title} />
        <AuthNav /> */}
        <section>
          {/* <img src={mail} alt="mailbox" /> */}
          <p style={{ textAlign: "center" }}>Yippee!</p>
          <span>
            A link to reset your password has been sent to
            {email} If you did not receive the email or if the email address is
            incorrect, try again{" "}
            <Link
              //   className={styles.link}
              onClick={() => {
                window.location.reload();
                // navigate(-1);
              }}
            >
              here
            </Link>
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
        <p>Reset the Password?</p>
        <span>
          Enter the email address associated with your account, and we’ll email
          you a link to reset your password.
        </span>
        <form
          //   style={{ ...darkModeStyle() }}
          //   className="form"
          onSubmit={handleSubmit}
        >
          {status.TextField}
          <CustomButton
            background={"#1212121F"}
            backgroundhover={"#59d9d9"}
            size={"100%"}
            height={"3vh"}
            type="submit"
            disabled={!email}
          >
            {isForgetingPassword === "pending" ? <Loader1 /> : "Submit"}
          </CustomButton>
        </form>
      </section>
    </div>
  );
};

export default ForgetPassword;
