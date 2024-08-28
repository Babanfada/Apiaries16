import React from "react";
import useRegister from "../../hooks/register";
import { CustomButton } from "../../components";
// import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  useCheckUserOndB,
  useCurrentUser,
} from "../../features/users/userThunk";
// import {
//   handleValidationError,
//   resetValidationError,
// } from "../features/users/userSlice";
import { Loader1 } from "../../components/Loader";
import { useNavigate } from "react-router-dom";

const EmailPage = () => {
  const { email } = useSelector((store) => store.users);
  const { refetch, isCheckingUserOnDb, data } = useCheckUserOndB(email);
  const {
    status: { name, TextField },
  } = useRegister();
  const { data: currentUser = {} } = useCurrentUser();
  const navigate = useNavigate();
  React.useEffect(() => {
    if (Object.keys(currentUser).length > 1) {
      return navigate("/home");
    }
  });
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
        navigate("/authflow/register");
        return;
      }
      if (msg === "found") {
        navigate("/authflow/login");
        return;
      }
    }
  };
  return (
    <section>
      <form action="">
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
      </form>
    </section>
  );
};

export default EmailPage;
