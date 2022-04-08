
const mongoose = require('mongoose');
const User = require("../models/User");
const { UserSchema } = require("../utils/joiValidate.js");

const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(404).json(error.message);
    }
}


const createUser = async (req, res) => {
    try {
        let body = req.body;
        const { error, value } = UserSchema.validate(body);
        if (error) {
            res.status(400).json({ success: false, msg: error.details[0].message });
        } else {
            const newUser = new User(value);
            await newUser.save();
            res.status(201).json(newUser);
        }
    } catch (error) {
        res.status(400).json({ success: false, msg: error.message });
    }
}

const updateUser = async (req, res) => {
    try {
        const { id: _id } = req.params;
        const body = req.body;
        const { error, value } = UserSchema.validate(body);
        if (!mongoose.Types.ObjectId.isValid(_id)) {
            return res
                .status(404)
                .json({ success: false, msg: `User not found!` });
        } else if (error) {
            return res.status(400).json({ success: false, msg: error.details[0].message });
        } else {
            if(value.password) {
                return res.status(501).json("Password not allowed! please try resetting")
            }
            const updatedUser = await User.findByIdAndUpdate(_id, value, {
                new: true,
            });
            return res.status(201).json(updatedUser);
        }
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = {
    createUser, updateUser, getUsers
}