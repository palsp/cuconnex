import { IEventData } from "@src/models";

const mockEventLists: IEventData[] | [] = [
  {
    id: 123,
    "event-name": "BSAC Hackathon",
    bio: "Biggest competition in BSAC",
    location: "Chula",
    registration: true,
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
    status: "Ongoing",
  },
  {
    id: 124,
    "event-name": "BSAC Hackathonss",
    bio: "Biggest competition in BSAC",
    location: "Chula",
    registration: true,
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
    status: "Ongoing",
  },
];

export default mockEventLists;
