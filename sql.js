const express = require("express");

const {
  getAllUsers,
  insertIntoUser,
  deleteUsersById,
  updateUser,
  getAUsersById
} = require("./controllers/mysql.controller");

const { connectDB } = require("./config/mysqldb");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let mysqlDB;

const PORT = 3000;

app.get("/", async (req, res) => {
  const data = await getAllUsers(mysqlDB);
  res.json(data);
});
app.post("/", async (req, res) => {
  const { id, name, email, age } = req.body;
  const data = await insertIntoUser(mysqlDB, id, name, email, age);
  res.json(data); 
});

app.get("/:id", async (req, res) => {
  const { id} = req.params;
  const data = await getAUsersById(mysqlDB, id);
  res.json(data);
});

app.post("/delete", async (req, res) => {
  const { id } = req.body;
  const data = await deleteUsersById(mysqlDB, id);
  res.json(data);
});

app.post("/update", async (req, res) => {
  const { id, name, email, age } = req.body;
  const data = await updateUser(mysqlDB, id, name, email, age);
  res.json(data);
});

// app.delete("/", deleteById);
// app.get("/:id", getUserById);

// app.get("/sql", async (req, res) => {
//   const data = getAllUsers(mysqlDB);
//   res.json(data);
// });

app.listen(PORT, async () => {
  mysqlDB = await connectDB();
  // console.log(mysqlDB);
  console.log("server running at " + PORT);
});
