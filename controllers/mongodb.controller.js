const { userModel } = require("../model/mongodb.model");

const getAllData = async () => {
    const users = await userModel.find({});
    return users;
};

const getUserById = async (id) => {
  try {
    const user = await userModel.findById(id);
    console.log(user);
    return user;
  } catch {
    console.log("error");
  }
};

const deleteById = async (id) => {
  try {
    const user = await userModel.deleteOne({ _id: id });
    console.log(user);
    return user;
  } catch {
    console.log("error");
  }
};

const insertUser = async (name, password) => {
  try {
    const users = await userModel.create({ name: name, password: password });
    console.log(users);
  } catch (err) {
    console.error("Error fetching data", err);
  }
};

const updateUser = async (id, name) => {
  try {
    const users = await userModel.updateOne({ _id: id }, { name: name });
    console.log(users);
    return users;
  } catch (err) {
    console.error("Error fetching data", err);
  }
};

module.exports = {
  getAllData,
  getUserById,
  deleteById,
  insertUser,
  updateUser,
};
