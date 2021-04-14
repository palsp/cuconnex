import React, { useState } from "react";
import { Link } from "react-router-dom";

import { MemberLists, SearchBar } from "@smartComponents/index";
import { Heading, Subtitle } from "@dumbComponents/UI/index";
import { ArrowLeft } from "@icons/index";

import classes from "./SelectMemberPage.module.css";

const SelectMemberPage: React.FC = () => {
  const [memberArray, setMemberArray] = useState<number[]>([]);
  const selectMemberHandler = (e: number) => {
    const positionOfE = memberArray.indexOf(e);
    if (positionOfE === -1) {
      setMemberArray([...memberArray, e]);
    } else {
      const newMemberArray = [...memberArray];
      newMemberArray.splice(positionOfE, 1);
      setMemberArray((memberArray) => (memberArray = newMemberArray));
    }
  };

  return (
    <div>
      <div className={classes.divHeading}>
        <div className={classes.divFixed}>
          <div className={classes.relativeArrow}>
            <Link to="/">
              <ArrowLeft />
            </Link>
          </div>
          <Heading value="Select Members" size="small-medium" />
          <button className={classes.noStyleButton}>Invite</button>
          <SearchBar value="Search By Name" />
        </div>
      </div>
      <div className={classes.divInfo}>
        <div className={classes.divLeft}>
          {/* <p>My Connection</p> */}
          <Subtitle value="My connection" color="black" size="small-medium" />
        </div>
        <div className={classes.divRight}>
          <Subtitle
            value={`${memberArray.length} member selected`}
            color="black"
            size="smaller"
          />
        </div>
      </div>

      <MemberLists selectMemberListsHandler={selectMemberHandler} />
      {console.log("Array Contain: ", memberArray)}
    </div>
  );
};

export default SelectMemberPage;
