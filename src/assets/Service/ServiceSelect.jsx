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
          {time[x - 1]?.map((time, index) => (
            <MenuItem key={time} value={time}>
              {new Date(time).getUTCHours() + 7}:
              {new Date(time).getUTCMinutes() == 0
                ? "00"
                : new Date(time).getUTCMinutes()}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default ServiceSelect;
