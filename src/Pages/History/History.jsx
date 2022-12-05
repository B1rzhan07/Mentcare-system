import React from "react";
import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import "./History.scss";
import Footer from "../../Components/Footer/Footer";
import MessageIcon from "@mui/icons-material/Message";
import SendSharpIcon from "@mui/icons-material/SendSharp";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import Header from "../../Components/Header/Header";
import DoneIcon from "@mui/icons-material/Done";
const bull = (
  <Box
    component="span"
    sx={{
      display: "inline-block",
      mx: "2px",
      transform: "scale(0.8)",
    }}>
    •
  </Box>
);

const History = () => {
  const navigate = useNavigate();
  const { appointments } = useSelector(
    (state) => state.appointment
  );

  const len = [];
  for (let i = 0; i < appointments.length; i++) {
    len.push(i + 1);
  }
  const { patients } = useSelector((state) => state.user);

  const handleNavigate = async (index) => {
    navigate("/messeges");
    const res = await axios.post(
      `/messanger/conversation`,
      {
        firstId: patients[0].userId,
        secondId: index,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(
            "token"
          )}`,
        },
      }
    );
  };
  const [History, setHistory] = React.useState([]);
  React.useEffect(() => {
    try {
      const res = axios
        .get("/myPage/patient/appointment/history", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              "token"
            )}`,
          },
        })
        .then((res) => {
          setHistory(res.data);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div>
      <Header />
      <h3>Appointments</h3>
      <Box sx={{ Width: 400 }} className="all-his">
        {appointments.map((appointment, index) => (
          <Card
            className="history"
            key={index}
            variant="outlined">
            <React.Fragment>
              <CardContent>
                <Typography
                  sx={{ fontSize: 32 }}
                  color="text.secondary"
                  gutterBottom>
                  Appointment {len[index]}
                </Typography>

                <Typography variant="h5" component="div">
                  {appointment.service.service_name}
                </Typography>
                <Typography
                  sx={{ mb: 1.5 }}
                  color="text.secondary">
                  Price: ${appointment.service.price}
                </Typography>
                <Typography variant="body2">
                  Doctor:{" "}
                  <b>
                    {appointment.doctor.name} {""}
                    {appointment.doctor.surname}
                  </b>
                  <br />
                  Contact number:{" "}
                  <b>{appointment.doctor.contact_number}</b>
                </Typography>
                <Typography variant="body2">
                  Date:{" "}
                  <b>
                    {new Date(
                      appointment.startDate
                    ).getUTCMonth() + 1}
                    /
                    {new Date(
                      appointment.startDate
                    ).getUTCDate()}
                    /
                    {new Date(
                      appointment.startDate
                    ).getUTCFullYear()}
                  </b>
                </Typography>
                <Typography variant="body2">
                  Time:{" "}
                  <b>
                    {new Date(
                      appointment.startDate
                    ).getUTCHours() + 7}
                    :
                    {new Date(
                      appointment.startDate
                    ).getUTCMinutes() == 0
                      ? "00"
                      : new Date(
                          appointment.startDate
                        ).getUTCMinutes()}
                    -
                    {new Date(
                      appointment.endDate
                    ).getUTCHours() + 7}
                    :
                    {new Date(
                      appointment.endDate
                    ).getUTCMinutes() == 0
                      ? "00"
                      : new Date(
                          appointment.endDate
                        ).getUTCMinutes()}
                  </b>
                </Typography>
                <Typography
                  sx={{ mb: 1.5 }}
                  color="text.secondary">
                  Completed:{" "}
                  {appointment.completed ? "Yes" : "No"}
                </Typography>
                <Typography
                  sx={{ mb: 1.5 }}
                  color="text.secondary">
                  Start Messaging with Doctor:{" "}
                  <SendSharpIcon
                    onClick={() =>
                      handleNavigate(
                        appointment.doctor.userId
                      )
                    }
                  />
                </Typography>
              </CardContent>
            </React.Fragment>
          </Card>
        ))}
      </Box>
      <h3>History</h3>
      {console.log(History)}
      {History && (
        <Box sx={{ Width: 400 }} className="all-his">
          {History.map((appointment, index) => (
            <Card
              className="history"
              key={index}
              variant="outlined">
              <React.Fragment>
                <CardContent>
                  <Typography
                    sx={{ fontSize: 32 }}
                    color="text.secondary"
                    gutterBottom>
                    Appointment {len[index]}
                  </Typography>

                  <Typography variant="body2">
                    Doctor:{" "}
                    <b>
                      {appointment.doctor.name} {""}
                      {appointment.doctor.surname}
                    </b>
                    <br />
                    Contact number:{" "}
                    <b>
                      {appointment.doctor.contact_number}
                    </b>
                  </Typography>
                  <Typography variant="body2">
                    Date:{" "}
                    <b>
                      {new Date(
                        appointment.startDate
                      ).getUTCMonth() + 1}
                      /
                      {new Date(
                        appointment.startDate
                      ).getUTCDate()}
                      /
                      {new Date(
                        appointment.startDate
                      ).getUTCFullYear()}
                    </b>
                  </Typography>
                  <Typography variant="body2">
                    Time:{" "}
                    <b>
                      {new Date(
                        appointment.startDate
                      ).getUTCHours() + 7}
                      :
                      {new Date(
                        appointment.startDate
                      ).getUTCMinutes() == 0
                        ? "00"
                        : new Date(
                            appointment.startDate
                          ).getUTCMinutes()}
                      -
                      {new Date(
                        appointment.endDate
                      ).getUTCHours() + 7}
                      :
                      {new Date(
                        appointment.endDate
                      ).getUTCMinutes() == 0
                        ? "00"
                        : new Date(
                            appointment.endDate
                          ).getUTCMinutes()}
                    </b>
                  </Typography>
                  <Typography
                    sx={{ mb: 1.5 }}
                    color="text.secondary">
                    Completed:{" "}
                    {appointment.completed ? "Yes" : "No"}
                  </Typography>
                  <Typography
                    sx={{ mb: 1.5 }}
                    color="text.secondary">
                    Start Messaging with Doctor:{" "}
                    <SendSharpIcon
                      onClick={() =>
                        handleNavigate(
                          appointment.doctor.userId
                        )
                      }
                    />
                  </Typography>
                </CardContent>
              </React.Fragment>
            </Card>
          ))}
        </Box>
      )}
    </div>
  );
};

export default History;
