import * as React from "react";

import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import axios from "../api/axios";
export default function BasicDatePicker({ id }) {
  const [value, setValue] = React.useState();
  const searchByDate = async () => {
    console.log(value);
    const { data: res } = await axios.post(
      `/services/${id}/appointment/Slots`,
      {
        date: value,
      },

      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(
            "token"
          )}`,
        },
      }
    );
    return res;
  };
  if (value) {
    var x = searchByDate(value);
  }

  return (
    // <LocalizationProvider dateAdapter={AdapterDayjs}>
    //   <DatePicker
    //     label="Basic example"
    //     value={value}
    //     renderInput={(params) => <TextField {...params} />}
    //   />

    //   {console.log(value)}
    // </LocalizationProvider>
    <>
      <input
        type="date"
        onChange={(e) => setValue(e.target.value)}
      />
    </>
  );
}
