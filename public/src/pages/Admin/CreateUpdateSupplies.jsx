import React from "react";
import { Link } from "react-router-dom";
import { useSuppliesInputs } from "../../hooks/DashDetails";
import { CustomButton } from "../../components";
import {
  useCreateSupply,
  useUpdateSupply,
} from "../../features/supplies/suppliesThunk";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Loader1 } from "../../components/Loader";

const CreateUpdateSupplies = () => {
  const { suppliesDetails } = useSuppliesInputs();
  const { createSupply, isCreatingSupply } = useCreateSupply();
  const { updateSupply, isUpdatingSupply } = useUpdateSupply();
  const { id } = useParams();
  const {
    isEdit,
    supply_name,
    category,
    quantity,
    status,
    storage_location,
    supplier,
    minimum_stock_level,
    purchase_date,
    purchase_cost,
  } = useSelector((store) => store.supplies);

  const supplyDetails = {
    supply_name,
    category,
    quantity,
    status,
    storage_location,
    supplier,
    minimum_stock_level,
    purchase_date,
    purchase_cost,
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = Object.values(supplyDetails).every(
      (value) => value !== undefined && value !== null && value !== ""
    );

    if (!isValid) {
      alert(
        "Please fill out all required fields, especially the dates field if available."
      );
      return;
    }

    if (isEdit) {
      return updateSupply({ supplyDetails, id });
    }

    createSupply(supplyDetails);
  };

  return (
    <div>
      <Link to="/admin/supplies">Go back</Link>CreateUpdateSupplies
      <form onSubmit={handleSubmit}>
        {suppliesDetails
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
          {isCreatingSupply === "pending" || isUpdatingSupply === "pending" ? (
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

export default CreateUpdateSupplies;
