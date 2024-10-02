import React from "react";
// import { StationsTable } from "../../components";
// import { useStations } from "../../features/stations/stationsThunk";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
// import { changePage, resetValues } from "../../features/stations/stationSlice";
import { Link } from "react-router-dom";
import { HivesTable } from "../../components copy";
import { useHives } from "../../features/hives/hivesThunk";
import { changePage, resetValues } from "../../features/hives/hiveSlice";
import HiveSearchModal from "../../components copy/searchModals/HiveSearchModal";
// import StationSearchModal from "../../components/searchModals/StationSearchModal";

const Hives = () => {
  const dispatch = useDispatch();
  const {
    pages,
    assigned_hunter,
    hive_type,
    num_of_frames,
    colonized,
    status,
    use_condition,
    first_installation,
    current_location,
    last_inspection_date,
    note,
    sort,
  } = useSelector((store) => store.hives);
  const {
    isGettingAllHives,
    hives: {
      hives = [],
      totalHives = 0,
      count = 0,
      numOfPages = 0,
      colonizationCount = [],
      hiveCurrentLocationCount = [],
      hiveStatusCount = [],
      hiveTypeCount = [],
      hiveUseConditionCount = [],
    },
    refetch,
  } = useHives();
  // console.log({});
  const handleChange = (event, value) => {
    event.preventDefault();
    dispatch(changePage(value));
  };
  React.useEffect(() => {
    refetch();
  }, [
    pages,
    assigned_hunter,
    hive_type,
    num_of_frames,
    colonized,
    status,
    use_condition,
    first_installation,
    current_location,
    last_inspection_date,
    note,
    sort,
  ]);
  return (
    <div>
      <Link
        onClick={() => dispatch(resetValues())}
        to="/admin/createupdatehive/add"
      >
        create Hive
      </Link>
      <p>
        {count} of {totalHives}
      </p>
      <div>
        {colonizationCount.map(({ colonized, count }, i) => {
          return (
            <p key={i}>
              colonized:{colonized}
              count:{count}
            </p>
          );
        })}
      </div>
      <div>
        {hiveCurrentLocationCount.map(({ current_location, count }, i) => {
          return (
            <p key={i}>
              current_location:{current_location}
              count:{count}
            </p>
          );
        })}
      </div>
      <div>
        {hiveStatusCount.map(({ status, count }, i) => {
          return (
            <p key={i}>
              status:{status}
              count:{count}
            </p>
          );
        })}
      </div>
      <div>
        {hiveTypeCount.map(({ hive_type, count }, i) => {
          return (
            <p key={i}>
              hive_type:{hive_type}
              count:{count}
            </p>
          );
        })}
      </div>
      <div>
        {hiveUseConditionCount.map(({ use_condition, count }, i) => {
          return (
            <p key={i}>
              use_condition:{use_condition}
              count:{count}
            </p>
          );
        })}
      </div>
      <p>total hives:{totalHives}</p>
      <HiveSearchModal isGettingStations={isGettingAllHives} />
      {hives.length > 0 ? (
        <HivesTable
          hives={hives}
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

export default Hives;
