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

// @mui material components
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import bgImage from "assets/images/bg-reset-cover.jpeg";
import { useForgetPassword } from "features/users/userThunk";
import useRegister from "hooks/Register";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Loader1 } from "components copy/Loader";
import { useResetPassword } from "features/users/userThunk";
import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
function useQuery() {
  return new URLSearchParams(useLocation().search);
}
function ResetPassword() {
  const { resetPassword, isResetingPassword, isError } = useResetPassword();
  const { password } = useSelector((store) => store.users);
  const { userDetails } = useRegister();
  const query = useQuery();
  const navigate = useNavigate();
  const token = query.get("token");
  const email = query.get("email");
  const title = "reset password";
  const handleSubmit = (e) => {
    // e.preventDefault();
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
  React.useEffect(() => {
    if (isResetingPassword === "success") {
      window.setTimeout(() => {
        navigate("/authentication/check");
      }, 3000);
    }
  }, [isResetingPassword, navigate]);
  return (
    <CoverLayout coverHeight="50vh" image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="success"
          mx={2}
          mt={-3}
          py={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h3" fontWeight="medium" color="white" mt={1}>
            Reset Password
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1}>
            {isResetingPassword === "idle" ? (
              "you can now enter a new password"
            ) : isResetingPassword === "success" ? (
              "you will be redirected to login again shortly !!!"
            ) : (
              <>
                FAILED!!! Something went wrong, probably the token expired.{" "}
                <Link to="/authentication/forget-password">try again</Link>
              </>
            )}
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={4}>{userDetails[1].TextField}</MDBox>
            <MDBox mt={6} mb={1}>
              <MDButton
                onClick={() => handleSubmit()}
                disabled={!password}
                variant="gradient"
                color="info"
                // type="submit"
                fullWidth
              >
                {isResetingPassword === "pending" ? <Loader1 /> : "Reset"}
              </MDButton>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </CoverLayout>
  );
}

export default ResetPassword;

