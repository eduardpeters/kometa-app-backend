const db = require("../db/queries");

const getUsers = async (req, res) => {
    try {
        const result = await db.query("SELECT * FROM users ORDER BY userid ASC");
        return res.status(200).json(result);
    }
    catch (error) {
        console.error(error);
        return res.status(500).send();
    }
}

const getUserById = async (req, res) => {
    const requestedId = parseInt(req.params.id);
    try {
        const result = await db.query("SELECT * FROM users WHERE userid = $1", [requestedId]);
        return res.status(200).json(result[0]);
    }
    catch (error) {
        console.error(error);
        return res.status(500).send();
    }
}

const createUser = (req, res) => {
    return res.status(418).send("Not implemented");
}

const updateUser = (req, res) => {
    return res.status(418).send("Not implemented");
}

const deleteUser = (req, res) => {
    return res.status(418).send("Not implemented");
}

module.exports = { getUsers, getUserById, createUser, updateUser, deleteUser };