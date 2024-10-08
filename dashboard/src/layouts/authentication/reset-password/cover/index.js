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

function Cover() {
  const { forgetPassword, isForgetingPassword } = useForgetPassword();
  const navigate = useNavigate();
  const title = "forget password";
  const dispatch = useDispatch();
  const { status } = useRegister();
  const { email } = useSelector((store) => store.users);
  const handleSubmit = () => {
    // e.preventDefault();
    console.log("clicked", email);
    if (!email) {
      toast.error("You have not provided your email ");
      return;
    }
    forgetPassword({
      email,
    });
  };
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
            {isForgetingPassword === "success"
              ? `A link to reset your password has been sent to
            ${email} If you did not receive the email or if the email address is incorrect, try again...`
              : "You will receive an e-mail in maximum 60 seconds"}
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={4}>
              {/* <MDInput type="email" label="Email" variant="standard" fullWidth /> */}
              {status.TextField}
            </MDBox>
            <MDBox mt={6} mb={1}>
              <MDButton
                onClick={() => handleSubmit()}
                disabled={!email}
                variant="gradient"
                color="info"
                // type="submit"
                fullWidth
              >
                {isForgetingPassword === "pending" ? <Loader1 /> : "reset"}
              </MDButton>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </CoverLayout>
  );
}

export default Cover;
