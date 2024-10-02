import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { ProvisionSearchModal, ProvisionsTable } from "../../components copy";
import {
  changePage,
  resetValues,
} from "../../features/supplyProvision/supplyProvSlice";
import { useSupplyProvision } from "../../features/supplyProvision/supplyprovThunk";

const SupplyProvisionItems = () => {
  const dispatch = useDispatch();
  const {
    item_id,
    item_name,
    description,
    quantity,
    price,
    sort,
    pages,
    priceRangeSP,
  } = useSelector((store) => store.provisions);
  const {
    isGettingAllprovisions,
    supplyProvision: {
      provisions = [],
      count = 0,
      numOfPages = 0,
      totalProvisions = 0,
    } = {},
    refetch,
  } = useSupplyProvision();
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
    quantity,
    price,
    sort,
    priceRangeSP,
  ]);
  // console.log(
  //   item_id,
  //   item_name,
  //   description,
  //   quantity,
  //   price,
  //   sort,
  //   pages,
  //   priceRangeSP
  // );
  return (
    <div>
      <Link onClick={() => dispatch(resetValues())} to="/admin/provisions/add">
        create Provision
      </Link>
      <p>
        {count} of {totalProvisions}
      </p>

      <ProvisionSearchModal isGettingAllprovisions={isGettingAllprovisions} />
      {provisions.length > 0 ? (
        <ProvisionsTable
          provisions={provisions}
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
export default SupplyProvisionItems;
