import { v4 as uuidv4 } from "uuid";

export const database = {
  users: [
    {
      id: uuidv4(),
      firstnam: "John",
      lastname: "Doe",
      email: "johndoe@gmail.com",
    },
  ],
  events: [
    {
      id: uuidv4(),
      name: "GFG",
      startdatetime: new Date("2023-10-10T10:00:00.000Z"),
      enddatetime: new Date("2023-10-10T12:00:00.000Z"),
    },
  ],
  attend: [],
};

