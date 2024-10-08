import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import React from "react";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
// Data
// import employeesTableData from "layouts/tables/data/employeesTableData";
import projectsTableData from "layouts/tables/data/projectsTableData";
// import { useSingleEmployee } from "features/employees/employeesThunk";
import { useParams } from "react-router-dom";
import Divider from "@mui/material/Divider";
// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import { Email } from "@mui/icons-material";
import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";
import ProfilesList from "examples/Lists/ProfilesList";
import DefaultProjectCard from "examples/Cards/ProjectCards/DefaultProjectCard";
import Header from "./profile/components/Header";
import PlatformSettings from "./profile/components/PlatformSettings";
import { useDispatch, useSelector } from "react-redux";
// import { useUploadEmployeeImages } from "features/employees/employeesThunk";
import { Link } from "react-router-dom";
import { CustomButton } from "components copy";
import { Loader1 } from "components copy/Loader";
import PaginationControlled from "components copy/component's_Tables/Pagination";
import LogoAsana from "assets/images/small-logos/logo-asana.svg";
import moment from "moment";
import equipmentsTableData from "./data/equipmentsTableData";
import { changePage } from "features/equuipments/equipmentSlice";
import EquipmentSearchModal from "components copy/searchModals/EquipmentSearchModal";
import { useEquipments } from "hooks/DashDetails";
import { useCreateEqupment } from "features/equuipments/equipmentThunk";
import { useUpdateEquipment } from "features/equuipments/equipmentThunk";
import { resetValues } from "features/equuipments/equipmentSlice";

function Equipments() {
  const dispatch = useDispatch();
  const {
    columns,
    rows,
    numOfPages,
    count,
    refetch,
    totalEquipments,
    categoryCount,
    statusCount,
    storageLocationCount,
    isGettingAllequipments,
  } = equipmentsTableData();
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
    sort,
  } = useSelector((store) => store.equipments);

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
    sort,
  ]);
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Equipments
                  {count}/{totalEquipments}
                  <Link onClick={() => dispatch(resetValues())} to="/createupdateequipment/add">
                    create equipment
                  </Link>
                  <EquipmentSearchModal isGettingAllequipments={isGettingAllequipments} />
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns, rows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
            </Card>
            <PaginationControlled pageDetails={{ handleChange, numOfPages, pages }} />
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}
export default Equipments;

// export function SingleStation() {
//   const { id } = useParams();
//   const {
//     isGettingSingleStation,
//     singleStation: {
//       station: {
//         honey_harvests = [],
//         last_inspection_date,
//         latitude,
//         location,
//         longitude,
//         next_inspection_date,
//         notes,
//         number_of_hive_boxes,
//         station_id,
//         station_maintainace_history,
//         station_name,
//         station_size,
//         status,
//         supervisor_ext,
//         supervisor_int,
//       } = {},
//     } = {},
//     refetch,
//   } = useSingleStation(id);
//   React.useEffect(() => {
//     refetch();
//   }, [id]);
//   return (
//     <DashboardLayout>
//       <DashboardNavbar />
//       <MDBox mb={2} />
//       <Header info={{ image: LogoAsana, station_name, location }}>
//         <MDBox mt={5} mb={3}>
//           <Link to="/stations">Go back</Link>
//           <Link to="/harvests">back to harvest</Link>
//           <Grid container spacing={1}>
//             <Grid item xs={12} md={6} xl={4} sx={{ display: "flex" }}>
//               <Divider orientation="vertical" sx={{ ml: -2, mr: 1 }} />
//               <ProfileInfoCard
//                 title=""
//                 description=""
//                 info={{
//                   station_id,
//                   station_Name: station_name,
//                   location,
//                   station_size,
//                   status,
//                   hive_boxes: number_of_hive_boxes,
//                 }}
//                 shadow={false}
//               />
//               <Divider orientation="vertical" sx={{ mx: 0 }} />
//             </Grid>

//             <Grid item xs={12} md={6} xl={4} sx={{ display: "flex" }}>
//               <Divider orientation="vertical" sx={{ ml: -2, mr: 1 }} />
//               <ProfileInfoCard
//                 title=""
//                 description=""
//                 info={{
//                   longitude: Number(longitude)?.toFixed(2) || "N/A",
//                   latitude: Number(latitude)?.toFixed(2) || "N/A",

