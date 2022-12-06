import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";
import { Button } from "@mui/material";
import DataPicker from "../../assets/Service/DataPicker";
import ServiceSelect from "../../assets/Service/ServiceSelect";
import ServiceDoctor from "../../assets/Service/ServiceDoctor";
import axios from "../../api/axios";
import classes from "./Services.module.scss";
import { useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Footer from "../../Components/Footer/Footer";
import AlertSuccess from "../../Components/Alerts/AlertSuccess";
import Modal from "../../Components/Modal/Modal";
import AlertFailure from "../../Components/Alerts/AlertFailure";
import Header from "../../Components/Header/Header";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import MobileStepper from "@mui/material/MobileStepper";
import Paper from "@mui/material/Paper";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const Services = () => {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };
  const [app, setApp] = React.useState(null);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
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
  const maxSteps = availableDoctors.length;
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
            doctorId: selectedDoctor,
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
  console.log("xx", availableDoctors);
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
      {availableDoctors.length == 0 && (
        <>
          <h3>There is no doctor available</h3>
          <h3>Come later:)</h3>
        </>
      )}
      <div className={classes.card}>
        <Box
          sx={{ maxWidth: 820, flexGrow: 1, height: 400 }}>
          <AutoPlaySwipeableViews
            axis={
              theme.direction === "rtl" ? "x-reverse" : "x"
            }
            index={activeStep}
            onChangeIndex={handleStepChange}
            enableMouseEvents>
            {availableDoctors.map((doctor, index) => (
              <div key={doctor.label}>
                {Math.abs(activeStep - index) <= 2 ? (
                  <Card
                    className={classes.each}
                    style={{ width: 800, height: 400 }}>
                    <div className={classes.top}>
                      <Card.Img
                        variant="top"
                        className={classes.img}
                        src={`http://localhost:8800/${doctor.photo}`}
                      />
                    </div>
                    <Card.Body>
                      <Card.Title>
                        Doctor: {doctor.name}{" "}
                        {doctor.surname}
                      </Card.Title>
                      <Card.Text>
                        <b>{service.service_name}</b> price
                        is: $
                        {
                          doctor.services[num].doctorService
                            .price
                        }
                      </Card.Text>
                      <ListGroup className="list-group-flush">
                        <ListGroup.Item>
                          Rating: {doctor.rating}
                        </ListGroup.Item>
                        <ListGroup.Item>
                          Experience:{" "}
                          {doctor.experience_in_year} years
                        </ListGroup.Item>
                        <ListGroup.Item>
                          Category: {doctor.category}
                        </ListGroup.Item>
                        <ListGroup.Item>
                          Degree: {doctor.degree}
                        </ListGroup.Item>
                        <ListGroup.Item>
                          Contact Number:{" "}
                          {doctor.contact_number}
                        </ListGroup.Item>
                        <ListGroup.Item>
                          <Button
                            variant="outlined"
                            onClick={() => setApp(true)}
                            className={classes.btn}>
                            Make an appointment
                          </Button>
                        </ListGroup.Item>
                      </ListGroup>
                    </Card.Body>
                  </Card>
                ) : null}
              </div>
            ))}
          </AutoPlaySwipeableViews>
          <MobileStepper
            steps={maxSteps}
            position="static"
            activeStep={activeStep}
            nextButton={
              <Button
                size="small"
                onClick={handleNext}
                disabled={activeStep === maxSteps - 1}>
                Next
                {theme.direction === "rtl" ? (
                  <KeyboardArrowLeft />
                ) : (
                  <KeyboardArrowRight />
                )}
              </Button>
            }
            backButton={
              <Button
                size="small"
                onClick={handleBack}
                disabled={activeStep === 0}>
                {theme.direction === "rtl" ? (
                  <KeyboardArrowRight />
                ) : (
                  <KeyboardArrowLeft />
                )}
                Back
              </Button>
            }
          />
        </Box>
      </div>
      {alert && <AlertSuccess />}
      {alert == false && <AlertFailure value={failure} />}
      {app && localStorage.getItem("token") && (
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
          <Button
            variant="outlined"
            onClick={() =>
              navigate(
                `/department/${service.departmentId}`
              )
            }>
            Go back
          </Button>
        </div>
      )}
      {!localStorage.getItem("token") && app && (
        <Modal
          active={modal}
          setActive={setModal}
          text={"Login to Make Appointment"}
        />
      )}
    </div>
  );
};

export default Services;
