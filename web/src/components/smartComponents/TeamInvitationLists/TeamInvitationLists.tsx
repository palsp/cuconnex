import React, { useState } from "react";
import classes from "./TeamInvitationLists.module.css";
import { TeamInvitationListsData } from "@src/mockData/Models";
import mockTeamInvitationLists from "@src/mockData/mockTeamInvitationListsData";
import TeamInvitationList from "@smartComponents/TeamInvitationLists/TeamInvitationList/TeamInvitationList";

interface Props {
  TeamInvitationlist: TeamInvitationListsData[] | [];
}

const TeamInvitationLists: React.FC<Props> = (props) => {
  return (
    <div className={classes.TeamInvitationLists}>
      <div className={classes.listHeader}>Team Invitations</div>
        <div className={classes.list}>
        {props.TeamInvitationlist.map(
          (TeamInvitation: TeamInvitationListsData, index: number) => {
            return (
              <div key={index}>
                <TeamInvitationList key={index} TeamInvitation={TeamInvitation} />
              </div>
            );
          }
        )}
      </div>
    </div>
  );
};

export default TeamInvitationLists;
