const mongoose = require('mongoose');

const empSchema = new mongoose.Schema({
    _id: Number,
    emp_name: { type: String, default: 'neosoft' },
    emp_email: String,
    emp_salary: Number
});


// Create the model
const EmployeeModel = mongoose.model('Employee', empSchema);

// Connect to MongoDB
mailto:mongoose.connect('mongodb+srv://deepakkanojiya:LdYVKZBgPsYrsC63@cluster0.78akxjh.mongodb.net/learn2?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => {
        console.log('Connected to MongoDB...');
        run();
    })
    .catch(err => console.log('Connection error:', err));


// Function to get all employees
async function getAllEmployees() {
    try {
        const data = await EmployeeModel.find({}).exec();
        console.log('All Employees:', data);
    } catch (err) {
        console.log('Error fetching all employees:', err);
    }
}

// Function to get an employee by ID
async function getEmployeeById(empId) {
    try {
        const data = await EmployeeModel.findById(empId).exec();
        console.log('Employee by ID:', data);
    } catch (err) {
        console.log('Error fetching employee by ID:', err);
    }
}

// Function to delete an employee by ID
async function deleteEmployeeById(empId) {
    try {
        const result = await EmployeeModel.deleteOne({ _id: empId });
        console.log('Deleted Employee:', result);
    } catch (err) {
        console.log('Error deleting employee by ID:', err);
    }
}

// Function to update an employee
async function updateEmployee(empId, updates) {
    try {
        const result = await EmployeeModel.updateOne({ _id: empId }, updates);
        console.log('Updated Employee:', result);
    } catch (err) {
        console.log('Error updating employee:', err);
    }
}

// Function to add a new employee
async function addEmployee(employee) {
    try {
        const EmployeeDoc = new EmployeeModel(employee);
        const res = await EmployeeDoc.save();
        console.log('Inserted Employee:', res);
    } catch (err) {
        console.log('Error adding employee:', err);
    }
}

// Function to perform aggregation
async function aggregateEmployees() {
    try {
        const employees = await EmployeeModel.find({ emp_salary: { $gte: 50000 } }).exec();
        console.log('Aggregation Result:', employees);
    } catch (err) {
        console.log('Error during aggregation:', err);
    }
}

// // Function for pagination
// async function paginateEmployees() {
//     try {
//         const options = { page: 1, limit: 5 };
//         const result = await EmployeeModel.paginate({}, options);
//         console.log('Paginated Employees:', result);
//     } catch (err) {
//         console.log('Error during pagination:', err);
//     }
// }

const employee = {
    emp_name : "new name"
}

const newEmp = {
    _id: 3311,
    emp_name: ' User 11',
    emp_salary: 90000,
    emp_email: 'mailto:delete@gmail.com'
};

// Run all the functions
async function run() {
     await getAllEmployees();
    // await getEmployeeById(334);
    // await deleteEmployeeById(334);
    // await updateEmployee(335, employee);
    //await addEmployee(newEmp);
    // await aggregateEmployees();
    //await paginateEmployees();
}
