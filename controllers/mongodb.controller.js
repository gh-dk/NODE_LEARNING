const { userModel } = require("../model/mongodb.model");

const getAllData = async () => {
  const employees = await userModel.find({});
  console.log("get all data");

  // const employeesWithProfilePic = employees.map((employee) => {

  //   // console.log(src);

  //   return employee
  // });
  // console.log(employeesWithProfilePic);

  return employees;
};

const getUserById = async (req, res) => {
  let id = req.params.id;
  console.log("user by id");

  try {
    const user = await userModel.findById(id);
    console.log(user);
    res.json(user);
  } catch {
    console.log("error");
  }
};

const deleteById = async (req, res) => {
  console.log(req.params);
  let id = req.params.id;
  try {
    const user = await userModel.deleteOne({ _id: id });
    console.log(user);
    res.json(user);
  } catch {
    console.log("error");
    res.send("error");
  }
};

const insertUser = async (
  _id,
  name,
  password,
  email,
  joiningDate,
  dept,
  address,
  profilePic,
  req
) => {
  try {
    console.log("controller", profilePic);

    const user = new userModel({
      _id,
      name,
      password,
      email,
      joiningDate,
      dept,
      address,
      profilePic: profilePic
        ? { data: profilePic, contentType: req.file.mimetype }
        : null,
    });
    const savedUser = await user.save();
    console.log(savedUser);

    return savedUser;
  } catch (err) {
    console.error("Error fetching data", err);
  }
};

const updateUser = async (req, res) => {
  const id = req.params.id;
  console.log("Update request received", req.body);
  console.log("Profile Picture:", req.file);
  const newprofilePic = req.file ? req.file.buffer : null;
  try {
    const updatedUser = await userModel.updateOne(
      { _id: id },
      {
        $set: {
          name: req.body.name,
          password: req.body.password,
          email: req.body.email,
          dept: req.body.dept,
          joiningDate: req.body.joiningDate,
          address: req.body.address,
          profilePic: newprofilePic
            ? { data: newprofilePic, contentType: req.file.mimetype }
            : null,
        },
      }
    );

    if (updatedUser.nModified === 0) {
      return res
        .status(404)
        .json({ message: "User not found or no changes made" });
    }

    res.status(200).json(updatedUser);
  } catch (err) {
    console.error("Error updating user", err);
    res
      .status(500)
      .json({ message: "An error occurred while updating the user" });
  }
};

module.exports = {
  getAllData,
  getUserById,
  deleteById,
  insertUser,
  updateUser,
};
