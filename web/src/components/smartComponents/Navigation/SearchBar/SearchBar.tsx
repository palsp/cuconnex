import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";

import classes from "./SearchBar.module.css";
import { Search } from "@icons/index";
import useDebounce from "@hooks/useDebounce";
import { searchUserTeamEvent } from "@api/index";
import { IEventData, IFetchTeam, ITeam, IUser } from "@src/models";

interface Props {
  value: string;
  setHasSearch?: React.Dispatch<React.SetStateAction<boolean>>;
  setNoSearchResult?: React.Dispatch<React.SetStateAction<boolean>>;
  setPeopleLists?: React.Dispatch<React.SetStateAction<IUser[]>>;
  setTeamLists?: React.Dispatch<React.SetStateAction<IFetchTeam[]>>;
  setEventLists?: React.Dispatch<React.SetStateAction<IEventData[]>>;
}
const SearchBar: React.FC<Props> = (props) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchResult, setSearchResult] = useState<any>();
  const debouncedTerm = useDebounce(searchTerm, 1000);

  const onChangeHandler = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setSearchTerm(e.target.value);
  };
  //Without useEffect to set value of searchAPIHanlder, props.setPeopleLists could be undefined since the component has not fully mounted

  const searchAPIHandler = async (searchQuery: string) => {
    const result = await searchUserTeamEvent(searchQuery);
    console.log(
      "searchAPIHandler:",
      "searchTerm =",
      searchQuery,
      "searchResult =",
      result.data
    );
    if (props.setPeopleLists && props.setNoSearchResult) {
      props.setPeopleLists(result.data.users);
      props.setNoSearchResult(false);
    }
    if (props.setTeamLists && props.setNoSearchResult) {
      props.setTeamLists(result.data.team);
      props.setNoSearchResult(false);
    }
    if (props.setEventLists && props.setNoSearchResult) {
      props.setEventLists(result.data.events);
      props.setNoSearchResult(false);
    }
    if (
      result.data.users.length === 0 &&
      result.data.team.length === 0 &&
      result.data.events.length === 0 &&
      props.setNoSearchResult
    ) {
      props.setNoSearchResult(true);
    }
    return result;
  };

  // const mockAPI = async (term: string) => {
  //   await setTimeout(() => {
  //     console.log("wait mockAPI");
  //   }, 1000);
  //   return term;
  // };
  useEffect(() => {
    if (debouncedTerm !== "") {
      searchAPIHandler(debouncedTerm);
    }
    if (props.setNoSearchResult) {
      props.setNoSearchResult(true);
    }
    if (props.setHasSearch && debouncedTerm !== "") {
      props.setHasSearch(true);
    } else if (props.setHasSearch && debouncedTerm === "") {
      props.setHasSearch(false);
    }
  }, [debouncedTerm]);

  return (
    <div data-test="search-bar" className={classes.searchBar}>
      <TextField
        className={classes.textField}
        label={props.value}
        variant="filled"
        fullWidth
        onChange={onChangeHandler}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <div style={{ width: "30px", height: "30px" }}>
                <Search />
              </div>
            </InputAdornment>
          ),
        }}
      />
    </div>
  );
};

export default SearchBar;
