import React from "react";
import { Link } from "react-router-dom";
import { useEquipments } from "../../hooks/DashDetails";
import { CustomButton } from "../../components";
import { useSelector } from "react-redux";
import {
  useCreateEqupment,
  useUpdateEquipment,
} from "../../features/equuipments/equipmentThunk";
import { Loader1 } from "../../components/Loader";
import { useParams } from "react-router-dom";

const CreateUpdateEquipment = () => {
  const { id } = useParams();
  const { equipmentDetails } = useEquipments();
  const { isCreatingEquipment, createEquipment } = useCreateEqupment();
  const { isUpdatingEquipment, updateEquipment } = useUpdateEquipment();
  const {
    isEdit,
    tool_name,
    category,
    quantity,
    status,
    storage_location,
    supplier,
    purchase_date,
    purchase_cost,
    currency,
    last_maintanace_date,
    next_maintanace_date,
    retired,
    note,
  } = useSelector((store) => store.equipments);
  const equipment_details = {
    tool_name,
    category,
    quantity,
    status,
    storage_location,
    supplier,
    purchase_date,
    purchase_cost,
    currency,
    // last_maintanace_date,
    // next_maintanace_date,
    note,
  };

  const equipmentdetailsOnEdit = {
    tool_name,
    category,
    quantity,
    status,
    storage_location,
    supplier,
    purchase_date,
    purchase_cost,
    currency,
    last_maintanace_date,
    next_maintanace_date,
    retired,
    note,
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Conditionally include inspection dates in the validation check if isEdit is true
    const detailsToValidate = isEdit
      ? equipmentdetailsOnEdit
      : equipment_details;

    const isValid = Object.values(detailsToValidate).every(
      (value) => value !== undefined && value !== null && value !== ""
    );

    if (!isValid) {
      alert(
        "Please fill out all required fields,especially the dates field if available."
      );
      return;
    }

    if (isEdit) {
      return updateEquipment({ equipmentdetailsOnEdit, id });
    }

    createEquipment(equipment_details);
  };
  return (
    <div>
      <Link to={`/admin/equipments`}>Go back</Link>
      <form onSubmit={handleSubmit}>
        {equipmentDetails
          .filter((detail) => {
            if (
              !isEdit &&
              (detail.name === "retired" ||
                detail.name === "last_maintanace_date" ||
                detail.name === "next_maintanace_date")
            ) {
              return false; // Exclude these fields in edit mode
            }
            return true; // Include all other fields
          })
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
          {isCreatingEquipment === "pending" ||
          isUpdatingEquipment === "pending" ? (
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

export default CreateUpdateEquipment;
