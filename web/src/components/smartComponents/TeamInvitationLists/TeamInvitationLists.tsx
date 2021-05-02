import React, { useState } from "react";
import classes from "./TeamInvitationLists.module.css";
import { TeamInvitationListsData } from "@src/mockData/Models";
import mockTeamInvitationLists from "@src/mockData/mockTeamInvitationListsData";
import TeamInvitationList from "@smartComponents/TeamInvitationLists/TeamInvitationList/TeamInvitationList";
import { ITeam } from "@src/models";

interface Props {
  teams: ITeam[];
}

const TeamInvitationLists: React.FC<Props> = (props) => {
  return (
    <div className={classes.TeamInvitationLists}>
      <div className={classes.listHeader}>Team Invitations</div>
      <div className={classes.list}>
        {props.teams?.map((TeamInvitation: ITeam, index: number) => {
          return (
            <div key={index}>
              <TeamInvitationList key={index} teams={TeamInvitation} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TeamInvitationLists;
