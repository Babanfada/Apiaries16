import React from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useSingleEmployee } from "../../features/employees/employeesThunk";

const SingleEmployee = () => {
  const { id } = useParams();
  React.useEffect(() => {
    refetch();
  }, [id]);
  const { isGettingSingleEmployee, singleemployee, refetch } =
    useSingleEmployee(id);
  const { employee } = singleemployee || {};

  const {
    catch_reports = [],
    employee_nok = {},
    externallySupervising = [],
    internallySupervising = [],
    swarm_hunters = [],
    // emp_id,
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
  } = employee ?? {};
  console.log(
    // isGettingSingleEmployee,
    // employee,
    catch_reports,
    // employee_nok,
    externallySupervising,
    internallySupervising,
    swarm_hunters,
    // emp_id,
    // first_name,
    // last_name,
    // gender,
    // email,
    // dob,
    // phone,
    // image,
    // role,
    // address,
    // department,
    // employment_type,
    // employment_status,
    // salary,
    // joining_date,
    // skill,
    // notes
  );
  return (
    <div>
      <Link to="/admin/employees">Go back to employee</Link>
      SingleEmployee
      <p>salary:{salary}</p>
      <img src={image} alt="image" height={"50px"} />
      <p>skill:{skill}</p>
      <p>date joined:{joining_date}</p>
      <p>notes:{notes}</p>
    </div>
  );
};

export default SingleEmployee;
