import React from "react";
import { CollapsibleTable } from "../../components";
import { useGlobalContext } from "../../hooks/GlobalContext";
import { Link } from "react-router-dom";
import { handleReset } from "../../features/employees/employeesSlice";
import { useDispatch } from "react-redux";

const Employees = () => {
  const { employees } = useGlobalContext();
  const { employees: Employees = [] } = employees || {};
  const dispatch = useDispatch();
  //   console.log(Employees);
  return (
    <div>
      <Link
        onClick={() => dispatch(handleReset())}
        to="/admin/createupdateemployee/add"
      >
        create emp
      </Link>
      {Employees.length > 0 ? (
        <CollapsibleTable employees={Employees} />
      ) : (
        "loading"
      )}
    </div>
  );
};

export default Employees;
