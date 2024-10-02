import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  changePage,
  resetValues,
} from "../../features/consultation/consultationSlice";
import { useConsultation } from "../../features/consultation/consultationThunk";
import { ConsultancyTable } from "../../components copy";
import ConsultationSearchModal from "../../components copy/searchModals/ConsultationSearchModal";

const ConsultationItems = () => {
  const dispatch = useDispatch();
  const {
    item_id,
    item_name,
    description,
    numOfTimesRendered,
    price,
    sort,
    pages,
    priceRangeC,
  } = useSelector((store) => store.consultations);
  const {
    isGettingAllC_Items,
    c_items: {
      consultancy_items = [],
      count = 0,
      numOfPages = 0,
      totalCitems = 0,
    } = {},
    refetch,
  } = useConsultation();
  const handleChange = (event, value) => {
    event.preventDefault();
    dispatch(changePage(value));
  };
  React.useEffect(() => {
    refetch();
  }, [
    pages,
    item_id,
    item_name,
    description,
    numOfTimesRendered,
    price,
    sort,
    priceRangeC,
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
        to="/admin/consultations/add"
      >
        create Consultation
      </Link>
      <p>
        {count} of {totalCitems}
      </p>

      <ConsultationSearchModal isGettingAllC_Items={isGettingAllC_Items} />
      {consultancy_items.length > 0 ? (
        <ConsultancyTable
          consultancy_items={consultancy_items}
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

export default ConsultationItems;
