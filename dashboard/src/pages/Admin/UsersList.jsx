import React from "react";
import { useGlobalContext } from "../../hooks/GlobalContext";
import { UserSearchModal, UsersTable } from "../../components copy";
import { usegetAllUser } from "../../features/users/userThunk";
import { useSelector } from "react-redux";
import { changePage } from "../../features/users/userSlice";
import { useDispatch } from "react-redux";

const UsersList = () => {
  const dispatch = useDispatch();
  const { users } = useGlobalContext();
  const { refetch, isGettingAllUser } = usegetAllUser();
  const {
    gendersearch,
    isVerified,
    blacklisted,
    subscribed,
    sort,
    pages,
    email,
    fullname,
    phone,
    gender,
  } = useSelector((store) => store.users);

  const {
    users: Users = [],
    totalUsers = 0,
    count = 0,
    numOfPages = 1,
    genderCount = [],
    verificationCount = [],
  } = users || {};
  // const dispatch = useDispatch();
  // console.log(
  //   Users,
  //   genderCount,
  //   verificationCount,
  //   numOfPages,
  //   count,
  //   totalUsers
  // );
  const handleChange = (event, value) => {
    event.preventDefault();
    dispatch(changePage(value));
  };

  React.useEffect(() => {
    refetch();
  }, [
    gendersearch,
    isVerified,
    blacklisted,
    subscribed,
    sort,
    pages,
    email,
    fullname,
    phone,
    gender,
  ]);
  return (
    <div>
      <UserSearchModal isGettingAllUser={isGettingAllUser} />
      <div>
        Gender:
        {genderCount.length > 0 ? (
          genderCount.map((item, i) => (
            <p key={i}>
              {item.gender}: {item.count}
            </p>
          ))
        ) : (
          <p>Loading gender count...</p>
        )}
      </div>
      <div>
        Verified Users:
        {verificationCount.length > 0 ? (
          verificationCount.map((item, i) => (
            <p key={i}>
              {item.isVerified ? "Verified" : "Not Verified"}: {item.count}
            </p>
          ))
        ) : (
          <p>Loading verification count...</p>
        )}
      </div>

      <p>
        {count} of {totalUsers}
      </p>
      {Users.length > 0 ? (
        <UsersTable users={{ Users, numOfPages, handleChange, pages }} />
      ) : (
        "loading"
      )}
    </div>
  );
};

export default UsersList;
