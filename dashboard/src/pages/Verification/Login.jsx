import React from "react";
// import styles from "../../styles/pages/loginpage.module.scss";
import { useSelector } from "react-redux";
// import Meta from "../../components/Meta";
import { Link } from "react-router-dom";
// import { CustomButton } from "../../components/Button";
import { CircularProgress, Skeleton } from "@mui/material";
// import useRegister from "../../hooks/register";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useCurrentUser, useLoginUser } from "../../features/users/userThunk";
import useRegister from "../../hooks/register";
import { CustomButton } from "../../components copy";
import { Loader1 } from "../../components copy/Loader";
// import AuthNav from "../../components/AuthNav";
// import styling from "../../styles/pages/registeration.module.scss";
// import { useThemeContext } from "../../hooks/ThemeContext";
// import { useLoginUser } from "../../features/users/userThunk";

const Login = () => {
  //   const { userDetails } = useRegister();
  //   const { loginUser, isLoginIn } = useLoginUser();
  //   const navigate = useNavigate();
  //   const { email, isLoggedIn, password } = useSelector((store) => store.users);
  //   const { currentUser } = useSelector((store) => store.authUsers);
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

  const { email, password } = useSelector((store) => store.users);
  const { loginUser, isLoginIn } = useLoginUser();
  const { userDetails } = useRegister();
  const navigate = useNavigate();
  const { data: currentUser = {} } = useCurrentUser();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("You have not provided your email or password ");
      return;
    }
    loginUser({
      email,
      password,
    });
  };

  React.useEffect(() => {
    // Check if login was successful and currentUser data is available
    console.log(isLoginIn, currentUser);
    if (isLoginIn === "success") {
      navigate("/home");
    }
  }, [isLoginIn]);

  return (
    <div>
      {/* <Meta title={"Login"} />
      <AuthNav /> */}
      <section>
        <p>Glad to see you back again !!</p>
        <span>Enter your password to retrieve your info</span>
        <form
          //   style={{ ...darkModeStyle() }}
          //   className="form"
          onSubmit={handleSubmit}
        >
          <span>
            {!email ? (
              <Skeleton
                variant="rectangular"
                width={"fit-content"}
                height={"fit-content"}
                sx={{
                  borderRadius: "5px",
                  background: "none",
                  fontSize: "small",
                  color: "red",
                  fontWeight: "bold",
                }}
              >
                Your email is missing , you have to go back !!!
              </Skeleton>
            ) : (
              <span>{email}</span>
            )}
          </span>
          <Link to="/authflow/email">Not your Email? Go Back</Link>
          {userDetails[1].TextField}
          <div>
            <Link to="/authflow/forgetpassword">forgot Password ?</Link>
          </div>
          <CustomButton
            background={"#1212121F"}
            backgroundhover={"#59d9d9"}
            size={"100%"}
            height={"3vh"}
            type="submit"
            disabled={!password}
          >
            {isLoginIn === "pending" ? <Loader1 /> : "Sign in"}
          </CustomButton>
        </form>
      </section>
    </div>
  );
};

export default Login;
