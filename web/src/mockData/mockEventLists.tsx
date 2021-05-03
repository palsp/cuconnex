import { ICreateEventData } from "@src/models";

const mockEventLists: ICreateEventData[] | [] = [
  {
    "event-name": "CUCONNEX Hackathon",
    bio: "Biggest competition in the world",
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
  },
  {
    "event-name": "ISE rally",
    bio: "Biggest rally in ISE",
    registration: true,
    "start-date": {
      month: 6,
      day: 14,
      year: 2021,
      time: {
        hour: 12,
        minute: 0,
        second: 0,
      },
    },
    "end-date": {
      month: 7,
      day: 14,
      year: 2021,
      time: {
        hour: 12,
        minute: 0,
        second: 0,
      },
    },
  },
  {
    "event-name": "CHULA Business Case",
    bio: "Biggest Business Case in Chula",
    registration: true,
    "start-date": {
      month: 6,
      day: 19,
      year: 2021,
      time: {
        hour: 12,
        minute: 0,
        second: 0,
      },
    },
    "end-date": {
      month: 7,
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
