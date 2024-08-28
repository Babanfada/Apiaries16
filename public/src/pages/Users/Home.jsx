import React from "react";
import { CustomButton } from "../../components";
import { useCurrentUser, useLogOutUser } from "../../features/users/userThunk";
import { Loader1 } from "../../components/Loader";

const Home = () => {
  const { logOutUser, isLoginOut } = useLogOutUser();
  const { data: currentUser = {} } = useCurrentUser();
  const { fullname, email, address, phone } = currentUser;
  console.log(currentUser);
  //   const handleLogout = () => {
  //     logOutUser();
  //   };
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
