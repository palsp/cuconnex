import React from "react";
import OldActivityList from "@smartComponents/OldActivityLists/OldActivityList/OldActivityList";

const activityArray = [
  {
    activityName: "Technology",
    activityPic: "",
  },
  {
    activityName: "Buisness",
    activityPic: "",
  },
  {
    activityName: "Law",
    activityPic: "",
  },
  {
    activityName: "Digital Margeting",
    activityPic: "",
  },
  {
    activityName: "CSR",
    activityPic: "",
  },
  {
    activityName: "Engergy",
    activityPic: "",
  },
];

const OldActivityLists: React.FC = () => {
  return (
    <div data-test="activity-lists">
      {activityArray.map((activity, index) => {
        return <OldActivityList key={index} activityBox={activity} />;
      })}
    </div>
  );
};

export default OldActivityLists;
