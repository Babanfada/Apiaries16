/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import bgImage from "assets/images/bg-sign-up-cover.jpeg";
import useRegister from "hooks/Register";
import { useSelector } from "react-redux";
import { useRegisterUser } from "features/users/userThunk";
import { useNavigate } from "react-router-dom";
import React from "react";
import { Skeleton } from "@mui/material";
import { Loader1 } from "components copy/Loader";
import { useCurrentUser } from "features/users/userThunk";

function Cover() {
  const { userDetails } = useRegister();
  const { email, fullname, password, address, phone, gender } = useSelector((store) => store.users);
  const { registerUser, isRegisteringUser } = useRegisterUser();
  const { isCheckingCurrentUser } = useCurrentUser();
  const userdetails = { email, fullname, password, address, phone, gender };
  const navigate = useNavigate();
  const handleSubmit = () => {
    // e.preventDefault();
    const missingFields = [];
    if (!email) missingFields.push("Email");
    if (!fullname) missingFields.push("Full Name");
    if (!password) missingFields.push("Password");
    if (!address) missingFields.push("Address");
    if (!phone) missingFields.push("Phone");
    if (!gender) missingFields.push("Gender");

    if (missingFields.length > 0) {
      // Create a dynamic error message
      const errorMessage = ` ${missingFields.join(", ")} field${
        missingFields.length > 1 ? "s" : ""
      } ${missingFields.length > 1 ? "are" : "is"} required`;
      //   console.log(missingFields);
      toast.error(errorMessage);
      return;
    }
    registerUser(userdetails);
  };
  React.useEffect(() => {
    if (isRegisteringUser === "success") {
      const timer = window.setTimeout(() => {
        navigate("/authentication/check");
      }, 5000);
      return () => clearTimeout(timer); // Clear timeout if component unmounts
    }
  }, [isRegisteringUser, navigate]);
  React.useEffect(() => {
    if (isCheckingCurrentUser === "success") navigate("/dashboard");
  }, [isCheckingCurrentUser, navigate]);
  return (
    <CoverLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="success"
          mx={2}
          mt={-3}
          p={3}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Join us today
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1}>
            Enter your details to register
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              {/* {!email ? (
                <Skeleton
                  variant="rectangular"
                  width={"fit-content"}
                  height={"fit-content"}
                  sx={{
                    borderRadius: "5px",
                    background: "none",
                    color: "red",
                    fontWeight: "bold",
                  }}
                >
                  Your email is missing , you have to go back !!!
                </Skeleton>
              ) : (
                `${email}`
              )} */}
              {/* <Link to="/authentication/check">Not your Email? Go Back</Link> */}
            </MDBox>
            {userDetails.map((detail, i) => {
              const { name, TextField } = detail;
              return (
                <MDBox mb={2} key={i}>
                  {TextField}
                </MDBox>
              );
            })}
            {/* <MDBox mb={2}>
              <MDInput type="text" label="Name" variant="standard" fullWidth />
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="email" label="Email" variant="standard" fullWidth />
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="password" label="Password" variant="standard" fullWidth />
            </MDBox> */}
            {/* <MDBox display="flex" alignItems="center" ml={-1}>
              <Checkbox />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;I agree the&nbsp;
              </MDTypography>
              <MDTypography
                component="a"
                href="#"
                variant="button"
                fontWeight="bold"
                color="info"
                textGradient
              >
                Terms and Conditions
              </MDTypography>
            </MDBox> */}
            <MDBox mt={4} mb={1}>
              <MDButton onClick={() => handleSubmit()} variant="gradient" color="info" fullWidth>
                {isRegisteringUser === "pending" ? <Loader1 /> : "join us"}
              </MDButton>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Already have an account?{" "}
                <MDTypography
                  component={Link}
                  to="/authentication/check"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Sign In
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </CoverLayout>
  );
}

export default Cover;

{
  /* <section>
  <span>
    {!email ? (
      <Skeleton
        variant="rectangular"
        width={"fit-content"}
        height={"fit-content"}
        sx={{
          borderRadius: "5px",
          background: "none",
          color: "red",
          fontWeight: "bold",
        }}
      >
        Your email is missing , you have to go back !!!
      </Skeleton>
    ) : (
      `${email}`
    )}
    <Link to="/authflow/email">Not your Email? Go Back</Link>
  </span>
  <form onSubmit={handleSubmit}>
    {userDetails.map((detail, i) => {
      const { name, TextField } = detail;
      return <div key={i}>{TextField}</div>;
    })}
    <CustomButton
      background={"#1212121F"}
      backgroundhover={"#59d9d9"}
      size={"100%"}
      type={"submit"}
      height={"3vh"}
    >
      {isRegisteringUser === "pending" ? <Loader1 /> : "join us"}
    </CustomButton>
  </form>
</section>; */
}
