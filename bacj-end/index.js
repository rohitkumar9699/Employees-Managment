const express = require('express');
const mongoose = require('mongoose');
const Employee = require("./model/Schema.js");
const PORT = process.env.PORT || 5000;
const mongo_connect = "mongodb://localhost:27017/emp";
const cors = require('cors');

mongoose.connect(mongo_connect)
    .then(() => console.log("Mongoose Connected Successfully!"))
    .catch(err => console.log("MongoDB Connection Error: ", err));

const app = express();
app.use(express.json());
app.use(cors());



// Route to fetch all employees
app.get("/", (req, res) => {
    Employee.find({})
        .then(emp => res.status(200).json(emp))
        .catch(err => res.status(500).json({ error: "Failed to fetch employees", details: err }));
});

// Route to create an employee
app.post("/create", (req, res) => {
    const { name, phone, dateOfBirth, dateOfJoining, department, employmentStatus, marital, gender, address } = req.body;

    if (!name || !phone || !dateOfBirth || !dateOfJoining || !department || !employmentStatus || !gender || !address) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    // Generate employee ID based on department and joining year
    const employeeId = department[0].toUpperCase() + "-" + new Date(dateOfJoining).toISOString().substr(0, 4);
    req.body.employeeId = employeeId;

    // Create a new employee
    Employee.create(req.body)
        .then(result => {
            res.status(201).json(result);
            console.log("Employee successfully added!");
        })
        .catch(err => {
            console.error("Failed to create employee: ", err);
            res.status(500).json({ error: "Failed to create employee", details: err });
        });
});

// Route to fetch details of a specific employee by ID
app.get("/viewdetail/:id", (req, res) => {
    const { id } = req.params; // id refers to employeeId

    Employee.findOne({ employeeId: id }) 
        .then(emp => {
            if (!emp) {
                return res.status(404).json({ error: "Employee not found" });
            }
            res.status(200).json(emp);
        })
        .catch(err => res.status(500).json({ error: "Failed to fetch employee", details: err }));
});


// Delete an employee record
app.delete("/delete/:id", (req, res) => {
    const { id } = req.params;  // Get the employeeId from the URL

    Employee.findOneAndDelete({ employeeId: id })  // Delete employee by employeeId
        .then(deletedEmp => {
            if (!deletedEmp) {
                return res.status(404).json({ error: "Employee not found" });
            }
            res.status(200).json({ message: "Employee deleted successfully" });
        })
        .catch(err => res.status(500).json({ error: "Failed to delete employee", details: err }));
});

// Route to update specific employee by employeeId
app.put('/update/:id', (req, res) => {
    const { name, phone, department, employmentStatus, marital, address } = req.body;
    const employeeId = req.params.id;

    // Update the employee data based on the provided employeeId
    Employee.findOneAndUpdate(
        { employeeId: employeeId }, // Find by employeeId
        {
            $set: {
                name: name,
                phone: phone,
                department: department,
                employmentStatus: employmentStatus,
                marital: marital,
                'address.city': address.city,
                'address.district': address.district,
                'address.state': address.state
            }
        },
        { new: true, runValidators: true } // Options to return the updated document and run schema validators
    )
    .then(result => {
        if (!result) {
            return res.status(404).send({ message: "Employee not found" });
        }
        return res.status(200).send({ message: "Employee updated successfully", data: result });
    })
    .catch(err => {
        return res.status(500).send({ message: "Error updating employee", error: err });
    });
});



// Start the server
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
