import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useSelector } from "react-redux";
import axios from "../../api/axios";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addServiceDoctor } from "../../Redux/Slices/serviceSlice";
import { setSelectedTime } from "../../Redux/Slices/appointmentSlice";
import { setIdDoctor } from "../../Redux/Slices/appointmentSlice";
const ServiceSelect = ({ clear }) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [timeService, setTimeService] = React.useState("");
  const { time } = useSelector((state) => state.service);
  console.log("time", time);
  const times = {
    startHours: [],
    startMinutes: [],
  };
  for (let i = 0; i < time.length; i++) {
    console.log(time[i]);
    let sh = new Date(time[i]);
    times.startHours.push(sh.getUTCHours());
    times.startMinutes.push(sh.getUTCMinutes());
  }
  console.log("times", times);
  let xx = new Date("2022-12-11T02:00:00.000Z");
  console.log("xx", xx.getUTCHours());

  const handleChange = (event) => {
    setTimeService(event.target.value);
  };
  const x = time.length;
  dispatch(setSelectedTime(timeService));
  React.useEffect(() => {
    const searchByDate = async () => {
      try {
        const res = axios
          .post(
            `/services/${id}/appointment/doctors`,
            {
              id,
              time: timeService,
            },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem(
                  "token"
                )}`,
              },
            }
          )
          .then((res) => {
            dispatch(addServiceDoctor(res.data));
            dispatch(setIdDoctor(res.data[0].id));
          });
        // dispatch(addServiceDoctor(res));
      } catch (err) {
        console.log(err);
      }
    };
    searchByDate();
  }, [timeService]);
  if (clear) {
    setTimeService("");
  }
  return (
    <div>
      <FormControl
        sx={{ m: 1, minWidth: 120 }}
        size="small">
        <InputLabel id="demo-select-small">Time</InputLabel>
        <Select
          labelId="demo-select-small"
          id="demo-select-small"
          value={timeService}
          label="Time"
          onChange={handleChange}>
          {time[x - 1]?.map((time) => (
            <MenuItem key={time} value={time}>
              {time}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {/* <label>Choose time slot:</label>

      <select name="time" onChange={handleChange}>
        {time?.map((times, i) => (
          <option key={i} value={times}>
            {times[i]}
          </option>
        ))}
      </select> */}
    </div>
  );
};

export default ServiceSelect;
