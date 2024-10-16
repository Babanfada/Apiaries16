import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { lazy } from "react";
import { Suspense } from "react";
import Loader, { Loader2 } from "./components/Loader";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GlobalContext from "./hooks/GlobalContext";

// Lazy loaded components
// General components
const EmailPage = lazy(() =>
  import("./pages/Verification").then((module) => ({
    default: module.EmailPage,
  }))
);
const Registeration = lazy(() =>
  import("./pages/Verification").then((module) => ({
    default: module.Registeration,
  }))
);
const Login = lazy(() =>
  import("./pages/Verification").then((module) => ({ default: module.Login }))
);
const VerifyEmail = lazy(() =>
  import("./pages/Verification").then((module) => ({
    default: module.VerifyEmail,
  }))
);
const ForgetPassword = lazy(() =>
  import("./pages/Verification").then((module) => ({
    default: module.ForgetPassword,
  }))
);
const ResetPassword = lazy(() =>
  import("./pages/Verification").then((module) => ({
    default: module.ResetPassword,
  }))
);
const UserHome = lazy(() =>
  import("./pages/Users").then((module) => ({
    default: module.Home,
  }))
);

// Admin components
const AdminHome = lazy(() =>
  import("./pages/Admin").then((module) => ({
    default: module.Home,
  }))
);

const Employees = lazy(() =>
  import("./pages/Admin").then((module) => ({
    default: module.Employees,
  }))
);

const EmployeeNok = lazy(() =>
  import("./pages/Admin").then((module) => ({
    default: module.EmployeeNok,
  }))
);

const Stations = lazy(() =>
  import("./pages/Admin").then((module) => ({
    default: module.Stations,
  }))
);

const HoneyHarvest = lazy(() =>
  import("./pages/Admin").then((module) => ({
    default: module.HoneyHarvest,
  }))
);

const SwarmHunters = lazy(() =>
  import("./pages/Admin").then((module) => ({
    default: module.SwarmHunters,
  }))
);

const Hives = lazy(() =>
  import("./pages/Admin").then((module) => ({
    default: module.Hives,
  }))
);

const CatchReports = lazy(() =>
  import("./pages/Admin").then((module) => ({
    default: module.CatchReports,
  }))
);

const ServicesList = lazy(() =>
  import("./pages/Admin").then((module) => ({
    default: module.ServicesList,
  }))
);

const ApiarySetupComp = lazy(() =>
  import("./pages/Admin").then((module) => ({
    default: module.ApiarySetupComp,
  }))
);

const ConsultationItems = lazy(() =>
  import("./pages/Admin").then((module) => ({
    default: module.ConsultationItems,
  }))
);

const PollinationServices = lazy(() =>
  import("./pages/Admin").then((module) => ({
    default: module.PollinationServices,
  }))
);

const SupplyProvisionItems = lazy(() =>
  import("./pages/Admin").then((module) => ({
    default: module.SupplyProvisionItems,
  }))
);

const Equipments = lazy(() =>
  import("./pages/Admin").then((module) => ({
    default: module.Equipments,
  }))
);

const Supplies = lazy(() =>
  import("./pages/Admin").then((module) => ({
    default: module.Supplies,
  }))
);

const UsersList = lazy(() =>
  import("./pages/Admin").then((module) => ({
    default: module.UsersList,
  }))
);

