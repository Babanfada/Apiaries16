import React from "react";
import { useHoneyHarvest } from "../../features/harvest/honey_harvestThunk";
import { HarvestSearchModal, Harvest_Table } from "../../components";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  changePage,
  resetValues,
} from "../../features/harvest/honey_harvestSlice";
import { useDispatch } from "react-redux";

const HoneyHarvest = () => {
  const {
    pages,
    harvest_year,
    station_id,
    station_name,
    harvest_date,
    quantity_collected,
    colouration,
    unit,
    quality_rating,
    note,
    sort
  } = useSelector((store) => store.harvests);
  const dispatch = useDispatch();
  const {
    isGettingAllHarvest,
    honey_harvest: {
      harvest = [],
      totalHarvestQuantity = 0,
      count = 0,
      harvestedVolumeByYear = [],
      qualityRatingCount = [],
      numOfPages = 0,
      totalHarvest = 0,
    } = {},
    refetch,
  } = useHoneyHarvest();
  const handleChange = (event, value) => {
    event.preventDefault();
    dispatch(changePage(value));
  };
  React.useEffect(() => {
    refetch();
  }, [
    pages,
    harvest_year,
    station_id,
    station_name,
    harvest_date,
    quantity_collected,
    colouration,
    unit,
    quality_rating,
    note,
    sort
  ]);
  return (
    <div>
      <Link
        onClick={() => dispatch(resetValues())}
        to="/admin/harvests/add"
      >
        create harvest
      </Link>
      <HarvestSearchModal isGettingAllHarvest={isGettingAllHarvest} />
      <p>tola harvest: {totalHarvestQuantity}</p>
      <div>
        {count} of {totalHarvest}
        {harvestedVolumeByYear.map(({ harvest_year, harvested_volume }, i) => {
          return (
            <p key={i}>
              harvest_year:{harvest_year}
              harvested_volume:{harvested_volume}
            </p>
          );
        })}
      </div>
      <div>
        {qualityRatingCount.map(({ quality_rating, count }, i) => {
          return (
            <p key={i}>
              quality_rating:{quality_rating}
              count:{count}
            </p>
          );
        })}
      </div>
      {harvest.length > 0 ? (
        <Harvest_Table
          harvest={harvest}
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

export default HoneyHarvest;
