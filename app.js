import { createServer } from "http";

import {
  createEvent,
  createUser,
  deleteEvent,
  deleteUser,
  getEvents,
  getUsers,
  updateEvent,
  updateUser,
} from "./controller.js";
import { getRequestBody } from "./utils.js";

const server = createServer(async (request, response) => {
  const { url, method } = request;
  if (method === "GET") {
    if (url === "/getUsers") {
      try {
        const users = await getUsers();
        response.writeHead(200, { "Content-Type": "application/json" });
        response.end(JSON.stringify(users));
      } catch (error) {
        response.writeHead(400, { "Content-Type": "application/json" });
        response.end(JSON.stringify({ error: `Bad Request ${error}` }));
      }
    } else if (url === "/getEvents") {
      try {
        const events = await getEvents();
        response.writeHead(200, { "Content-Type": "application/json" });
        response.end(JSON.stringify(events));
      } catch (error) {
        response.writeHead(400, { "Content-Type": "application/json" });
        response.end(JSON.stringify({ error: `Bad Request ${error}` }));
      }
    }
  } else if (method === "POST") {
    if (url === "/createUser") {
      try {
        const user = await getRequestBody(request);
        const newUser = await createUser(JSON.parse(user));
        response.writeHead(200, { "Content-Type": "application/json" });
        response.end(JSON.stringify(newUser));
      } catch (error) {
        response.writeHead(400, { "Content-Type": "aplication/json" });
        response.end(JSON.stringify({ error: `Bad Request ${error}` }));
      }
    } else if (url === "/createEvent") {
      try {
        const event = await getRequestBody(request);
        const newEvent = await createEvent(JSON.parse(event));
        response.writeHead(200, { "Content-Type": "application/json" });
        response.end(JSON.stringify(newEvent));
      } catch (error) {
        response.writeHead(400, { "Content-Type": "aplication/json" });
        response.end(JSON.stringify({ error: `Bad Request ${error}` }));
      }
    }
  } else if (method === "PUT") {
    if (url.startsWith("/editUser/")) {
      try {
        const user = await getRequestBody(request);
        const id = url.split("/")[2];
        const updatedUser = await updateUser(JSON.parse(user), id);
        response.writeHead(200, { "Content-Type": "application/json" });
        response.end(JSON.stringify(updatedUser));
      } catch (error) {
        response.writeHead(400, { "Content-Type": "application/json" });
        response.end(JSON.stringify({ error: `Bad Request ${error}` }));
      }
    } else if (url.startsWith("/editEvent/")) {
      try {
        const event = await getRequestBody(request);
        const id = url.split("/")[2];
        const updatedEvent = await updateEvent(JSON.parse(event), id);
        response.writeHead(200, { "Content-Type": "application/json" });
        response.end(JSON.stringify(updatedEvent));
      } catch (error) {
        response.writeHead(400, { "Content-Type": "application/json" });
        response.end(JSON.stringify({ error: `Bad Request ${error}` }));
      }
    }
  } else if (method === "DELETE") {
    if (url.startsWith("/deleteUser/")) {
      try {
        const id = url.split("/")[2];
        const deletedUser = await deleteUser(id);
        response.writeHead(200, { "Content-Type": "application/json" });
        response.end(JSON.stringify(deletedUser));
      } catch (error) {
        response.writeHead(400, { "Content-Type": "application/json" });
        response.end(JSON.stringify({ error: `Bad Request ${error}` }));
      }
    } else if (url.startsWith("/deleteEvent/")) {
      try {
        const id = url.split("/")[2];
        const deletedEvent = await deleteEvent(id);
        response.writeHead(200, { "Content-Type": "application/json" });
        response.end(JSON.stringify(deletedEvent));
      } catch (error) {
        response.writeHead(400, { "Content-Type": "application/json" });
        response.end(JSON.stringify({ error: `Bad Request ${error}` }));
      }
    }
  } else {
    response.writeHead(400, { "Content-Type": "application/json" });
    response.end(JSON.stringify({ error: "Route not found" }));
  }
});

server.listen(3000, () => {
  console.log("Server is running on port 3000 🚀");
});
