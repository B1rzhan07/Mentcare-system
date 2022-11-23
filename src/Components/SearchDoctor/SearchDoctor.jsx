import React from "react";
import { TextField } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import { IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import axios from "../../api/axios";
import { useSelector } from "react-redux";
const SearchDoctor = () => {
  const [value, setValue] = React.useState("");
  const [inputValue, setInputValue] = React.useState("");
  const [jsonData, setJsonData] = React.useState([]);
  const [doctors, setDoctors] = React.useState([]);

  let a = 1;
  React.useEffect(() => {
    const res = axios.get("/user/doctors").then((res) => {
      setJsonData(res.data);
    });
  }, [a]);
  const birka = jsonData.find(
    (doctor) => doctor.name === inputValue
  );
  console.log(jsonData);
  const birkaId = birka?.id;
  console.log(birkaId);

  const searchNavigate = () => {
    a = 2;
    for (let i = 0; i < jsonData.length; i++) {
      if (jsonData[i].id == birkaId) {
        window.location.href = `/doctors/${birkaId}`;
      }
    }
  };
  return (
    <div>
      <Autocomplete
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        disablePortal
        id="controllable-states-demo"
        options={jsonData.map((option) => option.name)}
        sx={{ width: 300 }}
        renderInput={(params) => (
          <TextField {...params} label="Doctors" />
        )}
      />
      <IconButton type="submit" aria-label="search here">
        <SearchIcon
          style={{ fill: "blue" }}
          onClick={searchNavigate}
        />
      </IconButton>
    </div>
  );
};

export default SearchDoctor;
