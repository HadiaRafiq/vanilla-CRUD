import { database } from "./data.js";
import { v4 as uuidv4 } from "uuid";

export const createUser = (user) => {
  const { users } = database;
  return new Promise((resolve, _) => {
    const id = uuidv4();
    const newUser = { id, ...user };
    users.push(newUser);
    resolve(newUser);
  });
};
export const updateUser = (request, id) => {
  const { users } = database;
  return new Promise((resolve, reject) => {
    const updateIndex = users.findIndex((user) => user.id === id);
    if (updateIndex !== -1) {
      users[updateIndex] = request;
      resolve(users);
    } else {
      reject("user not found");
    }
  });
};
export const deleteUser = (id) => {
  const { users } = database;
  return new Promise((resolve, reject) => {
    const removeIndex = users.findIndex((user) => user.id === id);
    if (removeIndex !== -1) {
      users.splice(removeIndex, 1);

      resolve(users);
    } else {
      reject("user not found");
    }
  });
};
export const getUsers = () => {
  const { users } = database;
  return new Promise((resolve, _) => {
    resolve(users);
  });
};
export const createEvent = (event) => {
  const { events } = database;
  return new Promise((resolve, _) => {
    const id = uuidv4();
    const newEvent = {
      id,
      ...event,
      startdatetime: new Date(event.startdatetime),
      enddatetime: new Date(event.enddatetime),
    };
    events.push(newEvent);
    resolve(newEvent);
  });
};
export const updateEvent = (request, id) => {
  const { events } = database;
  return new Promise((resolve, reject) => {
    const updateIndex = events.findIndex((event) => event.id === id);
    if (updateIndex !== -1) {
      const updatedRequest = {
        ...request,
        startdatetime: new Date(request.startdatetime),
        enddatetime: new Date(request.enddatetime),
      };
      events[updateIndex] = updatedRequest;
      resolve(events);
    } else {
      reject("event not found");
    }
  });
};
export const deleteEvent = (id) => {
  const { events } = database;
  return new Promise((resolve, reject) => {
    const removeIndex = events.findIndex((event) => event.id === id);
    if (removeIndex !== -1) {
      events.splice(removeIndex, 1);
      resolve(events);
    } else {
      reject("event not found");
    }
  });
};
export const getEvents = () => {
  const { events } = database;
  return new Promise((resolve, _) => {
    resolve(events);
  });
};
export const attendEvent = (attendanceInfo) => {
  const { attend, users, events } = database;
  return new Promise((resolve, reject) => {
    const userExists = users.findIndex(
      (user) => user.id === attendanceInfo.userID
    );
    const eventExists = events.findIndex(
      (event) => event.id === attendanceInfo.eventID
    );
    if (userExists !== -1 && eventExists !== -1) {
      attend.push(attendanceInfo);
      resolve(attendanceInfo);
    } else {
      reject(userExists === -1 ? "user not found" : "event not found");
    }
  });
};
