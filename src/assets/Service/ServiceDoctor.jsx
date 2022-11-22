import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setSelectedDoctor } from "../../Redux/Slices/appointmentSlice";
const ServiceDoctor = () => {
  const dispatch = useDispatch();
  const { serviceDoctor } = useSelector(
    (state) => state.service
  );
  const [doctor, setDoctor] = useState("");
  const handleChange = (event) => {
    setDoctor(event.target.value);
  };
  dispatch(setSelectedDoctor(doctor));
  const x = serviceDoctor.length;
  return (
    <div>
      <FormControl
        sx={{ m: 1, minWidth: 120 }}
        size="small">
        <InputLabel id="demo-select-small">
          Doctors
        </InputLabel>
        <Select
          labelId="demo-select-small"
          id="demo-select-small"
          value={doctor}
          label="Time"
          onChange={handleChange}>
          {serviceDoctor[x - 1]?.map((doctor, i) => (
            <MenuItem key={i} value={doctor.fullName}>
              {doctor.fullName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default ServiceDoctor;
