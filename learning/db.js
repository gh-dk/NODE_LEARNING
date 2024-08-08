
const getAllData = async () => {
  try {
    const users = await userModel.find();
    console.log(users);
  } catch (err) {
    console.error("Error fetching data", err);
  }
};

const getUserById = async (id) => {
  try {
    const user = await userModel.findById(id);
    console.log(user);
  } catch {
    console.log("error");
  }
};

const deleteById = async (id) => {
  try {
    const user = await userModel.deleteOne({ _id: id });
    console.log(user);
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

const updateUser = async (id,name) => {
  try {
    const users = await userModel.updateOne({_id:id},{ name: name });
    console.log(users);
  } catch (err) {
    console.error("Error fetching data", err);
  }
};

mongoose
  .connect(
    "mongodb+srv://deepakkanojiya:LdYVKZBgPsYrsC63@cluster0.78akxjh.mongodb.net/learn?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then((e) => {
    console.log("connected___");
    //insertUser('user3','1234')
    //deleteById("66b1f700020426d8bc208c26");
    getAllData();
    //getUserById('66b20be7e0f0c164b2aa9799')
    //updateUser('66b20c75d984d58256dbc589','john')
  })
  .catch();
