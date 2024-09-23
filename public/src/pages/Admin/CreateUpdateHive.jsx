import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { CustomButton } from "../../components";
import { Loader1 } from "../../components/Loader";
import { useParams } from "react-router-dom";
import { useHives } from "../../hooks/DashDetails_2";
import { useCreateHive, useUpdateHive } from "../../features/hives/hivesThunk";

const CreateUpdateHive = () => {
  const { id } = useParams();
  const { hiveInputs } = useHives();
  const { isUpdatingHive, updateHive } = useUpdateHive();
  const { createHive, isCreatingHive } = useCreateHive();
  const {
    assigned_hunter,
    hive_type,
    num_of_frames,
    colonized,
    status,
    use_condition,
    first_installation,
    current_location,
    last_inspection_date,
    note,
    isEdit,
  } = useSelector((store) => store.hives);
  const hiveDetails = {
    assigned_hunter,
    hive_type,
    num_of_frames,
    colonized,
    status,
    use_condition,
    first_installation,
    current_location,
    last_inspection_date,
    note,
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = Object.values(hiveDetails).every(
      (value) => value !== undefined && value !== null && value !== ""
    );
    if (!isValid) {
      alert("Please fill out all required fields.");
      return;
    }
    if (isEdit) return updateHive({ hiveDetails, id });
    createHive(hiveDetails);
  };
  return (
    <div>
      <Link to={`/admin/hives`}>Go back</Link>

      <form onSubmit={handleSubmit}>
        {hiveInputs
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
          {isCreatingHive === "pending" || isUpdatingHive === "pending" ? (
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

export default CreateUpdateHive;
