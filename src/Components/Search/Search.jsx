import React from "react";
import classes from "./Search.module.scss";
import { TextField } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import { IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import axios from "../../api/axios";
import { useSelector, useDispatch } from "react-redux";
import { addInfoDoctor } from "../../Redux/Slices/serviceSlice";

const Search = () => {
  const dispatch = useDispatch();
  const [value, setValue] = React.useState("");
  const [inputValue, setInputValue] = React.useState("");
  const [jsonData, setJsonData] = React.useState([]);
  const [data, setData] = React.useState([]);

  let a = 1;
  React.useEffect(() => {
    const res = axios.get("/services").then((res) => {
      setJsonData(res.data);
    });
  }, [a]);
  React.useEffect(() => {
    const res = axios.get("/user/doctors").then((res) => {
      setData(res.data);
      dispatch(addInfoDoctor(res.data));
    });
  }, []);

  const { services } = useSelector(
    (state) => state.service
  );
  const birka = services.find(
    (service) => service.service_name === inputValue
  );
  const birkaId = birka?.id;
  const searchNavigate = () => {
    a = 2;
    for (let i = 0; i < services.length; i++) {
      if (services[i].id == birkaId) {
        window.location.href = `/services/${birkaId}`;
      }
    }
  };
  return (
    <div className={classes.search}>
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
        options={jsonData.map(
          (option) => option.service_name
        )}
        sx={{ width: 300 }}
        renderInput={(params) => (
          <TextField {...params} label="Services" />
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

export default Search;

const top100Films = [
  // { name: "Birzhan Zhunubsekov" },
  // { name: "Islam Yerzhanuly" },
  { serviceName: "The Shawshank Redemption", year: 1994 },
  { serviceName: "The Godfather", year: 1972 },
  { serviceName: "The Godfather: Part II", year: 1974 },
  { serviceName: "The Dark Knight", year: 2008 },
  { serviceName: "12 Angry Men", year: 1957 },
  { serviceName: "Schindler's List", year: 1993 },
  { serviceName: "Pulp Fiction", year: 1994 },
];
