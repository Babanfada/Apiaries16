import React from "react";
import { useSubmit } from "react-router-dom";
import { useSupplies } from "../../features/supplies/suppliesThunk";
import { SuppliesTable } from "../../components";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { changePage, resetValues } from "../../features/supplies/suppliesSlice";
import { Link } from "react-router-dom";

const Supplies = () => {
  const { pages } = useSelector((store) => store.supplies);
  const dispatch = useDispatch();
  const {
    isGettingAllSupplies,
    supplies: {
      totalSUpplies,
      count,
      numOfPages,
      categoryCount = [],
      statusCount = [],
      storageLocationCount = [],
      supply = [],
    } = {},
    refetch,
  } = useSupplies();
  const handleChange = (event, value) => {
    event.preventDefault();
    dispatch(changePage(value));
  };
  React.useEffect(() => {
    refetch();
  }, [pages]);
  console.log(supply);
  return (
    <div>
      <Link
        onClick={() => dispatch(resetValues())}
        to="/admin/createupdatesupplies/add"
      >
        create supply
      </Link>
      <p>
        {count} of {totalSUpplies}
      </p>
      <div>
        {categoryCount.map(({ category, count }, i) => {
          return (
            <p key={i}>
              category:{category}
              count:{count}
            </p>
          );
        })}
      </div>
      <div>
        {storageLocationCount.map(({ storage_location, count }, i) => {
          return (
            <p key={i}>
              storage_location:{storage_location}
              count:{count}
            </p>
          );
        })}
      </div>
      <div>
        {statusCount.map(({ status, count }, i) => {
          return (
            <p key={i}>
              status:{status}
              count:{count}
            </p>
          );
        })}
      </div>
      <p>total Supplies:{totalSUpplies}</p>
      {supply.length > 0 ? (
        <SuppliesTable
          supply={supply}
          handleChange={handleChange}
          numOfPages={numOfPages}
          pages={pages}
        />
      ) : (
        "loading"
      )}
      Supplies
    </div>
  );
};

export default Supplies;
