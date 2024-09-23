import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useHunters } from "../../hooks/DashDetails_2";
import { CustomButton } from "../../components";
import { Loader1 } from "../../components/Loader";
import { useParams } from "react-router-dom";
import {
  useCreateHunter,
  useUpdateHunter,
} from "../../features/hunters/huntersThunk";

const CreateUpdateHunter = () => {
  const { id } = useParams();
  const { hunterInputs } = useHunters();
  const { isUpdatingHunter, updateHunter } = useUpdateHunter();
  const { createHunter, isCreatingHunter } = useCreateHunter();
  const {
    assigned_supervisor,
    fullname,
    phone,
    email,
    joining_date,
    tip,
    employment_status,
    emergency_contact_name,
    emergency_contact,
    notes,
    isEdit,
  } = useSelector((store) => store.hunters);
  const hunterDetails = {
    assigned_supervisor,
    fullname,
    phone,
    email,
    joining_date,
    tip,
    employment_status,
    emergency_contact_name,
    emergency_contact,
    notes,
  };
  //   console.log(hunterDetails);
  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = Object.values(hunterDetails).every(
      (value) => value !== undefined && value !== null && value !== ""
    );
    if (!isValid) {
      alert("Please fill out all required fields.");
      return;
    }
    if (isEdit) return updateHunter({ hunterDetails, id });
    createHunter(hunterDetails);
  };
  return (
    <div>
      <Link to="/admin/swarmhunters">Go back</Link>
      <form onSubmit={handleSubmit}>
        {hunterInputs
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
        >
          {isCreatingHunter === "pending" || isUpdatingHunter === "pending" ? (
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

export default CreateUpdateHunter;
