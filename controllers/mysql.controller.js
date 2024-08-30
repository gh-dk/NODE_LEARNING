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
    return results;
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

const insertIntoUser = async (
  connection,
  id,
  name,
  email,
  age,
  profilepicture
) => {
  try {
    const query = `INSERT INTO employee (id, name, email, age, profilepicture) VALUES (?, ?, ?, ?, ?)`;
    const [results] = await connection.query(query, [
      id,
      name,
      email,
      age,
      profilepicture,
    ]);
    console.log("User inserted: ", results);
    return results;
  } catch (error) {
    console.error("Error inserting user:", error);
    throw error;
  }
};

const updateUser = async (connection, id, name, email, age, profilepicture) => {
  const query = `UPDATE employee SET name = ?, email = ?, age = ? , profilepicture = ? WHERE id = ?`;
  const [results, fields] = await connection.query(
    query,
    [name, email, age, profilepicture, id],
    function (error, results, fields) {
      if (error) throw error;
      console.log("User updated: ", results);
    }
  );
  return results
};

module.exports = {
  getAllUsers,
  getAUsersById,
  deleteUsersById,
  insertIntoUser,
  updateUser,
};
