// backend.js
import express from "express";
import cors from "cors";
import { getUsers, addUser, deleteUser, findUserById } from './userServices.js';

const app = express();
const port = 8000;

app.use(cors())
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("Hello World!");
});

app.get("/users", (req, res) => {
  const name = req.query.name;
  const job = req.query.job;
  getUsers(name, job)
    .then((result) => res.status(201).send(result))
    .catch((err) => res.status(404).send("Resource not found"));
});

app.get("/users/:id", (req, res) => {
  const id = req.params.id;
  findUserById(id)
    .then((result) => res.status(200).send(result))
    .catch((err) => res.status(404).send("Resource not found"));
});

app.post("/users", (req, res) => {
  addUser(req.body)
    .then((result) => res.status(201).send(result))
    .catch((err) => res.status(404).send("Unable to POST to resource"));
});

app.delete("/users/:id", (req, res) => {
  const id = req.params["id"];
  deleteUser(id)
    .then((result) => res.status(201).send(result))
    .catch((err) => res.status(404).send("Resource not found"));
});

app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});
