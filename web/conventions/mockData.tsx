//always use real data model from models folder
import {User, SomeValueEnum} from "./Models";

const mockUsers: User[] = [
  {
    id: "123456",
    name: "Micky",
    someValue: SomeValueEnum.YES,
  },
  {
    id: "789456",
    name: "Ngub",
    someValue: SomeValueEnum.NO,
  },
];
export default mockUsers;