const Orders = lazy(() =>
  import("./pages/Admin").then((module) => ({
    default: module.Orders,
  }))
);
const CreateUpdateEmployees = lazy(() =>
  import("./pages/Admin").then((module) => ({
    default: module.CreateUpdateEmployees,
  }))
);
const Overview = lazy(() =>
  import("./pages/Admin").then((module) => ({
    default: module.Overview,
  }))
);
const SingleEmployee = lazy(() =>
  import("./pages/Admin").then((module) => ({
    default: module.SingleEmployee,
  }))
);
const SingleUser = lazy(() =>
  import("./pages/Admin").then((module) => ({
    default: module.SingleUser,
  }))
);
const SingleStation = lazy(() =>
  import("./pages/Admin").then((module) => ({
    default: module.SingleStation,
  }))
);
const CreateUpdateStation = lazy(() =>
  import("./pages/Admin").then((module) => ({
    default: module.CreateUpdateStation,
  }))
);
const SingleEquipment = lazy(() =>
  import("./pages/Admin").then((module) => ({
    default: module.SingleEquipment,
  }))
);
const CreateUpdateEquipment = lazy(() =>
  import("./pages/Admin").then((module) => ({
    default: module.CreateUpdateEquipment,
  }))
);
const CreateUpdateSupplies = lazy(() =>
  import("./pages/Admin").then((module) => ({
    default: module.CreateUpdateSupplies,
  }))
);
const SingleSupply = lazy(() =>
  import("./pages/Admin").then((module) => ({
    default: module.SingleSupply,
  }))
);
const CreateUpdateNok = lazy(() =>
  import("./pages/Admin").then((module) => ({
    default: module.CreateUpdateNok,
  }))
);
const CreateUpdateHarvest = lazy(() =>
  import("./pages/Admin").then((module) => ({
    default: module.CreateUpdateHarvest,
  }))
);
const CreateUpdateHunter = lazy(() =>
  import("./pages/Admin").then((module) => ({
    default: module.CreateUpdateHunter,
  }))
);
const CreateUpdateHive = lazy(() =>
  import("./pages/Admin").then((module) => ({
    default: module.CreateUpdateHive,
  }))
);
const SingleHunter = lazy(() =>
  import("./pages/Admin").then((module) => ({
    default: module.SingleHunter,
  }))
);
const SingleHive = lazy(() =>
  import("./pages/Admin").then((module) => ({
    default: module.SingleHive,
  }))
);
const SingleReport = lazy(() =>
  import("./pages/Admin").then((module) => ({
    default: module.SingleReport,
  }))
);
const CreateUpdateReport = lazy(() =>
  import("./pages/Admin").then((module) => ({
    default: module.CreateUpdateReport,
  }))
);
const CreateUpdateService = lazy(() =>
  import("./pages/Admin").then((module) => ({
    default: module.CreateUpdateService,
  }))
);
const CreateUpdateSetup = lazy(() =>
  import("./pages/Admin").then((module) => ({
    default: module.CreateUpdateSetup,
  }))
);
const CreateUpdateConsultation = lazy(() =>
  import("./pages/Admin").then((module) => ({
    default: module.CreateUpdateConsultation,
  }))
);
const CreateUpdatePolServices = lazy(() =>
  import("./pages/Admin").then((module) => ({
    default: module.CreateUpdatePolServices,
  }))
);
const CreateUpdateprovision = lazy(() =>
  import("./pages/Admin").then((module) => ({
    default: module.CreateUpdateprovision,
  }))
);

