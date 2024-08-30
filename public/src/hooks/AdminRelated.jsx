// import { FaHive, FaUserTie, FaTruck } from "react-icons/fa";
// import { GiBee, GiBeehive, GiHoneycomb } from "react-icons/gi";
// import { MdOutlineReportProblem, MdOutlineRateReview } from "react-icons/md";
// import { RiServiceFill, RiBuilding4Line, RiGroupLine } from "react-icons/ri";
// import { AiFillApi, AiFillSetting } from "react-icons/ai";
// import { BsFillPeopleFill, BsFillFileEarmarkTextFill } from "react-icons/bs";

export const useAdmin = () => {
  const adminLinks = [
    {
      name: "Home",
      link: "/admin",
      //   icon: <AiFillHome style={{ color: "#38bdf2" }} title="Dashboard" />,
    },
    {
      name: "Employees",
      link: "/admin/employees",
      //   icon: <FaUserTie style={{ color: "#38bdf2" }} title="Employees" />,
    },
    {
      name: "Employee_NOK",
      link: "/admin/employeenok",
      //   icon: (
      //     <BsFillPeopleFill style={{ color: "#38bdf2" }} title="Employee NOK" />
      //   ),
    },
    {
      name: "Stations",
      link: "/admin/stations",
      //   icon: <RiBuilding4Line style={{ color: "#38bdf2" }} title="Stations" />,
    },
    {
      name: "Honey_Harvest",
      link: "/admin/honeyharvest",
      //   icon: <GiHoneycomb style={{ color: "#38bdf2" }} title="Honey Harvest" />,
    },
    {
      name: "Swarm_Hunters",
      link: "/admin/swarmhunters",
      //   icon: <GiBee style={{ color: "#38bdf2" }} title="Swarm Hunters" />,
    },
    {
      name: "Hives",
      link: "/admin/hives",
      //   icon: <FaHive style={{ color: "#38bdf2" }} title="Hives" />,
    },
    {
      name: "Catch_Reports",
      link: "/admin/catchreports",
      //   icon: (
      //     <MdOutlineReportProblem
      //       style={{ color: "#38bdf2" }}
      //       title="Catch Reports"
      //     />
      //   ),
    },
    {
      name: "Services",
      link: "/admin/services",
      //   icon: <RiServiceFill style={{ color: "#38bdf2" }} title="Services" />,
    },
    {
      name: "Apiary_Setup",
      link: "/admin/apiarysetupcomp",
      //   icon: <GiBeehive style={{ color: "#38bdf2" }} title="Apiary Setup" />,
    },
    {
      name: "Consultation_Items",
      link: "/admin/consultaionitems",
      //   icon: (
      //     <BsFillFileEarmarkTextFill
      //       style={{ color: "#38bdf2" }}
      //       title="Consultation Items"
      //     />
      //   ),
    },
    {
      name: "Pollination_Services",
      link: "/admin/pollinationservices",
      //   icon: (
      //     <GiHoneycomb
      //       style={{ color: "#38bdf2" }}
      //       title="Pollination Services"
      //     />
      //   ),
    },
    {
      name: "Supply_Provision",
      link: "/admin/supplyprovisionitems",
      //   icon: <FaTruck style={{ color: "#38bdf2" }} title="Supply Provision" />,
    },
    {
      name: "Equipments",
      link: "/admin/equipments",
      //   icon: <AiFillSetting style={{ color: "#38bdf2" }} title="Equipments" />,
    },
    {
      name: "Suppliers",
      link: "/admin/suppliers",
      //   icon: <FaTruck style={{ color: "#38bdf2" }} title="Suppliers" />,
    },
    {
      name: "Users",
      link: "/admin/userslist",
      //   icon: <RiGroupLine style={{ color: "#38bdf2" }} title="Users" />,
    },
    {
      name: "Orders",
      link: "/admin/orders",
      //   icon: <RiServiceFill style={{ color: "#38bdf2" }} title="Orders" />,
    },
  ];

  return { adminLinks };
};
