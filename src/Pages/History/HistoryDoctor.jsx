import React from "react";
import Header from "../../Components/Header";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";

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
const HistoryDoctor = () => {
  const { appointments } = useSelector(
    (state) => state.appointment
  );
  const { services } = useSelector(
    (state) => state.service
  );
  let inter = [];
  for (let i = 0; i < appointments.length; i++) {
    for (let j = 0; j < services.length; j++) {
      if (appointments[i].id == services[j].id) {
        inter.push(services[j]);
      }
    }
  }
  console.log(inter);
  const len = [];
  for (let i = 0; i < appointments.length; i++) {
    len.push(i + 1);
  }
  const time = {
    startHours: [],
    startMinutes: [],
    endHours: [],
    endMinutes: [],
    day: [],
    month: [],
    year: [],
  };
  for (let i = 0; i < appointments.length; i++) {
    let hs = new Date(appointments[i].startDate);
    let ms = new Date(appointments[i].startDate);
    time.startHours.push(hs.getUTCHours());
    time.startMinutes.push(ms.getMinutes());
    time.day.push(hs.getUTCDate());
    time.month.push(hs.getUTCMonth());
    time.year.push(hs.getUTCFullYear());
    if (time.startMinutes[i] == 0) {
      time.startMinutes[i] = "00";
    }
    let he = new Date(appointments[i].endDate);
    let me = new Date(appointments[i].endDate);
    time.endHours.push(he.getUTCHours());
    time.endMinutes.push(me.getMinutes());
    if (time.endMinutes[i] == 0) {
      time.endMinutes[i] = "00";
    }
  }

  return (
    <div>
      <Header />
      <Box sx={{ Width: 400 }} className="all-his">
        {appointments.map((appointment, index) => (
          <Card className="history" variant="outlined">
            <React.Fragment>
              <CardContent>
                <Typography
                  sx={{ fontSize: 32 }}
                  color="text.secondary"
                  gutterBottom>
                  Appointment {len[index]}
                </Typography>
                <Typography variant="h5" component="div">
                  Service name: {inter[index].service_name}
                </Typography>
                <Typography
                  sx={{ mb: 1.5 }}
                  color="text.secondary">
                  Service price: ${inter[index].price}
                </Typography>
                <Typography variant="body2">
                  Patient: {""}
                  <b>
                    {appointment.name}
                    {appointment.surname}
                  </b>
                </Typography>
                <Typography variant="body2">
                  Date:{" "}
                  <b>
                    {time.day[index] +
                      "/" +
                      time.month[index] +
                      "/" +
                      time.year[index]}
                  </b>
                </Typography>
                <Typography variant="body2">
                  Time:{" "}
                  <b>
                    {time.startHours[index] +
                      ":" +
                      time.startMinutes[index]}{" "}
                    -{" "}
                    {time.endHours[index] +
                      ":" +
                      time.endMinutes[index]}
                  </b>
                </Typography>
              </CardContent>
            </React.Fragment>
          </Card>
        ))}
      </Box>
    </div>
  );
};

export default HistoryDoctor;
