import { ActivityListsData } from "./Models";
import tempActivitySasin from "@assets/tempActivitySasin.png";
import CUConnexLogo from "@assets/Logo/cuconnexIcon.svg";

const mockActivityListsData: ActivityListsData[] | [] = [
  {
    activityPic: tempActivitySasin,
    name: "Sasin Business Case",
    role: "Developer",
    status: "Team owner",
  },
  {
    activityPic: CUConnexLogo,
    name: "CUCONNEX",
    role: "Project Manager",
    status: "Team owner",
  },
];
export default mockActivityListsData;
