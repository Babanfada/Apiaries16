import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { CustomButton } from "../../components copy";
import { Loader1 } from "../../components copy/Loader";
import { useParams } from "react-router-dom";
import {
  useCreatePolServices,
  useUpdatePolServices,
} from "../../features/pollination/polservicesThunk";
import { usePolServiceInputs } from "../../hooks/ServicesDetails";


const CreateUpdatePolServices = () => {
  const { id } = useParams();
  const { polServiceInputs } = usePolServiceInputs();
  const { isUpdatingPolservices, updatePolService } = useUpdatePolServices();
  const { createPolService, isCreatingPolservice } = useCreatePolServices();
  const {
    service_id,
    crop_type,
    service_description,
    rendered,
    price,
    isEdit,
  } = useSelector((store) => store.polservices);
  const polServiceDetails = {
    service_id,
    crop_type,
    service_description,
    rendered,
    price,
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = Object.values(polServiceDetails).every(
      (value) => value !== undefined && value !== null && value !== ""
    );
    if (!isValid) {
      alert("Please fill out all required fields.");
      return;
    }
    if (isEdit) return updatePolService({ polServiceDetails, id });
    createPolService(polServiceDetails);
  };
  return (
    <div>
      <Link to={`/admin/pollinationservices`}>Go back</Link>
      <form onSubmit={handleSubmit}>
        {polServiceInputs
          .filter(
            (detail) => detail.name !== "sort" && detail.name !== "priceRangeP"
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
          {isCreatingPolservice === "pending" ||
          isUpdatingPolservices === "pending" ? (
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

export default CreateUpdatePolServices;
