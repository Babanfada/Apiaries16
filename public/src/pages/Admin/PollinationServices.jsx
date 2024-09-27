import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { usePolServices } from "../../features/pollination/polservicesThunk";
import { PolServSearchModal, Pol_ServTable } from "../../components";
import { changePage, resetValues } from "../../features/pollination/polservicesSlice";

const PollinationServices = () => {
  const dispatch = useDispatch();
  const {
    sort,
    pages,
    priceRangeP,
    service_id,
    crop_type,
    service_description,
    rendered,
    price,
  } = useSelector((store) => store.polservices);
  const {
    isGettingAllPolServices,
    polservices: { polservices = [], totalPolServices, count, numOfPages } = {},
    refetch,
  } = usePolServices();
  const handleChange = (event, value) => {
    event.preventDefault();
    dispatch(changePage(value));
  };
  React.useEffect(() => {
    refetch();
  }, [
    pages,
    service_id,
    crop_type,
    service_description,
    rendered,
    price,
    sort,
    priceRangeP,
  ]);
  // console.log(
  //   item_id,
  //   item_name,
  //   description,
  //   numOfTimesRendered,
  //   price,
  //   sort,
  //   pages,
  //   priceRangeC
  // );
  return (
    <div>
      <Link
        onClick={() => dispatch(resetValues())}
        to="/admin/pollinationservices/add"
      >
        create Pollination service
      </Link>
      <p>
        {count} of {totalPolServices}
      </p>

      <PolServSearchModal  isGettingAllPolServices={ isGettingAllPolServices} />
      {polservices.length > 0 ? (
        <Pol_ServTable
          polservices={polservices}
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

export default PollinationServices;
