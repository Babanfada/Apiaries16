import React from "react";
import { StationsTable } from "../../components copy";
import { useStations } from "../../features/stations/stationsThunk";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { changePage, resetValues } from "../../features/stations/stationSlice";
import { Link } from "react-router-dom";
import StationSearchModal from "../../components copy/searchModals/StationSearchModal";

const Stations = () => {
  const dispatch = useDispatch();
  const {
    pages,
    station_name,
    supervisor_int,
    supervisor_ext,
    location,
    status,
    station_size,
    number_of_hive_boxes,
    last_inspection_date,
    next_inspection_date,
    sort,
  } = useSelector((store) => store.stations);
  const {
    isGettingStations,
    stations: {
      stations: Stations = [],
      count = 0,
      totalStations = 0,
      numOfPages = 0,
      totalHives = 0,
      stationSizeCount = [],
    } = {},
    refetch,
  } = useStations();
  console.log({
    Stations,
    // numOfPages: numOfPages,
    // totalHives: totalHives,
    // stationSizeCount: stationSizeCount,
    count: count,
    pages: pages,
  });
  const handleChange = (event, value) => {
    event.preventDefault();
    dispatch(changePage(value));
  };
  React.useEffect(() => {
    refetch();
  }, [
    pages,
    station_name,
    supervisor_int,
    supervisor_ext,
    location,
    status,
    station_size,
    number_of_hive_boxes,
    last_inspection_date,
    next_inspection_date,
    sort,
  ]);
  return (
    <div>
      <Link
        onClick={() => dispatch(resetValues())}
        to="/admin/createupdatestation/add"
      >
        create station
      </Link>
      <p>
        {count} of {totalStations}
      </p>
      <div>
        {stationSizeCount.map(({ station_size, count }, i) => {
          return (
            <p key={i}>
              station_size:{station_size}
              count:{count}
            </p>
          );
        })}
      </div>
      <p>total hives:{totalHives}</p>
      <StationSearchModal isGettingStations={isGettingStations} />
      {Stations.length > 0 ? (
        <StationsTable
          stations={Stations}
          handleChange={handleChange}
          numOfPages={numOfPages}
          pages={pages}
        />
      ) : (
        "loading"
      )}
    </div>
  );
};

export default Stations;
