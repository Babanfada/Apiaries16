import React from "react";
import { EmployeesTable } from "../../components";
import { useGlobalContext } from "../../hooks/GlobalContext";
import { Link } from "react-router-dom";
import {
  changePage,
  handleReset,
} from "../../features/employees/employeesSlice";
import { useDispatch } from "react-redux";
import EmployeeSearchModal from "../../components/searchModals/EmployeeSearchModal";
import { useAllEmployess } from "../../features/employees/employeesThunk";
import { useSelector } from "react-redux";

const Employees = () => {
  const { employees } = useGlobalContext();
  const dispatch = useDispatch();
  const { isGettingAllEmployees, refetch } = useAllEmployess();
  //   console.log(Employees);
  const {
    first_name,
    last_name,
    employment_type,
    employment_status,
    dob,
    joining_date,
    // salary,
    role,
    salaryRange,
    pages,
    sort,
  } = useSelector((store) => store.employees);
  const {
    employees: Employees = [],
    numOfPages = 1,
    totalEmployees = 0,
    count = 0,
  } = employees || {};
  const handleChange = (event, value) => {
    event.preventDefault();
    dispatch(changePage(value));
  };
  React.useEffect(() => {
    refetch();
  }, [
    first_name,
    last_name,
    employment_type,
    employment_status,
    dob,
    joining_date,
    role,
    pages,
    salaryRange,
    sort,
  ]);
  const employeesPerPage = Employees.length; // Assuming each page shows `Employees.length`
  const cumulativeCount = (pages - 1) * employeesPerPage + employeesPerPage; // Calculate cumulative count

  // console.log(Employees);
  return (
    <div>
      <Link
        onClick={() => dispatch(handleReset())}
        to="/admin/createupdateemployee/add"
      >
        create emp
      </Link>
      <EmployeeSearchModal isGettingAllEmployees={isGettingAllEmployees} />
      {/* <p>
        {pages > 1
          ? `${cumulativeCount} of ${totalEmployees}`
          : `${count} of ${totalEmployees}`}
      </p> */}
      <p>
        {count} of {totalEmployees}
      </p>
      {Employees.length > 0 ? (
        <EmployeesTable
          employees={Employees}
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

export default Employees;
