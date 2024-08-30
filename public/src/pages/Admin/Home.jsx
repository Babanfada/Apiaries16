import React from "react";
import { Outlet } from "react-router-dom";
import { useAdmin } from "../../hooks/AdminRelated";
import { Link } from "react-router-dom";
// import { DisplaySettings } from "@mui/icons-material";

const Home = () => {
  const { adminLinks } = useAdmin();
  return (
    <section>
      <div style={{ display: "flex", flexDirection: "column" }}>
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
