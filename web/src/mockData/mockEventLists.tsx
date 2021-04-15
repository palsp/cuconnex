import { ActivityBoxes } from "@src/mockData/Models/index";
import { IEventData } from "@src/models";

const mockEventLists: [IEventData] | [] = [
  {
    "event-name": "BSAC Hackathon",
    bio: "Biggest competition in BSAC",
    status: "Ongoing",
    "start-date": {
      month: 5,
      day: 14,
      year: 2021,
      time: {
        hour: 12,
        minute: 0,
        second: 0,
      },
    },
    "end-date": {
      month: 6,
      day: 14,
      year: 2021,
      time: {
        hour: 12,
        minute: 0,
        second: 0,
      },
    },
  },
];

export default mockEventLists;
