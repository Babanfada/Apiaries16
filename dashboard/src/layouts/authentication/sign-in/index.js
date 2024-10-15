import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Card, Skeleton } from "@mui/material";
import { useLoginUser, useCurrentUser } from "features/users/userThunk";
import useRegister from "hooks/Register";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import { Loader1 } from "components copy/Loader";
import BasicLayout from "layouts/authentication/components/BasicLayout";
import bgImage from "assets/images/bg-sign-in-basic.jpeg";
import { Link } from "react-router-dom";

function Basic() {
  const [rememberMe, setRememberMe] = useState(false);
  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  // State for form input
  const { email, password } = useSelector((store) => store.users);
  const { loginUser, isLoginIn } = useLoginUser();
  const { userDetails } = useRegister();
  const navigate = useNavigate();
  const { data: currentUser, refetch, isCheckingCurrentUser } = useCurrentUser();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("You have not provided your email or password");
      return;
    }
    // Trigger login action
    loginUser({
      email,
      password,
    });
  };
  useEffect(() => {
    if (isLoginIn === "success") {
      refetch();
    }
    if (isCheckingCurrentUser === "success") navigate("/dashboard");
  }, [isLoginIn, isCheckingCurrentUser, navigate]);

  // console.log(isLoginIn, currentUser);
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
          <MDTypography variant="h6" fontWeight="medium" color="white" mt={1}>
            Glad to see you back again !!
          </MDTypography>
          <MDTypography variant="h6" fontWeight="small" color="white" mt={1}>
            Enter your password to retrieve your info...
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form" onSubmit={handleSubmit}>
            <MDBox mt={0} mb={0} textAlign="start">
              <MDTypography fontFamily="inherit" fontWeight="bold" variant="button" color="text">
                Not your Email?{" "}
                <MDTypography
                  component={Link}
                  to="/authentication/check"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  go back
                </MDTypography>
              </MDTypography>
              <MDTypography variant="h6" fontWeight="bold" color="info" mt={1}>
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
                    Your email is missing, you have to go back!!!
                  </Skeleton>
                ) : (
                  <MDTypography variant="span" fontWeight="bold" color="info" mt={1}>
                    {email}
                  </MDTypography>
                )}
              </MDTypography>
            </MDBox>
            <MDBox mb={2}>{userDetails[1].TextField}</MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton
                type="submit"
                disabled={!password}
                variant="gradient"
                color="info"
                fullWidth
              >
                {isLoginIn === "pending" ? <Loader1 /> : "Sign in"}
              </MDButton>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Forgot password?{" "}
                <MDTypography
                  component={Link}
                  to="/authentication/forget-password"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  reset it
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default Basic;
