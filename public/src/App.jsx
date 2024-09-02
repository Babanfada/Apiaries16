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

const Suppliers = lazy(() =>
  import("./pages/Admin").then((module) => ({
    default: module.Suppliers,
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
  { path: "/admin/employeenok", element: <EmployeeNok /> },
  { path: "/admin/stations", element: <Stations /> },
  { path: "/admin/honeyharvest", element: <HoneyHarvest /> },
  { path: "/admin/swarmhunters", element: <SwarmHunters /> },
  { path: "/admin/hives", element: <Hives /> },
  { path: "/admin/catchreports", element: <CatchReports /> },
  { path: "/admin/services", element: <ServicesList /> },
  { path: "/admin/apiarysetupcomp", element: <ApiarySetupComp /> },
  { path: "/admin/consultaionitems", element: <ConsultationItems /> },
  { path: "/admin/pollinationservices", element: <PollinationServices /> },
  { path: "/admin/supplyprovisionitems", element: <SupplyProvisionItems /> },
  { path: "/admin/equipments", element: <Equipments /> },
  { path: "/admin/suppliers", element: <Suppliers /> },
  { path: "/admin/userslist", element: <UsersList /> },
  { path: "/admin/orders", element: <Orders /> },
];

const AdminRoutesWrapper = () => {
  return (
    <Suspense fallback={<Loader2 />}>
      <Routes>
        {adminRoutes.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
      </Routes>
    </Suspense>
  );
};
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
              autoClose={100}
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
