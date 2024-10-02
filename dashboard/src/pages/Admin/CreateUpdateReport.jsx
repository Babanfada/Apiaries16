import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { CustomButton } from "../../components copy";
import { Loader1 } from "../../components copy/Loader";
import { useParams } from "react-router-dom";
import {
  useCreateReport,
  useUpdateReport,
} from "../../features/catch_reports/reportsThunk";
import { useCatchReports } from "../../hooks/DashDetails_2";

const CreateUpdateReport = () => {
  const { id } = useParams();
  const { reportInputs } = useCatchReports();
  const { isUpdatingReport, updateReport } = useUpdateReport();
  const { createReport, isCreatingReport } = useCreateReport();
  const {
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
    isEdit,
  } = useSelector((store) => store.reports);
  const reportDetails = {
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
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = Object.values(reportDetails).every(
      (value) => value !== undefined && value !== null && value !== ""
    );
    if (!isValid) {
      alert("Please fill out all required fields.");
      return;
    }
    if (isEdit) return updateReport({ reportDetails, id });
    createReport(reportDetails);
  };
  return (
    <div>
      <Link to={`/admin/catchreports`}>Go back</Link>

      <form onSubmit={handleSubmit}>
        {reportInputs
          .filter((detail) => detail.name !== "sort")
          .map((detail) => {
            const { name, TextField } = detail;
            return <div key={name}>{TextField}</div>;
          })}
        <CustomButton
          background={"#1212121F"}
          backgroundhover={"#59d9d9"}
          size={"100%"}
          height={"3vh"}
          type="submit"
          // disabled={!isValid}
        >
          {isCreatingReport === "pending" || isUpdatingReport === "pending" ? (
            <Loader1 />
          ) : isEdit ? (
            "Update"
          ) : (
            "Submit"
          )}
        </CustomButton>
      </form>
    </div>
  );
};
export default CreateUpdateReport;
