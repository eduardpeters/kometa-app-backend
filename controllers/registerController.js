const bcrypt = require("bcrypt");
const { UsersManager } = require("../models/user.js");
const AdminsManager = require ("../models/admin.js");

/*
The register function will perform the following:
Check email or national id is not duplicate (is a new user)
Hash the password and replace it in the body
Route user creation according to role
*/

const register = async (req, res) => {
    const existingUser = await UsersManager.getUserByEmailOrNationalId(req.body.email, req.body.nationalID);
    if (existingUser) {
        return res.status(400).json({error: "User already exists"});
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    req.body.password = hashedPassword;
    switch(req.body.role) {
        case "admin":
            await registerAdmin(req, res);
            break;
    }
}

const registerAdmin = async (req, res) => {
    const newAdmin = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        birthdate: req.body.birthdate,
        nationalID: req.body.nationalID,
        phone: req.body.phone,
        email: req.body.email,
        password: req.body.password
    }
    try{
        const result = await AdminsManager.createAdmin(newAdmin)
        if (result) {
            return res.status(201).json(result)
        }
        return res.status(400).send();
    }
    catch (error) {
        console.error(error);
        return res.status(500).send();
    }
} 

const getAdmins = async (req, res) => {
    const result = await AdminsManager.getAdmins();
    return res.status(200).json(result);
}

module.exports = { register, getAdmins };