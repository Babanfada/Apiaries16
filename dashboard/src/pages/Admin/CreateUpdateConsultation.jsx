import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { CustomButton } from "../../components copy";
import { Loader1 } from "../../components copy/Loader";
import { useParams } from "react-router-dom";
import {
  useCreateConsultation,
  useUpdateConsultation,
} from "../../features/consultation/consultationThunk";
import { useConsultationInputs } from "../../hooks/ServicesDetails";

const CreateUpdateConsultation = () => {
  const { id } = useParams();
  const { consultationInputs } = useConsultationInputs();
  const { isUpdatingConsultation, updateConsultation } = useUpdateConsultation();
  const { createConsultation, isCreatingConsultation } = useCreateConsultation();
  const { service_id, item_name, description, numOfTimesRendered, price, isEdit } = useSelector(
    (store) => store.consultations
  );
  const consultationDetails = {
    service_id,
    item_name,
    description,
    numOfTimesRendered,
    price,
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = Object.values(consultationDetails).every(
      (value) => value !== undefined && value !== null && value !== ""
    );
    if (!isValid) {
      alert("Please fill out all required fields.");
      return;
    }
    if (isEdit) return updateConsultation({ consultationDetails, id });
    createConsultation(consultationDetails);
  };
  return (
    <div>
      <Link to={`/admin/consultaionitems`}>Go back</Link>

      <form onSubmit={handleSubmit}>
        {consultationInputs
          .filter((detail) => detail.name !== "sort" && detail.name !== "priceRangeC")
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
          {isCreatingConsultation === "pending" || isUpdatingConsultation === "pending" ? (
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

export default CreateUpdateConsultation;
