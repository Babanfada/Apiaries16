import React from "react";
import { CustomButton } from "../../components copy";
import { useCurrentUser, useLogOutUser } from "../../features/users/userThunk";
import { Loader1 } from "../../component copy/Loader";
import { useGlobalContext } from "../../hooks/GlobalContext";

const Home = () => {
  const { logOutUser, isLoginOut } = useLogOutUser();
  const { isCheckingCurrentUser, currentUser } = useGlobalContext();
  const { fullname, email, address, phone } = currentUser;
//   console.log(currentUser);

  return (
    <div>
      <div>
        <p>{fullname}</p>
        <p>{email}</p>
        <p>{address}</p>
        <p>{phone}</p>{" "}
      </div>
      <CustomButton
        background={"#1212121F"}
        backgroundhover={"#59d9d9"}
        size={"100%"}
        height={"3vh"}
        type="submit"
        onClick={() => logOutUser()}
      >
        {isLoginOut === "pending" ? <Loader1 /> : "Logout"}
      </CustomButton>
    </div>
  );
};

export default Home;