//                   internal_supervisor: (
//                     <Link to={`/employees/${supervisor_int}`}>{supervisor_int}</Link>
//                   ),
//                   external_supervisor: (
//                     <Link to={`/employees/${supervisor_ext}`}>{supervisor_ext}</Link>
//                   ),
//                   last_inspection: last_inspection_date
//                     ? moment(last_inspection_date).format("YYYY-MM-DD")
//                     : "N/A",
//                   next_inspection: next_inspection_date
//                     ? moment(next_inspection_date).format("YYYY-MM-DD")
//                     : "N/A",
//                 }}
//                 shadow={false}
//               />
//               <Divider orientation="vertical" sx={{ mx: 0 }} />
//             </Grid>

//             <Grid item xs={12} md={6} xl={4} sx={{ display: "flex" }}>
//               <Divider orientation="vertical" sx={{ ml: -2, mr: 1 }} />
//               <ProfileInfoCard
//                 title=""
//                 description=""
//                 info={{
//                   maintaince: station_maintainace_history,
//                   notes,
//                   ...(honey_harvests.length > 0 && {
//                     honey_harvests: honey_harvests
//                       .map(
//                         (
//                           { harvest_year, harvest_date, quantity_collected, unit, quality_rating },
//                           index
//                         ) =>
//                           `Harvest ${
//                             index + 1
//                           }: Year: ${harvest_year}, Date: ${harvest_date}, Quantity: ${quantity_collected} ${unit}, Rating: ${quality_rating}/5`
//                       )
//                       .join(" | "), // Join them as a single string with a separator like " | " or "\n"
//                   }),
//                 }}
//                 shadow={false}
//               />
//               <Divider orientation="vertical" sx={{ mx: 0 }} />
//             </Grid>
//           </Grid>
//         </MDBox>
//       </Header>
//       <Footer />
//     </DashboardLayout>
//   );
// }

export const CreateUpdateEquipment = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { equipmentDetails } = useEquipments();
  const { isCreatingEquipment, createEquipment } = useCreateEqupment();
  const { isUpdatingEquipment, updateEquipment } = useUpdateEquipment();
  const {
    isEdit,
    tool_name,
    category,
    quantity,
    status,
    storage_location,
    supplier,
    purchase_date,
    purchase_cost,
    currency,
    last_maintanace_date,
    next_maintanace_date,
    retired,
    note,
  } = useSelector((store) => store.equipments);
  const equipment_details = {
    tool_name,
    category,
    quantity,
    status,
    storage_location,
    supplier,
    purchase_date,
    purchase_cost,
    currency,
    // last_maintanace_date,
    // next_maintanace_date,
    note,
  };

  const equipmentdetailsOnEdit = {
    tool_name,
    category,
    quantity,
    status,
    storage_location,
    supplier,
    purchase_date,
    purchase_cost,
    currency,
    last_maintanace_date,
    next_maintanace_date,
    retired,
    note,
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Conditionally include inspection dates in the validation check if isEdit is true
    const detailsToValidate = isEdit ? equipmentdetailsOnEdit : equipment_details;

    const isValid = Object.values(detailsToValidate).every(
      (value) => value !== undefined && value !== null && value !== ""
    );

    if (!isValid) {
      alert("Please fill out all required fields,especially the dates field if available.");
      return;
    }

    if (isEdit) {
      return updateEquipment({ equipmentdetailsOnEdit, id });
    }

    createEquipment(equipment_details);
  };
  return (
    <DashboardLayout>
      <DashboardNavbar />
      {/* <MDBox mb={2} /> */}
      {/* <Header info={{ image, first_name, last_name, role }}> */}
      <MDBox mt={5} mb={3}>
        <Grid container spacing={1}>
          <Grid item xs={12} md={6} xl={4} sx={{ display: "flex" }}>
            <Divider orientation="vertical" sx={{ ml: -2, mr: 1 }} />
            <div>
              <Link to={`/equipments`}>Go back</Link>
              <form onSubmit={handleSubmit}>
                {equipmentDetails
                  .filter((detail) => {
                    if (
                      detail.name === "sort" || // Exclude 'sort' in all cases
                      (!isEdit &&
                        (detail.name === "retired" ||
                          detail.name === "last_maintanace_date" ||
                          detail.name === "next_maintanace_date"))
                    ) {
                      return false; // Exclude these fields
                    }
                    return true; // Include all other fields
                  })
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
                  {isCreatingEquipment === "pending" || isUpdatingEquipment === "pending" ? (
                    <Loader1 />
                  ) : isEdit ? (
                    "Update"
                  ) : (
                    "Submit"
                  )}
                </CustomButton>
              </form>
            </div>
            <Divider orientation="vertical" sx={{ mx: 0 }} />
          </Grid>
        </Grid>
      </MDBox>
      {/* </Header> */}
      <Footer />
    </DashboardLayout>
  );
};
