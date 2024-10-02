import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useReports } from "../../features/catch_reports/reportsThunk";
import { changePage } from "../../features/catch_reports/reportSlice";
import { ReportSearchModal, ReportTable } from "../../components copy";

const CatchReports = () => {
  const dispatch = useDispatch();
  const {
    total_boxes_assigned,
    colonized_boxes,
    uncolonized_boxes,
    catch_date,
    catch_status,
    season,
    sort,
    pages,
  } = useSelector((store) => store.reports);
  const {
    isGettingAllReports,
    catch_reports: {
      reports = [],
      totalReports = 0,
      count = 0,
      numOfPages = 0,
      totalboxesAssigned = 0,
      totalColonized = 0,
      totalUnColonized = 0,
    },
    refetch,
  } = useReports();
  const handleChange = (event, value) => {
    event.preventDefault();
    dispatch(changePage(value));
  };
  React.useEffect(() => {
    refetch();
  }, [
    pages,
    total_boxes_assigned,
    colonized_boxes,
    uncolonized_boxes,
    catch_date,
    catch_status,
    season,
    sort,
  ]);
  // console.log(reports)
  return (
    <div>
      <Link
        onClick={() => dispatch(resetValues())}
        to="/admin/createupdatereport/add"
      >
        create Report
      </Link>
      <p>
        {count} of {totalReports}
      </p>
      <p>total boxes assigned:{totalboxesAssigned}</p>
      <p>total colonized:{totalColonized}</p>
      <p>total uncolonized:{totalUnColonized}</p>
      <ReportSearchModal isGettingAllReports={isGettingAllReports} />
      {reports.length > 0 ? (
        <ReportTable
          reports={reports}
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

export default CatchReports;
