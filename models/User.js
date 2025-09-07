import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    name : {type:String, required:true },
    email: {type:String, unique:true,required:true},
    password:{type:String,required:true},
    role: {type:String,enum:["user","admin"], default:"user"},
    status:{type:String,enum:["active","suspended"],default:"active"}
},{timestamps:true});

userSchema.pre("save", async function () {
 if(!this.isModified("password")) return;
 const salt = await bcrypt.genSalt(10);
 this.password = await bcrypt.hash(this.password,salt);
});

userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword , this.password);
}

const User = mongoose.model("user",userSchema);
export default User;