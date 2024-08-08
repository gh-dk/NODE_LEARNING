const fs = require("fs");
const path = require("path");

const filePath = "user.json";

function readJsonFile() {
  try {
    const data = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading the file:", error);
    return null;
  }
}

function writeJsonFile(data) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    console.log("File successfully updated!");
  } catch (error) {
    console.error("Error writing to the file:", error);
  }
}

function addUser(newUser) {
  const data = readJsonFile();
  if (data) {
    data.users.push(newUser); 
    writeJsonFile(data);
  }
}

const newUser = {
  id: 2,
  name: "Mike",
  email: "mike@example.com",
};

addUser(newUser);
