const express = require("express");
const {
  getAllData,
  insertUser,
  deleteById,
  getUserById,
} = require("./controllers/mongodb.controller");

const { getAllUsers } = require("./controllers/mysql.controller");
const { connectDB } = require("./config/mysqldb");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let mysqlDB;

const PORT = 3000;

app.get("/", async (req, res) => {
  const data = await getAllData();
  res.json(data);
});
app.post("/", async (req, res) => {
  const { name, password } = req.body;
  const data = await insertUser(name, password);
  res.json(data);
});

app.delete("/", deleteById);
app.get("/:id", getUserById);

app.get("/sql", async (req, res) => {
  const data = getAllUsers(mysqlDB);
  res.json(data);
});

app.listen(PORT, async () => {
  mysqlDB = await connectDB();
  require("./config/mongodb");
  console.log("server running at " + PORT);
});
