import React from "react";
import { Loader1 } from "../../components copy/Loader";
import { useSelector } from "react-redux";
import { CustomButton } from "../../components copy";
// import { useDispatch } from "react-redux";
// import { handleReset } from "../../features/employees/employeesSlice";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useCreateNok, useUpdateNok } from "../../features/nok/nokThunk";
import { useNok } from "../../hooks/DashDetails_2";

const CreateUpdateNok = () => {
  const { id } = useParams();
  const { createNok, isCreatingNok } = useCreateNok();
  const { updateNok, isUpdatingNok } = useUpdateNok();
  const { nokDetails: nokInput } = useNok();
  const {
    emp_id,
    fullname,
    email,
    address,
    phone,
    gender,
    relationship,
    isEdit,
  } = useSelector((store) => store.noks);
  const nokDetails = {
    emp_id,
    fullname,
    email,
    address,
    phone,
    gender,
    relationship,
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = Object.values(nokDetails).every(
      (value) => value !== undefined && value !== null && value !== ""
    );
    if (!isValid) {
      alert("Please fill out all required fields.");
      return;
    }
    if (isEdit) return updateNok({ nokDetails, id });
    createNok(nokDetails);
  };

  return (
    <div>
      <Link to="/admin/employeenok">Go back</Link>
      <form onSubmit={handleSubmit}>
        {nokInput
          .filter((detail) => detail.name !== "sort")
          .map((detail) => {
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
          {isCreatingNok === "pendiNokuseCreateNok " ||
          isUpdatingNok === "pending" ? (
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

export default CreateUpdateNok;
