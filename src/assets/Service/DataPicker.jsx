import * as React from "react";
import { useDispatch } from "react-redux";
import axios from "../../api/axios";
import { addTime } from "../../Redux/Slices/serviceSlice";
import { setSelectedDate } from "../../Redux/Slices/appointmentSlice";
export default function BasicDatePicker({ id }) {
  const dispatch = useDispatch();
  const [value, setValue] = React.useState();
  React.useEffect(() => {
    const searchByDate = async () => {
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

      dispatch(addTime(res));
      return res;
    };
    searchByDate();
  }, [value]);
  dispatch(setSelectedDate(value));

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
