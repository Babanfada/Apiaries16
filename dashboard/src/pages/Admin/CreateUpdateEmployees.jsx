import React from "react";
// import { useEmployee } from "../../hooks/register";
import {
  useCreateEmployee,
  useUpdateEmployee,
  useUploadEmployeeImages,
} from "../../features/employees/employeesThunk";
import { Loader1 } from "../../components copy/Loader";
import { useSelector } from "react-redux";
import { CustomButton, InputFileUpload } from "../../components copy";
import { useDispatch } from "react-redux";
import { handleReset } from "../../features/employees/employeesSlice";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEmployee } from "hooks/Register";

const CreateUpdateEmployees = () => {
  const { id } = useParams();
  const { employeeDetails } = useEmployee();
  // const dispatch = useDispatch();
  const { createEmployee, isCreatingEmployee } = useCreateEmployee();
  const { updateEmployee, isUpdatingEmployee } = useUpdateEmployee();

  const {
    email,
    first_name,
    last_name,
    address,
    phone,
    gender,
    role,
    department,
    dob,
    joining_date,
    salary,
    skill,
    notes,
    employment_status,
    employment_type,
    isEdit,
  } = useSelector((store) => store.employees);
  const empDetails = {
    email,
    first_name,
    last_name,
    address: address.trim(),
    phone,
    gender,
    role,
    department,
    dob,
    joining_date,
    salary,
    skill,
    notes: notes.trim(),
    employment_status,
    employment_type,
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = Object.values(empDetails).every(
      (value) => value !== undefined && value !== null && value !== ""
    );
    if (!isValid) {
      alert("Please fill out all required fields.");
      return;
    }
    if (isEdit) return updateEmployee({ empDetails, id });
    createEmployee(empDetails);
  };
  const { uploadEmployeeImgs, isUploadingEmployeeImages } =
    useUploadEmployeeImages(id);

  const uploadEmployeeAvatar = (e) => {
    const file = e.target.files[0]; // Get the first file from the input
    const formData = new FormData();
    if (file) {
      formData.append("image", file); // Append only one file with key "image"
      uploadEmployeeImgs(formData);
      // console.log(file, formData);
    } else {
      alert("Please select a file to upload.");
    }
  };

  return (
    <div>
      <Link to="/admin/employees">Go back</Link>
      {isEdit ? (
        <InputFileUpload
          name={"image"}
          handleChange={uploadEmployeeAvatar}
          uploading={isUploadingEmployeeImages}
        />
      ) : (
        ""
      )}
      <form onSubmit={handleSubmit}>
        {employeeDetails.map((detail) => {
          const { name, TextField } = detail;
          return <div key={name}>{TextField}</div>;
        })}
        <CustomButton
          background={"#1212121F"}
          backgroundhover={"#59d9d9"}
          size={"100%"}
          height={"3vh"}
          type="submit"
          // disabled={!isValid}
        >
          {isCreatingEmployee === "pending" ||
          isUpdatingEmployee === "pending" ? (
            <Loader1 />
          ) : isEdit ? (
            "Update"
          ) : (
            "Submit"
          )}
        </CustomButton>
      </form>
    </div>
  );
};

export default CreateUpdateEmployees;
