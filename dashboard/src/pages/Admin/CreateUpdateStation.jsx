import React from "react";
import { Link } from "react-router-dom";
import { useDashDetails_1 } from "../../hooks/DashDetails";
import {
  useCreateStation,
  useUpdateStation,
} from "../../features/stations/stationsThunk";
import { useSelector } from "react-redux";
import { CustomButton } from "../../components copy";
import { useParams } from "react-router-dom";
import { Loader1 } from "../../components copy/Loader";

const CreateUpdateStation = () => {
  const { id } = useParams();
  const { station_details } = useDashDetails_1();
  const { createStation, isCreatingStation } = useCreateStation();
  const { updateStation, isUpdatingStation } = useUpdateStation();
  const {
    isEdit,
    station_name,
    supervisor_int,
    supervisor_ext,
    location,
    longitude,
    latitude,
    station_size,
    number_of_hive_boxes,
    status,
    station_maintainace_history,
    last_inspection_date,
    next_inspection_date,
    notes,
    pages,
  } = useSelector((store) => store.stations);
  const stationDetails = {
    station_name,
    supervisor_int,
    supervisor_ext,
    location,
    longitude,
    latitude,
    station_size,
    number_of_hive_boxes,
    status,
    station_maintainace_history,
    notes,
  };

  const stationdetailsOnEdit = {
    station_name,
    supervisor_int,
    supervisor_ext,
    location,
    longitude,
    latitude,
    station_size,
    number_of_hive_boxes,
    status,
    station_maintainace_history,
    last_inspection_date,
    next_inspection_date,
    notes,
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Conditionally include inspection dates in the validation check if isEdit is true
    const detailsToValidate = isEdit ? stationdetailsOnEdit : stationDetails;

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
      return updateStation({ stationdetailsOnEdit, id });
    }

    createStation(stationDetails);
  };

  return (
    <div>
      {" "}
      <Link to="/admin/stations">Go back</Link>
      <form onSubmit={handleSubmit}>
        {station_details
          .filter((detail) => {
            if (
              detail.name === "sort" ||
              (!isEdit &&
                (detail.name === "next_inspection_date" ||
                  detail.name === "last_inspection_date"))
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
          {isCreatingStation === "pending" ||
          isUpdatingStation === "pending" ? (
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

export default CreateUpdateStation;
