import mongoose from "mongoose";
import bcrypt from 'bcrypt'
import { uniqueId } from "../utils/index.js";
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true
    },
})
//antes de que se guarde el registro, queremos ejecutrar esto.
userSchema.pre('save', async function (next){
    if(!this.isModified('password')){
        next()
    }
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})
//Para el password.
userSchema.methods.checkPassword = async function (inputPassword) {
    return await bcrypt.compare(inputPassword, this.password)
}


const User = mongoose.model('User', userSchema)
export default User
