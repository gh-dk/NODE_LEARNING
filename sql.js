const express = require("express");
const multer = require("multer");
const cors = require("cors");

const {
  getAllUsers,
  insertIntoUser,
  deleteUsersById,
  updateUser,
  getAUsersById,
} = require("./controllers/mysql.controller");

const { connectDB } = require("./config/mysqldb");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const upload = multer();

let mysqlDB;

const PORT = 3000;

// app.get("/", async (req, res) => {
//   const data = await getAllUsers(mysqlDB);
//   res.json(data);
// });

// app.get("/:id", async (req, res) => {
//   const { id } = req.params;
//   const data = await getAUsersById(mysqlDB, id);
//   res.json(data);
// });

// app.post("/", upload.single("profilepicture"), async (req, res) => {
//   const { id, name, email, age } = req.body;
//   const profilepicture = req.file ? req.file.buffer : null;
//   console.log(req.file, profilepicture, req.body);
//   const data = await insertIntoUser(
//     mysqlDB,
//     id,
//     name,
//     email,
//     age,
//     profilepicture
//   );
//   res.json(data);
// });

// app.post("/delete", async (req, res) => {
//   const { id } = req.body;
//   const data = await deleteUsersById(mysqlDB, id);
//   res.json(data);
// });

// app.post("/update", upload.single("profilepicture"), async (req, res) => {
//   console.log("Request file:", req.file);
//   console.log("Request body:", req.body);

//   const { id, name, email, age } = req.body;
//   const profilepicture = req.file ? req.file.buffer : null;

//   if (!id) {
//     return res.status(400).json({ error: "ID is required" });
//   }

//   const data = await updateUser(mysqlDB, id, name, email, age, profilepicture);
//   res.json(data);
// });

// app.delete("/", deleteById);
// app.get("/:id", getUserById);

// app.get("/sql", async (req, res) => {
//   const data = getAllUsers(mysqlDB);
//   res.json(data);
// });

// books
app.get("/books", async (req, res) => {
  try {
    const [result,fields] = await mysqlDB.query("SELECT title,type,summary,author,pdf FROM books where id=1");
    res.status(201).json({ result});
  } catch (error) {
    console.error("Error creating book:", error);
    res.status(500).json({ error: "Failed to get book" });
  }
});

app.post(
  "/books",
  upload.fields([{ name: "image" }, { name: "pdf" }]),
  async (req, res) => {
    try {
      const { title, author, summary, type } = req.body;
      // console.log(req);
      console.log(req.body);

      const image = req.files["image"] ? req.files["image"][0].buffer : null;
      const pdf = req.files["pdf"] ? req.files["pdf"][0].buffer : null;
      console.log(image);

      const result = await mysqlDB.query(
        "INSERT INTO books (title, author, summary, image, pdf, type) VALUES (?, ?, ?, ?, ?, ?)",
        [title, author, summary, image, pdf, type]
      );

      res
        .status(201)
        .json({ id: result.insertId, message: "Book created successfully" });
    } catch (error) {
      console.error("Error creating book:", error); // Log the error for debugging
      res.status(500).json({ error: "Failed to create book" });
    }
  }
);

app.listen(PORT, async () => {
  mysqlDB = await connectDB();
  // console.log(mysqlDB);
  console.log("server running at " + PORT);
});
