import React from "react";
import classes from "./Search.module.scss";
import { TextField } from "@mui/material";
import { IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
const Search = () => {
  return (
    <div>
      <TextField
        id="search-bar"
        className="text"
        label="What are you looking for?"
        variant="outlined"
        placeholder="Search..."
        size="small"
        style={{ width: 800 }}
      />
      <IconButton type="submit" aria-label="search">
        <SearchIcon style={{ fill: "blue" }} />
      </IconButton>
    </div>
  );
};

export default Search;
