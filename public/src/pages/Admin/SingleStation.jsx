import React from "react";
import { Link } from "react-router-dom";
import { useSingleStation } from "../../features/stations/stationsThunk";
import { useParams } from "react-router-dom";

const SingleStation = () => {
  const { id } = useParams();
  const {
    isGettingSingleStation,
    singleStation: {
      station: {
        honey_harvests = [],
        last_inspection_date,
        latitude,
        location,
        longitude,
        next_inspection_date,
        notes,
        number_of_hive_boxes,
        station_id,
        station_maintainace_history,
        station_name,
        station_size,
        status,
        supervisor_ext,
        supervisor_int,
      } = {},
    } = {},
    refetch,
  } = useSingleStation(id);

    console.log(
  //     isGettingSingleStation,
      honey_harvests,
  //     last_inspection_date,
  //     latitude,
  //     location,
  //     longitude,
  //     next_inspection_date,
  //     notes,
  //     number_of_hive_boxes,
  //     station_id,
  //     station_maintainace_history,
  //     station_name,
  //     station_size,
  //     status,
  //     "here"
    );
  React.useEffect(() => {
    refetch();
  }, [id]);
  return (
    <div>
      {" "}
      <Link to="/admin/stations">Go back</Link>
      <Link to="/admin/honeyharvest">honey harvest</Link>
      <Link to={`/admin/employees/${supervisor_ext}`}>
        {" "}
        external supervisor
      </Link>
      <Link to={`/admin/employees/${supervisor_int}`}>
        {" "}
        internal supervisor
      </Link>
      <div>
        {honey_harvests.length === 0 ? (
          <p>No harvest for this station yet</p>
        ) : (
          honey_harvests.map(
            (
              {
                harvest_date,
                harvest_year,
                quality_rating,
                quantity_collected,
                unit,
              },
              i
            ) => (
              <span key={i}>
                <p>Harvest Date: {harvest_date}</p>
                <p>Harvest Year: {harvest_year}</p>
                <p>Quality Rating: {quality_rating}</p>
                <p>Quantity Collected: {quantity_collected}</p>
                <p>Unit: {unit}</p>
              </span>
            )
          )
        )}
      </div>
    </div>
  );
};

export default SingleStation;
