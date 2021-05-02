enum SomeValueEnum {
  NO = 0,
  YES = 1,
}

interface User {
  id: string;
  name: string;
  someValue: SomeValueEnum;
}

interface WriteResult {
  msg: string;
  status: number;
  doc: any; //cheating here
}

export { User, SomeValueEnum, WriteResult };
