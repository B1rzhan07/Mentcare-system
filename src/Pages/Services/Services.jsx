import React from "react";
import Header from "../../Components/Header";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Button } from "@mui/material";
import DataPicker from "../../assets/Service/DataPicker";
import ServiceSelect from "../../assets/Service/ServiceSelect";
import ServiceDoctor from "../../assets/Service/ServiceDoctor";
import axios from "../../api/axios";
const Services = () => {
  const { selectedDate, selectedTime, selectedDoctor } =
    useSelector((state) => state.appointment);
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
  const { patients } = useSelector((state) => state.user);
  const { idDoctor } = useSelector(
    (state) => state.appointment
  );

  const makeAppointment = async () => {
    try {
      const res = await axios.post(
        `/services/${id}/appointment`,
        {
          name: patients[0].name,
          surname: patients[0].surname,
          startDate: selectedTime,
          doctorId: idDoctor,
        },
        {
          headers: {
            Authorization: `Bearer ${auth}`,
          },
        }
      );
      console.log(res);
      if (res) {
        alert("Appointment created successfully");
      }
    } catch (err) {
      console.log(err);
    }
  };
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

      <div></div>
      {auth ? (
        <>
          <DataPicker id={id} />
          <ServiceSelect />
          <ServiceDoctor />
          <Button
            variant="contained"
            onClick={makeAppointment}>
            Make an Appointment
          </Button>
        </>
      ) : (
        <div>Log in to make an appointment</div>
      )}
    </div>
  );
};

export default Services;
