/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";
import { useAllEmployess } from "features/employees/employeesThunk";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUpdateEmployee } from "features/employees/employeesSlice";
import React from "react";

export default function data() {
  const { isGettingAllEmployees, employees, refetch } = useAllEmployess();
  const {
    employees: Employees = [],
    numOfPages = 1,
    totalEmployees = 0,
    count = 0,
    salaryData = [],
    newHires = [],
    newHiresCount = [],
    employeesGenderCount = [],
    departmentCount = [],
    employmentStatusCount = [],
    employmentTypeCount = [],
  } = employees || {};
  // console.log(Employees);
  const Author = ({ image, name, email, emp_id }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={name} size="sm" />
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          <Link to={`/employees/${emp_id}`}>{`${emp_id} ${name}`}</Link>
        </MDTypography>
        <MDTypography variant="caption">{email}</MDTypography>
      </MDBox>
    </MDBox>
  );
  const Job = ({ title, description }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
        {title}
      </MDTypography>
      <MDTypography variant="caption">{description}</MDTypography>
    </MDBox>
  );
  const rows = Employees.map((employee, i) => {
    const {
      emp_id,
      first_name,
      last_name,
      gender,
      email,
      dob,
      phone,
      image,
      role,
      address,
      department,
      employment_type,
      employment_status,
      salary,
      joining_date,
      skill,
      notes,
      // createdAt,
      // updatedAt,
    } = employee;
    const payload = {
      emp_id,
      first_name,
      last_name,
      gender,
      email,
      dob,
      phone,
      role,
      address,
      department,
      employment_type,
      employment_status,
      salary,
      joining_date,
      skill,
      notes,
    };
    const dispatch = useDispatch();
    const handleEdit = () => {
      dispatch(setUpdateEmployee(payload));
    };
    return {
      employee: (
        <Author image={image} name={`${first_name} ${last_name}`} email={email} emp_id={emp_id} />
      ),
      function: <Job title={role} description={department} />,
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
      dob: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {dob}
        </MDTypography>
      ),
      action: (
        <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
          <Link
            onClick={() => {
              handleEdit();
            }}
            to={`/admin/createupdateemployees/${emp_id}`}
          >
            Edit
          </Link>
        </MDTypography>
      ),
    };
  });
  const {
    first_name,
    last_name,
    employment_type,
    employment_status,
    dob,
    joining_date,
    role,
    salaryRange,
    pages,
    sort,
  } = useSelector((store) => store.employees);
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
  return {
    columns: [
      { Header: "employee", accessor: "employee", width: "45%", align: "left" },
      { Header: "function", accessor: "function", align: "left" },
      { Header: "gender", accessor: "gender", align: "center" },
      { Header: "phone", accessor: "phone", align: "center" },
      { Header: "dob", accessor: "dob", align: "center" },
      { Header: "action", accessor: "action", align: "center" },
    ],
    rows: rows,
    numOfPages,
    totalEmployees,
    count,
    salaryData,
    newHires,
    newHiresCount,
    employeesGenderCount,
    departmentCount,
    employmentStatusCount,
    employmentTypeCount,
    isGettingAllEmployees,
    pages,
  };
}
