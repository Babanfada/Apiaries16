import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useHarvest } from "../../hooks/DashDetails_2";
import {
  useCreateHarvest,
  useUpdateHarvest,
} from "../../features/harvest/honey_harvestThunk";
import { CustomButton } from "../../components copy";
import { Loader1 } from "../../components copy/Loader";
import { useParams } from "react-router-dom";

const CreateUpdateHarvest = () => {
  const { id } = useParams();
  const { harvestInputs } = useHarvest();
  const { isUpdatingHarvest, updateHarvest } = useUpdateHarvest();
  const { createHarvest, isCreatingHarvest } = useCreateHarvest();
  const {
    harvest_year,
    station_id,
    station_name,
    harvest_date,
    quantity_collected,
    colouration,
    unit,
    quality_rating,
    note,
    isEdit,
  } = useSelector((store) => store.harvests);
  const harvestDetails = {
    harvest_year,
    station_id,
    station_name,
    harvest_date,
    quantity_collected,
    colouration,
    unit,
    quality_rating,
    note,
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = Object.values(harvestDetails).every(
      (value) => value !== undefined && value !== null && value !== ""
    );
    if (!isValid) {
      alert("Please fill out all required fields.");
      return;
    }
    if (isEdit) return updateHarvest({ harvestDetails, id });
    createHarvest(harvestDetails);
  };
  return (
    <div>
      <Link to={`/admin/honeyharvest`}>Go back</Link>

      <form onSubmit={handleSubmit}>
        {harvestInputs
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
          {isCreatingHarvest === "pending" ||
          isUpdatingHarvest === "pending" ? (
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

export default CreateUpdateHarvest;
