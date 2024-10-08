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

import { useState } from "react";

// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid";
import MuiLink from "@mui/material/Link";
import React from "react";
// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";
import { useCheckUserOndB } from "features/users/userThunk";
import { useCurrentUser } from "features/users/userThunk";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import useRegister from "hooks/Register";
import { CustomButton } from "components copy";
import { Loader1 } from "components copy/Loader";
import { toast } from "react-toastify";
import { populate } from "features/users/userSlice";
import { useDispatch } from "react-redux";

function CheckEmail() {
  const [rememberMe, setRememberMe] = useState(false);
  // const handleSetRememberMe = () => setRememberMe(!rememberMe);
  const dispatch = useDispatch();

  //mine
  const { email } = useSelector((store) => store.users);
  const { refetch, isCheckingUserOnDb, data } = useCheckUserOndB(email);
  const {
    status: { name, TextField },
  } = useRegister();
  const { data: currentUser = {}, isCheckingCurrentUser } = useCurrentUser();
  const navigate = useNavigate();
  React.useEffect(() => {
    if (isCheckingCurrentUser === "success") navigate("/dashboard");
  }, [isCheckingCurrentUser, navigate]);
  const handleClick = (e) => {
    if (!email) {
      toast.error("pls provide a valid email !!!!");
      return;
    }
    refetch();
    if (data) {
      const { msg } = data;
      console.log(msg, "here");
      if (msg === "notfound") {
        navigate("/authentication/sign-up");
        return;
      }
      if (msg === "found") {
        navigate("/authentication/sign-in");
        return;
      }
    }
  };
  const populateDetails = () => {
    const details = {
      email: "tasiguduu@gmail.com",
      password: "Vlq8PjiX7qy",
    };
    dispatch(populate(details));
  };
  return (
    <BasicLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Sign in
          </MDTypography>
          <Grid container spacing={3} justifyContent="center" sx={{ mt: 1, mb: 2 }}>
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <FacebookIcon color="inherit" />
              </MDTypography>
            </Grid>
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <GitHubIcon color="inherit" />
              </MDTypography>
            </Grid>
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <GoogleIcon color="inherit" />
              </MDTypography>
            </Grid>
          </Grid>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              {TextField}
              {/* <MDInput type="email" label="Email" fullWidth /> */}
            </MDBox>
            {/* <MDBox mb={2}>
              <MDInput type="password" label="Password" fullWidth />
            </MDBox> */}
            {/* <MDBox display="flex" alignItems="center" ml={-1}>
              <Switch checked={rememberMe} onChange={handleSetRememberMe} />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                onClick={handleSetRememberMe}
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;Remember me
              </MDTypography>
            </MDBox> */}
            <MDBox mt={4} mb={1}>
              <MDButton
                mb={1}
                onClick={() => populateDetails()}
                variant="gradient"
                color="info"
                fullWidth
                sx={{ mb: 2 }}
              >
                login as test user
              </MDButton>
              <MDButton
                mt={4}
                onClick={(e) => handleClick(e)}
                variant="gradient"
                color="info"
                fullWidth
              >
                {isCheckingUserOnDb ? <Loader1 /> : "Next"}
              </MDButton>
            </MDBox>

            {/* <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Don&apos;t have an account?{" "}
                <MDTypography
                  component={Link}
                  to="/authentication/sign-up"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Sign up
                </MDTypography>
              </MDTypography>
            </MDBox> */}
            {/* <form action="">
              <div>{TextField}</div>
              <CustomButton
                background={"#1212121F"}
                backgroundhover={"#59d9d9"}
                size={"100%"}
                height={"3vh"}
                onClick={() => handleClick()}
              >
                {isCheckingUserOnDb ? <Loader1 /> : "Next"}
              </CustomButton>
            </form> */}
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default CheckEmail;
