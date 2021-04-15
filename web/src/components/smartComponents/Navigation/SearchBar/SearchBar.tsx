import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";

import classes from "./SearchBar.module.css";
import { Search } from "@icons/index";
import useDebounce from "@src/hooks/useDebounce";

interface Props {
  value: string;
  setHasSearch?: React.Dispatch<React.SetStateAction<boolean>>;
}
const SearchBar: React.FC<Props> = (props) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchResult, setSearchResult] = useState<string[]>([]);
  const debouncedTerm = useDebounce(searchTerm, 1000);

  const onChangeHandler = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setSearchTerm(e.target.value);
  };

  const mockAPI = async (term: string) => {
    await setTimeout(() => {
      console.log("wait mockAPI");
    }, 1000);
    return term;
  };

  useEffect(() => {
    mockAPI(debouncedTerm).then((res) => {
      setSearchResult([res]);
    });
    if (props.setHasSearch && debouncedTerm !== "") {
      props.setHasSearch(true);
    } else if (props.setHasSearch && debouncedTerm === "") {
      props.setHasSearch(false);
    }
  }, [debouncedTerm]);

  return (
    <div data-test="search-bar" className={classes.searchBar}>
      {console.log(searchResult)}
      <TextField
        className={classes.textField}
        label={props.value}
        variant="filled"
        fullWidth
        onChange={onChangeHandler}
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
