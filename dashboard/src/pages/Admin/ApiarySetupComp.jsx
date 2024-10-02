import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useSetupComp } from "../../features/apiarySetup/setupCompThunk";
import {
  changePage,
  resetValues,
} from "../../features/apiarySetup/setupCompSlice";
import { SetupSearchModal, SetupTable } from "../../components copy";

const ApiarySetupComp = () => {
  const dispatch = useDispatch();
  const {
    service_id,
    component_name,
    description,
    stock,
    price,
    sort,
    pages,
    priceRange,
  } = useSelector((store) => store.setups);
  const {
    isGettingAllSetupComp,
    setupComp: {
      apiarySetupComp = [],
      count = 0,
      numOfPages = 0,
      totalSetupComp = 0,
    } = {},
    refetch,
  } = useSetupComp();
  const handleChange = (event, value) => {
    event.preventDefault();
    dispatch(changePage(value));
  };
  React.useEffect(() => {
    refetch();
  }, [
    pages,
    service_id,
    component_name,
    description,
    stock,
    price,
    sort,
    priceRange,
  ]);
  // console.log( apiarySetupComp)
  return (
    <div>
      <Link
        onClick={() => dispatch(resetValues())}
        to="/admin/createupdatesetup/add"
      >
        create Setup
      </Link>
      <p>
        {count} of {totalSetupComp}
      </p>

      <SetupSearchModal isGettingAllSetupComp={isGettingAllSetupComp} />
      {apiarySetupComp.length > 0 ? (
        <SetupTable
          apiarySetupComp={apiarySetupComp}
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

export default ApiarySetupComp;
