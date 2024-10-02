import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { CustomButton } from "../../components copy";
import { Loader1 } from "../../components copy/Loader";
import { useParams } from "react-router-dom";
import {
  useCreateProvision,
  useUpdateProvision,
} from "../../features/supplyProvision/supplyprovThunk";
import { useProvisionInputs } from "../../hooks/ServicesDetails";

const CreateUpdateprovision = () => {
  const { id } = useParams();
  const { provisionInputs } = useProvisionInputs();
  const { isUpdatingProvision, updateProvision } = useUpdateProvision();
  const { createProvision, isCreatingProvision } = useCreateProvision();
  const { service_id, item_name, description, quantity, price_NGN, isEdit } =
    useSelector((store) => store.provisions);
  const provisionDetails = {
    service_id,
    item_name,
    description,
    quantity,
    price_NGN,
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = Object.values(provisionDetails).every(
      (value) => value !== undefined && value !== null && value !== ""
    );
    if (!isValid) {
      alert("Please fill out all required fields.");
      return;
    }
    if (isEdit) return updateProvision({ provisionDetails, id });
    createProvision(provisionDetails);
  };
  return (
    <div>
      <Link to={`/admin/supplyprovisionitems`}>Go back</Link>

      <form onSubmit={handleSubmit}>
        {provisionInputs
          .filter(
            (detail) => detail.name !== "sort" && detail.name !== "priceRangeSP"
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
          {isCreatingProvision === "pending" ||
          isUpdatingProvision === "pending" ? (
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

export default CreateUpdateprovision;
