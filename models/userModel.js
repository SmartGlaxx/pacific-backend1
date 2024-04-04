const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

const UserSchema = new mongoose.Schema({
    firstname: {
        type : String,
        required: [true, "Please enter your first name"],
    },
    lastname: {
        type : String,
        required: [true, "Please enter your last name"],
    },
    email: {
        type : String,
        required: [true, "Please enter your email"]
    },
    password: {
        type : String,
        required: [true, "Please enter your password"],
        minlength: 8
    },
    role: {
        type: String,
        default: 'user'
    }
}) 

UserSchema.pre('save', async function(){
    const salt = await bcrypt.genSalt(12)
    this.password = await bcrypt.hash(this.password, salt)
})

UserSchema.methods.checkPassword = async function(enteredPassword){
    const passwordMatch = await bcrypt.compare(enteredPassword, this.password)
    return passwordMatch
}

const User = mongoose.model('User', UserSchema)
module.exports = User
