import classes from "./CreateTeamPage.module.css";
import React, { useEffect, useState } from "react";
import { Close } from "@dumbComponents/UI/Icons";
import { Link } from "react-router-dom";
import SelectMemberPrompt from "./SelectMemberPrompt/SelectMemberPrompt";
import { mockMemberLists } from "@src/mockData";

const CreateTeamPage: React.FC = () => {
  const [clickSelectScope, setClickSelectScope] = useState<boolean>(true);
  const [clickSelectMember, setClickSelectMember] = useState<boolean>(false);
  const [scopeType, setScopeType] = useState<number>(0);
  const [friendLists, setFriendLists] = useState<[string] | []>([]);
  /* useEffect(() => {
    fetchFriendListsHandler();
  }, []);*/
  const personalButtonClickedHandler = () => {
    setClickSelectMember(true);
    setClickSelectScope(false);
    setScopeType(1);
  };

  const chulaButtonClickedHandler = () => {
    setClickSelectMember(true);
    setClickSelectScope(false);
    setScopeType(2);
  };
  const nonChulaButtonClickedHandler = () => {
    setClickSelectMember(true);
    setClickSelectScope(false);
    setScopeType(3);
  };
  const createPrompt =
    clickSelectScope === true ? (
      <div>
        <div className={classes.headerContainer}>
          <div className={classes.closeDiv}>
            <Link to="landing">
              <Close />
            </Link>
          </div>
        </div>
        <div className={classes.heroDiv}>
          <div className={classes.topicDiv}>Your team&apos;s scope</div>
          <div>
            <div
              onClick={() => personalButtonClickedHandler()}
              className={classes.scopeDiv}
            >
              Personal Project
            </div>
            <div
              onClick={() => chulaButtonClickedHandler()}
              className={classes.scopeDiv}
            >
              Chula Competition
            </div>
            <div
              onClick={() => nonChulaButtonClickedHandler()}
              className={classes.scopeDiv}
            >
              Non-Chula Competition
            </div>
          </div>
        </div>
      </div>
    ) : clickSelectMember === true ? (
      <div>
        <SelectMemberPrompt members={mockMemberLists} />
      </div>
    ) : (
      <div>Error Occurs : Contant Staff</div>
    );

  return <div>{createPrompt}</div>;
};

export default CreateTeamPage;
