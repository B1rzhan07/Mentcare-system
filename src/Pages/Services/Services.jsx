import React from "react";
import Header from "../../Components/Header";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Button } from "@mui/material";
import DataPicker from "../../Components/DataPicker";

const Services = () => {
  const { services } = useSelector(
    (state) => state.service
  );
  const { id } = useParams();
  const service = services.find(
    (service) => service.id == id
  );
  const { doctors } = useSelector((state) => state.user);
  const doctor = doctors.filter(
    (doctor) => doctor.departmentId == service.departmentId
  );
  const auth = localStorage.getItem("token");

  return (
    <div>
      <Header />
      <div>
        Service Name: <b>{service.service_name}</b>
      </div>
      <div>
        price: <b>{service.price}</b>
      </div>
      <div>
        Duration: <b>{service.duration} min.</b>
      </div>
      {doctor.map((doctor) => (
        <div key={doctor.id}>
          Doctor Name is:
          <b>
            {doctor.name} {doctor.surname}
          </b>
        </div>
      ))}
      {auth ? (
        <Button variant="contained">
          Make an Appointment
        </Button>
      ) : (
        <div>Log in to make an appointment</div>
      )}
      <div>
        <DataPicker id={id} />
      </div>
    </div>
  );
};

export default Services;
