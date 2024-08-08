const mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "learn",
});

const getAllUsers = () => {
  connection.query("SELECT * from employee", function (error, results, fields) {
    if (error) throw error;
    console.log("All users: ", results);
  });
};

const insertUser = (id, name, email, age) => {
  const query = `INSERT INTO employee (id, name, email, age) VALUES (?, ?, ?, ?)`;
  connection.query(
    query,
    [id, name, email, age],
    function (error, results, fields) {
      if (error) throw error;
      console.log("User inserted: ", results);
    }
  );
};

const updateUser = (id, name, email, age) => {
  const query = `UPDATE employee SET name = ?, email = ?, age = ? WHERE id = ?`;
  connection.query(
    query,
    [name, email, age, id],
    function (error, results, fields) {
      if (error) throw error;
      console.log("User updated: ", results);
    }
  );
};

const deleteUser = (id) => {
  const query = `DELETE FROM employee WHERE id = ?`;
  connection.query(query, [id], function (error, results, fields) {
    if (error) throw error;
    console.log("User deleted: ", results);
  });
};

async function deleteUserbyId(id) {
  const result = await new Promise((resolve, reject) => {
    const query = `DELETE FROM employee WHERE id = ?`;
    connection.query(query, [id], function (error, results, fields) {
      if (error) return reject(error);
      console.log("User deleted: ", results);
      return resolve(results);
    });
  });
}

async function getAllEmployees2() {
  const result = await new Promise((resolve, reject) => {
    connection.query("SELECT * from employee", (error, results) => {
      if (error) return reject(error);
      return resolve(results);
    });
  });
  console.log(result);
}

connection.connect(async function (err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }

  // getAllUsers();

  //   insertUser(6, "dee", "d@g.com", 25);

  // updateUser(6, "dee_updated", "dee_updated@g.com", 26);

  // deleteUser(6);

  //  deleteUserbyId(6);

  await getAllEmployees2();

  connection.end();
});
