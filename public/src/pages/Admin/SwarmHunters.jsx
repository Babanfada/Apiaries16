import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useHunters } from "../../features/hunters/huntersThunk";
import { changePage, resetValues } from "../../features/hunters/huntersSlice";
import { Hunters_Table } from "../../components";
import HunterSearchModal from "../../components/searchModals/HunterSearchModal";

const SwarmHunters = () => {
  const dispatch = useDispatch();
  const {
    assigned_supervisor,
    fullname,
    phone,
    email,
    joining_date,
    tip,
    employment_status,
    emergency_contact_name,
    emergency_contact,
    notes,
    isEdit,
    pages,
    sort
  } = useSelector((store) => store.hunters);
  const {
    isGettingAllHunters,
    hunters: {
      hunters = [],
      totalHunters = 0,
      count = 0,
      numOfPages = 1,
      contractStatusCount = [],
    } = {},
    refetch,
  } = useHunters();
  // console.log(pages);
  const handleChange = (event, value) => {
    event.preventDefault();
    dispatch(changePage(value));
  };
  React.useEffect(() => {
    refetch();
  }, [
    pages,
    assigned_supervisor,
    fullname,
    phone,
    email,
    joining_date,
    tip,
    employment_status,
    emergency_contact_name,
    emergency_contact,
    notes,
    sort
  ]);
  return (
    <div>
      <Link
        onClick={() => dispatch(resetValues())}
        to="/admin/createupdatehunter/add"
      >
        create Hunter
      </Link>
      <p>
        {count} of {totalHunters}
      </p>
      <div>
        {contractStatusCount.map(({ employment_status, count }, i) => {
          return (
            <p key={i}>
              employment_status:{employment_status}
              count:{count}
            </p>
          );
        })}
      </div>
      <HunterSearchModal isGettingAllHunters={isGettingAllHunters} />
      {hunters.length > 0 ? (
        <Hunters_Table
          hunters={hunters}
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

export default SwarmHunters;
