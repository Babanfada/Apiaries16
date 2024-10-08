import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import React from "react";
import { usegetAllUser } from "features/users/userThunk";

const Author = ({ image, name, email, user_id }) => (
  <MDBox display="flex" alignItems="center" lineHeight={1}>
    <MDAvatar src={image} name={name} size="sm" />
    <MDBox ml={2} lineHeight={1}>
      <MDTypography display="block" variant="button" fontWeight="medium">
        <Link title="check details" to={`/users/${user_id}`}>{`${user_id} ${name}`}</Link>
      </MDTypography>
      <MDTypography variant="caption">{email}</MDTypography>
    </MDBox>
  </MDBox>
);
const Job = ({ title, description }) => (
  <MDBox lineHeight={1} textAlign="left">
    <MDTypography
      display="block"
      variant="caption"
      color={title === "admin" ? "error" : "warning"}
      fontWeight="medium"
    >
      {title}
    </MDTypography>
    <MDTypography variant="caption">{description}</MDTypography>
  </MDBox>
);
export default function usersTableData() {
  // const { isGettingSingleUser, singleuser, refetch: refetchSingleUser } = useSingleUser();
  const { blacklistUser, blacklisting } = useBlacklistUser();
  const { users, refetch, isGettingAllUser } = usegetAllUser();
  const {
    users: Users = [],
    totalUsers = 0,
    count = 0,
    numOfPages = 1,
    genderCount = [],
    verificationCount = [],
  } = users || {};

  const rows = Users.map((user, i) => {
    const {
      user_id,
      fullname,
      email,
      phone,
      gender,
      image,
      role,
      address,
      emailNotification,
      blacklisted,
      isVerified,
    } = user;
    const handleActivation = () => {
      const confirmation = window.confirm(
        `You are about to ${blacklisted ? "activate" : "blacklist"} a user, ARE YOU SURE?`
      );

      if (!confirmation) return;

      if (blacklisted) {
        // If the user is blacklisted, activate them
        blacklistUser({ user_id, blacklist: false, isValid: true });
        console.log("User activated");
      } else {
        // If the user is not blacklisted, deactivate them
        blacklistUser({ user_id, blacklist: true, isValid: false });
        console.log("User deactivated");
      }
    };
    return {
      users: <Author image={image} name={`${fullname}`} email={email} user_id={user_id} />,
      details: <Job title={role} description={address} />,
      gender: (
        <MDBox ml={-1}>
          <MDBadge
            badgeContent={gender}
            color={gender === "male" ? "success" : "primary"}
            variant="gradient"
            size="sm"
          />
        </MDBox>
      ),
      phone: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {phone}
        </MDTypography>
      ),
      notification: (
        <MDBox ml={-1}>
          <MDBadge
            badgeContent={emailNotification ? "Disabled" : "Enabled"}
            color={emailNotification ? "error" : "success"}
            variant="gradient"
            size="sm"
          />
        </MDBox>
      ),
      verified: (
        <MDBox ml={-1}>
          <MDBadge
            badgeContent={isVerified ? "Verified" : "Unverified"}
            color={isVerified ? "success" : "warning"}
            variant="gradient"
            size="sm"
          />
        </MDBox>
      ),
      blacklisted: (
        <MDBox ml={-1}>
          <MDBadge
            badgeContent={blacklisted ? "Blacklisted" : "Active"}
            color={blacklisted ? "error" : "success"}
            variant="gradient"
            size="sm"
          />
        </MDBox>
      ),
      action: (
        <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
          <Link
            onClick={() => {
              handleActivation();
            }}
          >
            {blacklisted ? "Activate user" : "Blacklist user"}
          </Link>
        </MDTypography>
      ),
      // stats: (
      //   <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
      //     <Link to={`/users/${user_id}`}>check</Link>
      //   </MDTypography>
      // ),
    };
  });
  return {
    columns: [
      { Header: "users", accessor: "users", width: "45%", align: "left" },
      // { Header: "role", accessor: "role", align: "center" },
      { Header: "details", accessor: "details", align: "left" },
      { Header: "gender", accessor: "gender", align: "center" },
      { Header: "phone", accessor: "phone", align: "center" },
      { Header: "notification", accessor: "notification", align: "center" },
      { Header: "verified", accessor: "verified", align: "center" },
      { Header: "blacklisted", accessor: "blacklisted", align: "center" },
      { Header: "action", accessor: "action", align: "center" },
      // { Header: "stats", accessor: "stats", align: "center" },
    ],
    rows: rows,
    numOfPages,
    count,
    totalUsers,
    genderCount,
    verificationCount,
    refetch,
    isGettingAllUser,
    blacklisting,
  };
}

import PropTypes from "prop-types";
import { useSingleUser } from "features/users/userThunk";
import { useBlacklistUser } from "features/users/userThunk";

// PropTypes validation for the Author component
Author.propTypes = {
  image: PropTypes.string,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  user_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

// PropTypes validation for the Job component
Job.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
};

// PropTypes validation for the rows array
usersTableData.propTypes = {
  rows: PropTypes.arrayOf(
    PropTypes.shape({
      users: PropTypes.element.isRequired,
      details: PropTypes.element.isRequired,
      gender: PropTypes.element.isRequired,
      phone: PropTypes.element.isRequired,
      blacklisted: PropTypes.element.isRequired,
      notification: PropTypes.element.isRequired,
      verified: PropTypes.element.isRequired,
      action: PropTypes.element.isRequired,
    })
  ).isRequired,
  numOfPages: PropTypes.number.isRequired,
  count: PropTypes.number.isRequired,
  totalUsers: PropTypes.number.isRequired,
  genderCount: PropTypes.arrayOf(PropTypes.string),
  verificationCount: PropTypes.arrayOf(PropTypes.string),
  refetch: PropTypes.func.isRequired,
  isGettingAllUser: PropTypes.bool.isRequired,
};

// export default usersTableData;
