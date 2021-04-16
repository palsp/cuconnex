import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";

import classes from "./SearchBar.module.css";
import { Search } from "@icons/index";
import useDebounce from "@src/hooks/useDebounce";
import { searchUserTeamEvent } from "@api/index";
import { IEventData, ITeam, IUser } from "@src/models";

interface Props {
  value: string;
  setHasSearch?: React.Dispatch<React.SetStateAction<boolean>>;
  setNoSearchResult?: React.Dispatch<React.SetStateAction<boolean>>;
  setPeopleLists?: React.Dispatch<React.SetStateAction<IUser[]>>;
  setTeamLists?: React.Dispatch<React.SetStateAction<ITeam[]>>;
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
    if (props.setPeopleLists) {
      props.setPeopleLists(result.data.users);
    }
    if (props.setTeamLists) {
      props.setTeamLists([
        {
          name: "test", // team name
          creatorId: "69",
          description: "testTeam",
          lookingForMembers: true,
        },
      ]);
    }
    if (props.setEventLists) {
      props.setEventLists(result.data.events);
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
              <Search />
            </InputAdornment>
          ),
        }}
      ></TextField>
    </div>
  );
};

export default SearchBar;
