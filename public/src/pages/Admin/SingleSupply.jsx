import React from "react";
import { Link } from "react-router-dom";
import { useSingleSuppply } from "../../features/supplies/suppliesThunk";
import { useParams } from "react-router-dom";

const SingleSupply = () => {
  const { id } = useParams();
  const {
    isGettingSingleSupply,
    singleSupply: {
      supply: {
        supply_name,
        category,
        quantity,
        status,
        storage_location,
        supplier,
        minimum_stock_level,
        purchase_date,
        purchase_cost,
      } = {},
    } = {},
    refetch,
  } = useSingleSuppply(id);
//   console.log(
//     category,
//     quantity,
//     status,
//     storage_location,
//     supplier,
//     minimum_stock_level,
//     purchase_date,
//     purchase_cost
//   );
  React.useEffect(() => {
    refetch();
  }, [id]);
  return (
    <div>
      {" "}
      <Link to="/admin/supplies">Go back</Link>
      <p>supply Name:{supply_name}</p>
    </div>
  );
};

export default SingleSupply;
