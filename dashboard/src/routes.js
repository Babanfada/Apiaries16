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
// import SignIn from "layouts/authentication/sign-in";
// import SignUp from "layouts/authentication/sign-up";
import { lazy } from "react";
import Icon from "@mui/material/Icon";
// import Cover from "layouts/authentication/reset-password/cover";

// Authentication........
const CheckEmail = lazy(() =>
  import("./layouts/authentication/email").then((module) => ({
    default: module.default,
  }))
);
const SignUp = lazy(() =>
  import("./layouts/authentication/sign-up").then((module) => ({
    default: module.default,
  }))
);
const SignIn = lazy(() =>
  import("./layouts/authentication/sign-in").then((module) => ({
    default: module.default,
  }))
);
const Cover = lazy(() =>
  import("./layouts/authentication/reset-password/cover").then((module) => ({
    default: module.default,
  }))
);
const ResetPassword = lazy(() =>
  import("./layouts/authentication/change-password").then((module) => ({
    default: module.default,
  }))
);
//pages...............
const Employees = lazy(() =>
  import("./layouts/tables").then((module) => ({
    default: module.default,
  }))
);
const Users = lazy(() =>
  import("./layouts/users").then((module) => ({
    default: module.default,
  }))
);
const Equipments = lazy(() =>
  import("./layouts/equipments").then((module) => ({
    default: module.default,
  }))
);
const Reports = lazy(() =>
  import("./layouts/reports").then((module) => ({
    default: module.default,
  }))
);
const Supplies = lazy(() =>
  import("./layouts/supplies").then((module) => ({
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
const Provisions = lazy(() =>
  import("./layouts/provisions").then((module) => ({
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
const Services = lazy(() =>
  import("./layouts/services").then((module) => ({
    default: module.default,
  }))
);
const Setup = lazy(() =>
  import("./layouts/setups").then((module) => ({
    default: module.default,
  }))
);
const Consultation = lazy(() =>
  import("./layouts/consultations").then((module) => ({
    default: module.default,
  }))
);
const Pollination = lazy(() =>
  import("./layouts/pollinations").then((module) => ({
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
const SingleUser = lazy(() =>
  import("./layouts/users").then((module) => ({
    default: module.SingleUser,
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
const CreateUpdateSupply = lazy(() =>
  import("./layouts/supplies").then((module) => ({
    default: module.CreateUpdateSupply,
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
const CreateUpdateService = lazy(() =>
  import("./layouts/services").then((module) => ({
    default: module.CreateUpdateService,
  }))
);
const CreateUpdateSetup = lazy(() =>
  import("./layouts/setups").then((module) => ({
    default: module.CreateUpdateSetup,
  }))
);
const CreateUpdateConsultation = lazy(() =>
  import("./layouts/consultations").then((module) => ({
    default: module.CreateUpdateConsultation,
  }))
);
const CreateUpdatePollination = lazy(() =>
  import("./layouts/pollinations").then((module) => ({
    default: module.CreateUpdatePollination,
  }))
);
const CreateUpdateProvision = lazy(() =>
  import("./layouts/provisions").then((module) => ({
    default: module.CreateUpdateProvision,
  }))
);
const CreateUpdateEquipment = lazy(() =>
  import("./layouts/equipments").then((module) => ({
    default: module.CreateUpdateEquipment,
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
    name: "Users",
    key: "users",
    icon: <Icon fontSize="small">people</Icon>, // "people" icon better represents users
    route: "/users",
    component: <Users />,
  },
  {
    type: "collapse",
    name: "Employees",
    key: "employees",
    icon: <Icon fontSize="small">supervised_user_circle</Icon>,
    route: "/employees",
    component: <Employees />,
  },
  {
    type: "collapse",
    name: "Stations",
    key: "stations",
    icon: <Icon fontSize="small">business</Icon>, // Business icon for stations
    route: "/stations",
    component: <Stations />,
  },
  {
    type: "collapse",
    name: "Consultations",
    key: "consultations",
    icon: <Icon fontSize="small">forum</Icon>, // Forum icon for consultations
    route: "/consultations",
    component: <Consultation />,
  },
  {
    type: "collapse",
    name: "Noks",
    key: "noks",
    icon: <Icon fontSize="small">family_restroom</Icon>, // Build icon for noks (suggesting tools/setup)
    route: "/noks",
    component: <Noks />,
  },
  {
    type: "collapse",
    name: "Harvests",
    key: "harvests",
    icon: <Icon fontSize="small">emoji_nature</Icon>, // Agriculture icon for honey harvest
    route: "/harvests",
    component: <Harvests />,
  },
  {
    type: "collapse",
    name: "Hunters",
    key: "hunters",
    icon: <Icon fontSize="small">hiking</Icon>, // Hiking icon for hunters
    route: "/hunters",
    component: <Hunters />,
  },
  {
    type: "collapse",
    name: "Provisions",
    key: "provisions",
    icon: <Icon fontSize="small">inventory</Icon>, // Inventory icon for Provisions
    route: "/provisions",
    component: <Provisions />,
  },
  {
    type: "collapse",
    name: "Hives",
    key: "hives",
    icon: <Icon fontSize="small">hive</Icon>, // Hive icon for hives
    route: "/hives",
    component: <Hives />,
  },
  {
    type: "collapse",
    name: "Services",
    key: "services",
    icon: <Icon fontSize="small">miscellaneous_services</Icon>, // Services icon for services
    route: "/services",
    component: <Services />,
  },
  {
    type: "collapse",
    name: "Reports",
    key: "reports",
    icon: <Icon fontSize="small">assessment</Icon>, // Assessment icon for reports
    route: "/reports",
    component: <Reports />,
  },
  {
    type: "collapse",
    name: "Setups",
    key: "setup",
    icon: <Icon fontSize="small">settings</Icon>, // Settings icon for setups
    route: "/setups",
    component: <Setup />,
  },
  {
    type: "collapse",
    name: "Pollinations",
    key: "pollination",
    icon: <Icon fontSize="small">nature</Icon>, // Nature icon for pollinations
    route: "/pollinations",
    component: <Pollination />,
  },
  {
    type: "collapse",
    name: "Equipments",
    key: "equipments",
    icon: <Icon fontSize="small">construction</Icon>,
    route: "/equipments",
    component: <Equipments />,
  },
  {
    type: "collapse",
    name: "Supplies",
    key: "supplies",
    icon: <Icon fontSize="small">local_shipping</Icon>, // Local shipping icon for Supplies
    route: "/supplies",
    component: <Supplies />,
  },
  // {
  //   type: "collapse",
  //   name: "Billing",
  //   key: "billing",
  //   icon: <Icon fontSize="small">receipt_long</Icon>,
  //   route: "/billing",
  //   component: <Billing />,
  // },
  // {
  //   type: "collapse",
  //   name: "RTL",
  //   key: "rtl",
  //   icon: <Icon fontSize="small">format_textdirection_r_to_l</Icon>,
  //   route: "/rtl",
  //   component: <RTL />,
  // },
  // {
  //   type: "collapse",
  //   name: "Notifications",
  //   key: "notifications",
  //   icon: <Icon fontSize="small">notifications</Icon>,
  //   route: "/notifications",
  //   component: <Notifications />,
  // },
  // {
  //   type: "collapse",
  //   name: "Profile",
  //   key: "profile",
  //   icon: <Icon fontSize="small">person</Icon>,
  //   route: "/profile",
  //   component: <Profile />,
  // },
];
export const authRoutes = [
  {
    type: "collapse",
    name: "Sign In",
    key: "sign-in",
    // icon: <Icon fontSize="small">login</Icon>,
    route: "/authentication/check",
    component: <CheckEmail />,
  },
  {
    type: "collapse",
    name: "Sign Up",
    key: "sign-up",
    // icon: <Icon fontSize="small">assignment</Icon>,
    route: "/authentication/sign-up",
    component: <SignUp />,
  },
  {
    type: "collapse",
    name: "Log In",
    key: "log-in",
    // icon: <Icon fontSize="small">login</Icon>,
    route: "/authentication/sign-in",
    component: <SignIn />,
  },
  {
    type: "collapse",
    name: "Forget-Password",
    key: "forget-password",
    // icon: <Icon fontSize="small">login</Icon>,
    route: "/authentication/forget-password",
    component: <Cover />,
  },
  {
    type: "collapse",
    name: "Reset-Password",
    key: "reset-password",
    // icon: <Icon fontSize="small">login</Icon>,
    route: "/authentication/reset-password",
    component: <ResetPassword />,
  },
];
export const singleroutes = [
  //pages
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
    name: "single user",
    key: "single_user",
    route: "/users/:id",
    component: <SingleUser />,
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
  {
    type: "collapse",
    name: "updatecreatepollination",
    key: "updatecreatepollination",
    route: "/createupdatepollination/:id",
    component: <CreateUpdatePollination />,
  },
  {
    type: "collapse",
    name: "updatecreateservice",
    key: "updatecreateservice",
    route: "/createupdateservice/:id",
    component: <CreateUpdateService />,
  },
  {
    type: "collapse",
    name: "updatecreatesetup",
    key: "updatecreatesetup",
    route: "/createupdatesetup/:id",
    component: <CreateUpdateSetup />,
  },
  {
    type: "collapse",
    name: "updatecreateconsultations",
    key: "updatecreateconsultations",
    route: "/createupdateconsultation/:id",
    component: <CreateUpdateConsultation />,
  },
  {
    type: "collapse",
    name: "updatecreateprovision",
    key: "updatecreateprovision",
    route: "/createupdateprovision/:id",
    component: <CreateUpdateProvision />,
  },
  {
    type: "collapse",
    name: "updatecreateequipment",
    key: "updatecreateequipment",
    route: "/createupdateequipment/:id",
    component: <CreateUpdateEquipment />,
  },
  {
    type: "collapse",
    name: "updatecreatesupply",
    key: "updatecreatesupply",
    route: "/createupdatesupply/:id",
    component: <CreateUpdateSupply />,
  },
];

export default routes;
