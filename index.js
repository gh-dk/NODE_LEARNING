const express = require("express");
const {
  getAllData,
  insertUser,
  deleteById,
  getUserById,
  updateUser,
} = require("./controllers/mongodb.controller");
const multer = require("multer");
const { getAllUsers } = require("./controllers/mysql.controller");
const { connectDB } = require("./config/mysqldb");
const cors = require("cors");
const app = express();

app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const upload = multer();

let mysqlDB;

const PORT = 3000;

app.get("/", async (req, res) => {
  const data = await getAllData();
  res.json(data);
});

app.get("/:id", getUserById);

// app.post("/upload", upload.single("profilePic"), async (req, res) => {
//   console.log(req.body);
//   console.log(req.file);
// });

app.post("/add", upload.single("profilePic"), async (req, res) => {
  const { _id, name, password, email, joiningDate, dept, address } = req.body;

  const profilePic = req.file ? req.file.buffer : null;

  console.log(req.body, profilePic, " going to controler");

  const data = await insertUser(
    _id,
    name,
    password,
    email,
    joiningDate,
    dept,
    address,
    profilePic,
    req
  );
  res.json(data);
});

app.patch("/update/:id", upload.single("profilePic"), updateUser);

app.delete("/delete/:id", deleteById);

app.get("/sql", async (req, res) => {
  const data = getAllUsers(mysqlDB);
  res.json(data);
});

app.listen(PORT, async () => {
  mysqlDB = await connectDB();
  require("./config/mongodb");
  console.log("server running at " + PORT);
});
