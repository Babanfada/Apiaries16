import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { CustomButton } from "../../components copy";
import { Loader1 } from "../../components copy/Loader";
import { useParams } from "react-router-dom";
import {
  useCreateService,
  useUpdateService,
} from "../../features/services/servicesThunk";
import { useServiceInputs } from "../../hooks/ServicesDetails";

const CreateUpdateService = () => {
  const { id } = useParams();
  const { serviceInputs } = useServiceInputs();
  const { isUpdatingService, updateService } = useUpdateService();
  const { createService, isCreatingService } = useCreateService();
  const { service_name, description, numOfTimesRendered, category, isEdit } =
    useSelector((store) => store.services);
  const serviceDetails = {
    service_name,
    description,
    numOfTimesRendered,
    category,
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = Object.values(serviceDetails).every(
      (value) => value !== undefined && value !== null && value !== ""
    );
    if (!isValid) {
      alert("Please fill out all required fields.");
      return;
    }
    if (isEdit) return updateService({ serviceDetails, id });
    createService(serviceDetails);
  };
  return (
    <div>
      <Link to={`/admin/services`}>Go back</Link>

      <form onSubmit={handleSubmit}>
        {serviceInputs
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
          {isCreatingService === "pending" ||
          isUpdatingService === "pending" ? (
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
export default CreateUpdateService;
