const express = require("express");
const multer = require("multer");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

const { connectDB } = require("./config/mysqldb");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/public", express.static(path.join(__dirname, "public")));

const upload = multer();

let mysqlDB;

const PORT = 3001;

// Books
app.get("/books", async (req, res) => {
  try {
    const [result, fields] = await mysqlDB.query("SELECT * FROM books");
    res.status(200).json({ result });
  } catch (error) {
    console.error("Error fetching books:", error);
    res.status(500).json({ error: "Failed to get books" });
  }
});

app.get("/books/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const [result, fields] = await mysqlDB.query(
      `SELECT * FROM books WHERE id = ?`,
      [id]
    );
    res.status(200).json({ result });
  } catch (error) {
    console.error("Error fetching book:", error);
    res.status(500).json({ error: "Failed to get book" });
  }
});

// Add books
app.post(
  "/books",
  upload.fields([{ name: "image" }, { name: "pdf" }]),
  async (req, res) => {
    try {
      const { title, author, summary, type } = req.body;
      const image = req.files["image"] ? req.files["image"][0].buffer : null;
      const pdfFile = req.files["pdf"] ? req.files["pdf"][0] : null;

      let dbPathName = null;
      if (pdfFile) {
        dbPathName = await savePDFFile(pdfFile, "public/books");
      }

      await saveBookToDB(title, author, summary, image, dbPathName, type, res);
    } catch (error) {
      console.error("Error creating book:", error);
      res.status(500).json({ error: "Failed to create book" });
    }
  }
);

// Save book to DB
const saveBookToDB = async (
  title,
  author,
  summary,
  image,
  pdfPath,
  type,
  res
) => {
  try {
    const [result] = await mysqlDB.query(
      "INSERT INTO books (title, author, summary, image, pdf, type) VALUES (?, ?, ?, ?, ?, ?)",
      [title, author, summary, image, pdfPath, type]
    );

    res
      .status(201)
      .json({ id: result.insertId, message: "Book created successfully" });
  } catch (error) {
    console.error("Error saving book to DB:", error);
    res.status(500).json({ error: "Failed to create book" });
  }
};

// Update books
app.patch(
  "/update/books/:id",
  upload.fields([{ name: "image" }, { name: "pdf" }]),
  async (req, res) => {
    try {
      const id = req.params.id;
      const { title, author, summary, type } = req.body;
      const image = req.files["image"] ? req.files["image"][0].buffer : null;
      const pdfFile = req.files["pdf"] ? req.files["pdf"][0] : null;

      const [existingBook] = await mysqlDB.query(
        "SELECT * FROM books WHERE id = ?",
        [id]
      );

      if (existingBook.length === 0) {
        return res.status(404).json({ error: "Book not found" });
      }

      const newImage = image ? image : existingBook[0].image;

      let dbPathName = existingBook[0].pdf;
      if (pdfFile) {
        await deletePdf(dbPathName);
        dbPathName = await savePDFFile(pdfFile, "public/books");
      }

      await updateBookInDB(
        id,
        title,
        author,
        summary,
        newImage,
        dbPathName,
        type,
        res
      );
    } catch (error) {
      console.error("Error updating book:", error);
      res.status(500).json({ error: "Failed to update book" });
    }
  }
);

// Update book in DB
const updateBookInDB = async (
  id,
  title,
  author,
  summary,
  image,
  pdfPath,
  type,
  res
) => {
  try {
    const [result] = await mysqlDB.query(
      "UPDATE books SET title = ?, author = ?, summary = ?, image = ?, pdf = ?, type = ? WHERE id = ?",
      [title, author, summary, image, pdfPath, type, id]
    );

    res.status(200).json({ message: "Book updated successfully" });
  } catch (error) {
    console.error("Error updating book in DB:", error);
    res.status(500).json({ error: "Failed to update book" });
  }
};

// PDF saving code
const savePDFFile = async (pdfFile, directory) => {
  const pdfFileName = `${Date.now()}-${pdfFile.originalname}`;
  const pdfFilePath = path.join(__dirname, directory, pdfFileName);
  const dbPathName = path.join(directory, pdfFileName);

  fs.mkdirSync(path.join(__dirname, directory), { recursive: true });

  return new Promise((resolve, reject) => {
    fs.writeFile(pdfFilePath, pdfFile.buffer, (err) => {
      if (err) {
        console.error("Error saving PDF:", err);
        return reject("Failed to save PDF");
      }
      resolve(dbPathName);
    });
  });
};

//delete
app.delete("/delete/books/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const [book] = await mysqlDB.query("SELECT pdf FROM books WHERE id = ?", [
      id,
    ]);
    if (!book.length) {
      return res.status(404).json({ error: "Book not found" });
    }
    const pdfPath = book[0].pdf;
    const [result] = await mysqlDB.query("DELETE FROM books WHERE id = ?", [
      id,
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Book not found" });
    }
    await deletePdf(pdfPath);
    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    console.error("Error deleting book:", error);
    res.status(500).json({ error: "Failed to delete book" });
  }
});

//search
app.get("/search/books/:title", async (req, res) => {
  try {
    const title = req.params.title;
    const query = "SELECT * FROM books WHERE title LIKE ?";
    const [result] = await mysqlDB.query(query, [`%${title}%`]);

    if (result.length === 0) {
      res.status(200).json({ result: [] });
    } else {
      res.status(200).json({ result });
    }
  } catch (error) {
    console.error("Error searching for books:", error);
    res.status(500).json({ error: "Failed to search books" });
  }
});

const deletePdf = async (pdfPath) => {
  const fullPath = path.join(__dirname, pdfPath);
  fs.unlink(fullPath, (err) => {
    if (err) {
      console.error("Error deleting PDF file:", err);
    }
  });
};

app.listen(PORT, async () => {
  mysqlDB = await connectDB();
  console.log("Server running at " + PORT);
});
