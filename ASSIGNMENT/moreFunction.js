const mongoose = require("mongoose");

const empSchema = new mongoose.Schema({
  _id: Number,
  emp_name: { type: String, default: "neosoft" },
  emp_email: String,
  emp_salary: Number,
});

const EmployeeModel = mongoose.model("Employee", empSchema);

mailto: mongoose
  .connect(
    "mongodb+srv://deepakkanojiya:LdYVKZBgPsYrsC63@cluster0.78akxjh.mongodb.net/learn2?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("Connected to MongoDB...");
    run();
  })
  .catch((err) => console.log("Connection error:", err));

async function getAllEmployees() {
  try {
    const data = await EmployeeModel.find({}).exec();
    console.log("All Employees:", data);
  } catch (err) {
    console.log("Error fetching all employees:", err);
  }
}

async function getEmployeeById(empId) {
  try {
    const data = await EmployeeModel.findById(empId).exec();
    console.log("Employee by ID:", data);
  } catch (err) {
    console.log("Error fetching employee by ID:", err);
  }
}

async function deleteEmployeeById(empId) {
  try {
    const result = await EmployeeModel.deleteOne({ _id: empId });
    console.log("Deleted Employee:", result);
  } catch (err) {
    console.log("Error deleting employee by ID:", err);
  }
}

async function updateEmployee(empId, updates) {
  try {
    const result = await EmployeeModel.updateOne({ _id: empId }, updates);
    console.log("Updated Employee:", result);
  } catch (err) {
    console.log("Error updating employee:", err);
  }
}

// Function to add a new employee
async function addEmployee(employee) {
  try {
    const EmployeeDoc = new EmployeeModel(employee);
    const res = await EmployeeDoc.save();
    console.log("Inserted Employee:", res);
  } catch (err) {
    console.log("Error adding employee:", err);
  }
}

async function aggregateEmployeesGTE(range) {
  try {
    const employees = await EmployeeModel.find({
      emp_salary: { $gte: range },
    }).exec();
    console.log("Aggregation Result:", employees);
  } catch (err) {
    console.log("Error during aggregation:", err);
  }
}

async function aggregateEmployeesLTE(range) {
  try {
    const employees = await EmployeeModel.find({
      emp_salary: { $lte: range },
    }).exec();
    console.log("Aggregation Result:", employees);
  } catch (err) {
    console.log("Error during aggregation:", err);
  }
}

// async function paginateEmployees() {
//   try {
//     const options = { page: 1, limit: 5 };
//     const result = await EmployeeModel.paginate({}, options);
//     console.log("Paginated Employees:", result);
//   } catch (err) {
//     console.log("Error during pagination:", err);
//   }
// }

async function sortEmployeeBysalary() {
  try {
    const data = await EmployeeModel.find({}).sort({ emp_salary: 1 }).exec();
    console.log("All Employees:", data);
  } catch (err) {
    console.log("Error fetching all employees:", err);
  }
}

const employee = {
  emp_name: "new name",
};

const newEmp = {
  _id: 3313,
  emp_name: " User 11",
  emp_salary: 80000,
  emp_email: "mailto:delete@gmail.com",
};

// Run all the functions
async function run() {
  //await getAllEmployees();
   //await getEmployeeById(334);
   //await deleteEmployeeById(334);
  //await updateEmployee(337, employee);
  //await addEmployee(newEmp);
  //await aggregateEmployeesGTE(85000);
  //await aggregateEmployeesLTE(80000);
  await sortEmployeeBysalary();
}
