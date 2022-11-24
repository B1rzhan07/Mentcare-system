import React from "react";
import Header from "../../Components/Header";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Button } from "@mui/material";
import DataPicker from "../../assets/Service/DataPicker";
import ServiceSelect from "../../assets/Service/ServiceSelect";
import ServiceDoctor from "../../assets/Service/ServiceDoctor";
import axios from "../../api/axios";
import classes from "./Services.module.scss";
const Services = () => {
  const { info_doctor } = useSelector(
    (state) => state.service
  );
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
  const availableDoctors = [];
  for (let i = 0; i < info_doctor.length; i++) {
    for (
      let j = 0;
      j < info_doctor[i].services.length;
      j++
    ) {
      if (info_doctor[i].services[j].id == id) {
        availableDoctors.push(info_doctor[i]);
      }
    }
  }

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
    } catch (err) {
      console.log(err);
    }
    alert("Appointment created successfully");
  };
  let num = 0;
  for (let i = 0; i < availableDoctors.length; i++) {
    for (
      let j = 0;
      j < availableDoctors[i].services.length;
      j++
    ) {
      if (availableDoctors[i].services[j].id == id) {
        num = j;
      }
    }
  }
  return (
    <div className={classes.service}>
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
      <h3>Available Doctors</h3>
      <div className={classes.doctor}>
        {availableDoctors.map((doctor) => (
          <div className={classes.card}>
            <img
              className={classes.img}
              src={`http://localhost:8800/${doctor.photo}`}
              alt=""
              style={{ width: "100px", height: "100px" }}
            />
            <h5>
              {doctor.name} {doctor.surname}
            </h5>
            <p> rating:{doctor.rating}</p>
            <p>Expereience:{doctor.experience_in_year}</p>
            <p>Category:{doctor.category}</p>
            <p>Degree:{doctor.degree}</p>
            <p>
              Price for <b>{service.service_name}</b> is:
              {doctor.services[num].price}
            </p>
          </div>
        ))}
      </div>

      {auth ? (
        <>
          <div className={classes.date}>
            <DataPicker id={id} />
            <ServiceSelect />
            <ServiceDoctor />
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={makeAppointment}>
              Make an Appointment
            </Button>
          </div>
        </>
      ) : (
        <div className={classes.notLogged}>
          Log in to make an appointment
        </div>
      )}
    </div>
  );
};

export default Services;
