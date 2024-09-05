import React from "react";
import { Outlet } from "react-router-dom";
import { useAdmin } from "../../hooks/AdminRelated";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../../hooks/GlobalContext";

const Home = () => {
  const { adminLinks } = useAdmin();
  const { employees, users, stations } = useGlobalContext();
  const totalEmployees = employees?.totalEmployees ?? "Loading...";
  const totalStations = stations?.totalStations ?? "Loading...";
  const totalHives = stations?.totalHives ?? "Loading...";
  const totalUsers = users?.totalUsers ?? "Loading...";
  //   console.log(isGettingAllprovisions, supplyProvision);
  return (
    <section>
      {/* <DateRegister /> */}
      <div style={{ display: "flex", flexDirection: "column" }}>
        <p>Total Stations: {totalStations}</p>
        <p>Total Hives: {totalHives}</p>
        <p>Total Users: {totalUsers}</p>
        <p>Total Employees: {totalEmployees}</p>
        {adminLinks.map((item, i) => {
          const { name, link } = item;
          return (
            <Link key={i} to={link}>
              {name}
            </Link>
          );
        })}
      </div>
      <Outlet />
    </section>
  );
};

export default Home;
