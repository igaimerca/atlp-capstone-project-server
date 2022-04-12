
const mongoose = require('mongoose');
const User = require("../models/User");
const { UserSchema } = require("../utils/joiValidate.js");
const { genSalt, hash } = require("bcrypt");
const bcrypt = require("bcrypt");
const { compare } = bcrypt;

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
            // Generate password hash
            const salt = await genSalt(10);
            newUser.password = await hash(newUser.password, salt);
            await newUser.save();
            res.status(201).json({ msg: "User Create successfully", data: newUser });
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
            if (value.password) {
                return res.status(501).json("Password requires resetting")
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

const login = async (req, res) => {
    try {
        let user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(400).send("Invalid Email or Password!");
        const validPassword = await compare(req.body.password, user.password);
        if (!validPassword)
            return res.status(400).send("Invalid Email or Password!");

        const token = user.generateAuthToken();
        res.header("Authorization", token).send({
            status: 200,
            message: "Login Successful",
            data: user,
          });
    } catch (ex) {
        res.status(400).send(ex.message);
    }
};

const deleteAccount = async (req, res) => {
    try {
        let user = await User.findById(req.user._id);
        if (!user) return res.status(404).send("The user does not exist");

        await User.findByIdAndRemove(req.user._id);
        res.status(200).send("User deleted successfully");
    } catch (ex) {
        res.status(400).send(ex.message);
    }
};


const deleteAllAccounts = async (req, res) => {
    try {
            await User.remove({});
            res.status(200).send("Users deleted successfully");
    } catch (ex) {
        res.status(400).send(ex.message);
    }
};


module.exports = {
    createUser, updateUser, getUsers, login, deleteAccount, deleteAllAccounts
}