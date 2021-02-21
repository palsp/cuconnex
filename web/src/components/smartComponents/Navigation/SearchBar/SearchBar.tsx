import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";

import classes from "./SearchBar.module.css";
import Search from "../../../dumbComponents/UI/Icons/Search/Search";
import Send from "../../../dumbComponents/UI/Icons/Send/Send";
// import AutoComplete from "@material-ui/lab/Autocomplete";
interface Props {
  value: string;
}
const SearchBar: React.FC<Props> = (props) => {
  return (
    <div data-test="search-bar" className={classes.searchBar}>
      <TextField
        className={classes.textField}
        label={props.value}
        variant="filled"
        fullWidth
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Search />
            </InputAdornment>
          ),
        }}
      ></TextField>
    </div>
  );
};

export default SearchBar;
