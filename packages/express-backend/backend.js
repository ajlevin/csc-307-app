// backend.js
import express from "express";
import cors from "cors";
import {v4 as uuidv4} from 'uuid';

const app = express();
const port = 8000;

const findUserByName = (name) => {
  return users["users_list"].filter(
    (user) => user["name"] === name
  );
};

const findUserByNameAndJob = (name, job) => {
  return users["users_list"].filter(
    (user) => user["name"] === name && user["job"] === job
  );
};

const findUserById = (id) =>
  users["users_list"].find((user) => user["id"] === id);

const addUser = (user) => {
  users["users_list"].push(user);
  return user;
};

const deleteUser = (id) => {
  let uInd = users["users_list"].findIndex((user) => user["id"] === id);
  console.log(uInd)
  console.log(users["users_list"])

  if (uInd !== -1) {
      users["users_list"].splice([uInd], 1);
      return 200;
  } else {
      return 404;
  }
};

const users = {
  users_list: [
    {
      id: "xyz789",
      name: "Charlie",
      job: "Janitor"
    },
    {
      id: "abc123",
      name: "Mac",
      job: "Bouncer"
    },
    {
      id: "ppp222",
      name: "Mac",
      job: "Professor"
    },
    {
      id: "yat999",
      name: "Dee",
      job: "Aspring actress"
    },
    {
      id: "zap555",
      name: "Dennis",
      job: "Bartender"
    }
  ]
};

app.use(cors())
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("Hello World!");
});

app.get("/users", (req, res) => {
  const name = req.query.name;
  const job = req.query.job;
  let result = undefined;
  if (name != undefined) {
    if (job != undefined) {
        result = findUserByNameAndJob(name, job)
    } else {
        result = findUserByName(name);
    }
        result = { users_list: result };
        res.send(result);
  } else {
    res.status(200).send(users);
  }
});

app.get("/users/:id", (req, res) => {
  const id = req.params["id"]; //or req.params.id
  let result = findUserById(id);
  if (result === undefined) {
    res.status(404).send("Resource not found.");
  } else {
    res.status(200).send(result);
  }
});

app.post("/users", (req, res) => {
  const userToAdd = req.body;
  req.body.id = uuidv4();
  addUser(userToAdd);
  res.status(201).send(userToAdd);
});

app.delete("/users/:id", (req, res) => {
  const id = req.params["id"];
  let result = deleteUser(id);
  if (result === 404) {
    res.status(result).send("Resource not found.");
  } else {
    res.send();
  }
});

app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});
