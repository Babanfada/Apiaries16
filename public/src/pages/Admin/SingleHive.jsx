import React from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useSingleHive } from "../../features/hives/hivesThunk";
const SingleHive = () => {
  const { id } = useParams();
  const {
    isGettingSingleHive,
    singleHive: {
      hive: {
        hive_id,
        assigned_hunter,
        hive_type,
        num_of_frames,
        colonized,
        status,
        use_condition,
        first_installation,
        current_location,
        last_inspection_date,
        note,
      } = {},
    } = {},
    refetch,
  } = useSingleHive(id);

  React.useEffect(() => {
    refetch();
  }, [id]);

  return (
    <div>
      <Link to="/admin/hives">Go back</Link>
      <p>Hive ID: {hive_id}</p>
      <p>Type: {hive_type}</p>
      <p>Installation Date: {first_installation ?? "No date set yet"}</p>
      <p>Last Inspection Date: {last_inspection_date ?? "No date set yet"}</p>
    </div>
  );
};

export default SingleHive;
