/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

/** 
  All of the routes for the Material Dashboard 2 React are added here,
  You can add a new route, customize the routes and delete the routes here.

  Once you add a new route on this file it will be visible automatically on
  the Sidenav.

  For adding a new route you can follow the existing routes in the routes array.
  1. The `type` key with the `collapse` value is used for a route.
  2. The `type` key with the `title` value is used for a title inside the Sidenav. 
  3. The `type` key with the `divider` value is used for a divider between Sidenav items.
  4. The `name` key is used for the name of the route on the Sidenav.
  5. The `key` key is used for the key of the route (It will help you with the key prop inside a loop).
  6. The `icon` key is used for the icon of the route on the Sidenav, you have to add a node.
  7. The `collapse` key is used for making a collapsible item on the Sidenav that has other routes
  inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
  8. The `route` key is used to store the route location which is used for the react router.
  9. The `href` key is used to store the external links location.
  10. The `title` key is only for the item with the type of `title` and its used for the title text on the Sidenav.
  10. The `component` key is used to store the component of its route.
*/

// Material Dashboard 2 React layouts
import Dashboard from "layouts/dashboard";
// import Stations from "layouts/stations";
// import Stations from "layouts/stations";
import Billing from "layouts/billing";
import RTL from "layouts/rtl";
import Notifications from "layouts/notifications";
import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";
import { lazy } from "react";
import Icon from "@mui/material/Icon";
//pages...............
const Employees = lazy(() =>
  import("./layouts/tables").then((module) => ({
    default: module.default,
  }))
);
const Reports = lazy(() =>
  import("./layouts/reports").then((module) => ({
    default: module.default,
  }))
);

const Stations = lazy(() =>
  import("./layouts/stations").then((module) => ({
    default: module.default,
  }))
);
const Noks = lazy(() =>
  import("./layouts/noks").then((module) => ({
    default: module.default,
  }))
);
const Harvests = lazy(() =>
  import("./layouts/harvests").then((module) => ({
    default: module.default,
  }))
);
const Hunters = lazy(() =>
  import("./layouts/hunters").then((module) => ({
    default: module.default,
  }))
);
const Hives = lazy(() =>
  import("./layouts/hives").then((module) => ({
    default: module.default,
  }))
);
//single pages........................
const SingleEmployee = lazy(() =>
  import("./layouts/tables").then((module) => ({
    default: module.SingleEmployee,
  }))
);
const SingleStation = lazy(() =>
  import("./layouts/stations").then((module) => ({
    default: module.SingleStation,
  }))
);
const SingleHunter = lazy(() =>
  import("./layouts/hunters").then((module) => ({
    default: module.SingleHunter,
  }))
);
const SingleHive = lazy(() =>
  import("./layouts/hives").then((module) => ({
    default: module.SingleHive,
  }))
);

//create update pages.................
const CreateUpdateEmployee = lazy(() =>
  import("./layouts/tables").then((module) => ({
    default: module.CreateUpdateEmployee,
  }))
);
const CreateUpdateStation = lazy(() =>
  import("./layouts/stations").then((module) => ({
    default: module.CreateUpdateStation,
  }))
);
const CreateUpdateNok = lazy(() =>
  import("./layouts/noks").then((module) => ({
    default: module.CreateUpdateNok,
  }))
);
const CreateUpdateHarvest = lazy(() =>
  import("./layouts/harvests").then((module) => ({
    default: module.CreateUpdateHarvest,
  }))
);
const CreateUpdateHunter = lazy(() =>
  import("./layouts/hunters").then((module) => ({
    default: module.CreateUpdateHunter,
  }))
);
const CreateUpdateHive = lazy(() =>
  import("./layouts/hives").then((module) => ({
    default: module.CreateUpdateHive,
  }))
);
const CreateUpdateReport = lazy(() =>
  import("./layouts/reports").then((module) => ({
    default: module.CreateUpdateReport,
  }))
);

const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <Dashboard />,
  },
  {
    type: "collapse",
    name: "Employees",
    key: "employees",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/employees",
    component: <Employees />,
  },
  {
    type: "collapse",
    name: "Stations",
    key: "stations",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/stations",
    component: <Stations />,
  },
  {
    type: "collapse",
    name: "Noks",
    key: "noks",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/noks",
    component: <Noks />,
  },
  {
    type: "collapse",
    name: "Harvests",
    key: "honey harvest",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/harvests",
    component: <Harvests />,
  },
  {
    type: "collapse",
    name: "Hunters",
    key: "hunters",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/hunters",
    component: <Hunters />,
  },
  {
    type: "collapse",
    name: "Hives",
    key: "hives",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/hives",
    component: <Hives />,
  },
  {
    type: "collapse",
    name: "Reports",
    key: "reports",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/reports",
    component: <Reports />,
  },
  {
    type: "collapse",
    name: "Billing",
    key: "billing",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/billing",
    component: <Billing />,
  },
  {
    type: "collapse",
    name: "RTL",
    key: "rtl",
    icon: <Icon fontSize="small">format_textdirection_r_to_l</Icon>,
    route: "/rtl",
    component: <RTL />,
  },
  {
    type: "collapse",
    name: "Notifications",
    key: "notifications",
    icon: <Icon fontSize="small">notifications</Icon>,
    route: "/notifications",
    component: <Notifications />,
  },
  {
    type: "collapse",
    name: "Profile",
    key: "profile",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/profile",
    component: <Profile />,
  },
  {
    type: "collapse",
    name: "Sign In",
    key: "sign-in",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/authentication/sign-in",
    component: <SignIn />,
  },
  {
    type: "collapse",
    name: "Sign Up",
    key: "sign-up",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/authentication/sign-up",
    component: <SignUp />,
  },
];

export const singleroutes = [
  {
    type: "collapse",
    name: "single employee",
    key: "single_employee",
    route: "/employees/:id",
    component: <SingleEmployee />,
  },
  {
    type: "collapse",
    name: "single station",
    key: "single_station",
    route: "/stations/:id",
    component: <SingleStation />,
  },
  {
    type: "collapse",
    name: "single hunter",
    key: "single_hunter",
    route: "/hunters/:id",
    component: <SingleHunter />,
  },
  {
    type: "collapse",
    name: "single hive",
    key: "single_hive",
    route: "/hives/:id",
    component: <SingleHive />,
  },
  {
    type: "collapse",
    name: "updatecreateemployee",
    key: "updatecreateemployee",
    route: "/admin/createupdateemployees/:id",
    component: <CreateUpdateEmployee />,
  },
  {
    type: "collapse",
    name: "updatecreatestation",
    key: "updatecreatestation",
    route: "/createupdatestation/:id",
    component: <CreateUpdateStation />,
  },
  {
    type: "collapse",
    name: "updatecreatenok",
    key: "updatecreatenok",
    route: "/createupdatenok/:id",
    component: <CreateUpdateNok />,
  },
  {
    type: "collapse",
    name: "updatecreateharvest",
    key: "updatecreateharvest",
    route: "/createupdateharvest/:id",
    component: <CreateUpdateHarvest />,
  },
  {
    type: "collapse",
    name: "updatecreatehunter",
    key: "updatecreatehunter",
    route: "/createupdatehunter/:id",
    component: <CreateUpdateHunter />,
  },
  {
    type: "collapse",
    name: "updatecreatehive",
    key: "updatecreatehive",
    route: "/createupdatehive/:id",
    component: <CreateUpdateHive />,
  },
  {
    type: "collapse",
    name: "updatecreatereport",
    key: "updatecreatereport",
    route: "/createupdatereport/:id",
    component: <CreateUpdateReport />,
  },
];

export default routes;
