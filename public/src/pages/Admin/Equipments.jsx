import React from "react";
import { useGlobalContext } from "../../hooks/GlobalContext";
import { EquipmentTable } from "../../components";
import { Link } from "react-router-dom";
import {
  changePage,
  resetValues,
} from "../../features/equuipments/equipmentSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useEquipments } from "../../features/equuipments/equipmentThunk";
import EquipmentSearchModal from "../../components/searchModals/EquipmentSearchModal";

const Equipments = () => {
  const {
    equipments: {
      equipment = [],
      totalEquipments = 0,
      count = 0,
      numOfPages = 0,
      categoryCount = [],
      statusCount = [],
      storageLocationCount = [],
    },
  } = useGlobalContext();
  // console.log(equipment);
  const dispatch = useDispatch();
  const {
    pages,
    tool_name,
    supplier,
    currency,
    status,
    storage_location,
    retired,
    category,
    quantity,
    purchase_cost,
    purchase_date,
  } = useSelector((store) => store.equipments);
  const { refetch, isGettingAllequipments } = useEquipments();
  const handleChange = (event, value) => {
    event.preventDefault();
    dispatch(changePage(value));
  };
  React.useEffect(() => {
    refetch();
  }, [
    pages,
    tool_name,
    supplier,
    currency,
    status,
    storage_location,
    retired,
    category,
    quantity,
    purchase_cost,
    purchase_date,
  ]);
  // console.log(equipment);
  return (
    <div>
      <Link
        onClick={() => dispatch(resetValues())}
        to="/admin/createupdateequipment/add"
      >
        create equipment
      </Link>
      <p>
        {count} of {totalEquipments}
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
      <p>total Equipments:{totalEquipments}</p>
      <EquipmentSearchModal isGettingAllequipments={isGettingAllequipments} />
      {equipment.length > 0 ? (
        <EquipmentTable
          equipment={equipment}
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

export default Equipments;
