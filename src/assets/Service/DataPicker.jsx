import * as React from "react";
import { useDispatch } from "react-redux";
import axios from "../../api/axios";
import { addTime } from "../../Redux/Slices/serviceSlice";
import { setSelectedDate } from "../../Redux/Slices/appointmentSlice";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

import "react-datepicker/dist/react-datepicker.css";
export default function BasicDatePicker({ id, clear }) {
  const dispatch = useDispatch();
  const [value, setValue] = React.useState(new Date());

  React.useEffect(() => {
    const searchByDate = async () => {
      console.log(value);
      const { data: res } = await axios.post(
        `/services/${id}/appointment/Slots`,
        {
          date: value.$d,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              "token"
            )}`,
          },
        }
      );

      dispatch(addTime(res));
      console.log("what it is", res);
      return res;
    };
    searchByDate();
  }, [value]);
  dispatch(setSelectedDate(value));
  const handleChange = (newValue) => {
    setValue(newValue);
  };
  if (clear) {
    setValue("");
  }

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DesktopDatePicker
          label="Date"
          inputFormat="MM/DD/YYYY"
          value={value}
          onChange={handleChange}
          renderInput={(params) => (
            <TextField {...params} />
          )}
        />
      </LocalizationProvider>
    </>
  );
}
