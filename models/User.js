const mongoose = require("mongoose");

const jsonwebtoken = require("jsonwebtoken");
const {sign} = jsonwebtoken

const userSchema = mongoose.Schema({
    name: String,
    email: {
        type: String,
        unique: true,
        match: [/\S+@\S+\.\S+/, 'Email is invalid']
    },
    position: String,
    experience: String,
    company: String,
    password: String,
    role: {
        type: String,
        enum: ['admin', 'standard'],
        default: 'admin'
    }
});

userSchema.methods.generateAuthToken = function(){
    const token = sign(
        {_id:this._id,role: this.role},
        (process.env.JWT).trim()
    )
    return 'Bearer '+token
}

module.exports = mongoose.model("User", userSchema);
