import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { CustomButton } from "../../components copy";
import { Loader1 } from "../../components copy/Loader";
import { useParams } from "react-router-dom";
import {
  useCreateSetup,
  useUpdateSetup,
} from "../../features/apiarySetup/setupCompThunk";
import { useSetupInputs } from "../../hooks/ServicesDetails";

const CreateUpdateSetup = () => {
  const { id } = useParams();
  const { setupInputs } = useSetupInputs();
  const { isUpdatingSetup, updateSetup } = useUpdateSetup();
  const { createSetup, isCreatingSetup } = useCreateSetup();
  const { service_id, component_name, description, stock, price, isEdit } =
    useSelector((store) => store.setups);
  const setupDetails = {
    service_id,
    component_name,
    description,
    stock,
    price,
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = Object.values(setupDetails).every(
      (value) => value !== undefined && value !== null && value !== ""
    );
    if (!isValid) {
      alert("Please fill out all required fields.");
      return;
    }
    if (isEdit) return updateSetup({ setupDetails, id });
    createSetup(setupDetails);
  };
  return (
    <div>
      <Link to={`/admin/apiarysetupcomp`}>Go back</Link>

      <form onSubmit={handleSubmit}>
        {setupInputs
          .filter(
            (detail) => detail.name !== "sort" && detail.name !== "priceRange"
          )
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
          {isCreatingSetup === "pending" || isUpdatingSetup === "pending" ? (
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
export default CreateUpdateSetup;
