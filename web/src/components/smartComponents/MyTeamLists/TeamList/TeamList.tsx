import React from "react";

import {
  Button,
  Heading,
  RecruitSign,
  Subtitle,
} from "@dumbComponents/UI/index";

import { ProfilePic } from "@smartComponents/index";

import { Ecommerce } from "@dumbComponents/UI/Icons";

interface Props {
  team: {
    name: string;
    event: string;
    status: string;
  };
}

const TeamList: React.FC<Props> = (props) => {
  return (
    <div data-test="team-list">
      <div>
        <div>
          <div>
            <ProfilePic />
          </div>
        </div>
        <div>
          <div>
            <Heading
              data-test="team-list-name"
              value={props.team ? props.team.name : "test-value"}
              size="small"
            />
          </div>
          <div>
            <div>
              <Subtitle
                data-test="team-list-event"
                value={props.team ? props.team.event : "test-value"}
                size="small"
              />
            </div>
            <div>
              <RecruitSign
                data-test="team-list-status"
                value={props.team.status}
              />
            </div>
          </div>
          <div>
            <ProfilePic size="mini" />
            <ProfilePic size="mini" />
            <ProfilePic size="mini" />
            <ProfilePic size="mini" />
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamList;
