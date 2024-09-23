import React from "react";
import { useGlobalContext } from "../../hooks/GlobalContext";
import { Nok_Table } from "../../components";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { changePage, handleReset } from "../../features/nok/nokSlice";
import { Link } from "react-router-dom";
import { useAllNok } from "../../features/nok/nokThunk";
import NokSearchModal from "../../components/searchModals/NokSearchModal";
// import Nok_Table from "../../components/component's_Tables/Nok_Table";

const EmployeeNok = () => {
  const {
    pages,
    emp_id,
    fullname,
    email,
    address,
    phone,
    gender,
    relationship,
    sort,
  } = useSelector((store) => store.noks);
  const dispatch = useDispatch();
  const {
    isGettingAllNok,
    noks: {
      employeesNOK = [],
      genderTypeCount = [],
      numOfPages,
      totalEmployeesNOK = 0,
      count = 0,
      relationshipTypeCount = [],
    } = {},
  } = useGlobalContext();
  const { refetch } = useAllNok();
  const handleChange = (event, value) => {
    event.preventDefault();
    dispatch(changePage(value));
  };
  React.useEffect(() => {
    refetch();
  }, [
    emp_id,
    fullname,
    email,
    address,
    phone,
    gender,
    relationship,
    pages,
    sort,
  ]);
  return (
    <div>
      <Link
        onClick={() => dispatch(handleReset())}
        to="/admin/createupdatenok/add"
      >
        create nok
      </Link>
      <NokSearchModal isGettingAllNok={isGettingAllNok} />
      <p>
        {count} of {totalEmployeesNOK}
      </p>
      <div>
        {genderTypeCount.map(({ gender, count }, i) => {
          return (
            <p key={i}>
              gender:{gender}
              count:{count}
            </p>
          );
        })}
      </div>
      <div>
        {relationshipTypeCount.map(({ relationship, count }, i) => {
          return (
            <p key={i}>
              relationship:{relationship}
              count:{count}
            </p>
          );
        })}
      </div>
      {employeesNOK.length > 0 ? (
        <Nok_Table
          employeesNOK={employeesNOK}
          handleChange={handleChange}
          numOfPages={numOfPages}
          pages={pages}
        />
      ) : (
        "loading"
      )}
    </div>
  );
};

export default EmployeeNok;
