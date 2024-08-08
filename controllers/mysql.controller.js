const getAllUsers = async (connection) => {
  try {
    const results = await connection.query("SELECT * FROM employee");
    console.log("All users:", results);
    return results[0];
  } catch (error) {
    console.error("Error fetching users:", error);
    // throw error;
  }
};

const getAUsersById = async (connection, id) => {
  try {
    const [results, fields] = await connection.query(
      "SELECT * from employee where id='" + id + "'"
    );
    console.log("All users:", results);
    return results
  } catch (error) {
    console.error("Error fetching users:", error);
  }
};

const deleteUsersById = async (connection, id) => {
  try {
    const [results, fields] = await connection.query(
      "delete from employee where id='" + id + "'"
    );
    console.log("All users:", results);
  } catch (error) {
    console.error("Error fetching users:", error);
  }
};

const insertIntoUser = async (connection, id, name, email, age) => {
  try {
    const query = `INSERT INTO employee (id, name, email, age) VALUES (?, ?, ?, ?)`;
    const [results, fields] = await connection.query(
      query,
      [id, name, email, age],
      function (error, results, fields) {
        if (error) throw error;
        console.log("User inserted: ", results);
      }
    );
    console.log("All users:", results);
  } catch (error) {
    console.error("Error fetching users:", error);
  }
};

const updateUser = async (connection, id, name, email, age) => {
  const query = `UPDATE employee SET name = ?, email = ?, age = ? WHERE id = ?`;
  const [results, fields] = await connection.query(
    query,
    [name, email, age, id],
    function (error, results, fields) {
      if (error) throw error;
      console.log("User updated: ", results);
    }
  );
};

module.exports = {
  getAllUsers,
  getAUsersById,
  deleteUsersById,
  insertIntoUser,
  updateUser,
};
