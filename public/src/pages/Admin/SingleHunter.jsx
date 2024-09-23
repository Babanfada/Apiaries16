import React from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useSingleEquipment } from "../../features/equuipments/equipmentThunk";
import { useSingleHunter } from "../../features/hunters/huntersThunk";


const SingleHunter = () => {
  const { id } = useParams();
  const {
    isGettingSingleHunter,
    singleHunter: {
      hunter: {
        hunter_id,
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
        hives = [],
        catch_reports = [],
      } = {},
    } = {},
    refetch,
  } = useSingleHunter(id);

  React.useEffect(() => {
    refetch();
  }, [id]);

  return (
    <div>
      <Link to="/admin/swarmhunters">Go back</Link>
      <p>Full Name: {fullname}</p>
      <p>Tip: {tip}</p>
      <p>Joining Date: {joining_date ?? "No date set yet"}</p>

      <div>
        {catch_reports.length > 0 ? (
          catch_reports.map((report, i) => {
            const {
              assigned_supervisor,
              total_boxes_assigned,
              colonized_boxes,
              uncolonized_boxes,
              date_assigned,
              delivered_to_apiary,
            } = report;

            return (
              <div key={i}>
                <p>Total Boxes Assigned: {total_boxes_assigned}</p>
                <p>Assigned Supervisor: {assigned_supervisor}</p>
                <p>Date Assigned: {date_assigned}</p>
                <p>Delivered to Apiary: {delivered_to_apiary}</p>
              </div>
            );
          })
        ) : (
          <p>No catch reports available.</p>
        )}
      </div>

      <div>
        {hives.length > 0 ? (
          hives.map((hive, i) => {
            const {
              colonized,
              status,
              current_location,
              first_installation,
              last_inspection_date,
            } = hive;

            return (
              <div key={i}>
                <p>Colonized?: {colonized}</p>
                <p>Status: {status}</p>
                <p>Current Location: {current_location}</p>
                <p>
                  First Installation Date: {first_installation ?? "No date yet"}
                </p>
              </div>
            );
          })
        ) : (
          <p>No hives available.</p>
        )}
      </div>
    </div>
  );
};

export default SingleHunter;
