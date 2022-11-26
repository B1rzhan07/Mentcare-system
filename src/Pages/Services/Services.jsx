import React from "react";
import Header from "../../Components/Header";
import { useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";
import { Button } from "@mui/material";
import DataPicker from "../../assets/Service/DataPicker";
import ServiceSelect from "../../assets/Service/ServiceSelect";
import ServiceDoctor from "../../assets/Service/ServiceDoctor";
import axios from "../../api/axios";
import classes from "./Services.module.scss";
import MessageIcon from "@mui/icons-material/Message";
import { useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Footer from "../../Components/Footer/Footer";
import AlertSuccess from "../../Components/Alerts/AlertSuccess";
import Modal from "../../Components/Modal/Modal";
import AlertFailure from "../../Components/Alerts/AlertFailure";
const Services = () => {
  const [clear, setClear] = React.useState(false);
  const [alert, setAlert] = React.useState(null);
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
  const [modal, setModal] = React.useState(null);

  const makeAppointment = async () => {
    if (auth) {
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
        setAlert(true);
      } catch (err) {
        console.log(err);
        setAlert(false);
      }
    } else {
      setModal(true);
    }
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
  const navigate = useNavigate();
  const handleNavigate = async (secondId) => {
    navigate("/messeges");
    const res = await axios.post(
      `/messanger/conversation`,
      {
        firstId: patients[0].userId,
        secondId,
      },
      {
        headers: {
          Authorization: `Bearer ${auth}`,
        },
      }
    );
  };
  const failure = "Log in to make an appointment";
  return (
    <div className={classes.service}>
      <Header />
      <h3>Doctor list</h3>
      <div className={classes.card}>
        {availableDoctors.map((doctor) => (
          <Card
            className="bg-info"
            style={{ width: "20rem" }}>
            <div className={classes.top}>
              <Card.Img
                variant="top"
                className={classes.img}
                src={`http://localhost:8800/${doctor.photo}`}
              />
            </div>
            <Card.Body>
              <Card.Title>
                Doctor: {doctor.name} {doctor.surname}
              </Card.Title>
              <Card.Text>
                <b>{service.service_name}</b> price is: $
                {doctor.services[num].price}
              </Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroup.Item>
                Rating: {doctor.rating}
              </ListGroup.Item>
              <ListGroup.Item>
                Experience: {doctor.experience_in_year}
              </ListGroup.Item>
              <ListGroup.Item>
                Category:{doctor.category}
              </ListGroup.Item>
              <ListGroup.Item>
                Degree: {doctor.degree}
              </ListGroup.Item>
              <ListGroup.Item>
                Category:{doctor.category}
              </ListGroup.Item>
            </ListGroup>
          </Card>
        ))}
      </div>
      {alert && <AlertSuccess />}
      {alert == false && <AlertFailure value={failure} />}
      <div className={classes.date}>
        <DataPicker id={id} clear={clear} />
        <ServiceSelect clear={clear} />
        <ServiceDoctor clear={clear} />
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={makeAppointment}>
          Make an Appointment
        </Button>
      </div>
      {modal && (
        <Modal
          active={modal}
          setActive={setModal}
          text={"Login to Make appointment"}
        />
      )}
      <Footer />
    </div>
  );
};

export default Services;
