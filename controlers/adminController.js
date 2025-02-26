const Admin = require("../models/adminModels");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const moment = require("moment");

const validateRequest = (body, fields) => {
    let errors = {};
    fields.forEach((field) => {
        if (!body[field]) {
            errors[field] = `${field} is required`;
        }
    });
    return Object.keys(errors).length ? errors : null;
};

// Admin Registration
const registerAdmin = async function (req, res) {
    try {
        const { name, email, password } = req.body;

        const errors = validateRequest(req.body, ["name", "email", "password"]);
        if (errors) return res.status(400).json({ errors });

        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) return res.status(400).json({ message: "Admin already exists" });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        let newAdmin = await Admin.create({ name, email, password: hashedPassword });

        res.status(201).json({ message: "Admin registered successfully",newAdmin  });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message,});
    }
};

// Admin Login
const loginAdmin = async function (req, res) {
    try {
        const { email, password } = req.body;

        const errors = validateRequest(req.body, ["email", "password"]);
        if (errors) return res.status(400).json({ errors });

        const admin = await Admin.findOne({ email });
        if (!admin) return res.status(400).json({ message: "Invalid email or password" });

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });

        const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

module.exports = { 
    registerAdmin, 
    loginAdmin 
};
