import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useServices } from "../../features/services/servicesThunk";
import { changePage, resetValues } from "../../features/services/serviceSlice";
import { ServicesTable } from "../../components";
import ServiceSearchModal from "../../components/searchModals/ServiceSearchModal";

const ServicesList = () => {
  const dispatch = useDispatch();
  const {
    service_name,
    description,
    numOfTimesRendered,
    category,
    sort,
    pages,
  } = useSelector((store) => store.services);
  const {
    isGettingAllServices,
    services: { service = [], totalServices = 0, count = 0, numOfPages = 0 },
    refetch,
  } = useServices();
  const handleChange = (event, value) => {
    event.preventDefault();
    dispatch(changePage(value));
  };
  React.useEffect(() => {
    refetch();
  }, [service_name, description, numOfTimesRendered, category, sort, pages]);
  console.log(service);
  return (
    <div>
      <Link
        onClick={() => dispatch(resetValues())}
        to="/admin/createupdateservice/add"
      >
        create Service
      </Link>
      <p>
        {count} of {totalServices}
      </p>
      <ServiceSearchModal isGettingAllServices={isGettingAllServices} />
      {service.length > 0 ? (
        <ServicesTable
          service={service}
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

export default ServicesList;