// General routes
const routes = [
  { path: "/home", element: <UserHome /> },
  { path: "/authflow/email", element: <EmailPage /> },
  { path: "/authflow/register", element: <Registeration /> },
  { path: "/authflow/login", element: <Login /> },
  { path: "/authflow/verify-email", element: <VerifyEmail /> },
  { path: "/authflow/forgetpassword", element: <ForgetPassword /> },
  { path: "/authflow/resetpassword", element: <ResetPassword /> },
];
// Admin routes
const adminRoutes = [
  // { path: "/admin", element: <AdminHome /> },
  { path: "/admin/employees", element: <Employees /> },
  { path: "/admin/employees/:id", element: <SingleEmployee /> },
  { path: "/admin/users/:id", element: <SingleUser /> },
  { path: "/admin/employeenok", element: <EmployeeNok /> },
  { path: "/admin/stations", element: <Stations /> },
  { path: "/admin/honeyharvest", element: <HoneyHarvest /> },
  { path: "/admin/swarmhunters", element: <SwarmHunters /> },
  { path: "/admin/swarmhunters/:id", element: <SingleHunter /> },
  { path: "/admin/hives", element: <Hives /> },
  { path: "/admin/hives/:id", element: <SingleHive /> },
  { path: "/admin/catchreports", element: <CatchReports /> },
  { path: "/admin/catchreports/:id", element: <SingleReport /> },
  { path: "/admin/services", element: <ServicesList /> },
  { path: "/admin/apiarysetupcomp", element: <ApiarySetupComp /> },
  { path: "/admin/consultaionitems", element: <ConsultationItems /> },
  { path: "/admin/pollinationservices", element: <PollinationServices /> },
  { path: "/admin/supplyprovisionitems", element: <SupplyProvisionItems /> },
  { path: "/admin/equipments", element: <Equipments /> },
  { path: "/admin/supplies", element: <Supplies /> },
  { path: "/admin/userslist", element: <UsersList /> },
  { path: "/admin/orders", element: <Orders /> },
  { path: "/admin", element: <Overview /> },
  { path: "/admin/stations/:id", element: <SingleStation /> },
  { path: "/admin/supplies/:id", element: <SingleSupply /> },
  { path: "/admin/equipments/:id", element: <SingleEquipment /> },
  {
    path: "/admin/createupdateemployees/:id",
    element: <CreateUpdateEmployees />,
  },
  {
    path: "/admin/createupdatestation/:id",
    element: <CreateUpdateStation />,
  },
  {
    path: "/admin/createupdateequipments/:id",
    element: <CreateUpdateEquipment />,
  },
  {
    path: "/admin/createupdatesupplies/:id",
    element: <CreateUpdateSupplies />,
  },
  {
    path: "/admin/createupdatenok/:id",
    element: <CreateUpdateNok />,
  },
  {
    path: "/admin/harvests/:id",
    element: <CreateUpdateHarvest />,
  },
  {
    path: "/admin/createupdatehunter/:id",
    element: <CreateUpdateHunter />,
  },
  {
    path: "/admin/createupdatehive/:id",
    element: <CreateUpdateHive />,
  },
  {
    path: "/admin/createupdatereport/:id",
    element: <CreateUpdateReport />,
  },
  {
    path: "/admin/createupdateservice/:id",
    element: <CreateUpdateService />,
  },
  {
    path: "/admin/createupdatesetup/:id",
    element: <CreateUpdateSetup />,
  },
  {
    path: "/admin/consultations/:id",
    element: <CreateUpdateConsultation />,
  },
  {
    path: "/admin/pollinationservices/:id",
    element: <CreateUpdatePolServices />,
  },
  {
    path: "/admin/provisions/:id",
    element: <CreateUpdateprovision />,
  },
];

// const AdminRoutesWrapper = () => {
//   return (
//     <Suspense fallback={<Loader2 />}>
//       <Routes>
//         {adminRoutes.map(({ path, element }) => (
//           <Route key={path} path={path} element={element} />
//         ))}
//       </Routes>
//     </Suspense>
//   );
// };
function App() {
  return (
    <>
      <Router>
        <GlobalContext>
          <Suspense fallback={<Loader />}>
            <Routes>
              {routes.map(({ path, element }) => (
                <Route key={path} path={path} element={element} />
              ))}

              <Route path="/admin" element={<AdminHome />}>
                {adminRoutes.map(({ path, element }) => (
                  <Route key={path} path={path} element={element} />
                ))}
              </Route>
              {/* <Route path="/admin" element={<AdminHome />}>
              <Route path="*" element={<AdminRoutesWrapper />} />
            </Route> */}
            </Routes>
            <ToastContainer
              position="top-right"
              autoClose={1000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              // theme={isDarkMode ? "dark" : "light"}
            />
          </Suspense>
        </GlobalContext>
      </Router>
      ;
    </>
  );
}

export default App;
