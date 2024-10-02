import React from "react";
import { Link } from "react-router-dom";
import {
  useBlacklistUser,
  useSingleUser,
} from "../../features/users/userThunk";
import { useParams } from "react-router-dom";

const SingleUser = () => {
  const { id } = useParams();
  const { isGettingSingleUser, singleuser, refetch } = useSingleUser(id);

  const {
    user,
    deliveryStatusCount = [],
    paymentStatusCount = [],
  } = singleuser || {};

  const {
    address,
    blacklisted,
    email,
    emailNotification,
    fullname,
    gender,
    image,
    isVerified,
    phone,
    role,
    user_id,
  } = user ?? {};
  const { blacklistUser, blacklisting } = useBlacklistUser(id);
    console.log(deliveryStatusCount, paymentStatusCount);
  console.log(blacklisted, user);
  const activate = {
    blacklist: false,
    isValid: true,
  };
  const deactivate = {
    blacklist: true,
    isValid: false,
  };

  const handleActivation = () => {
    const confirmation = window.confirm(
      `You are about to ${
        blacklisted ? "activate" : "blacklist"
      } a user, ARE YOU SURE?`
    );

    if (!confirmation) return;

    if (blacklisted) {
      // If the user is blacklisted, this means we need to activate them
      blacklistUser(activate);
      console.log("User activated");
    } else {
      // If the user is not blacklisted, we deactivate them
      blacklistUser(deactivate);
      console.log("User deactivated");
    }
  };

  React.useEffect(() => {
    refetch();
  }, [id, blacklisting]);
  return (
    <div>
      <Link to="/admin/userslist">Go back to users</Link>
      SingleEmployee
      <p>address:{address}</p>
      <img src={image} alt="image" height={"50px"} />
      <p>{fullname}</p>
      <p>{email}</p>
      <p>verified:{isVerified ? "yes" : "No"}</p>
      <p>Receiving mail:{emailNotification ? "Yes" : "No"}</p>
      <p>Blacklisted:{blacklisted ? "Yes" : "No"}</p>
      <button onClick={() => handleActivation()}>
        {blacklisted ? "activate user" : "blacklist user"}
      </button>
    </div>
  );
};

export default SingleUser;

