import React from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useSingleEquipment } from "../../features/equuipments/equipmentThunk";

const SingleEquipment = () => {
  const { id } = useParams();
  const {
    isGettingSingleEquipment,
    singleEquipment: {
      equipment: {
        category,
        createdAt,
        currency,
        last_maintanace_date,
        next_maintanace_date,
        note,
        purchase_cost,
        purchase_date,
        quantity,
        retired,
        status,
        storage_location,
        supplier,
        tool_id,
        tool_name,
      } = {},
    } = {},
    refetch,
  } = useSingleEquipment(id);
  // console.log(
  //   category,
  //   createdAt,
  //   currency,
  //   last_maintanace_date,
  //   next_maintanace_date,
  //   note,
  //   purchase_cost,
  //   purchase_date,
  //   quantity,
  //   retired,
  //   status,
  //   storage_location,
  //   supplier,
  //   tool_id
  // );
  React.useEffect(() => {
    refetch();
  }, [id]);
  return (
    <div>
      <Link to={`/admin/equipments`}>Go back</Link>
      <p>tool name {tool_name}</p>
      <p>lastmaintanance date {last_maintanace_date ?? "no date set yet"}</p>
      <p>next maintanance date {next_maintanace_date ?? "no date set yet"}</p>
      <p>single equipment</p>
    </div>
  );
};

export default SingleEquipment;
