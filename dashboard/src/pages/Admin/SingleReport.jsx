import React from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useSingleReport } from "../../features/catch_reports/reportsThunk";
const SingleReport = () => {
  const { id } = useParams();
  const {
    isGettingSingleReport,
    singleReport: {
      report: {
        report_id,
        hunter_id,
        assigned_supervisor,
        total_boxes_assigned,
        colonized_boxes,
        uncolonized_boxes,
        delivered_to_apiary,
        date_assigned,
        catch_date,
        catch_location,
        catch_status,
        season,
        notes,
      } = {},
    } = {},
    refetch,
  } = useSingleReport(id);

  React.useEffect(() => {
    refetch();
  }, [id]);

  return (
    <div>
      <Link to="/admin/catchreports">Go back</Link>
      <p>Report ID: {report_id}</p>
      <p>colonized: {colonized_boxes}</p>
      <p>un-colonized: {uncolonized_boxes}</p>
      <p>Assigned date: {date_assigned ?? "No date set yet"}</p>
      <p>Catch date: {catch_date ?? "No date set yet"}</p>
    </div>
  );
};

export default SingleReport;
