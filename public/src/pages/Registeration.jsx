import React from "react";
import useRegister from "../hooks/register";
import { useSelector } from "react-redux";
import { useRegisterUser } from "../features/users/userThunk";
import { CustomButton } from "../components";
import { toast } from "react-toastify";
import { Skeleton } from "@mui/material";
import { Link } from "react-router-dom";
import { Loader1 } from "../components/Loader";
import { useNavigate } from "react-router-dom";

const Registeration = () => {
  const { userDetails } = useRegister();
  const { email, fullname, password, address, phone, gender } = useSelector(
    (store) => store.users
  );
  const { registerUser, isRegisteringUser } = useRegisterUser();
  const userdetails = { email, fullname, password, address, phone, gender };
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
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
        navigate("/authflow/email");
      }, 5000);
      return () => clearTimeout(timer); // Clear timeout if component unmounts
    }
  }, [isRegisteringUser, navigate]);
  return (
    <section>
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
    </section>
  );
};

export default Registeration;
